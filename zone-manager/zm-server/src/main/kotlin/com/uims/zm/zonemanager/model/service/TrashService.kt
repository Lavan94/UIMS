package com.uims.zm.zonemanager.model.service

import java.util.*

class TrashService(
    override val uuid: UUID,
    override val currency: Currency,
    val weightUnit: String,
    val pricePerUnitOfHouseholdTrash: Double,
    val pricePerUnitOfRecycledTrash: Double,
) :
    IService {
}