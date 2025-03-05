package com.trading.example.wallet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
@CrossOrigin(origins = "http://localhost:3000")
public class WalletController {
    @Autowired
    private WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @GetMapping("/{userId}")
    public Wallet getWallet(@PathVariable Long userId) {
        return walletService.getWalletByUserId(userId);
    }

    @GetMapping("/{userId}/balance")
    public ResponseEntity<Double> getBalance(@PathVariable Long userId) {
        Double balance = walletService.getBalance(userId);
        return ResponseEntity.ok(balance);
    }
}
