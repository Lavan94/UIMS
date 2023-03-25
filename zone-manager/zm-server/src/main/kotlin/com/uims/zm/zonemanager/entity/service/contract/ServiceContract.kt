package com.uims.zm.zonemanager.entity.service.contract

import ContractPaymentHistory
import com.uims.zm.zonemanager.entity.owner.Owner
import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.provider.ServiceProvider
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service_contract")
open class ServiceContract<T> where T : Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @MapsId
    @OneToOne(targetEntity = Owner::class)
    @JoinColumn(name = "owner_id", nullable = true)
    var contractee: Owner? = null

    @ManyToOne(targetEntity = ServiceProvider::class)
    var contractor: ServiceProvider<T>? = null

    @OneToMany(targetEntity = ContractPaymentHistory::class)
    var contractHistory: List<ContractPaymentHistory<T>>? = null
}