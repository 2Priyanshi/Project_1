package com.login.example.login.service;

import com.login.example.login.entity.Login;
import com.login.example.login.entity.Registration;
import com.login.example.login.repository.LoginRepository;
import com.login.example.login.repository.RegistrationRepository;
import com.login.example.login.request.loginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private RegistrationRepository registrationRepo;

    @Autowired
    private LoginRepository loginRepo;

    public Registration registerUser(Registration registration) {
        // Save registration info
        return registrationRepo.save(registration);
    }

    public boolean loginUser(Login loginRequest) {
        return loginRepo.findByEmail(loginRequest.getEmail())  // Use findByEmail instead of findById
                .map(login -> login.getPassword().equals(loginRequest.getPassword()))
                .orElse(false);
    }
}
