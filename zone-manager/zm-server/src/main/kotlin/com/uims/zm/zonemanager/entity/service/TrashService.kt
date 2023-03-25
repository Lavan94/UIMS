package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "trash_service")
class TrashService : Service() {
    @Column(name = "weight_unit", nullable = true)
    var weightUnit: String? = null

    @Column(name = "price_per_unit_of_household_trash", nullable = false)
    var pricePerUnitOfHouseholdTrash: Double = 0.0

    @Column(name = "price_per_unit_of_recycled_trash", nullable = false)
    var pricePerUnitOfRecycledTrash: Double = 0.0
}
