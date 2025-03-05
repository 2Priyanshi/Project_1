package com.trading.example.wallet;

import com.login.example.login.entity.Registration;
import jakarta.persistence.*;

@Entity
public class Wallet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long walletId;

    @OneToOne
    @JoinColumn(name="user_id",nullable = false)
    private Registration user;

    private double balance=999999.00;

    public Wallet() {}

    public Wallet(Registration user){
        this.user=user;
        this.balance=999999.00;
    }

    public long getWalletId() {
        return walletId;
    }

    public void setWalletId(long walletId) {
        this.walletId = walletId;
    }

    public Registration getUser() {
        return user;
    }

    public void setRegistration(Registration user) {
        this.user = user;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double balance) {
        this.balance = balance;
    }


}
