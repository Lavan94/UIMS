import {Injectable} from "@angular/core";

export class LoginSubscriber {
  constructor(private originalThis: any, private onLogin: Function) {
  }
  update(data: any){
    this.onLogin.call(this.originalThis, data);
  }
}

export class LoginData {
  constructor(public username: string, public role: string) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginPublisherService {
  private subscribers: LoginSubscriber[] = [];

  subscribe(subscriber: LoginSubscriber){
    this.subscribers.push(subscriber);
  }

  publish(data: LoginData){
    this.subscribers.forEach(sub => {
      sub.update(data)
    })
  }

}
