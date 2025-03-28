package com.portfolio.example.portfolio;

import com.login.example.login.entity.Registration;
import com.login.example.login.repository.RegistrationRepository;
import com.transaction.example.transaction.OrderType;
import com.transaction.example.transaction.Transaction;
import com.transaction.example.transaction.TransactionRepository;
import jakarta.transaction.Transactional;
import com.portfolio.example.portfolio.Portfolio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class PortfolioService {
    @Autowired
    private PortfolioRepository portfolioRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private RegistrationRepository registrationRepository;

    public List<Portfolio> getUserPortfolio(Long userId) {
        return portfolioRepository.findAll()
                .stream()
                .filter(p -> p.getUser().getId().equals(userId))
                .toList();
    }

    @Transactional
    public void updateMarketPrice(Long userId, String stockSymbol, BigDecimal marketPrice) {
        Optional<Portfolio> portfolioOpt = portfolioRepository.findByUserAndStockSymbol(
                registrationRepository.findById(userId).orElseThrow(), stockSymbol);

        if (marketPrice == null) {
            throw new IllegalArgumentException("Market price cannot be null");
        }

        System.out.println("Updating market price for User ID: " + userId + ", Stock: " + stockSymbol + ", New Price: " + marketPrice);
        if (portfolioOpt.isPresent()) {
            Portfolio portfolio = portfolioOpt.get();
            portfolio.setMarketPrice(marketPrice);

            // ✅ Calculate Profit or Loss
            BigDecimal totalCost = portfolio.getAvgPrice().multiply(BigDecimal.valueOf(portfolio.getQuantity()));
            BigDecimal currentValue = marketPrice.multiply(BigDecimal.valueOf(portfolio.getQuantity()));
            BigDecimal profitLossValue = currentValue.subtract(totalCost);

            portfolio.setProfitLossValue(profitLossValue);

            if (currentValue.compareTo(totalCost) > 0) {
                portfolio.setProfitLossStatus(Portfolio.ProfitLossStatus.Profit);
            } else if (currentValue.compareTo(totalCost) < 0) {
                portfolio.setProfitLossStatus(Portfolio.ProfitLossStatus.Loss);
            } else {
                portfolio.setProfitLossStatus(Portfolio.ProfitLossStatus.No_Change);
            }


            portfolioRepository.save(portfolio);
        } else {
            throw new RuntimeException("Stock not found in portfolio.");
        }
    }



    @Transactional
    public void updatePortfolio(Transaction transaction) {
        Registration user = transaction.getUser();
        String stockSymbol = transaction.getStockSymbol();
        int quantity = transaction.getQuantity();
        BigDecimal price = BigDecimal.valueOf(transaction.getPrice());

        Optional<Portfolio> portfolioOpt = portfolioRepository.findByUserAndStockSymbol(user, stockSymbol);
        Portfolio portfolio;

        if (transaction.getOrderType() == OrderType.BUY) {
            if (portfolioOpt.isPresent()) {
                portfolio = portfolioOpt.get();
                int newQuantity = portfolio.getQuantity() + quantity;
                BigDecimal newTotalValue = portfolio.getTotalValue().add(price.multiply(BigDecimal.valueOf(quantity)));
                BigDecimal newAvgPrice = newTotalValue.divide(BigDecimal.valueOf(newQuantity), BigDecimal.ROUND_HALF_UP);

                portfolio.setQuantity(newQuantity);
                portfolio.setAvgPrice(newAvgPrice);
                portfolio.setTotalValue(newTotalValue);
            } else {
                portfolio = new Portfolio(user, stockSymbol, quantity, price);
            }
        } else { // SELL
            if (portfolioOpt.isPresent()) {
                portfolio = portfolioOpt.get();
                int newQuantity = portfolio.getQuantity() - quantity;

                if (newQuantity <= 0) {
                    portfolioRepository.delete(portfolio);
                    return;
                }

                BigDecimal newTotalValue = portfolio.getAvgPrice().multiply(BigDecimal.valueOf(newQuantity));
                portfolio.setQuantity(newQuantity);
                portfolio.setTotalValue(newTotalValue);
            } else {
                throw new RuntimeException("Stock not found in portfolio for user.");
            }
        }

        portfolioRepository.save(portfolio);
    }

}
