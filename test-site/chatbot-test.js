(function() {
    'use strict';
    
    // Configuration pour test local
    const CHATBOT_CONFIG = {
        botName: 'Thierry',
        botTitle: 'Assistant de planification RDV',
        welcomeMessage: 'Salut ! Je suis en mode test local. Je t\'aide à réserver un créneau avec Awima !',
        position: 'bottom-right'
    };
    
    // Réponses de test intégrées
    const TEST_RESPONSES = {
        "salut": "Salut ! 👋 Je suis Thierry, ton assistant pour prendre rendez-vous avec Awima. Comment ça va ?",
        "bonjour": "Bonjour ! Comment puis-je t'aider à organiser un rendez-vous avec Awima aujourd'hui ?",
        "rdv": "Parfait ! Pour prendre rendez-vous avec Awima, j'ai besoin de quelques infos. Quel type de consultation t'intéresse ?",
        "rendez-vous": "Excellent ! Awima propose plusieurs types de consultations :\n• Coaching professionnel\n• Conseil stratégique\n• Consultation personnalisée\n\nLequel t'intéresse ?",
        "coaching": "Super choix ! Le coaching professionnel avec Awima dure généralement 1h. Es-tu disponible cette semaine ou préfères-tu la semaine prochaine ?",
        "conseil": "Parfait ! Pour le conseil stratégique, Awima propose des créneaux de 90 minutes. Quand serais-tu disponible ?",
        "consultation": "Excellente idée ! Pour une consultation personnalisée, nous pouvons prévoir entre 45min et 1h30. Quelle durée préfères-tu ?",
        "horaire": "Awima est généralement disponible :\n• Lundi au vendredi : 9h-18h\n• Samedi matin : 9h-12h\n\nQuel créneau te conviendrait le mieux ?",
        "disponible": "Voici les créneaux disponibles cette semaine :\n• Mardi 14h-15h\n• Mercredi 10h-11h\n• Jeudi 16h-17h\n• Vendredi 9h-10h\n\nLequel te convient ?",
        "prix": "Les tarifs d'Awima sont :\n• Consultation (1h) : 80€\n• Coaching (1h) : 100€\n• Conseil stratégique (90min) : 150€\n\nTous les prix incluent le suivi personnalisé !",
        "tarif": "Les tarifs d'Awima sont :\n• Consultation (1h) : 80€\n• Coaching (1h) : 100€\n• Conseil stratégique (90min) : 150€\n\nTous les prix incluent le suivi personnalisé !"
    };
    
    const DEFAULT_RESPONSE = "Je comprends ! Peux-tu me donner plus de détails ? Je suis là pour t'aider à organiser ton rendez-vous avec Awima. Tu peux me parler de :\n• Le type de consultation qui t'intéresse\n• Tes disponibilités\n• Tes questions sur les services";
    
    // Inject CSS
    const css = `
        .thierry-chat-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 380px;
            height: 600px;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translateY(100%);
            opacity: 0;
            animation: slideUp 0.8s ease-out 0.5s forwards;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @keyframes slideUp {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }

        .thierry-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
        }

        .thierry-chat-header h2 {
            font-size: 18px;
            font-weight: 600;
            margin: 0 0 4px 0;
        }

        .thierry-chat-header p {
            font-size: 13px;
            opacity: 0.9;
            margin: 0;
        }

        .thierry-status-dot {
            position: absolute;
            top: 20px;
            right: 20px;
            width: 10px;
            height: 10px;
            background: #4ade80;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        .thierry-chat-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f8fafc;
        }

        .thierry-chat-messages::-webkit-scrollbar {
            width: 4px;
        }

        .thierry-chat-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .thierry-chat-messages::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 2px;
        }

        .thierry-message {
            margin-bottom: 16px;
            animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
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
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }

        .thierry-message.user {
            display: flex;
            justify-content: flex-end;
        }

        .thierry-bot-avatar {
            width: 32px;
            height: 32px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
        }

        .thierry-message-bubble {
            max-width: 280px;
            padding: 12px 16px;
            border-radius: 18px;
            font-size: 14px;
            line-height: 1.4;
            word-wrap: break-word;
        }

        .thierry-message.bot .thierry-message-bubble {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            color: #334155;
            border-bottom-left-radius: 6px;
        }

        .thierry-message.user .thierry-message-bubble {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-bottom-right-radius: 6px;
        }

        .thierry-typing-indicator {
            display: flex;
            align-items: flex-start;
            gap: 10px;
            margin-bottom: 16px;
            opacity: 0;
            animation: fadeInUp 0.4s ease-out forwards;
        }

        .thierry-typing-dots {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 18px;
            border-bottom-left-radius: 6px;
            padding: 12px 16px;
            display: flex;
            gap: 4px;
        }

        .thierry-dot {
            width: 6px;
            height: 6px;
            background: #94a3b8;
            border-radius: 50%;
            animation: typingDot 1.4s infinite;
        }

        .thierry-dot:nth-child(2) { animation-delay: 0.2s; }
        .thierry-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingDot {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
        }

        .thierry-chat-input-area {
            padding: 20px;
            background: white;
            border-top: 1px solid #e2e8f0;
        }

        .thierry-input-container {
            display: flex;
            align-items: center;
            gap: 10px;
            background: #f1f5f9;
            border-radius: 25px;
            padding: 4px;
            border: 2px solid transparent;
            transition: all 0.3s ease;
        }

        .thierry-input-container:focus-within {
            border-color: #667eea;
            background: white;
        }

        .thierry-chat-input {
            flex: 1;
            border: none;
            background: transparent;
            padding: 12px 16px;
            font-size: 14px;
            outline: none;
            resize: none;
            font-family: inherit;
        }

        .thierry-send-button {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            flex-shrink: 0;
        }

        .thierry-send-button:hover {
            transform: scale(1.05);
        }

        .thierry-send-button:disabled {
            opacity: 0.5;
            transform: none;
            cursor: not-allowed;
        }

        .thierry-welcome-message {
            text-align: center;
            padding: 20px;
            color: #64748b;
            font-size: 13px;
        }

        .thierry-error-message {
            background: #fee2e2;
            color: #dc2626;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            margin-bottom: 16px;
            border: 1px solid #fecaca;
        }

        .thierry-test-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            background: #ff6b6b;
            color: white;
            font-size: 10px;
            padding: 2px 6px;
            border-radius: 10px;
            font-weight: 600;
        }

        @media (max-width: 480px) {
            .thierry-chat-widget {
                width: calc(100vw - 20px);
                height: calc(100vh - 20px);
                bottom: 10px;
                right: 10px;
                border-radius: 15px;
            }
        }
    `;
    
    // Inject CSS into page
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    
    class ThierryChatWidget {
        constructor() {
            this.isTyping = false;
            this.conversationId = this.generateConversationId();
            
            this.createWidget();
            this.init();
        }
        
        createWidget() {
            const widget = document.createElement('div');
            widget.className = 'thierry-chat-widget';
            widget.id = 'thierryChatWidget';
            
            widget.innerHTML = `
                <div class="thierry-chat-header">
                    <div class="thierry-status-dot"></div>
                    <div class="thierry-test-badge">TEST</div>
                    <h2>${CHATBOT_CONFIG.botName}</h2>
                    <p>${CHATBOT_CONFIG.botTitle}</p>
                </div>
                
                <div class="thierry-chat-messages" id="thierryMessages">
                    <div class="thierry-welcome-message">
                        <p>👋 ${CHATBOT_CONFIG.welcomeMessage}</p>
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
                this.addBotMessage("Salut ! Essaye de me dire 'rdv' ou 'horaire' pour tester mes réponses ! 🤖");
            }, 1200);
            
            console.log('🤖 Chatbot Thierry TEST initialisé !');
        }
        
        generateConversationId() {
            return 'test_conv_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
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
                
                // Simuler un délai
                await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));
                
                const response = this.getTestResponse(message);
                
                this.hideTypingIndicator();
                this.addBotMessage(response);
                
            } catch (error) {
                console.error('Erreur:', error);
                this.hideTypingIndicator();
                this.showError("Une erreur s'est produite en mode test.");
            } finally {
                this.setInputState(true);
            }
        }
        
        getTestResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            // Recherche de mots-clés
            for (const [keyword, response] of Object.entries(TEST_RESPONSES)) {
                if (lowerMessage.includes(keyword)) {
                    console.log('✅ Réponse trouvée pour:', keyword);
                    return response;
                }
            }
            
            console.log('🔍 Utilisation de la réponse par défaut');
            return DEFAULT_RESPONSE;
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
    
    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('🚀 Initialisation du chatbot Thierry...');
            window.thierryChatWidget = new ThierryChatWidget();
        });
    } else {
        console.log('🚀 Initialisation immédiate du chatbot Thierry...');
        window.thierryChatWidget = new ThierryChatWidget();
    }
})();