package com.uims.zm.zonemanager.owner.controller

import com.uims.zm.zonemanager.owner.dto.OwnerRoleChangeDTO
import com.uims.zm.zonemanager.owner.entity.Owner
import com.uims.zm.zonemanager.owner.service.OwnerService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

//@CrossOrigin(origins = ["http://localhost:4200"])
@Controller
@RequestMapping("/owner")
class OwnerController @Autowired constructor(val ownerService: OwnerService) {
    @ResponseBody
    @GetMapping("/getOne")
    fun getOwner(@RequestBody ownerId: String): Owner? {
        return this.ownerService.getOwner(UUID.fromString(ownerId))
    }

    @ResponseBody
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

    @ResponseBody
    @GetMapping("/forAdmin")
    fun getAdminMessage(): String{
        return "This URL is accessible only for the Administrator Owners"
    }

    @ResponseBody
    @GetMapping("/forServiceProvider")
    fun getOwnerMessage(): String{
        return "This URL is accessible only for the Service Provider Owners"
    }
}