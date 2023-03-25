package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.TrashService
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "trash_payment")
class TrashPayment : ContractPayment(){
    @Column(name = "recycled_weight", nullable = false)
    var recycledWeight: Double = 0.0

    @Column(name = "household_weight", nullable = false)
    var householdWeight: Double = 0.0
}