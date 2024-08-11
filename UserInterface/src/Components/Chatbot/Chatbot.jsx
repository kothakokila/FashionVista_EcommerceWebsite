import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './chatbot.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faPaperPlane} from '@fortawesome/free-solid-svg-icons';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [isMinimized, setIsMinimized] = useState(true);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const userId = useSelector(state => state.auth.user?.id);

    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (userId && token) {
                try {
                    console.log('Fetching chat history...');
                    const response = await axios.get(`http://localhost:8080/chatbot/chat-history?userId=${userId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMessages(response.data);
                } catch (error) {
                    console.error('Failed to fetch chat history:', error);
                }
            } else {
                console.warn('User ID or Token is missing.');
            }
        };

        fetchChatHistory();
    }, [userId, token]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (inputMessage.trim() !== '') {
            const newMessages = [...messages, { sender: 'user', message: inputMessage }];
            setMessages(newMessages);

            try {
                const response = await axios.post("http://localhost:8080/chatbot/send-message", {
                    userId:userId,
                    message: inputMessage,
                }, {
                    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
                });
                const botResponse = response.data.message;
                setMessages([...newMessages, { sender: 'bot', message: botResponse }]);
            } catch (error) {
                console.log("Failed to send message: ", error);
                setMessages([...newMessages, { sender: 'bot', message: 'Sorry! Something went wrong.' }]);
            }

            setInputMessage('');
        }
    };

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized);
    };

    return (
        <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
            <div className="chatbot-header">
                <span>Chat with Us!</span>
                <button onClick={toggleMinimize} className="minimize-button">
                    <FontAwesomeIcon icon={isMinimized ? faPlus : faMinus} />
                </button>
            </div>
            {!isMinimized && (
                <>
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                {msg.message}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Type your message..."
                        />
                        <button onClick={sendMessage}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Chatbot;
