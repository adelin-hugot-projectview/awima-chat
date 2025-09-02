# 🤖 Thierry - Chatbot de Prise de RDV

Assistant conversationnel pour la prise de rendez-vous avec Awima.

## 📁 Structure du Projet

### Partie 1 - Code Client (à intégrer sur votre site)
- **`chatbot-widget.js`** - Widget JavaScript autonome à intégrer sur n'importe quel site web

### Partie 2 - Code Serveur (hébergé sur GitHub Pages)
- **`webhook.html`** - Gestionnaire de webhook pour GitHub Pages
- **`claude.html`** - Fichier HTML original (référence)

## 🚀 Installation

### Méthode 1 : Intégration Simple
Ajoutez cette ligne dans votre site web :
```html
<script src="https://votre-github-pages.github.io/awima-chat/chatbot-widget.js"></script>
```

### Méthode 2 : Intégration Personnalisée
1. Téléchargez `chatbot-widget.js`
2. Modifiez la configuration au début du fichier :
```javascript
const CHATBOT_CONFIG = {
    webhookUrl: 'https://votre-github-pages.github.io/awima-chat/webhook.html',
    botName: 'Thierry',
    botTitle: 'Assistant de planification RDV',
    welcomeMessage: 'Votre message personnalisé...',
    position: 'bottom-right'
};
```
3. Intégrez le fichier sur votre site

## ⚙️ Configuration

### Configuration du Widget (chatbot-widget.js)
```javascript
const CHATBOT_CONFIG = {
    webhookUrl: 'URL_DE_VOTRE_WEBHOOK',     // URL du webhook
    botName: 'Thierry',                      // Nom du bot
    botTitle: 'Assistant RDV',               // Titre du bot  
    welcomeMessage: 'Message de bienvenue',  // Message initial
    position: 'bottom-right'                 // Position du widget
};
```

### Configuration du Webhook (webhook.html)
```javascript
const WEBHOOK_CONFIG = {
    n8nWebhookUrl: 'https://n8n.srv800894.hstgr.cloud/webhook/awima-chat',
    allowedOrigins: ['*'],  // Domaines autorisés
    corsEnabled: true
};
```

## 🌐 Déploiement sur GitHub Pages

1. **Créer un repo GitHub** pour la partie serveur
2. **Activer GitHub Pages** dans les paramètres du repo
3. **Upload les fichiers** :
   - `webhook.html`
   - `index.html` (optionnel, redirection vers webhook.html)
4. **Configurer l'URL** dans le widget client

### Structure recommandée du repo GitHub :
```
awima-chat/
├── webhook.html          # Gestionnaire principal
├── index.html           # Page d'accueil (optionnel)
├── README.md            # Documentation
└── chatbot-widget.js    # Widget (pour distribution)
```

## 🧪 Test

### Test du Webhook
Accédez à : `https://votre-github-pages.github.io/awima-chat/webhook.html?test=true`

### Test du Widget
Créez un fichier HTML de test :
```html
<!DOCTYPE html>
<html>
<head>
    <title>Test Thierry</title>
</head>
<body>
    <h1>Site de Test</h1>
    <script src="https://votre-github-pages.github.io/awima-chat/chatbot-widget.js"></script>
</body>
</html>
```

## 🔧 Personnalisation

### Styles CSS
Le widget utilise des classes préfixées `thierry-` pour éviter les conflits :
- `.thierry-chat-widget` - Container principal
- `.thierry-chat-header` - En-tête
- `.thierry-message` - Bulles de message
- `.thierry-bot-avatar` - Avatar du bot

### Messages de Fallback
Le système inclut des réponses de fallback si N8N n'est pas disponible.

## 📱 Responsive

Le widget s'adapte automatiquement :
- **Desktop** : 380x600px en bas à droite
- **Mobile** : Plein écran avec marges

## 🔒 Sécurité

- **CORS configuré** pour les domaines autorisés
- **Validation des origines** pour les messages postMessage
- **Échappement HTML** pour éviter les injections XSS
- **Rate limiting** (à implémenter côté N8N)

## 🐛 Debug

### Console du navigateur
Le widget et le webhook logguent les interactions :
```javascript
console.log('Message reçu:', payload);
console.error('Erreur:', error);
```

### Paramètres de debug
- `?test=true` - Affiche l'interface de test
- `?debug=true` - Active les logs verbeux (à implémenter)

## 🚨 Limitations de GitHub Pages

GitHub Pages ne peut pas traiter les requêtes POST directement. Le système utilise :
1. **PostMessage** pour la communication cross-origin
2. **Requêtes GET** avec paramètres pour les tests
3. **Proxy vers N8N** pour le traitement réel

## 📞 Support

Pour les questions techniques ou les problèmes :
1. Vérifiez la configuration des URLs
2. Testez le webhook séparément
3. Vérifiez la console pour les erreurs
4. Consultez les logs N8N

---

*Développé pour Awima - Assistant RDV intelligent* 🤖