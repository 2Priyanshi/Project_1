package com.transaction.example.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @PostMapping("/buy")
    public ResponseEntity<Transaction> buyStock(@RequestParam Long userId,
                                                @RequestParam String stockSymbol,
                                                @RequestParam int quantity,
                                                @RequestParam double price) {
        return ResponseEntity.ok(transactionService.createTransaction(userId, stockSymbol, quantity, price, OrderType.BUY));
    }

    @PostMapping("/sell")
    public ResponseEntity<Transaction> sellStock(@RequestParam Long userId,
                                                 @RequestParam String stockSymbol,
                                                 @RequestParam int quantity,
                                                 @RequestParam double price) {
        return ResponseEntity.ok(transactionService.createTransaction(userId, stockSymbol, quantity, price, OrderType.SELL));
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Transaction>> getTransactions(@PathVariable Long userId) {
        return ResponseEntity.ok(transactionService.getTransactions(userId));
    }
}