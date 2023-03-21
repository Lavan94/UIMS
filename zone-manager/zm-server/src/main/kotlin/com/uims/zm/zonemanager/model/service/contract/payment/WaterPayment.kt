package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.WaterService
import java.util.*

class WaterPayment(
    override val uuid: UUID,
    override val service: WaterService,
    override val status: ContractPaymentStatus,
    val hotWaterConsumption: Double,
    val coldWaterConsumption: Double
) : ContractPayment<WaterService>(uuid, service, status) {
}