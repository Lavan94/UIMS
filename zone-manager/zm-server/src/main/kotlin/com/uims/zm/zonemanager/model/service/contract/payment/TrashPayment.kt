package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.TrashService
import java.util.*

class TrashPayment(
    uuid: UUID,
    service: TrashService,
    status: ContractPaymentStatus,
    val householdTrashWeight: Double,
    val recycledTrashWeight: Double
) :
    ContractPayment<TrashService>(uuid, service, status) {
}