package com.uims.zm.zonemanager.dto

import com.uims.zm.zonemanager.entity.owner.Address
import java.io.Serializable
import java.util.*

data class AddressDto(
    val id: UUID? = null,
    val street: String = "",
    val number: Int = -1,
    val zip: String = "",
    val city: String = "",
    val county: String = "",
    val country: String = ""
) : Serializable, IDto<Address> {
    constructor(address: Address) : this(
        address.id,
        address.street,
        address.number,
        address.zip,
        address.city,
        address.county,
        address.country
    )

    override fun toEntity(): Address {
        return Address(
            this.id,
            this.street,
            this.number,
            this.zip,
            this.city,
            this.county,
            this.country
        )
    }
}
