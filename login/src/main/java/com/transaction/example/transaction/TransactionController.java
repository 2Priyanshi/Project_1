package com.transaction.example.transaction;

import com.opencsv.CSVWriter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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

    @GetMapping("/export/csv")
    public void exportToCSV(@RequestParam Long userId, HttpServletResponse response)throws IOException{
        response.setContentType("text/csv");
        String headerKey="Content-Disposition";
        String headerValue="attachment; filename=transactions.csv";
        response.setHeader(headerKey,headerValue);

        List<Transaction> transactions=transactionService.getTransactions(userId);
        CSVWriter csvWriter=new CSVWriter(response.getWriter());

        String[] header={"Transaction ID","Stock Symbol","Order TYpe","Quantity","Price","Total Amount","Date"};
        csvWriter.writeNext(header);

        for(Transaction transaction:transactions){
            String[] data={
                    String.valueOf(transaction.getTransactionId()),
                    transaction.getStockSymbol(),
                    transaction.getOrderType().name(),
                    String.valueOf(transaction.getQuantity()),
                    String.valueOf(transaction.getPrice()),
                    transaction.getTotalAmount().toString(),
                    transaction.getTransactionDate().toString()
            };
            csvWriter.writeNext(data);
        }
        csvWriter.close();
    }
}