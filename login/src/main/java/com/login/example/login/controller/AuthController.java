package com.login.example.login.controller;

import com.login.example.login.entity.Registration;
import com.login.example.login.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@Valid @RequestBody Registration registration, BindingResult result) {
        if (result.hasErrors()) {
            StringBuilder errors = new StringBuilder();
            result.getFieldErrors().forEach(error -> errors.append(error.getDefaultMessage()).append("\n"));

            return ResponseEntity.badRequest().body(Map.of("message", errors.toString().trim()));
        }

        String response = authService.registerUser(registration);
        return response.equals("Registration successful!") ?
                ResponseEntity.ok(Map.of("message", response)) :
                ResponseEntity.badRequest().body(Map.of("message", response));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@Valid @RequestBody Registration loginRequest, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().body(Map.of("message", result.getFieldError().getDefaultMessage()));
        }

        Registration user = authService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(Map.of("message", "Login successful!", "userId", String.valueOf(user.getId())));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password."));
    }
}

