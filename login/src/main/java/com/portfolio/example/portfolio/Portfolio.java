package com.portfolio.example.portfolio;

import com.login.example.login.entity.Registration;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table
public class Portfolio {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long portfolioId;

    @ManyToOne
    @JoinColumn(name="user_id",referencedColumnName = "id",nullable = false)
    private Registration user;

    private String stockSymbol;
    private int quantity;
    private BigDecimal avgPrice;
    private BigDecimal totalValue;
    private BigDecimal marketPrice;

    @Enumerated(EnumType.STRING)
    private ProfitLossStatus profitLossStatus;

    public Long getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(Long portfolioId) {
        this.portfolioId = portfolioId;
    }

    public Registration getUser() {
        return user;
    }

    public void setUser(Registration user) {
        this.user = user;
    }

    public String getStockSymbol() {
        return stockSymbol;
    }

    public void setStockSymbol(String stockSymbol) {
        this.stockSymbol = stockSymbol;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public BigDecimal getMarketPrice() {
        return marketPrice;
    }

    public void setMarketPrice(BigDecimal marketPrice) {
        this.marketPrice = marketPrice;
    }

    public ProfitLossStatus getProfitLossStatus() {
        return profitLossStatus;
    }

    public void setProfitLossStatus(ProfitLossStatus profitLossStatus) {
        this.profitLossStatus = profitLossStatus;
    }

    public enum ProfitLossStatus{
        PROFIT, LOSS, NO_CHANGE, PENDING
    }

    public Portfolio() {}
    public Portfolio(Registration user, String stockSymbol, int quantity, BigDecimal avgPrice) {
        this.user = user;
        this.stockSymbol = stockSymbol;
        this.quantity = quantity;
        this.avgPrice = avgPrice;
        this.totalValue = avgPrice.multiply(BigDecimal.valueOf(quantity));
        this.profitLossStatus = ProfitLossStatus.PENDING;
    }
}

