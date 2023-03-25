package com.uims.zm.zonemanager.entity.service.contract

import ContractPaymentHistory
import com.uims.zm.zonemanager.entity.owner.Owner
import com.uims.zm.zonemanager.entity.service.provider.ServiceProvider
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service_contract")
class ServiceContract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    var id: UUID? = null

    @ManyToOne(targetEntity = ServiceProvider::class)
    @JoinColumn(name = "service_provider_id", referencedColumnName = "id")
    var contractor: ServiceProvider? = null

    @MapsId
    @OneToOne(targetEntity = Owner::class)
    @JoinColumn(name = "owner_id", referencedColumnName = "id", nullable = true)
    var contractee: Owner? = null

//    @OneToMany(targetEntity = ContractPaymentHistory::class, mappedBy = "serviceContract")
//    var contractPaymentHistory: List<ContractPaymentHistory>? = null
}