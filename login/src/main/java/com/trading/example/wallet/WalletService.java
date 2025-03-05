package com.trading.example.wallet;

import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;
    private final RegistrationRepository registrationRepository;

    public WalletService(RegistrationRepository registrationRepository, WalletRepository walletRepository) {
        this.registrationRepository = registrationRepository;
        this.walletRepository = walletRepository;
    }

    public Wallet getWalletByUserId(Long userId) {

        Optional<Registration> user = registrationRepository.findById(userId);
        return user.flatMap(walletRepository::findByUser).orElse(null);
    }

    public Double getBalance(Long userId) {
        Wallet wallet = getWalletByUserId(userId);
        return (wallet != null) ? wallet.getBalance() : 0.0;
    }
}
