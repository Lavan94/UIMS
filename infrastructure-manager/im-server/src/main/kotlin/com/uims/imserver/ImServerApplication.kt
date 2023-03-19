package com.uims.imserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ImServerApplication

fun main(args: Array<String>) {
    runApplication<ImServerApplication>(*args)
}
