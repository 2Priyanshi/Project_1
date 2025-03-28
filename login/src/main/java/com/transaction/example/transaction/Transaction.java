package com.transaction.example.transaction;

import com.login.example.login.entity.Registration;
import com.trading.example.wallet.Wallet;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private Registration user;

    @ManyToOne
    @JoinColumn(name="wallet_id", nullable = false)
    private Wallet wallet;

    private String stockSymbol;

    @Enumerated(EnumType.STRING)
    private OrderType orderType;

    private int quantity;
    private double price;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount;

    @Column(name = "profit_loss_value")
    private double profitLossValue;

    @Column(name = "profit_loss_status")
    private String profitLossStatus;

    private LocalDateTime transactionDate;

    public Transaction(Registration user, Wallet wallet, String stockSymbol, OrderType orderType, int quantity, double price) {
        this.user = user;
        this.wallet = wallet;
        this.stockSymbol = stockSymbol;
        this.orderType = orderType;
        this.quantity = quantity;
        this.price = price;
        this.totalAmount = BigDecimal.valueOf(quantity * price);
        this.transactionDate = LocalDateTime.now();
    }

    public Transaction() {

    }

    public Long getTransactionId() { return transactionId; }
    public Registration getUser() { return user; }
    public Wallet getWallet() { return wallet; }
    public String getStockSymbol() { return stockSymbol; }
    public OrderType getOrderType() { return orderType; }
    public int getQuantity() { return quantity; }
    public double getPrice() { return price; }
    public BigDecimal getTotalAmount() { return totalAmount; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public double getProfitLossValue() { return profitLossValue; }
    public void setProfitLossValue(double profitLossValue) { this.profitLossValue = profitLossValue; }

    public String getProfitLossStatus() { return profitLossStatus; }
    public void setProfitLossStatus(String profitLossStatus) { this.profitLossStatus = profitLossStatus; }
}


