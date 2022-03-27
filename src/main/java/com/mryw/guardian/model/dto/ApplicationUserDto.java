package com.mryw.guardian.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicationUserDto {
    private Long identifier;
    private String name;
    private String surname;
    private LocalDate dateOfBirth;
}
