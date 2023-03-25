package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.InternetService
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "internet_payment")
open class InternetPayment : ContractPayment<InternetService>() {
    @Column(name = "price", nullable = false)
    var price: Double = 0.0
}