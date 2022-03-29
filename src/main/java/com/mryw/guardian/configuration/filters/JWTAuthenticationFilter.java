package com.mryw.guardian.configuration.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mryw.guardian.model.ApplicationUser;
import com.mryw.guardian.model.ApplicationUserRole;
import com.mryw.guardian.model.dto.AuthorizationDto;
import com.mryw.guardian.service.ApplicationUserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

@Slf4j
public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;

    private ApplicationUserService appUserService;

    public JWTAuthenticationFilter(AuthenticationManager authenticationManager, ApplicationUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.appUserService = appUserService;
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        log.info("Unsuccessful: " + failed);
        response.setStatus(HttpStatus.FORBIDDEN.value());
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException {
        try {
            AuthorizationDto creds = new ObjectMapper().readValue(req.getInputStream(), AuthorizationDto.class);
            return authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            creds.getUsername(),
                            creds.getPassword(),
                            new ArrayList<>()
                    )
            );
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res,
                                            FilterChain chain, Authentication auth) throws IOException {
        String username = ((ApplicationUser) auth.getPrincipal()).getUsername();

//        this.appUserService.setLastSeen(System.currentTimeMillis(), username);
        StringBuilder stringBuilder = new StringBuilder();
        for (ApplicationUserRole role : appUserService.loadRolesByUsername(username)) {
            stringBuilder.append(role).append(",");
        }
        String rolesString;
        if (stringBuilder.length() >= 1) {
            rolesString = stringBuilder.substring(0, stringBuilder.length() - 1);
        }else{
            rolesString = "";
        }
        log.info("Roles: "+rolesString) ;

        String token = Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME))
                .setIssuer(RequestTranslator.getRemoteIpFrom(req))
                .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET.getBytes())
                .compact();
        res.addHeader(SecurityConstants.HEADER_STRING, SecurityConstants.TOKEN_PREFIX + token);
        res.addHeader(SecurityConstants.EXPIRATION, System.currentTimeMillis() + SecurityConstants.EXPIRATION_TIME + "");
        res.addHeader("Access-Control-Expose-Headers", SecurityConstants.HEADER_STRING + ", " + SecurityConstants.EXPIRATION + ", " + "ROLE");
        res.addHeader("ROLE", rolesString);
    }
}