package com.transaction.example.transaction;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Map;

@Service
public class MarketPriceService {

//  //  private static final String API_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol={symbol}&apikey=D4YFDQCXJY4SW56N";
//    private static final String API_KEY = "D4YFDQCXJY4SW56N "; // Replace with your actual API key
//
//    public BigDecimal getMarketPrice(String stockSymbol) {
//        RestTemplate restTemplate = new RestTemplate();
//     //   Map<String, Object> response = restTemplate.getForObject(API_URL, Map.class, stockSymbol, API_KEY);
//
//        if (response != null && response.containsKey("Global Quote")) {
//            Map<String, String> quoteData = (Map<String, String>) response.get("Global Quote");
//            return new BigDecimal(quoteData.get("05. price"));
//        }
//        throw new RuntimeException("Market price not available for " + stockSymbol);
//    }
}
