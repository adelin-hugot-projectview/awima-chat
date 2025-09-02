# 🤖 Intégration WordPress - Chatbot Thierry

Guide complet pour intégrer le chatbot Thierry sur votre site WordPress.

## 🚀 Méthode 1 : Intégration Simple (Recommandée)

### Option A - Via Avada Options (Thème Avada)

1. **Admin WordPress** → **Avada** → **Options**
2. **Advanced** → **Code Fields (Tracking etc.)**
3. Dans **"Space before </body>"**, ajoutez :
```html
<script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js"></script>
```

### Option B - Via functions.php (Recommandée)

1. **Apparence** → **Éditeur de thème**
2. Sélectionnez **functions.php**
3. **Ajoutez à la fin** :

```php
// Intégration Chatbot Thierry - WordPress optimisé
function add_thierry_chatbot() {
    if (!is_admin()) {
        wp_enqueue_script(
            'thierry-chatbot-wp',
            'https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js',
            array(),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'add_thierry_chatbot');
```

### Option C - Via l'éditeur de thème (Si footer.php existe)

1. **Apparence** → **Éditeur de thème** 
2. Sélectionnez **footer.php**
3. **Ajoutez avant `</body>`** :

```html
<!-- Chatbot Thierry WordPress -->
<script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js"></script>
```

## 🔧 Méthode 2 : Plugin Personnalisé

Créez un plugin WordPress pour une gestion plus avancée :

### Étape 1 - Créer le fichier plugin

Créez : `wp-content/plugins/thierry-chatbot/thierry-chatbot.php`

```php
<?php
/**
 * Plugin Name: Chatbot Thierry
 * Description: Assistant conversationnel pour la prise de RDV avec Awima
 * Version: 1.0.0
 * Author: Awima
 */

// Sécurité - Empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

class ThierryChatbotPlugin {
    
    public function __construct() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'settings_init'));
    }
    
    public function enqueue_scripts() {
        // Ne pas charger dans l'admin
        if (is_admin()) return;
        
        // Vérifier si le chatbot est activé
        if (get_option('thierry_chatbot_enabled', '1') == '1') {
            wp_enqueue_script(
                'thierry-chatbot-wp',
                'https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js',
                array(),
                '1.0.0',
                true
            );
            
            // Configuration personnalisée
            $config = array(
                'botName' => get_option('thierry_bot_name', 'Thierry'),
                'botTitle' => get_option('thierry_bot_title', 'Assistant de planification RDV'),
                'welcomeMessage' => get_option('thierry_welcome_message', 'Salut ! Comment puis-je t\'aider ?'),
                'position' => get_option('thierry_position', 'bottom-right')
            );
            
            wp_localize_script('thierry-chatbot', 'thierryConfig', $config);
        }
    }
    
    public function add_admin_menu() {
        add_options_page(
            'Chatbot Thierry',
            'Chatbot Thierry',
            'manage_options',
            'thierry-chatbot',
            array($this, 'options_page')
        );
    }
    
    public function settings_init() {
        register_setting('thierry_chatbot', 'thierry_chatbot_enabled');
        register_setting('thierry_chatbot', 'thierry_bot_name');
        register_setting('thierry_chatbot', 'thierry_bot_title');
        register_setting('thierry_chatbot', 'thierry_welcome_message');
        register_setting('thierry_chatbot', 'thierry_position');
    }
    
    public function options_page() {
        ?>
        <div class="wrap">
            <h1>Configuration Chatbot Thierry</h1>
            <form action="options.php" method="post">
                <?php
                settings_fields('thierry_chatbot');
                do_settings_sections('thierry_chatbot');
                ?>
                <table class="form-table">
                    <tr>
                        <th scope="row">Activer le chatbot</th>
                        <td>
                            <input type="checkbox" name="thierry_chatbot_enabled" value="1" <?php checked(1, get_option('thierry_chatbot_enabled', '1'), true); ?> />
                            <label>Afficher le chatbot sur le site</label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Nom du bot</th>
                        <td>
                            <input type="text" name="thierry_bot_name" value="<?php echo esc_attr(get_option('thierry_bot_name', 'Thierry')); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Titre du bot</th>
                        <td>
                            <input type="text" name="thierry_bot_title" value="<?php echo esc_attr(get_option('thierry_bot_title', 'Assistant de planification RDV')); ?>" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Message de bienvenue</th>
                        <td>
                            <textarea name="thierry_welcome_message" rows="3" cols="50"><?php echo esc_textarea(get_option('thierry_welcome_message', 'Salut ! Comment puis-je t\'aider ?')); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">Position</th>
                        <td>
                            <select name="thierry_position">
                                <option value="bottom-right" <?php selected(get_option('thierry_position', 'bottom-right'), 'bottom-right'); ?>>Bas Droite</option>
                                <option value="bottom-left" <?php selected(get_option('thierry_position'), 'bottom-left'); ?>>Bas Gauche</option>
                                <option value="top-right" <?php selected(get_option('thierry_position'), 'top-right'); ?>>Haut Droite</option>
                                <option value="top-left" <?php selected(get_option('thierry_position'), 'top-left'); ?>>Haut Gauche</option>
                            </select>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            
            <hr>
            <h2>Test du Chatbot</h2>
            <p>Le chatbot devrait apparaître en bas de cette page si il est activé.</p>
            <p><strong>URL du webhook :</strong> https://adelin-hugot-projectview.github.io/awima-chat/webhook.html</p>
            
            <h3>Intégration manuelle</h3>
            <p>Si vous préférez l'intégration manuelle, ajoutez ce code avant &lt;/body&gt; :</p>
            <pre style="background: #f0f0f0; padding: 15px; border-radius: 5px;">
&lt;script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget.js"&gt;&lt;/script&gt;
            </pre>
        </div>
        <?php
    }
}

new ThierryChatbotPlugin();
?>
```

