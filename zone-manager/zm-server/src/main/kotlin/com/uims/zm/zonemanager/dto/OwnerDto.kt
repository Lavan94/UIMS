package com.uims.zm.zonemanager.dto

import com.uims.zm.zonemanager.entity.owner.Address
import com.uims.zm.zonemanager.entity.owner.Owner
import java.io.Serializable
import java.util.*

data class OwnerDto(
    val id: UUID? = null,
    val name: String = "",
    val password: String = "",
    val email: String = "",
    val address: AddressDto? = null
) : Serializable, IDto<Owner> {
    constructor(owner: Owner) : this(
        owner.id,
        owner.name,
        owner.password,
        owner.email,
        owner.address?.let { AddressDto(it) }
    )

    override fun toEntity(): Owner {
        return Owner(this.id, this.name, this.password, this.email, this.address?.toEntity())
    }

}

