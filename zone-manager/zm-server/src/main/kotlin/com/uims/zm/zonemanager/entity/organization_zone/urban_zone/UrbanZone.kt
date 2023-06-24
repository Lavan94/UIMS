package com.uims.zm.zonemanager.entity.organization_zone.urban_zone

import com.uims.zm.zonemanager.entity.organization_zone.OrganizationZone
import com.uims.zm.zonemanager.owner.entity.Owner
import jakarta.persistence.*

@Entity
@Table(name = "urban_zone")
class UrbanZone : OrganizationZone(){
    @Enumerated(EnumType.STRING)
    @Column(name = "urban_type", nullable = true)
    var urbanType: UrbanZoneType? = null

    @MapsId
    @OneToOne
    @JoinColumn(name = "owner_id", nullable = true)
    var owner: Owner? = null
}