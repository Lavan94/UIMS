package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.contract.ContractPaymentHistory
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "contract_payment")
open class ContractPayment<T> where T : Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @MapsId
    @OneToOne(targetEntity = Service::class)
    @JoinColumn(name = "service_id", nullable = true)
    open var service: Service? = null

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = true)
    open var paymentStatus: ContractPaymentStatus? = null

    @ManyToOne(targetEntity = ContractPaymentHistory::class)
    @JoinColumn(name = "contract_payment_history_id", referencedColumnName = "id")
    open var contractPaymentHistory: ContractPaymentHistory<T>? = null
}