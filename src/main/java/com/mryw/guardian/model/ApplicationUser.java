package com.mryw.guardian.model;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationUser implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;

    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    // Użytkownik ma role: Admin, User, Kid
    @OneToMany(fetch= FetchType.EAGER)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<ApplicationUserRole> roles;

    // Relacja Rodzic ma wiele dzieci
    @ManyToMany
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<ApplicationUser> kids;

    // Dziecko moze wyslac wiele Alert Messages
    @OneToMany
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<AlertMessage> alertMessages;

    // Dziecko moze dzielic sie lokalizacja
    @OneToMany
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<SharedLocation> sharedLocations;

    // to są wiadomości przeze mnie wysłane
    @OneToMany(mappedBy = "sender")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<CommunicationMessage> sendMessages;

    // to są wiadomości przeze mnie odebrane (do mnie wysłane)
    @OneToMany(mappedBy = "receiver")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Set<CommunicationMessage> receivedMessages;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toSet());
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}