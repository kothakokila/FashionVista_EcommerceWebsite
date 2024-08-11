package com.fashionVista.ChatbotService.controller;

//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.apache.http.client.methods.CloseableHttpResponse;
//import org.apache.http.client.methods.HttpPost;
//import org.apache.http.entity.StringEntity;
//import org.apache.http.impl.client.CloseableHttpClient;
//import org.apache.http.impl.client.HttpClients;
//import org.apache.http.util.EntityUtils;
//import com.fashionVista.CartService.client.OrderServiceClient;
import com.fashionVista.ChatbotService.model.ChatMessage;
import com.fashionVista.ChatbotService.service.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/chatbot")
public class ChatbotController {

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Autowired
    private ChatbotService chatbotService;

    @PostMapping("/send-message")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody Map<String, Object> payload) {
        long userId = Long.parseLong(payload.get("userId").toString());
        String userMessage = (String) payload.get("message");
        String botMessage = generateResponse(userMessage);
        // Save user message
        chatbotService.saveChat(userId, userMessage, "user");

        // Save bot response
        chatbotService.saveChat(userId, botMessage, "bot");

//        try {
//            botMessage = getBotResponse(userMessage);
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//        }

        Map<String, String> response = new HashMap<>();
        response.put("message", botMessage);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/chat-history")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ChatMessage>> getChatHistory(@RequestParam long userId) {
        List<ChatMessage> chatHistory = chatbotService.getChatHistory(userId);
        return ResponseEntity.ok(chatHistory);
    }



//    private String getBotResponse(String userMessage) throws IOException {
//        String apiUrl = "https://api.openai.com/v1/chat/completions";
//
//        try (CloseableHttpClient client = HttpClients.createDefault()) {
//            HttpPost httpPost = new HttpPost(apiUrl);
//            httpPost.setHeader("Content-Type", "application/json");
//            httpPost.setHeader("Authorization", "Bearer " + openaiApiKey); // OpenAI API Token
//
//            String json = "{ " +
//                    "\"model\": \"gpt-3.5-turbo\", " +
//                    "\"messages\": [{" +
//                    "\"role\": \"user\", " +
//                    "\"content\": \"" + userMessage + "\"" +
//                    "}]," +
//                    "\"max_tokens\": 150" +
//                    "}";
//            StringEntity entity = new StringEntity(json);
//            httpPost.setEntity(entity);
//            try (CloseableHttpResponse response = client.execute(httpPost)) {
//                String result = EntityUtils.toString(response.getEntity());
//                System.out.println("Response: " + result);
//                if (response.getStatusLine().getStatusCode() == 200) {
//                    return extractResponse(result);
//                } else {
//                    System.err.println("Error Response: " + result);
//                    return "I'm having trouble processing your request right now.";
//                }
//            }
//        }
//    }
//
//    private String extractResponse(String json) throws IOException {
//        ObjectMapper mapper = new ObjectMapper();
//        JsonNode root = mapper.readTree(json);
//        JsonNode choices = root.path("choices");
//
//        if (choices.isArray() && choices.size() > 0) {
//            JsonNode firstChoice = choices.get(0);
//            return firstChoice.path("text").asText().trim();
//        } else {
//            return "I'm sorry, I didn't understand that. Could you please rephrase?";
//        }
//    }


    private String generateResponse(String userMessage){
        String message = userMessage.toLowerCase();

        if (message.contains("hello") || message.contains("hi")) {
            return "Hello! How can I assist you today?";
        } else if (message.contains("cart")) {
            return "You can view your cart items by clicking on the cart icon in the top right corner of the page.";
        } else if (message.contains("wishlist")) {
            return "You can access your wishlist items by clicking on the wishlist icon next to your profile.";
        } else if (message.contains("help")) {
            return "I'm here to help! You can ask me about your cart, wishlist, or say 'hello' to start.";
        } else if (message.contains("checkout")) {
            return "To proceed to checkout, click on the cart icon and select 'Checkout'.";
        } else if (message.contains("order")) {
            return "To check your order status, go to your profile and select 'Order History'.";
        } else if (message.contains("product")) {
            return "You can view product options by different categories we have like Mens, Womens, Kids, Beauty, Accessories, etc.,";
        } else if (message.contains("thank")) {
            return "Great assisting you. Happy Shopping!";
        } else if (message.contains("thank") && message.contains("help")) {
            return "I am always here to help you out. No problem";
        } else {
            return "I'm sorry, I didn't understand that. Could you please rephrase?";
        }
    }

}
