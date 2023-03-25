package com.uims.zm.zonemanager.entity.owner

import jakarta.persistence.*

@Entity
@Table(name = "legal_owner")
class LegalOwner : Owner() {
    @Enumerated(EnumType.STRING)
    @Column(name = "legal_type", nullable = false)
    var legalType: LegalOwnerType = LegalOwnerType.PRIVATE_ENTITY

    @Column(name = "telephone", nullable = true)
    var telephone: String? = null
}