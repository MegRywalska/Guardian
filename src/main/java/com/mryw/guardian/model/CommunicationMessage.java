package com.mryw.guardian.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CommunicationMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;
    private LocalDateTime sendTime;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private ApplicationUser sender;

    @ManyToOne
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private ApplicationUser receiver;
}