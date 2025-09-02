<?php

function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'avada-stylesheet' ) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function avada_lang_setup() {
    $lang = get_stylesheet_directory() . '/languages';
    load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );

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

?>

/*
INSTRUCTIONS D'INSTALLATION :

1. Remplacez le contenu de votre functions.php par ce code corrigé
2. Sauvegardez le fichier
3. Videz le cache WordPress (si vous avez un plugin de cache)
4. Le chatbot Thierry apparaîtra automatiquement en bas à droite

TROUBLESHOOTING :
- Si le widget ne s'affiche pas, vérifiez la console navigateur (F12)
- Testez en navigation privée
- Assurez-vous que GitHub Pages est accessible
- Vérifiez qu'aucun plugin ne bloque les scripts externes

VERSION : WordPress optimisée avec position forcée
COMPATIBILITÉ : Avada, Elementor, tous thèmes WordPress
*/