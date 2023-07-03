package com.uims.zm.zonemanager.organization.dto

import com.uims.zm.zonemanager.entity.organization_zone.urban_zone.UrbanZoneType

class UrbanZoneDto(
    var organizationZoneDto: OrganizationZoneDto? = null,
    var urbanType: UrbanZoneType? = null,
    var ownerId: String? = null
) {}