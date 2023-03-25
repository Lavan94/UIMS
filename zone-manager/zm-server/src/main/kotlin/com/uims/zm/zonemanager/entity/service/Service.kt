package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service")
open class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "id", nullable = true)
    var currency: Currency? = null
}