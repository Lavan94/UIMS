package com.uims.zm.zonemanager.entity.service.contract.payment

import com.uims.zm.zonemanager.entity.service.Service
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
    @JoinColumn(name="service_id", nullable = true)
    var service: T? = null

    @Enumerated(EnumType.STRING)
    @Column(name = "payment_status", nullable = true)
    var paymentStatus: ContractPaymentStatus? = null
}