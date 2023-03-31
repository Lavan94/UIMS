package com.uims.zm.zonemanager.repository;

import com.uims.zm.zonemanager.entity.owner.Address
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface AddressRepository : JpaRepository<Address, UUID> {
    override fun getReferenceById(id: UUID): Address
    override fun findAll(): MutableList<Address>
    override fun deleteById(id: UUID)
}