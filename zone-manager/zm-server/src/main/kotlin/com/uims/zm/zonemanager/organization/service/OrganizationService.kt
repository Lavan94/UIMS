package com.uims.zm.zonemanager.organization.service

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZone
import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import com.uims.zm.zonemanager.organization.dto.OrganizationZoneDto
import com.uims.zm.zonemanager.organization.repository.OrganizationZoneRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class OrganizationService @Autowired constructor(
    private val organizationZoneRepository: OrganizationZoneRepository,
    private val organizationGeoJsonService: OrganizationGeoJsonService
    ) {
    fun getOrganizationByType(organizationZoneType: OrganizationZoneType): List<OrganizationZoneDto>{
        var organizations = this.organizationZoneRepository.findByOrganizationZoneType(organizationZoneType)

        return organizations.map { organization -> OrganizationZoneDto(
            organization.id,
            organization.name,
            organization.organizationZoneType,
            this.organizationGeoJsonService.getFileContent(organization.geoJsonFilePath),
            organization.parentOrganizationZone,
            organization.zoneList
        )}
    }

    fun addOrganization(organizationZoneDto: OrganizationZoneDto): OrganizationZoneDto{
        val geoJsonPath = this.organizationGeoJsonService.writeGeoJsonDataByRole(
            organizationZoneDto.organizationZoneType!!,
            organizationZoneDto.name,
            organizationZoneDto.geoJson!!
        )
        val savedOrganization = this.organizationZoneRepository.save(OrganizationZone(
            organizationZoneDto.id,
            organizationZoneDto.name,
            organizationZoneDto.organizationZoneType,
            geoJsonPath,
            organizationZoneDto.parentOrganizationZone,
            null
        ))
        organizationZoneDto.id = savedOrganization.id
        return organizationZoneDto;
    }
}