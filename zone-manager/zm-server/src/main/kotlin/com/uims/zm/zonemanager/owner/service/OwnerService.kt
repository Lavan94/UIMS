package com.uims.zm.zonemanager.owner.service

import com.uims.zm.zonemanager.owner.dto.OwnerRoleChangeDTO
import com.uims.zm.zonemanager.owner.entity.Owner
import com.uims.zm.zonemanager.owner.entity.OwnerRole
import com.uims.zm.zonemanager.owner.repository.OwnerRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import java.util.*
import kotlin.time.measureTime


@Service
class OwnerService @Autowired constructor(val ownerRepository: OwnerRepository, val passwordEncoder: PasswordEncoder) {
    fun getOwner(uuid: UUID): Owner? {
        var ownerOptional = ownerRepository.findById(uuid)
        return if (ownerOptional.isPresent) ownerOptional.get() else null
    }

    fun getOwners(): List<Owner> {
        return ownerRepository.findAll()
    }

    fun getOwnersByRole(role: String): List<Owner> {
        val ownerRole = OwnerRole.valueOf(role)
        return this.ownerRepository.findByRole(ownerRole)
    }

    fun getOwnerByUsername(username: String): Owner{
        return this.ownerRepository.findByUsername(username).get();
    }

    fun addOwner(owner: Owner): Owner {
        owner.setEncodedPassword(passwordEncoder.encode(owner.password))
        return this.ownerRepository.save(owner)
    }

    fun updateOwner(owner: Owner): Owner {
        if(owner.password.isEmpty() && owner.id != null){
//            owner.password = this.getOwner(owner.id!!)!!.password;
        }
        return ownerRepository.save(owner)
    }

    fun changeRole(ownerRoleChangeDTO: OwnerRoleChangeDTO): Owner? {
        val ownerId = UUID.fromString(ownerRoleChangeDTO.uuid)
        val owner = this.getOwner(ownerId) ?: return null
        owner.role = OwnerRole.valueOf(ownerRoleChangeDTO.ownerRole)
        return this.ownerRepository.save(owner)
    }

    fun deleteOwner(ownerId: UUID): Owner? {
        val owner = this.getOwner(ownerId)
        this.ownerRepository.deleteById(ownerId)
        return owner
    }
}