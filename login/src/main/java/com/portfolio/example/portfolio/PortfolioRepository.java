package com.portfolio.example.portfolio;

import com.login.example.login.entity.Registration;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PortfolioRepository extends JpaRepository<Portfolio,Long> {

    Optional<Portfolio> findByUserAndStockSymbol(Registration user, String stockSymbol);
}
