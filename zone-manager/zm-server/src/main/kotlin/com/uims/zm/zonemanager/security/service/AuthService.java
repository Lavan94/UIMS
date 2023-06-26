package com.uims.zm.zonemanager.security.service;

import com.uims.zm.zonemanager.owner.entity.Owner;
import com.uims.zm.zonemanager.owner.entity.OwnerRole;
import com.uims.zm.zonemanager.owner.service.OwnerService;
import lombok.AllArgsConstructor;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {
    private final OwnerService ownerService;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Nullable
    public AuthenticationResponse login(@NotNull AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        var user = ownerService.getOwnerByUsername(request.getUsername());
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder().token(jwtToken).build();
    }

    @Nullable
    public AuthenticationResponse register(@NotNull RegisterRequest request) {
        var user = new Owner();
        user.setEncodedPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(OwnerRole.ADMINISTRATOR);
        ownerService.addOwner(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }
}
