<?php

function theme_enqueue_styles() {
    wp_enqueue_style( 'child-style', get_stylesheet_directory_uri() . '/style.css', array( 'avada-stylesheet' ) );
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function avada_lang_setup() {
    $lang = get_stylesheet_directory() . '/languages'; // Corrigé: 'languages' au lieu de 'laages'
    load_child_theme_textdomain( 'Avada', $lang ); // Corrigé: $lang au lieu de $g
}
add_action( 'after_setup_theme', 'avada_lang_setup' );

// Intégration Chatbot Thierry
function add_thierry_chatbot() {
    if (!is_admin()) { // Ne pas charger dans l'admin
        wp_enqueue_script(
            'thierry-chatbot',
            'https://adelin-hugot-projectview.github.io/awima-chat/chatbot-widget.js',
            array(),
            '1.0.0',
            true // Charger dans le footer
        );
    }
}
add_action('wp_enqueue_scripts', 'add_thierry_chatbot');

// Supprimer la ligne "lanngu" qui cause une erreur PHP

?>