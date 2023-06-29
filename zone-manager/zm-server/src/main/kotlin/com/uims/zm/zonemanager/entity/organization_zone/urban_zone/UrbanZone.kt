package com.uims.zm.zonemanager.entity.organization_zone.urban_zone

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZone
import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZoneType
import com.uims.zm.zonemanager.owner.entity.Owner
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "urban_zone")
class UrbanZone(
    id: UUID? = null,
    name: String = "",
    organizationZoneType: OrganizationZoneType? = null,
    geoJsonFilePath: String = "",
    parentOrganizationZone: OrganizationZone? = null,
    zoneList: List<OrganizationZone>? = null,

    @Enumerated(EnumType.STRING)
    @Column(name = "urban_type", nullable = true)
    var urbanType: UrbanZoneType? = null,

    @OneToOne
    @JoinColumn(name = "owner_id", nullable = true)
    var owner: Owner? = null,
) : OrganizationZone(id,name,organizationZoneType,geoJsonFilePath,parentOrganizationZone,zoneList) {}