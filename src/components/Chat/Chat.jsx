import React, { useState, useRef, useEffect } from 'react'
import './Chat.css'

export function Chat() {
    const [messages, setMessages] = useState(localStorage.getItem('saved_chat_messages')? 
    JSON.parse(localStorage.getItem('saved_chat_messages')):
        [
        { sender: 'Julia', text: 'Hello, haven\'t heard from you for a long time, how are you?', time: { hour: '9', minutes: '14' } },
        { sender: 'nikki', text: 'Hi, still the same.', time: { hour: '9', minutes: '16' } },
        { sender: 'nikki', text: 'There is less work :), but vacation is still far away :(', time: { hour: '9', minutes: '16' } },
        { sender: 'Julia', text: 'Maybe you want to go for a walk next week?', time: { hour: '9', minutes: '19' } },
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const messagesDivRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('saved_chat_messages', JSON.stringify(messages));
        if (messagesDivRef.current) {
            messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
        }
    }, [messages]);
    
    const getBotResponse = async (message) => {
        const messagesContext = messages.map(({sender, text})=> ({role: sender==='Julia'?'assistant':'user', content: text}));
        try {
            const response = await fetch('https://api.ai21.com/studio/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer mHwD5L9L44BjTGOS1rbFPvovTVI2qIvC`,
                },
                body: JSON.stringify({
                    model: 'jamba-1.5-large',
                    messages: [...messagesContext, { role: 'user', content: message }]
                }),
            });
            const data = await response.json();

            const sendDate = new Date();
            const sendHour = String(sendDate.getHours()).padStart(2, '0');
            const sendMinutes = String(sendDate.getMinutes()).padStart(2, '0')
            return {text: data.choices[0].message.content, time:{hour: sendHour, minutes: sendMinutes}}

        } catch (error) {
            console.error('Ошибка при запросе к AI21:', error);
            return 'Извините, произошла ошибка при обработке вашего сообщения.';
        }
    }
    const sendMessage = async () => {
        if (input.trim() === '') return;

        const sendDate = new Date();
        const sendHour = String(sendDate.getHours()).padStart(2, '0');
        const sendMinutes = String(sendDate.getMinutes()).padStart(2, '0')

        const userMessage = { sender: 'nikki', text: input, time: { hour: sendHour, minutes: sendMinutes } };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        setIsTyping(true)
        const botReply = await getBotResponse(input);

        setTimeout(()=>{  
            setMessages(prev => [...prev, { sender: 'Julia', ...botReply }]);
            setIsTyping(false)
        }, 3500)
    };

    return (
        <div className='chat_wrapper'>
            <div className='messages_div'  ref={messagesDivRef}>
                {messages.map((msg, index) =>
                    <div key={index} className={msg.sender === 'nikki' ? 'user_message' : 'bot_message'}>
                        <div className='message'>
                            <p className='sender'>{msg.sender} <span>{msg.time.hour+':'+ msg.time.minutes}</span></p>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                )}
                {isTyping && <div  className='bot_message'>
                        <div className='message'>
                            <p className='typing'></p>
                        </div>
                </div>}
            </div>
            <div className='chat_form'>
                <input className='chat_message_input'
                    type='text'
                    value={input}
                    onChange={(e) => { setInput(e.target.value) }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            sendMessage();
                        }
                    }}
                    placeholder="Tap-tap-tap..." />
                <button className='chat_send_btn' onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}
