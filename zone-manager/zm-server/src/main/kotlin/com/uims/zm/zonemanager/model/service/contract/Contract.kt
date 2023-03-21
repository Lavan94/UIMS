package com.uims.zm.zonemanager.model.service.contract

import com.uims.zm.zonemanager.model.zone.IZone
import java.io.File
import java.util.*

data class Contract(
    val uuid: UUID,
    val status: ContractStatus,
    val files: List<File>,
    val beginDate: Date,
    val endDate: Date,
    val zone: IZone,
    ) {}
