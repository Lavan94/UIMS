package com.uims.zm.zonemanager.model.zone

import java.util.*

interface IZone {
    val uuid: UUID
    val name: String
    val geoJson: String
}
