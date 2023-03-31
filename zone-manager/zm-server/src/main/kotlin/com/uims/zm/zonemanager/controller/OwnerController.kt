package com.uims.zm.zonemanager.controller

import com.uims.zm.zonemanager.dto.OwnerDto
import com.uims.zm.zonemanager.entity.owner.LegalOwner
import com.uims.zm.zonemanager.entity.owner.Owner
import com.uims.zm.zonemanager.service.OwnerService
import org.hibernate.service.spi.InjectService
import org.springframework.web.bind.annotation.*
import java.util.*


@RestController
@RequestMapping("/$SERVER_PATH/$OWNER_PATH")
class OwnerController(private val ownerService: OwnerService) {
    @ResponseBody
    @GetMapping("/$GET_ALL")
    fun getAllOwners(): List<OwnerDto>? {
        return ownerService.getAllOwners();
    }

    @ResponseBody
    @GetMapping("/$GET_ONE")
    fun getOneOwner(@RequestParam(name = "id") id: UUID): OwnerDto? {
        return ownerService.getOwner(id)
    }

    @ResponseBody
    @PostMapping("/$ADD_ONE")
    fun addOwner(@RequestBody owner: OwnerDto): OwnerDto? {
        return ownerService.addOwner(owner)
    }

    @ResponseBody
    @DeleteMapping("/$DELETE_ONE")
    fun deleteOwner(@RequestParam(name = "id") id: UUID): OwnerDto? {
        return ownerService.deleteOwner(id);
    }

}