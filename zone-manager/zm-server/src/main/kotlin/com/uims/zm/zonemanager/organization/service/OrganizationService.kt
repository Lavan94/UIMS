package com.uims.zm.zonemanager.organization.service

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZone
import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import com.uims.zm.zonemanager.entity.organization_zone.urban_zone.UrbanZone
import com.uims.zm.zonemanager.organization.dto.OrganizationZoneDto
import com.uims.zm.zonemanager.organization.dto.UrbanZoneDto
import com.uims.zm.zonemanager.organization.repository.OrganizationZoneRepository
import com.uims.zm.zonemanager.organization.repository.UrbanZoneRepository
import com.uims.zm.zonemanager.owner.service.OwnerService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

@Service
class OrganizationService @Autowired constructor(
    private val organizationZoneRepository: OrganizationZoneRepository,
    private val urbanZoneRepository: UrbanZoneRepository,
    private val organizationGeoJsonService: OrganizationGeoJsonService,
    private val ownerService: OwnerService,
) {

    fun mapOrganizationZoneToDto(organization: OrganizationZone): OrganizationZoneDto {
        return OrganizationZoneDto(
            organization.id,
            organization.name,
            organization.organizationZoneType,
            this.organizationGeoJsonService.getFileContent(organization.geoJsonFilePath),
            organization.parentOrganizationZone?.id,
            organization.zoneList?.map { subOrganization -> this.mapOrganizationZoneToDto(subOrganization) },
            if (organization is UrbanZone && organization.urbanType != null) organization.urbanType.toString() else "NONE"
        )
    }

    fun getOrganizationByType(organizationZoneType: OrganizationZoneType): List<OrganizationZoneDto> {
        var organizations = this.organizationZoneRepository.findByOrganizationZoneType(organizationZoneType)

        return organizations.map { organization -> this.mapOrganizationZoneToDto(organization) }
    }

    fun getOrganizationById(orgId: UUID?): OrganizationZone? {
        if (orgId == null) return null
        val result = this.organizationZoneRepository.findById(orgId)
        return if (result.isPresent) result.get() else null
    }

    fun getUrbanZoneById(orgId: UUID?): UrbanZone? {
        if (orgId == null) return null
        val result = this.urbanZoneRepository.findById(orgId)
        return if (result.isPresent) result.get() else null
    }

    fun addOrganization(organizationZoneDto: OrganizationZoneDto): OrganizationZoneDto {
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
            this.getOrganizationById(organizationZoneDto.parentId),
            null
        ))
        organizationZoneDto.id = savedOrganization.id
        return organizationZoneDto
    }

    fun updateOrganization(organizationZoneDto: OrganizationZoneDto): OrganizationZoneDto? {
        var organization = this.getOrganizationById(organizationZoneDto.id)

        if (organization === null) return null

        if (organizationZoneDto.name != null) {
            organization.name = organizationZoneDto.name
        }
        if (organizationZoneDto.geoJson != null) {
            this.organizationGeoJsonService.deleteOldGeoJsonFile(organization.geoJsonFilePath)
            organization.geoJsonFilePath = this.organizationGeoJsonService.writeGeoJsonDataByRole(
                organization.organizationZoneType!!, organization.name, organizationZoneDto.geoJson!!
            )
        }
        this.organizationZoneRepository.save(organization)

        return organizationZoneDto
    }

    fun addUrbanZone(urbanZoneDto: UrbanZoneDto): UrbanZoneDto {
        val organizationZoneDto = urbanZoneDto.organizationZoneDto
        val geoJsonPath = this.organizationGeoJsonService.writeGeoJsonDataByRole(
            organizationZoneDto?.organizationZoneType!!,
            organizationZoneDto.name,
            organizationZoneDto.geoJson!!
        )
        val ownerId = if (urbanZoneDto.ownerId != null) UUID.fromString(urbanZoneDto.ownerId) else null
        val savedUrbanZone = this.organizationZoneRepository.save(
            UrbanZone(
                organizationZoneDto.id,
                organizationZoneDto.name,
                organizationZoneDto.organizationZoneType,
                geoJsonPath,
                this.getOrganizationById(organizationZoneDto.parentId),
                null,
                urbanZoneDto.urbanType,
                if (ownerId != null) this.ownerService.getOwnerById(ownerId) else ownerId
            )
        )
        urbanZoneDto.organizationZoneDto!!.id = savedUrbanZone.id
        return urbanZoneDto
    }

    fun updateUrbanZone(urbanZoneDto: UrbanZoneDto): UrbanZoneDto? {
        var urbanZone = this.getUrbanZoneById(urbanZoneDto.organizationZoneDto?.id)

        if (urbanZone === null) return null

        if (urbanZoneDto.organizationZoneDto!!.name != null) {
            urbanZone.name = urbanZoneDto.organizationZoneDto!!.name
        }
        if (urbanZoneDto.organizationZoneDto!!.geoJson != null) {
            this.organizationGeoJsonService.deleteOldGeoJsonFile(urbanZone.geoJsonFilePath)
            urbanZone.geoJsonFilePath = this.organizationGeoJsonService.writeGeoJsonDataByRole(
                urbanZone.organizationZoneType!!, urbanZone.name, urbanZoneDto.organizationZoneDto!!.geoJson!!
            )
        }

        if (urbanZoneDto.urbanType != null) {
            urbanZone.urbanType = urbanZoneDto.urbanType
        }

        this.urbanZoneRepository.save(urbanZone)

        return urbanZoneDto
    }
}