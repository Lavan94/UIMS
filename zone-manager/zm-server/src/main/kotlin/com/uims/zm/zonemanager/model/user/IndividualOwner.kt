package com.uims.zm.zonemanager.model.user

import com.uims.zm.zonemanager.model.user.address.Address
import java.util.*

data class IndividualOwner(
    override val uuid: UUID,
    override val name: String,
    override val email: String,
    override val password: String,
    val address: Address,
    val dateOfBirth: Date
) : Owner