package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "electricity_service")
open class ElectricityService : Service() {
    @Column(name = "price", nullable = false)
    var pricePerKwH: Double = 0.0
}