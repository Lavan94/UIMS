package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.InternetService
import java.util.*

class InternetPayment(uuid: UUID, service: InternetService, status: ContractPaymentStatus, val price: Double,
) :
    ContractPayment<InternetService>(uuid, service, status) {
}