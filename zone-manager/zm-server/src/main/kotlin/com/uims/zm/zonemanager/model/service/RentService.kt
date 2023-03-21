package com.uims.zm.zonemanager.model.service

import java.util.*

data class RentService(
    override val uuid: UUID,
    override val currency: Currency,
    val rentSurface: Double,
    val rentPricePerMonth: Double
) :
    IService {}