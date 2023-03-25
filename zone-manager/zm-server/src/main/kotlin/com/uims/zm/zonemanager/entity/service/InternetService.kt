package com.uims.zm.zonemanager.entity.service

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Table

@Entity
@Table(name = "internet_service")
open class InternetService : Service() {
    @Column(name = "bandwidth_unit", nullable = true)
    var bandwidthUnit: String? = null

    @Column(name = "download_bandwidth", nullable = false)
    var downloadBandwidth: Double = 0.0

    @Column(name = "upload_bandwidth", nullable = false)
    var uploadBandwidth: Double = 0.0
}