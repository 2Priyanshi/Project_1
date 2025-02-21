package com.login.example.login.controller;

import com.login.example.login.entity.Registration;
import com.login.example.login.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Registration registration) {
        String response = authService.registerUser(registration);
        if ("Registration successful!".equals(response)) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Registration loginRequest) {
        Registration user = authService.validateLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            // Return user ID along with success message
            return ResponseEntity.ok("{ \"message\": \"Login successful!\", \"userId\": " + user.getId() + " }");
        }
        return ResponseEntity.status(401).body("{ \"message\": \"Invalid email or password.\" }");
    }
}
