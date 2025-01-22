package com.login.example.login.service;


import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private RegistrationRepository registrationRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String registerUser(Registration registration) {
        Optional<Registration> existingUser = registrationRepository.findByEmail(registration.getEmail());
        if (existingUser.isPresent()) {
            return "Email already registered!";
        }
        registration.setPassword(passwordEncoder.encode(registration.getPassword()));
        registrationRepository.save(registration);
        return "Registration successful!";
    }

    public boolean validateLogin(String email, String password) {
        Optional<Registration> user = registrationRepository.findByEmail(email);
        if (user.isPresent()) {
            System.out.println("User found: " + user.get().getEmail());
            return passwordEncoder.matches(password, user.get().getPassword());
        }
        System.out.println("User not found for email: " + email);
        return false;
    }
}
