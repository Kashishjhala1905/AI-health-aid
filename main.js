import { diseases, symptomList } from './data.js';

class MediPulseApp {
    constructor() {
        this.selectedSymptoms = new Set();
        this.currentView = 'dashboard';
        this.init();
    }

    init() {
        this.renderSymptoms();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                this.switchView(item.dataset.view);
                document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Symptom Selection
        document.getElementById('symptom-selector').addEventListener('click', (e) => {
            const tag = e.target.closest('.symptom-tag');
            if (tag) {
                const symptomId = tag.dataset.id;
                if (this.selectedSymptoms.has(symptomId)) {
                    this.selectedSymptoms.delete(symptomId);
                    tag.classList.remove('selected');
                } else {
                    this.selectedSymptoms.add(symptomId);
                    tag.classList.add('selected');
                }
            }
        });

        // Analysis
        document.getElementById('analyze-btn').addEventListener('click', () => {
            this.performClassification();
        });

        // Chatbot Toggle
        const trigger = document.getElementById('chatbot-trigger');
        const window = document.getElementById('chatbot-window');
        const closeBtn = document.getElementById('close-chat');

        trigger.addEventListener('click', () => {
            window.style.display = window.style.display === 'flex' ? 'none' : 'flex';
        });

        closeBtn.addEventListener('click', () => {
            window.style.display = 'none';
        });

        // Chat Send
        document.getElementById('send-chat').addEventListener('click', () => this.handleChat());
        document.getElementById('chat-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleChat();
        });
    }

    switchView(viewId) {
        document.querySelectorAll('.view').forEach(view => {
            view.style.display = 'none';
        });
        document.getElementById(`${viewId}-view`).style.display = 'block';
        this.currentView = viewId;
    }

    renderSymptoms() {
        const container = document.getElementById('symptom-selector');
        container.innerHTML = symptomList.map(s => `
            <div class="symptom-tag" data-id="${s.id}">${s.label}</div>
        `).join('');
    }

    performClassification() {
        if (this.selectedSymptoms.size === 0) {
            alert("Please select at least one symptom.");
            return;
        }

        const selectedArr = Array.from(this.selectedSymptoms);
        let bestMatch = null;
        let maxOverlap = 0;

        diseases.forEach(disease => {
            const overlap = disease.symptoms.filter(s => selectedArr.includes(s)).length;
            const matchPercentage = (overlap / disease.symptoms.length) * 100;
            
            if (overlap > maxOverlap) {
                maxOverlap = overlap;
                bestMatch = { ...disease, matchPercentage };
            }
        });

        this.showResults(bestMatch);
    }

    showResults(match) {
        const resultsArea = document.getElementById('results-area');
        const resultContent = document.getElementById('result-content');
        resultsArea.style.display = 'block';

        if (!match || match.matchPercentage < 20) {
            resultContent.innerHTML = `
                <h4 style="color: var(--warning);">Inconclusive Result</h4>
                <p>Your symptoms do not clearly match our current database. Please consult a medical professional for an accurate diagnosis.</p>
            `;
        } else {
            const severityColor = match.severity === 'High' ? 'var(--danger)' : 
                                 match.severity === 'Moderate' ? 'var(--warning)' : 'var(--success)';
            
            resultContent.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                    <h3>${match.name}</h3>
                    <span style="background: ${severityColor}; color: #000; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">
                        ${match.severity} Risk
                    </span>
                </div>
                <p style="margin-bottom: 1rem;">${match.description}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 10px;">
                    <strong style="color: var(--primary);">Recommendation:</strong>
                    <p style="margin-top: 0.5rem;">${match.recommendation}</p>
                </div>
                <p style="margin-top: 1rem; font-size: 0.85rem; color: var(--text-muted);">Match Confidence: ${Math.round(match.matchPercentage)}%</p>
            `;
        }
        
        resultsArea.scrollIntoView({ behavior: 'smooth' });
    }

    addChatMessage(sender, text) {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        div.className = `message ${sender}`;
        div.innerHTML = text; // Allow HTML for formatting
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    async handleChat() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        this.addChatMessage('user', text);
        input.value = '';

        // Show typing indicator
        const typingId = this.addTypingIndicator();

        // Simulate AI processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        this.removeTypingIndicator(typingId);
        const response = this.getBotResponse(text.toLowerCase());
        this.addChatMessage('bot', response);
    }

    addTypingIndicator() {
        const container = document.getElementById('chat-messages');
        const div = document.createElement('div');
        const id = 'typing-' + Date.now();
        div.id = id;
        div.className = 'message bot typing-indicator';
        div.innerHTML = '<span></span><span></span><span></span>';
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return id;
    }

    removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) indicator.remove();
    }

    getBotResponse(query) {
        // Health-related keyword expansion
        const responses = {
            'hello': "Hello! I am MediBot AI. I can help you with health tips, symptom information, and wellness advice. What's on your mind?",
            'hi': "Hi there! Ready to explore some health insights? How can I help today?",
            'fever': "A fever is a temporary increase in body temperature, often due to an illness. <br><br><strong>Tips:</strong><br>• Drink plenty of fluids<br>• Get plenty of rest<br>• Monitor for other symptoms like cough or body aches.",
            'covid': "COVID-19 affects different people in different ways. <br><br><strong>Key Steps:</strong><br>1. Get tested if you have symptoms.<br>2. Isolate from others.<br>3. Monitor oxygen levels and seek help if breathing becomes difficult.",
            'diet': "A healthy diet is fundamental to well-being. Focus on:<br>• <strong>Whole grains</strong> for sustained energy<br>• <strong>Lean proteins</strong> for muscle repair<br>• <strong>Leafy greens</strong> for essential vitamins.",
            'exercise': "Physical activity can improve your brain health, help manage weight, and reduce the risk of disease. Aim for at least <strong>150 minutes</strong> of moderate-intensity activity a week.",
            'headache': "Headaches can be triggered by stress, dehydration, or eye strain. If it's persistent or severe, please consult a specialist.",
            'sleep': "Quality sleep is as essential as diet and exercise. Adults should aim for <strong>7-9 hours</strong> of uninterrupted sleep per night.",
            'stress': "Chronic stress can impact your physical health. Try mindfulness, deep breathing, or regular physical activity to manage it.",
            'heart': "Heart health is critical. Focus on low-sodium diets, regular cardio, and avoiding tobacco products.",
            'help': "I can assist you with:<br>• Symptom explanations<br>• Wellness & Diet tips<br>• Disease prevention info<br>• Navigating this dashboard",
            'clear': "Chat cleared.",
            'symptoms': "If you're feeling unwell, I recommend using our <strong>Symptom Checker</strong> in the sidebar for a structured analysis."
        };

        // Keyword matching
        for (let key in responses) {
            if (query.includes(key)) return responses[key];
        }

        return "I'm processing your query... I don't have a specific answer for that yet, but I recommend checking our <strong>Symptom Checker</strong> or consulting a healthcare professional for specific concerns.";
    }
}

// Initialize App
window.app = new MediPulseApp();
