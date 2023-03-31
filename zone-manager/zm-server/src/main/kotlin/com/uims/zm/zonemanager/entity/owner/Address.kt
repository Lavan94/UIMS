package com.uims.zm.zonemanager.entity.owner

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "address")
class Address(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    var id: UUID? = null,

    @Column(name = "street", nullable = false)
    var street: String = "",

    @Column(name = "number", nullable = false)
    var number: Int = -1,

    @Column(name = "zip", nullable = false)
    var zip: String = "",

    @Column(name = "city", nullable = false)
    var city: String = "",

    @Column(name = "county", nullable = false)
    var county: String = "",

    @Column(name = "country", nullable = false)
    var country: String = "",
) {}