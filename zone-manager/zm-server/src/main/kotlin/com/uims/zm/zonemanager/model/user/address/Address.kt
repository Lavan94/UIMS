package com.uims.zm.zonemanager.model.user.address

data class Address(
    val street: String,
    val number: Int,
    val zip: String,
    val city: String,
    val county: String,
    val country: String
)