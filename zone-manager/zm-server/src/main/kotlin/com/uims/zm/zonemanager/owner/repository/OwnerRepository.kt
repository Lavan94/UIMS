package com.uims.zm.zonemanager.owner.repository;

import com.uims.zm.zonemanager.owner.entity.Owner
import com.uims.zm.zonemanager.owner.entity.OwnerRole
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface OwnerRepository : JpaRepository<Owner, UUID> {
    fun findByRole(ownerRole: OwnerRole): List<Owner>
    fun findByUsername(username: String): Optional<Owner>
}