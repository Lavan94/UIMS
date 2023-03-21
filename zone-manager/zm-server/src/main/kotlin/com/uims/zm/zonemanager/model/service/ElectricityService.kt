package com.uims.zm.zonemanager.model.service

import java.util.*

class ElectricityService(override val uuid: UUID, override val currency: Currency, val pricePerKwH: Double) : IService {
}