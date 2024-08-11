package com.fashionVista.ChatbotService.service;

import com.fashionVista.ChatbotService.model.ChatMessage;
import com.fashionVista.ChatbotService.repository.ChatbotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatbotService {

    @Autowired
    private ChatbotRepository chatbotRepository;

    public void saveChat(Long userId, String message, String sender){
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setUserId(userId);
        chatMessage.setMessage(message);
        chatMessage.setSender(sender);
        chatbotRepository.save(chatMessage);
    }
    public List<ChatMessage> getChatHistory(Long userId) {
        return chatbotRepository.findByUserId(userId);
    }
}
