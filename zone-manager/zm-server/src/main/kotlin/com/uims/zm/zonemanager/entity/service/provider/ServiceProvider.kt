package com.uims.zm.zonemanager.entity.service.provider

import com.uims.zm.zonemanager.entity.owner.LegalOwner
import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.contract.ServiceContract
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service_provider")
class ServiceProvider<S> where S : Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    var id: UUID? = null

    @Column(name = "name", nullable = false)
    var name: String = ""

    @OneToOne(targetEntity = LegalOwner::class)
    @JoinColumn(name = "legal_owner_id", nullable = true)
    var legalOwner: LegalOwner? = null

    @OneToMany(targetEntity = Service::class, mappedBy = "serviceProvider")
    var serviceList: List<S>? = null;

    @OneToMany(targetEntity = ServiceContract::class, mappedBy = "contractor")
    var contractList: List<ServiceContract<S>>? = null
}