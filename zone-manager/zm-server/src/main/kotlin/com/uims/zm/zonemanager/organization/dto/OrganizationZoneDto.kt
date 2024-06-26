package com.uims.zm.zonemanager.organization.dto

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import java.util.*

class OrganizationZoneDto(
    var id: UUID? = null,
    var name: String = "",
    var organizationZoneType: OrganizationZoneType? = null,
    var geoJson: String? = null,
    var parentId: UUID? = null,
    var zoneList: List<OrganizationZoneDto>? = null,
    var uzType: String? = "NONE"
) {
}