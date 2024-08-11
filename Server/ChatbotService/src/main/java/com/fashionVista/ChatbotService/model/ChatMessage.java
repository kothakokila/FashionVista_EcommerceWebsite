package com.fashionVista.ChatbotService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "UserChats")
public class ChatMessage {
    @Id
    private String id;
    private Long userId;
    private String message;
    private LocalDateTime timestamp;
    private String sender;

    public ChatMessage(Long userId, String message, LocalDateTime now, String sender) {
    }
}
