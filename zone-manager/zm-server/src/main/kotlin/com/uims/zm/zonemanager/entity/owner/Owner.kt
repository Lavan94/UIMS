package com.uims.zm.zonemanager.entity.owner

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "owner")
open class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "name", nullable = false)
    var name: String = ""

    @Column(name = "password", nullable = false)
    var password: String = ""

    @Column(name = "email", nullable = false)
    var email: String = "";

    @MapsId
    @ManyToOne
    @JoinColumn(name = "address_id")
    var address: Address? = null;
}