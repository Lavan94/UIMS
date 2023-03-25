package com.uims.zm.zonemanager.entity.service.provider

import com.uims.zm.zonemanager.entity.owner.LegalOwner
import com.uims.zm.zonemanager.entity.service.Service
import com.uims.zm.zonemanager.entity.service.contract.ServiceContract
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service_provider")
class ServiceProvider {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    var id: UUID? = null

    @Column(name = "name", nullable = false)
    var name: String = ""

    @MapsId
    @OneToOne(targetEntity = LegalOwner::class)
    @JoinColumn(name = "legal_owner_id", nullable = true)
    var legalOwner: LegalOwner? = null

    @OneToMany(targetEntity = Service::class)
    var serviceList: List<Service>? = null;

    @OneToMany(targetEntity = ServiceContract::class)
    var contractList: List<ServiceContract>? = null
}