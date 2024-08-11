package com.fashionVista.ChatbotService.repository;

import com.fashionVista.ChatbotService.model.ChatMessage;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatbotRepository extends MongoRepository<ChatMessage, String> {
    List<ChatMessage> findByUserId(Long userId);
}
