package com.uims.zm.zonemanager.security.controller;

import com.uims.zm.zonemanager.owner.entity.Owner;

public class JwtResponse {
    private Owner owner;
    private String jwtToken;

    public JwtResponse(Owner owner, String jwtToken) {
        this.owner = owner;
        this.jwtToken = jwtToken;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
