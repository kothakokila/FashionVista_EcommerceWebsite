package com.fashionVista.UserService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Value("${spring.mail.username}")
    private String fromEmail;

    public void sendEmail(String to, String firstName) {
        String subject = "Welcome to FashionVista";
        String body = String.format(
                "Dear %s,\n\nThank you for registering with FashionVista!\nEnjoy your shopping.\n\nRegards,\nFashionVista Team",
                firstName
        );

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail);
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendConfirmationCodeEmail(String to, String firstname, String confirmationCode) {
        String subject = "Password Reset Confirmation Code";
        String body = String.format("Dear %s,\n\nYour confirmation code is: %s. \n\nRegards,\nFashionVista Team", firstname, confirmationCode);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    public void sendPasswordResetSuccessful(String to, String firstname) {
        String subject = "Password Reset Confirmation Code";
        String body = String.format("Dear %s,\n\nYour password has been reset successfully. \n\nRegards,\nFashionVista Team", firstname);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}


