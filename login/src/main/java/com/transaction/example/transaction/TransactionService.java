package com.transaction.example.transaction;

import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import com.portfolio.example.portfolio.PortfolioService;
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


    @Autowired
    private PortfolioService portfolioService;

    public Transaction createTransaction(Long userId, String stockSymbol, int quantity, double price, OrderType orderType) {
        Registration user = registrationRepository.findById(userId).orElse(null);
        Wallet wallet = walletRepository.findByUser(user)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        if (user == null || wallet == null) return null;

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        if (price <= 0) {
            throw new RuntimeException("Invalid stock price");
        }

        BigDecimal totalAmount = BigDecimal.valueOf(quantity * price);

        if (orderType == OrderType.BUY) {
            if (wallet.getBalance() < totalAmount.doubleValue()) {
                throw new RuntimeException("Insufficient balance");
            }
            wallet.setBalance(wallet.getBalance() - totalAmount.doubleValue());
        } else {
            // **Check if the user owns enough stocks before selling**
            int ownedShares = transactionRepository.getOwnedShares(userId, stockSymbol);
            if (quantity > ownedShares) {
                throw new RuntimeException("Insufficient shares to sell");
            }
            wallet.setBalance(wallet.getBalance() + totalAmount.doubleValue());
        }

        walletRepository.save(wallet);

        Transaction transaction = new Transaction(user, wallet, stockSymbol, orderType, quantity, price);
        updateProfitLoss(transaction);

        Transaction savedTransaction=transactionRepository.save(transaction);


        portfolioService.updatePortfolio(savedTransaction);
        return savedTransaction;

    }

    public List<Transaction> getTransactions(Long userId) {
        Optional<Registration> userOpt = registrationRepository.findById(userId);
        if (userOpt.isEmpty()) return List.of();


        Optional<Wallet> walletOpt = walletRepository.findByUser(userOpt.get());
        return walletOpt.map(transactionRepository::findByWallet).orElse(List.of());
   }

    private void updateProfitLoss(Transaction transaction) {
        if (transaction.getOrderType() == OrderType.SELL) {
            double averagePrice = transactionRepository.getAverageBuyPrice(transaction.getUser().getId(), transaction.getStockSymbol());
            double profitLossValue = (transaction.getPrice() - averagePrice) * transaction.getQuantity();

            transaction.setProfitLossValue(profitLossValue);

            if (profitLossValue > 0) {
                transaction.setProfitLossStatus("Profit");
            } else if (profitLossValue < 0) {
                transaction.setProfitLossStatus("Loss");
            } else {
                transaction.setProfitLossStatus("No Profit No Loss");
            }
        } else {
            transaction.setProfitLossValue(0.0);
            transaction.setProfitLossStatus("Pending");
        }
    }




}



