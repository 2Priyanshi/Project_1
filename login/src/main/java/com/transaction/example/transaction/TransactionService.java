package com.transaction.example.transaction;

import com.login.example.login.entity.Registration;
import com.trading.example.wallet.Wallet;
import com.trading.example.wallet.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TransactionService {
    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, WalletRepository walletRepository) {
        this.transactionRepository = transactionRepository;
        this.walletRepository = walletRepository;
    }



    @Transactional
    public String executeTransaction(Transaction transaction) {
        Registration user = transaction.getUser();
        if(user == null) {
            throw new RuntimeException("User not found");
        }
        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        double transactionAmount = transaction.getQuantity() * transaction.getPrice();

        if (transaction.getOrderType().name().equals("BUY")) {
            if (wallet.getBalance() < transactionAmount) {
                return "Insufficient balance!";
            }
            wallet.setBalance(wallet.getBalance() - transactionAmount);
        } else {
            wallet.setBalance(wallet.getBalance() + transactionAmount);
        }

        walletRepository.save(wallet);
        transactionRepository.save(transaction);
        return "Transaction successful!";
    }

    public List<Transaction> getUserTransactions(Long userId) {
        return transactionRepository.findByUserId(userId);
    }
}
