package com.portfolio.example.portfolio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin(origins = "http://localhost:3000")
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @GetMapping("/{userId}")
    public ResponseEntity<List<Portfolio>> getUserPortfolio(@PathVariable Long userId) {
        List<Portfolio> portfolio = portfolioService.getUserPortfolio(userId);
        return ResponseEntity.ok(portfolio);
    }

    @PutMapping("/{userId}/update-market-price")
    public ResponseEntity<String> updateMarketPrice(@PathVariable Long userId,
                                                    @RequestParam String stockSymbol,
                                                    @RequestParam BigDecimal marketPrice) {
        portfolioService.updateMarketPrice(userId, stockSymbol, marketPrice);
        return ResponseEntity.ok("Market price updated successfully");
    }
}
