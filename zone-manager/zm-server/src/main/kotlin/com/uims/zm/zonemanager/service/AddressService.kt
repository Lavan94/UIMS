package com.uims.zm.zonemanager.service

import com.uims.zm.zonemanager.dto.AddressDto
import com.uims.zm.zonemanager.entity.owner.Address
import com.uims.zm.zonemanager.repository.AddressRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class AddressService(private val addressRepository: AddressRepository) {
    fun getAllAddresses(): List<AddressDto> {
        return this.addressRepository.findAll().map { address: Address -> AddressDto(address) }
    }

    fun getAddress(id: UUID): AddressDto {
        return AddressDto(this.addressRepository.getReferenceById(id))
    }

    fun addAddress(addressDto: AddressDto): AddressDto {
        return AddressDto(this.addressRepository.save(addressDto.toEntity()))
    }

    fun deleteAddress(id: UUID): AddressDto {
        val address = this.getAddress(id)
        this.addressRepository.deleteById(id)
        return address;
    }
}