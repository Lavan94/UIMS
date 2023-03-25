package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.RentService
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "rent_payment")
class RentPayment : ContractPayment() {
    @Column(name = "months_rented", nullable = false)
    var monthsRented: Int = 0
}