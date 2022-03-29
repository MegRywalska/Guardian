package com.mryw.guardian.controller;

import com.mryw.guardian.model.dto.ApplicationUserDto;
import com.mryw.guardian.service.UsersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UsersService usersService;

    @GetMapping
    public List<ApplicationUserDto> get(){
        return usersService.getAll();
    }

}
