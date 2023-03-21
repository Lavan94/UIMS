package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.ElectricityService
import java.util.*

class ElectricityPayment(
    uuid: UUID,
    service: ElectricityService,
    status: ContractPaymentStatus,
    electricityConsumption: Double
) :
    ContractPayment<ElectricityService>(uuid, service, status) {
}