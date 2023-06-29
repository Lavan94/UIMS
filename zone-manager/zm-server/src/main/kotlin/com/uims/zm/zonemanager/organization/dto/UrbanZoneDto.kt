package com.uims.zm.zonemanager.organization.dto

import com.uims.zm.zonemanager.entity.organization_zone.urban_zone.UrbanZoneType
import com.uims.zm.zonemanager.owner.entity.Owner

class UrbanZoneDto(
    var organizationZoneDto: OrganizationZoneDto? = null,
    var urbanType: UrbanZoneType? = null,
    var owner: Owner? = null
) {}