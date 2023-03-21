package com.uims.zm.zonemanager.model.service.contract

import com.uims.zm.zonemanager.model.service.IService
import com.uims.zm.zonemanager.model.service.contract.payment.ContractPayment
import com.uims.zm.zonemanager.model.service.provider.ServiceProvider
import com.uims.zm.zonemanager.model.user.Owner
import java.util.*

class ServiceContract<T>(
    val uuid: UUID,
    val contractee: Owner,
    val contractor: ServiceProvider<T>,
    val contractHistory: Map<Contract, List<ContractPayment<T>>>
) where T : IService {
}