package com.uims.zm.zonemanager.entity.zone

import com.uims.zm.zonemanager.entity.owner.Owner
import jakarta.persistence.*

@Entity
@Table(name = "urban_zone")
class UrbanZone : Zone() {
    @Enumerated(EnumType.STRING)
    @Column(name = "urban_type", nullable = true)
    var urbanType: UrbanZoneType? = null

    @MapsId
    @OneToOne
    @JoinColumn(name = "owner_id", nullable = true)
    var owner: Owner? = null
}