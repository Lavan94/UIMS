package com.uims.zm.zonemanager.organization.controller

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import com.uims.zm.zonemanager.organization.dto.OrganizationZoneDto
import com.uims.zm.zonemanager.organization.dto.UrbanZoneDto
import com.uims.zm.zonemanager.organization.service.OrganizationService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.*

@Controller
@CrossOrigin(origins = ["http://localhost:4200"])
@RequestMapping("/organization-zone")
class OrganizationZoneController constructor(@Autowired val organizationService: OrganizationService) {

    @ResponseBody
    @GetMapping("/getAllByType/{orgType}")
    fun getAllOrganizationsByType(@PathVariable(name="orgType") orgType: String): List<OrganizationZoneDto>{
        return this.organizationService.getOrganizationByType(OrganizationZoneType.valueOf(orgType));
    }

    @ResponseBody
    @PostMapping("/add")
    fun addOrganization(@RequestBody organizationZoneDto: OrganizationZoneDto): OrganizationZoneDto{
        return this.organizationService.addOrganization(organizationZoneDto);
    }

    @ResponseBody
    @PostMapping("/add-urban-zone")
    fun addUrbanZone(@RequestBody urbanZoneDto: UrbanZoneDto): UrbanZoneDto{
        return this.organizationService.addUrbanZone(urbanZoneDto);
    }

}