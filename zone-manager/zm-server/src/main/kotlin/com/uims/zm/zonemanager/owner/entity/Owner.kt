package com.uims.zm.zonemanager.owner.entity

import jakarta.persistence.*
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails
import java.util.*

@Entity
@Table(name = "owner")
 class Owner : UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    open var id: UUID? = null

    @Column(name = "username", nullable = false)
    private var username: String = "Admim - " + UUID.randomUUID()

    @Column(name = "password", nullable = false)
    private var password: String = ""

    @Column(name = "email", nullable = false)
    open var email: String = ""

    @Column(name = "phone", nullable = false)
    open var phone: String = ""

    @Enumerated(EnumType.STRING)
    @Column(name = "role", nullable = false)
    open var role: OwnerRole = OwnerRole.OWNER

    override fun getAuthorities(): MutableCollection<out GrantedAuthority> {
        return mutableListOf(SimpleGrantedAuthority(this.role.toString()));
    }

    override fun getPassword(): String {
        return this.password
    }

    override fun getUsername(): String {
        return this.username
    }

    override fun isAccountNonExpired(): Boolean {
        return true;
    }

    override fun isAccountNonLocked(): Boolean {
        return true;
    }

    override fun isCredentialsNonExpired(): Boolean {
        return true;
    }

    override fun isEnabled(): Boolean {
        return true;
    }

    fun setEncodedPassword(encodedPassword: String){
        this.password = encodedPassword;
    }
}