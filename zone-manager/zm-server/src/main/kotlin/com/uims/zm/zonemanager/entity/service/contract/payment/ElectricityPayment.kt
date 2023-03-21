package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.ElectricityService
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "electricity_payment")
open class ElectricityPayment : ContractPayment<ElectricityService>() {
    @Column(name = "electricity_consumption", nullable = false)
    var electricityConsumption: Double = 0.0
}