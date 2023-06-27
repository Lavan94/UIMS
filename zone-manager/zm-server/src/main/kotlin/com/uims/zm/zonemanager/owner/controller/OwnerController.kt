package com.uims.zm.zonemanager.owner.controller

import com.uims.zm.zonemanager.owner.dto.OwnerRoleChangeDTO
import com.uims.zm.zonemanager.owner.entity.Owner
import com.uims.zm.zonemanager.owner.service.OwnerService
import com.uims.zm.zonemanager.security.service.AuthService
import com.uims.zm.zonemanager.security.service.AuthenticationRequest
import com.uims.zm.zonemanager.security.service.AuthenticationResponse
import com.uims.zm.zonemanager.security.service.RegisterRequest
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/owner")
class OwnerController constructor(@Autowired val ownerService: OwnerService, @Autowired  val authService: AuthService) {

    @PostMapping("/login")
    fun getOwner(@RequestBody request: AuthenticationRequest): ResponseEntity<AuthenticationResponse> {
        return ResponseEntity.ok(authService.login(request))
    }

    @PostMapping("/register")
    fun registerOwner(@RequestBody request: RegisterRequest): ResponseEntity<AuthenticationResponse> {
        return ResponseEntity.ok(authService.register(request))
    }

    @ResponseBody
    @GetMapping("/getOne")
    fun getOwner(@RequestBody ownerId: String): Owner? {
        return this.ownerService.getOwner(UUID.fromString(ownerId))
    }

    @ResponseBody
    @PreAuthorize("hasAuthority('ADMINISTRATOR')")
    @GetMapping("/getAll")
    fun getAllOwners(): List<Owner> {
        return this.ownerService.getOwners()
    }

    @ResponseBody
    @GetMapping("/getAllByRole/{role}")
    fun getAllByRole(@PathVariable(name="role") role: String): List<Owner> {
        return this.ownerService.getOwnersByRole(role)
    }

    @ResponseBody
    @PostMapping("/add")
    fun addOwner(@RequestBody owner: Owner): Owner {
        return this.ownerService.addOwner(owner)
    }

    @ResponseBody
    @PutMapping("/edit")
    fun editOwner(@RequestBody owner: Owner): Owner {
        return this.ownerService.updateOwner(owner)
    }

    @ResponseBody
    @PutMapping("/changeRole")
    fun changeOwnerRole(@RequestBody ownerRoleChangeDTO: OwnerRoleChangeDTO): Owner? {
        return this.ownerService.changeRole(ownerRoleChangeDTO)
    }

    @ResponseBody
    @DeleteMapping("/deleteOne/{ownerId}")
    fun addOwner(@PathVariable(name="ownerId") ownerId: String): Owner? {
        return this.ownerService.deleteOwner(UUID.fromString(ownerId))
    }
}