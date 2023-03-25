package com.uims.zm.zonemanager.entity.service.contract

import com.uims.zm.zonemanager.entity.owner.Owner
import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.provider.ServiceProvider
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service_contract")
class ServiceContract<S> where S : Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    var id: UUID? = null

    @ManyToOne(targetEntity = ServiceProvider::class)
    @JoinColumn(name = "service_provider_id", referencedColumnName = "id")
    var contractor: ServiceProvider<S>? = null

    @MapsId
    @OneToOne(targetEntity = Owner::class)
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = true)
    var contractee: Owner? = null

    @OneToMany(targetEntity = ContractPaymentHistory::class, mappedBy = "serviceContract")
    var contractPaymentHistory: List<ContractPaymentHistory<S>>? = null
}