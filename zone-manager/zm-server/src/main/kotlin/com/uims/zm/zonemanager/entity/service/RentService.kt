package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "rent_service")
open class RentService : Service() {
    @Column(name = "surface", nullable = false)
    var surface: Double = 0.0

    @Column(name = "price_per_month", nullable = false)
    var pricePerMonth: Double = 0.0
}