(function() {
    'use strict';
    
    // Configuration - Compatible WordPress
    const CHATBOT_CONFIG = {
        webhookUrl: 'https://adelin-hugot-projectview.github.io/awima-chat/webhook.html',
        botName: 'Thierry',
        botTitle: 'Assistant de planification RDV',
        welcomeMessage: 'Salut ! Je t\'aide à réserver un créneau avec Awima. Tu veux qu\'on programme un rendez-vous ?',
        position: 'bottom-right'
    };
    
    console.log('🚀 Thierry WordPress widget loading...');
    
    // CSS avec !important pour éviter les conflits de thème
    const css = `
        .thierry-chat-widget {
            position: fixed !important;
            bottom: 20px !important;
            right: 20px !important;
            width: 380px !important;
            height: 600px !important;
            max-width: calc(100vw - 40px) !important;
            max-height: calc(100vh - 40px) !important;
            background: #ffffff !important;
            border-radius: 20px !important;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2) !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
            transform: translateY(100%) !important;
            opacity: 0 !important;
            animation: slideUpThierry 0.8s ease-out 0.5s forwards !important;
            z-index: 999999 !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
        }

        @keyframes slideUpThierry {
            to {
                transform: translateY(0) !important;
                opacity: 1 !important;
            }
        }

        /* Override thème WordPress/Avada */
        body .thierry-chat-widget {
            right: 20px !important;
            bottom: 20px !important;
            position: fixed !important;
        }

        .thierry-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            padding: 20px !important;
            text-align: center !important;
            position: relative !important;
        }

        .thierry-chat-header h2 {
            font-size: 18px !important;
            font-weight: 600 !important;
            margin: 0 0 4px 0 !important;
        }

        .thierry-chat-header p {
            font-size: 13px !important;
            opacity: 0.9 !important;
            margin: 0 !important;
        }

        .thierry-status-dot {
            position: absolute !important;
            top: 20px !important;
            right: 20px !important;
            width: 10px !important;
            height: 10px !important;
            background: #4ade80 !important;
            border-radius: 50% !important;
            animation: pulseThierry 2s infinite !important;
        }

        @keyframes pulseThierry {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .thierry-chat-messages {
            flex: 1 !important;
            padding: 20px !important;
            overflow-y: auto !important;
            background: #f8fafc !important;
        }

        .thierry-chat-messages::-webkit-scrollbar {
            width: 4px !important;
        }

        .thierry-chat-messages::-webkit-scrollbar-track {
            background: transparent !important;
        }

        .thierry-chat-messages::-webkit-scrollbar-thumb {
            background: #cbd5e1 !important;
            border-radius: 2px !important;
        }

        .thierry-message {
            margin-bottom: 16px !important;
            animation: fadeInUpThierry 0.4s ease-out !important;
        }

        @keyframes fadeInUpThierry {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .thierry-message.bot {
            display: flex !important;
            align-items: flex-start !important;
            gap: 10px !important;
        }

        .thierry-message.user {
            display: flex !important;
            justify-content: flex-end !important;
        }

        .thierry-bot-avatar {
            width: 32px !important;
            height: 32px !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            border-radius: 50% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            color: white !important;
            font-size: 14px !important;
            font-weight: 600 !important;
            flex-shrink: 0 !important;
        }

        .thierry-message-bubble {
            max-width: 280px !important;
            padding: 12px 16px !important;
            border-radius: 18px !important;
            font-size: 14px !important;
            line-height: 1.4 !important;
            word-wrap: break-word !important;
        }

        .thierry-message.bot .thierry-message-bubble {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            color: #334155 !important;
            border-bottom-left-radius: 6px !important;
        }

        .thierry-message.user .thierry-message-bubble {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            color: white !important;
            border-bottom-right-radius: 6px !important;
        }

        .thierry-typing-indicator {
            display: flex !important;
            align-items: flex-start !important;
            gap: 10px !important;
            margin-bottom: 16px !important;
            opacity: 0 !important;
            animation: fadeInUpThierry 0.4s ease-out forwards !important;
        }

        .thierry-typing-dots {
            background: #ffffff !important;
            border: 1px solid #e2e8f0 !important;
            border-radius: 18px !important;
            border-bottom-left-radius: 6px !important;
            padding: 12px 16px !important;
            display: flex !important;
            gap: 4px !important;
        }

        .thierry-dot {
            width: 6px !important;
            height: 6px !important;
            background: #94a3b8 !important;
            border-radius: 50% !important;
            animation: typingDotThierry 1.4s infinite !important;
        }

        .thierry-dot:nth-child(2) { animation-delay: 0.2s !important; }
        .thierry-dot:nth-child(3) { animation-delay: 0.4s !important; }

        @keyframes typingDotThierry {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
        }

        .thierry-chat-input-area {
            padding: 20px !important;
            background: white !important;
            border-top: 1px solid #e2e8f0 !important;
        }

        .thierry-input-container {
            display: flex !important;
            align-items: center !important;
            gap: 10px !important;
            background: #f1f5f9 !important;
            border-radius: 25px !important;
            padding: 4px !important;
            border: 2px solid transparent !important;
            transition: all 0.3s ease !important;
        }

        .thierry-input-container:focus-within {
            border-color: #667eea !important;
            background: white !important;
        }

        .thierry-chat-input {
            flex: 1 !important;
            border: none !important;
            background: transparent !important;
            padding: 12px 16px !important;
            font-size: 14px !important;
            outline: none !important;
            resize: none !important;
            font-family: inherit !important;
        }

        .thierry-send-button {
            width: 40px !important;
            height: 40px !important;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
            border: none !important;
            border-radius: 50% !important;
            color: white !important;
            cursor: pointer !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.3s ease !important;
            flex-shrink: 0 !important;
        }

        .thierry-send-button:hover {
            transform: scale(1.05) !important;
        }

        .thierry-send-button:disabled {
            opacity: 0.5 !important;
            transform: none !important;
            cursor: not-allowed !important;
        }

        .thierry-welcome-message {
            text-align: center !important;
            padding: 20px !important;
            color: #64748b !important;
            font-size: 13px !important;
        }

        .thierry-error-message {
            background: #fee2e2 !important;
            color: #dc2626 !important;
            padding: 12px 16px !important;
            border-radius: 8px !important;
            font-size: 13px !important;
            margin-bottom: 16px !important;
            border: 1px solid #fecaca !important;
        }

        @media (max-width: 480px) {
            .thierry-chat-widget {
                width: calc(100vw - 20px) !important;
                height: calc(100vh - 20px) !important;
                bottom: 10px !important;
                right: 10px !important;
                border-radius: 15px !important;
            }
        }
    `;
    
    // Inject CSS
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    class ThierryChatWidget {
        constructor() {
            this.webhookUrl = CHATBOT_CONFIG.webhookUrl;
            this.isTyping = false;
            this.conversationId = this.generateConversationId();
            
            this.createWidget();
            this.init();
        }
        
        createWidget() {
            // Remove existing widget
            const existing = document.getElementById('thierryChatWidget');
            if (existing) {
                existing.remove();
            }
            
            const widget = document.createElement('div');
            widget.className = 'thierry-chat-widget';
            widget.id = 'thierryChatWidget';
            
            // Force inline styles for WordPress compatibility
            widget.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                width: 380px !important;
                height: 600px !important;
                z-index: 999999 !important;
                max-width: calc(100vw - 40px) !important;
                max-height: calc(100vh - 40px) !important;
            `;
            
            widget.innerHTML = `
                <div class="thierry-chat-header">
                    <div class="thierry-status-dot"></div>
                    <h2>${CHATBOT_CONFIG.botName}</h2>
                    <p>${CHATBOT_CONFIG.botTitle}</p>
                </div>
                
                <div class="thierry-chat-messages" id="thierryMessages">
                    <div class="thierry-welcome-message">
                        <p>👋 Salut ! Je suis ${CHATBOT_CONFIG.botName}, ton assistant pour prendre rendez-vous avec Awima.<br>
                        Comment puis-je t'aider aujourd'hui ?</p>
                    </div>
                </div>
                
                <div class="thierry-chat-input-area">
                    <div class="thierry-input-container">
                        <textarea 
                            id="thierryInput" 
                            class="thierry-chat-input" 
                            placeholder="Tapez votre message..."
                            rows="1"
                        ></textarea>
                        <button id="thierrySendButton" class="thierry-send-button" type="button">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(widget);
            
            this.elements = {
                messages: document.getElementById('thierryMessages'),
                input: document.getElementById('thierryInput'),
                sendButton: document.getElementById('thierrySendButton'),
                widget: document.getElementById('thierryChatWidget')
            };
            
            // Ensure visibility
            setTimeout(() => {
                this.ensureVisibility();
            }, 100);
        }
        
        ensureVisibility() {
            const rect = this.elements.widget.getBoundingClientRect();
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            
            if (rect.right > vw || rect.bottom > vh || rect.left < 0 || rect.top < 0) {
                this.elements.widget.style.right = '10px';
                this.elements.widget.style.bottom = '10px';
                this.elements.widget.style.width = Math.min(380, vw - 40) + 'px';
                this.elements.widget.style.height = Math.min(600, vh - 40) + 'px';
                console.log('📱 Widget repositioned for viewport');
            }
        }
        
        init() {
            this.elements.sendButton.addEventListener('click', () => this.sendMessage());
            this.elements.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            this.elements.input.addEventListener('input', (e) => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
            });
            
            setTimeout(() => {
                this.addBotMessage(CHATBOT_CONFIG.welcomeMessage);
            }, 1200);
            
            console.log('✅ Thierry WordPress widget initialized');
        }
        
        generateConversationId() {
            return 'wp_conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        async sendMessage() {
            const message = this.elements.input.value.trim();
            if (!message || this.isTyping) return;
            
            this.addUserMessage(message);
            this.elements.input.value = '';
            this.elements.input.style.height = 'auto';
            
            this.setInputState(false);
            
            try {
                this.showTypingIndicator();
                
                const response = await this.callWebhook(message);
                
                this.hideTypingIndicator();
                
                if (response && response.output) {
                    this.addBotMessage(response.output);
                } else {
                    this.addBotMessage("Désolé, je n'ai pas pu traiter votre demande. Pouvez-vous réessayer ?");
                }
                
            } catch (error) {
                console.error('Erreur Thierry:', error);
                this.hideTypingIndicator();
                this.showError("Une erreur s'est produite. Veuillez réessayer dans quelques instants.");
            } finally {
                this.setInputState(true);
            }
        }
        
        async callWebhook(message) {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chatInput: message,
                    conversationId: this.conversationId,
                    timestamp: new Date().toISOString(),
                    source: 'wordpress'
                })
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            return await response.json();
        }
        
        addUserMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'thierry-message user';
            messageElement.innerHTML = `
                <div class="thierry-message-bubble">${this.escapeHtml(message)}</div>
            `;
            
            this.elements.messages.appendChild(messageElement);
            this.scrollToBottom();
        }
        
        addBotMessage(message) {
            const messageElement = document.createElement('div');
            messageElement.className = 'thierry-message bot';
            
            const formattedMessage = this.formatBotMessage(message);
            
            messageElement.innerHTML = `
                <div class="thierry-bot-avatar">T</div>
                <div class="thierry-message-bubble">${formattedMessage}</div>
            `;
            
            this.elements.messages.appendChild(messageElement);
            this.scrollToBottom();
        }
        
        formatBotMessage(message) {
            let formatted = this.escapeHtml(message);
            formatted = formatted.replace(/\n/g, '<br>');
            formatted = formatted.replace(/• ([^<\n]+)/g, '<br>• <strong>$1</strong>');
            formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
            return formatted;
        }
        
        showTypingIndicator() {
            this.isTyping = true;
            const typingElement = document.createElement('div');
            typingElement.className = 'thierry-typing-indicator';
            typingElement.id = 'thierryTypingIndicator';
            typingElement.innerHTML = `
                <div class="thierry-bot-avatar">T</div>
                <div class="thierry-typing-dots">
                    <div class="thierry-dot"></div>
                    <div class="thierry-dot"></div>
                    <div class="thierry-dot"></div>
                </div>
            `;
            
            this.elements.messages.appendChild(typingElement);
            this.scrollToBottom();
        }
        
        hideTypingIndicator() {
            this.isTyping = false;
            const typingElement = document.getElementById('thierryTypingIndicator');
            if (typingElement) {
                typingElement.remove();
            }
        }
        
        showError(message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'thierry-error-message';
            errorElement.textContent = message;
            
            this.elements.messages.appendChild(errorElement);
            this.scrollToBottom();
            
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.remove();
                }
            }, 5000);
        }
        
        setInputState(enabled) {
            this.elements.input.disabled = !enabled;
            this.elements.sendButton.disabled = !enabled;
            
            if (enabled) {
                this.elements.input.focus();
            }
        }
        
        scrollToBottom() {
            setTimeout(() => {
                this.elements.messages.scrollTop = this.elements.messages.scrollHeight;
            }, 100);
        }
        
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }
    
    // Auto-initialize with WordPress compatibility
    function initThierryWidget() {
        // Wait for any theme scripts to load
        setTimeout(() => {
            if (document.getElementById('thierryChatWidget')) {
                console.log('⚠️ Thierry widget already exists, removing...');
                document.getElementById('thierryChatWidget').remove();
            }
            
            window.thierryChatWidget = new ThierryChatWidget();
            console.log('🎉 Thierry WordPress widget ready!');
        }, 500);
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initThierryWidget);
    } else {
        initThierryWidget();
    }
    
    // Handle theme changes or dynamic content
    window.addEventListener('resize', () => {
        if (window.thierryChatWidget) {
            window.thierryChatWidget.ensureVisibility();
        }
    });
    
})();