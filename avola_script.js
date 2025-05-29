// Global variables to establish here
let currentLanguage = 'en';

// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const langToggle = document.getElementById('langToggle');
const contactForm = document.getElementById('contactForm');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeLanguageToggle();
    initializeFAQ();
    initializeContactForm();
    initializeSmoothScrolling();
});

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Language toggle functionality
function initializeLanguageToggle() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        updateLanguage();
    }

    langToggle.addEventListener('click', function() {
        currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
        updateLanguage();
        localStorage.setItem('language', currentLanguage);
    });
}

// Update all text based on current language
function updateLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-es]');

    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder-en], [data-placeholder-es]');
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-placeholder-${currentLanguage}`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });

    // Update language toggle button
    langToggle.textContent = currentLanguage === 'en' ? 'ES' : 'EN';

    // Update document language attribute
    document.documentElement.lang = currentLanguage;
}

// FAQ functionality
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Toggle
