package com.uims.zm.zonemanager.organization.repository;

import com.uims.zm.zonemanager.entity.organization_zone.urban_zone.UrbanZone
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface UrbanZoneRepository : JpaRepository<UrbanZone, UUID> {
}