package com.uims.zm.zonemanager.security.service;

import com.uims.zm.zonemanager.owner.entity.Owner;
import com.uims.zm.zonemanager.owner.service.OwnerService;
import com.uims.zm.zonemanager.security.controller.JwtRequest;
import com.uims.zm.zonemanager.security.controller.JwtResponse;
import com.uims.zm.zonemanager.security.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class JwtService implements UserDetailsService {
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private OwnerService ownerService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Owner owner = ownerService.getOwnerByUsername(username);
        if (owner != null) {
            return new User(
                    owner.getUsername(),
                    owner.getPassword(),
                    getAuthorities(owner)
            );
        } else {
            throw new UsernameNotFoundException("Username is not valid");
        }
    }

    public JwtResponse createJwtToken(JwtRequest jwtRequest) throws Exception {
        String username = jwtRequest.getUsername();
        String password = jwtRequest.getPassword();
        authenticate(username, password);

        final UserDetails userDetails = loadUserByUsername(username);

        String newJwtToken = jwtUtil.generateToken(userDetails);

        Owner owner = ownerService.getOwnerByUsername(username);

        return new JwtResponse(owner, newJwtToken);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("User is Disabled");
        } catch (BadCredentialsException e) {
            throw new Exception("Bad credentials from user");
        }
    }

    private Set getAuthorities(Owner owner) {
        Set authorities = new HashSet();
        String roleName = owner.getRole().toString();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + roleName));
        return authorities;
    }
}
