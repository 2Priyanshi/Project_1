package com.transaction.example.transaction;

import com.trading.example.wallet.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction,Long> {
    List<Transaction> findByWallet(Wallet wallet);

    @Query("SELECT COALESCE(SUM(CASE WHEN t.orderType = 'BUY' THEN t.quantity ELSE -t.quantity END), 0) " +
            "FROM Transaction t WHERE t.user.id = :userId AND t.stockSymbol = :stockSymbol")
    int getOwnedShares(@Param("userId") Long userId, @Param("stockSymbol") String stockSymbol);
}