### Étape 2 - Activer le plugin

1. **Plugins** → **Extensions installées**
2. **Activer** "Chatbot Thierry"
3. **Réglages** → **Chatbot Thierry** pour configurer

## 🎨 Méthode 3 : Constructeur de pages

### Elementor
1. Ajoutez un widget **HTML**
2. Collez le code :
```html
<script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js"></script>
```

### Gutenberg (Éditeur de blocs)
1. Ajoutez un bloc **HTML personnalisé**
2. Collez le même code

### Divi
1. Ajoutez un module **Code**
2. Dans l'onglet **Code**, collez le script

## ⚙️ Personnalisation Avancée

Pour personnaliser le chatbot, modifiez la configuration :

```html
<script>
// Configuration personnalisée
window.thierryCustomConfig = {
    botName: 'Votre Nom',
    botTitle: 'Votre Titre',
    welcomeMessage: 'Votre message personnalisé',
    position: 'bottom-left', // bottom-right, bottom-left, top-right, top-left
    colors: {
        primary: '#667eea',
        secondary: '#764ba2'
    }
};
</script>
<script src="https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget-wordpress.js"></script>
```

## 🔒 Sécurité et Performance

### Chargement conditionnel
Pour ne charger que sur certaines pages :

```php
function add_thierry_chatbot_conditional() {
    // Seulement sur la page d'accueil
    if (is_front_page()) {
        wp_enqueue_script(
            'thierry-chatbot',
            'https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget.js',
            array(),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'add_thierry_chatbot_conditional');
```

### Exclusions
Pour exclure de certaines pages :

```php
function add_thierry_chatbot_exclude() {
    // Pas sur les pages admin, login, etc.
    if (!is_admin() && !is_login()) {
        wp_enqueue_script(
            'thierry-chatbot',
            'https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget.js',
            array(),
            '1.0.0',
            true
        );
    }
}
add_action('wp_enqueue_scripts', 'add_thierry_chatbot_exclude');
```

## 📱 Responsive et Mobile

Le chatbot s'adapte automatiquement :
- **Desktop** : Widget 380x600px en position fixe
- **Mobile** : Plein écran avec marges

Pour désactiver sur mobile :

```css
@media (max-width: 768px) {
    .thierry-chat-widget {
        display: none !important;
    }
}
```

## 🔧 Debugging

### Console du navigateur
Ouvrez **F12** → **Console** pour voir :
- Messages d'initialisation
- Erreurs éventuelles
- Réponses du webhook

### Test d'intégration
1. Videz le cache WordPress
2. Vérifiez en navigation privée
3. Testez sur mobile et desktop

## 🚨 Points d'Attention

### Thèmes
- **Certains thèmes** peuvent avoir des CSS conflictuels
- **Z-index** : Le chatbot utilise `z-index: 999999`
- **Position fixed** : Peut être affectée par certains thèmes

### Plugins
- **Cache plugins** : Videz le cache après installation
- **Minification** : Excluez le script si nécessaire
- **Sécurité** : Certains plugins peuvent bloquer les scripts externes

### Performance
- **CDN** : Le script est hébergé sur GitHub Pages
- **Chargement** : Asynchrone, n'affecte pas la vitesse
- **Taille** : ~15KB compressé

## 📞 Support

En cas de problème :
1. Vérifiez la console navigateur
2. Testez en désactivant les autres plugins
3. Vérifiez que GitHub Pages est accessible
4. Contactez le support si nécessaire

---

*🤖 Chatbot Thierry pour WordPress - Prise de RDV simplifiée*