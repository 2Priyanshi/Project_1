package com.login.example.login.service;


import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import com.trading.example.wallet.Wallet;
import com.trading.example.wallet.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
public class AuthService {

    private RegistrationRepository registrationRepository;
    private WalletRepository walletRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    public AuthService(RegistrationRepository registrationRepository, WalletRepository walletRepository) {
        this.registrationRepository = registrationRepository;
        this.walletRepository = walletRepository;
    }

    public String registerUser(Registration registration) {
        Optional<Registration> existingUser = registrationRepository.findByEmail(registration.getEmail());
        if (existingUser.isPresent()) {
            return "Email already registered!";
        }
        registration.setPassword(passwordEncoder.encode(registration.getPassword()));
        Registration savedUser = registrationRepository.save(registration);

        Wallet wallet = new Wallet(savedUser);
        walletRepository.save(wallet);

        return "Registration successful!";
    }

    public Registration validateLogin(String email, String password) {
        Optional<Registration> user = registrationRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            System.out.println("User found: " + user.get().getEmail());
            return user.get();
        }
        System.out.println("User not found for email: " + email);
        return null;
    }

}
