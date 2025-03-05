package com.transaction.example.transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping("/execute")
    public String executeTransaction(@RequestBody Transaction transaction) {
        return transactionService.executeTransaction(transaction);
    }

    @GetMapping("/{userId}")
    public List<Transaction> getUserTransactions(@PathVariable Long userId) {
        return transactionService.getUserTransactions(userId);
    }
}
