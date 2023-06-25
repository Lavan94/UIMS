package com.uims.zm.zonemanager.owner.entity

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "owner")
open class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "username", nullable = false)
    open var username: String = ""

    @Column(name = "password", nullable = false)
    open var password: String = ""

    @Column(name = "email", nullable = false)
    open var email: String = ""

    @Column(name = "phone", nullable = false)
    open var phone: String = ""

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    open var role: OwnerRole = OwnerRole.OWNER
}