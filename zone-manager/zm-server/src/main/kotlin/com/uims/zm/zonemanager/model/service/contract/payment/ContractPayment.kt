package com.uims.zm.zonemanager.model.service.contract.payment

import com.uims.zm.zonemanager.model.service.IService
import java.util.*

open class ContractPayment<T>(
    open val uuid: UUID, open val service: T, open val status: ContractPaymentStatus
) where T : IService {}
