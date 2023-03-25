package com.uims.zm.zonemanager.entity.zone

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "zone")
open class Zone {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "name", nullable = false)
    open var name: String = ""

    @Column(name = "geo_json", nullable = false)
    open var geoJson: String = ""

    @ManyToOne
    @JoinColumn(name = "zone_id")
    open var parentZone: Zone? = null

    @OneToMany(targetEntity = Zone::class, mappedBy = "parentZone")
    open var zoneList: List<Zone>? = null
}