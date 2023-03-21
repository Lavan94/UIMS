package com.uims.zm.zonemanager.model.service.provider

import com.uims.zm.zonemanager.model.service.IService
import com.uims.zm.zonemanager.model.service.contract.Contract
import com.uims.zm.zonemanager.model.user.LegalOwner
import java.util.*

class ServiceProvider<T>(
    val uuid: UUID,
    val name: String,
    val legalOwner: LegalOwner,
    val serviceList: List<IService>,
    val contractList: List<Contract>
) where T : IService {}