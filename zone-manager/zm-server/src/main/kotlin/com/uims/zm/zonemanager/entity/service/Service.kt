package com.uims.zm.zonemanager.entity.service

import com.uims.zm.zonemanager.entity.service.provider.ServiceProvider
import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "service")
open class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, insertable = false, updatable = false)
    open var id: UUID? = null

    @Column(name = "currency", nullable = true)
    open var currency: Currency? = null

    @ManyToOne
    @JoinColumn(name = "service_provider_id", referencedColumnName = "id")
    open var serviceProvider: ServiceProvider? = null
}