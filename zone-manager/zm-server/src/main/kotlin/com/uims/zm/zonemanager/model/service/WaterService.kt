package com.uims.zm.zonemanager.model.service

import java.util.*

data class WaterService(
    override val uuid: UUID,
    override val currency: Currency,
    val waterUnit: String,
    val coldWaterPricePerUnit: Double,
    val hotWaterPricePerUnit: Double
) : IService {
}