package com.trading.example.wallet;

import com.login.example.login.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.login.example.login.repository.RegistrationRepository;
import com.trading.example.wallet.Wallet;

import java.util.Optional;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByUser(Registration user);
}
