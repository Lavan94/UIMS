package com.uims.zm.zonemanager.entity.service.contract

import com.uims.zm.zonemanager.entity.zone.Zone
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "contract")
class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    var status: ContractStatus = ContractStatus.DRAFT

    @Temporal(TemporalType.DATE)
    @Column(name = "begin_date", nullable = true)
    val beginDate: Date? = null

    @Temporal(TemporalType.DATE)
    @Column(name = "end_date", nullable = true)
    val endDate: Date? = null

    @MapsId
    @OneToOne(targetEntity = Zone::class)
    @JoinColumn(name = "zone_id", nullable = true)
    val zone: Zone? = null
}