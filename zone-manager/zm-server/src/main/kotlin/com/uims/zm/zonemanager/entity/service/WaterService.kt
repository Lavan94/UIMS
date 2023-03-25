package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "water_service")
class WaterService : Service() {
    @Column(name = "unit", nullable = true)
    var unit: String? = null

    @Column(name = "cold_water_price_per_unit", nullable = false)
    var coldWaterPricePerUnit: Double = 0.0

    @Column(name = "hot_water_price_per_unit", nullable = false)
    var hotWaterPricePerUnit: Double = 0.0
}