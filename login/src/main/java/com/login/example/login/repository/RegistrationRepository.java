package com.login.example.login.repository;


import com.login.example.login.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RegistrationRepository extends JpaRepository<Registration, Long> {
    Optional<Registration> findByEmail(String email);
}

