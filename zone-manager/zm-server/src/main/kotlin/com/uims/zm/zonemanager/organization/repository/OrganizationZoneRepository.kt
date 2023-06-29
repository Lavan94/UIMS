package com.uims.zm.zonemanager.organization.repository;

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZone
import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import org.springframework.data.jpa.repository.JpaRepository
import java.util.*

interface OrganizationZoneRepository : JpaRepository<OrganizationZone, UUID> {
    fun findByOrganizationZoneType(organizationZoneType: OrganizationZoneType): List<OrganizationZone>
}