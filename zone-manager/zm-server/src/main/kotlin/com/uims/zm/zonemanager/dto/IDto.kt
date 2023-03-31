package com.uims.zm.zonemanager.dto

interface IDto<E> {
    fun toEntity(): E
}