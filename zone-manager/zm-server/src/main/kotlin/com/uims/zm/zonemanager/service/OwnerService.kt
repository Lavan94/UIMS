package com.uims.zm.zonemanager.service

import com.uims.zm.zonemanager.dto.OwnerDto
import com.uims.zm.zonemanager.entity.owner.Owner
import com.uims.zm.zonemanager.repository.OwnerRepository
import org.springframework.stereotype.Service
import java.util.*

@Service
class OwnerService(private val ownerRepository: OwnerRepository) {
    fun getAllOwners(): List<OwnerDto>? {
        return ownerRepository.findAll()
            .map { entity: Owner -> OwnerDto(entity) };
    }

    fun getOwner(id: UUID): OwnerDto? {
        return OwnerDto(ownerRepository.getReferenceById(id))
    }

    fun addOwner(ownerDto: OwnerDto): OwnerDto? {
        return OwnerDto(ownerRepository.save(ownerDto.toEntity()))
    }

    fun deleteOwner(id: UUID): OwnerDto? {
        val owner = ownerRepository.getReferenceById(id)
        ownerRepository.deleteById(id)
        return OwnerDto(owner);
    }
}