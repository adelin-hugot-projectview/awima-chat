# 🧪 Guide de Test Local - Chatbot Thierry

## 📁 Structure du Test

```
test-site/
├── index.html           # Site de démonstration Awima
├── webhook-local.html   # Webhook simulé pour tests
└── README-TEST.md      # Ce guide
```

## 🚀 Comment Tester

### 1. Ouvrir le site de test

**Option A - Serveur local simple :**
```bash
# Dans le dossier test-site
python -m http.server 8000
# Puis ouvrir : http://localhost:8000
```

**Option B - Live Server (VS Code) :**
1. Installer l'extension "Live Server"
2. Clic droit sur `index.html` → "Open with Live Server"

**Option C - Directement dans le navigateur :**
Double-cliquer sur `index.html` (peut avoir des limitations CORS)

### 2. Tester le Chatbot

1. **Le widget apparaît** automatiquement en bas à droite
2. **Cliquez sur le widget** pour commencer à chatter
3. **Testez ces messages** :

#### 🎯 Messages de Test Recommandés

| Message | Réponse Attendue |
|---------|------------------|
| `salut` | Salutation personnalisée |
| `rdv` | Proposition de prise de RDV |
| `coaching` | Infos sur le coaching |
| `horaire` | Créneaux disponibles |
| `prix` | Tarifs des services |

#### 💬 Exemples de Conversations

**Conversation 1 - Prise de RDV :**
```
Vous: "Salut, je veux prendre un rdv"
Thierry: "Parfait ! Pour prendre rendez-vous avec Awima..."
Vous: "coaching"
Thierry: "Super choix ! Le coaching professionnel..."
```

**Conversation 2 - Informations :**
```
Vous: "horaire"
Thierry: "Awima est généralement disponible..."
Vous: "prix"
Thierry: "Les tarifs d'Awima sont..."
```

### 3. Debug et Console

- Ouvrez **F12** → **Console** pour voir les logs
- Recherchez les messages `🤖 Webhook local Thierry`
- Les erreurs s'afficheront également dans la console

## 🔧 Personnalisation

### Modifier les Réponses
Editez `webhook-local.html`, section `this.responses` :

```javascript
this.responses = {
    "votre-mot-cle": "Votre réponse personnalisée",
    // ...
};
```

### Changer l'Apparence
Le CSS du chatbot est dans `../chatbot-widget.js`, section `const css`.

### Configuration du Bot
Dans `index.html`, modifiez :

```javascript
const CHATBOT_CONFIG = {
    webhookUrl: './webhook-local.html',
    botName: 'Thierry',
    botTitle: 'Votre titre',
    welcomeMessage: 'Votre message',
    position: 'bottom-right' // ou bottom-left, top-right, top-left
};
```

## 🎨 Personnaliser le Site de Demo

### Couleurs
Modifiez les gradients dans `index.html` :
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Contenu
Changez le texte dans les sections :
- `.hero-content` - Titre principal
- `.service-card` - Services proposés
- `.about-text` - Description d'Awima
- `.contact-item` - Informations de contact

### Images
Remplacez l'avatar par défaut en modifiant :
```html
<div class="about-avatar">
    <img src="votre-photo.jpg" alt="Awima" style="width:100%; border-radius:50%;">
</div>
```

## ⚠️ Limitations du Test Local

1. **Pas de vraie API** - Réponses prédéfinies seulement
2. **CORS** - Certains navigateurs peuvent bloquer les requêtes locales
3. **Pas de persistance** - Les conversations ne sont pas sauvegardées
4. **Webhook N8N** - Non testé en local (normal)

## 🌐 Passage en Production

Quand vous êtes satisfait des tests :

1. **Remettez l'URL GitHub** dans `chatbot-widget.js` :
```javascript
webhookUrl: 'https://adelin-hugot-projectview.github.io/awima-chat/webhook.html'
```

2. **Intégrez sur votre vrai site** :
```html
<script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget.js"></script>
```

3. **Testez avec le vrai webhook N8N**

## 🐛 Problèmes Courants

### Le chatbot n'apparaît pas
- Vérifiez la console (F12)
- Assurez-vous que les fichiers sont dans les bons dossiers
- Essayez un serveur local au lieu du fichier direct

### Les réponses ne marchent pas
- Vérifiez `webhook-local.html` est accessible
- Regardez les logs dans la console
- Testez d'abord le webhook seul : ouvrez `webhook-local.html`

### Erreurs CORS
- Utilisez un serveur local (python, live-server, etc.)
- Ne pas ouvrir directement le fichier HTML

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez la console navigateur
2. Testez étape par étape (webhook seul, puis intégration)
3. Comparez avec les fichiers d'origine

---

*Bon test ! 🚀*