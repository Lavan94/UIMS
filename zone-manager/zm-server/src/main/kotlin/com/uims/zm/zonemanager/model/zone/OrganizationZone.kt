package com.uims.zm.zonemanager.model.zone

import com.uims.zm.zonemanager.model.user.LegalOwner
import java.util.*

data class OrganizationZone(
    override val uuid: UUID,
    override val name: String,
    override val geoJson: String,
    val legalOwner: LegalOwner,
    val zoneType: OrganizationZoneType,
    val zoneList: List<IZone>
) : IZone
