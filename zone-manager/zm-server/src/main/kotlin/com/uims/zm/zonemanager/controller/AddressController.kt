package com.uims.zm.zonemanager.controller

import com.uims.zm.zonemanager.dto.AddressDto
import com.uims.zm.zonemanager.service.AddressService
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*
import java.util.*

@Controller
@RequestMapping("/$SERVER_PATH/$ADDRESS_PATH")
class AddressController(private val addressService: AddressService) {
    @ResponseBody
    @GetMapping("/$GET_ALL")
    fun getAllAddresses(): List<AddressDto>? {
        return this.addressService.getAllAddresses()
    }

    @ResponseBody
    @GetMapping("/$GET_ONE")
    fun getAddress(@RequestParam(name = "id") id: UUID): AddressDto? {
        return this.addressService.getAddress(id)
    }

    @ResponseBody
    @PostMapping("/$ADD_ONE")
    fun addAddress(@RequestBody addressDto: AddressDto): AddressDto{
        return this.addressService.addAddress(addressDto);
    }

    @ResponseBody
    @DeleteMapping("/$DELETE_ONE")
    fun deleteAddress(@RequestParam(name = "id") id: UUID): AddressDto{
        return this.addressService.deleteAddress(id);
    }
}