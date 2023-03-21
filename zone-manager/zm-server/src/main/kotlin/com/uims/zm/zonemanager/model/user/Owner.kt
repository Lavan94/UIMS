package com.uims.zm.zonemanager.model.user

import java.util.*

interface Owner {
    val uuid: UUID
    val name: String
    val email: String
    val password: String
}