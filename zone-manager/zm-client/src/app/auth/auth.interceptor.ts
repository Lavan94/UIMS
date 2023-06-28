import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {OwnerAuthService} from "../service/owner-auth.service";
import {Router} from "@angular/router";
import {HOME_LOGIN_PAGE} from "../app-routing.module";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private ownerAuthService: OwnerAuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get("No-Auth") === "True") {
      return next.handle(req.clone())
    }
    const token = this.ownerAuthService.getJwtToken();
    req = this.addToken(req, token);
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log(err.status)
        if (err.status === 401) {
          this.router.navigate([HOME_LOGIN_PAGE]);
        } else if (err.status === 403) {
          this.router.navigate(["/forbidden"])
        }
        return throwError("Something is wrong")
      })
    )
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}
