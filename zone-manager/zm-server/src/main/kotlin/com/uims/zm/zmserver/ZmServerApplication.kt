package com.uims.zm.zmserver

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class ZmServerApplication

fun main(args: Array<String>) {
    runApplication<ZmServerApplication>(*args)
}
