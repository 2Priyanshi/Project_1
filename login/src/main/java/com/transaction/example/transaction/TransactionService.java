package com.transaction.example.transaction;

import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import com.trading.example.wallet.Wallet;
import com.trading.example.wallet.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    public Transaction createTransaction(Long userId, String stockSymbol, int quantity, double price, OrderType orderType) {
        Registration user = registrationRepository.findById(userId).orElse(null);
        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));


        if (user == null || wallet == null) return null;

        BigDecimal totalAmount = BigDecimal.valueOf(quantity * price);
        if (orderType == OrderType.BUY && wallet.getBalance() < totalAmount.doubleValue()) {
            throw new RuntimeException("Insufficient balance");
        }

        if (orderType == OrderType.BUY) {
            wallet.setBalance(wallet.getBalance() - totalAmount.doubleValue());
        } else {
            wallet.setBalance(wallet.getBalance() + totalAmount.doubleValue());
        }

        walletRepository.save(wallet);

        Transaction transaction = new Transaction(user, wallet, stockSymbol, orderType, quantity, price);
        return transactionRepository.save(transaction);
    }

    public List<Transaction> getTransactions(Long userId) {
        Optional<Registration> userOpt = registrationRepository.findById(userId);
        if (userOpt.isEmpty()) return List.of();

        Optional<Wallet> walletOpt = walletRepository.findByUser(userOpt.get());
        return walletOpt.map(transactionRepository::findByWallet).orElse(List.of());
    }

}



