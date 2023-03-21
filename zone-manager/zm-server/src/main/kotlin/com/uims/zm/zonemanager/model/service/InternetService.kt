package com.uims.zm.zonemanager.model.service

import java.util.*

class InternetService(
    override val uuid: UUID,
    override val currency: Currency,
    val bandwidthUnit: String,
    val downloadBandwidthValue: Double,
    val uploadBandwidthValue: Double,
) : IService {
}