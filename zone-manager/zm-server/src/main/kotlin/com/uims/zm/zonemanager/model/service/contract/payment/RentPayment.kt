package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.RentService
import java.util.*

class RentPayment(uuid: UUID, service: RentService, status: ContractPaymentStatus, val monthsRented: Int) :
    ContractPayment<RentService>(uuid, service, status) {
}