package com.mryw.guardian.model.mapper;

import com.mryw.guardian.model.ApplicationUser;
import com.mryw.guardian.model.dto.ApplicationUserDto;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface ApplicationUserMapper {

    @Mappings({
            @Mapping(target = "identifier", source = "id"),
            @Mapping(target = "name", source = "firstName"),
            @Mapping(target = "surname", source = "lastName"),
            @Mapping(target = "dateOfBirth", source = "dateOfBirth"),
    })
    ApplicationUserDto userToDto(ApplicationUser entity);

}
