package com.uims.zm.zonemanager.entity.service.contract

import com.uims.zm.zonemanager.entity.service.contract.payment.ContractPayment
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "contract_payment_history")
open class ContractPaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @OneToMany(targetEntity = ContractPayment::class, mappedBy = "contractPaymentHistory")
    open var contractPayments: List<ContractPayment>? = null

    @ManyToOne(targetEntity = ServiceContract::class)
    @JoinColumn(name = "service_contract_id")
    open var serviceContract: ServiceContract? = null
}