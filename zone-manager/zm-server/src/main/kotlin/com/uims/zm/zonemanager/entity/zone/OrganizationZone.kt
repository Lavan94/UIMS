package com.uims.zm.zonemanager.entity.zone

import com.uims.zm.zonemanager.entity.owner.LegalOwner
import jakarta.persistence.*

@Entity
@Table(name = "organization_zone")
class OrganizationZone : Zone() {
    @MapsId
    @OneToOne
    @JoinColumn(name = "owner_id", nullable = true)
    var legalOwner: LegalOwner? = null

    @Enumerated(EnumType.STRING)
    @Column(name = "organization_type", nullable = true)
    var zoneType: OrganizationZoneType? = null
}