package com.uims.zm.zonemanager.repository;

import com.uims.zm.zonemanager.entity.owner.Owner
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface OwnerRepository : JpaRepository<Owner, UUID> {
    override fun findAll(): MutableList<Owner>
    override fun getReferenceById(id: UUID): Owner
    override fun deleteById(id: UUID)
}