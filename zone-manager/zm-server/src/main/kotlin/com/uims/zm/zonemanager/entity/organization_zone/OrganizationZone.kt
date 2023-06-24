package com.uims.zm.zonemanager.entity.organization_zone

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "organization_zone")
open class OrganizationZone {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "name", nullable = false)
    open var name: String = ""

    @Enumerated(EnumType.STRING)
    @Column(name = "organization_zone_type", nullable = true)
    open var organizationZoneType: OrganizationZoneType? = null

    @Column(name = "geo_json", nullable = false)
    open var geoJson: String = ""

    @ManyToOne
    @JoinColumn(name = "zone_id")
    open var parentOrganizationZone: OrganizationZone? = null

    @OneToMany(targetEntity = OrganizationZone::class, mappedBy = "parentOrganizationZone")
    open var zoneList: List<OrganizationZone>? = null
}