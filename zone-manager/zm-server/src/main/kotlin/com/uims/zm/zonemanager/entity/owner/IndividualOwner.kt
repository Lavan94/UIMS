package com.uims.zm.zonemanager.entity.owner

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "individual_owner")
class IndividualOwner : Owner() {
    @Temporal(TemporalType.DATE)
    @Column(name = "dob", nullable = true)
    var dateOfBirth: Date? = null;
}