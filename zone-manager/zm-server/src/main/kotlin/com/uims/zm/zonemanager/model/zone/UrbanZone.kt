package com.uims.zm.zonemanager.model.zone

import com.uims.zm.zonemanager.model.user.Owner
import java.util.*

data class UrbanZone(
    override val uuid: UUID,
    override val name: String,
    override val geoJson: String,
    val type: UrbanZoneType,
    val owner: Owner
    ) : IZone
