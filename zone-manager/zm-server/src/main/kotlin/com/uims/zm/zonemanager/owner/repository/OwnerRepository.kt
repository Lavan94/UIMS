package com.uims.zm.zonemanager.owner.repository;

import com.uims.zm.zonemanager.owner.entity.Owner
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface OwnerRepository : JpaRepository<Owner, UUID> {}