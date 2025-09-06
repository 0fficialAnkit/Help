const chatWindow = document.getElementById('chat-window');

const demoScenarios = {
    symptoms_hindi: {
        user: "डेंगू के लक्षण क्या हैं?",
        bot: [
                "डेंगू के सामान्य लक्षण हैं:",
                "• तेज बुखार",
                "• गंभीर सिरदर्द",
                "• आंखों के पीछे दर्द",
                "• जोड़ों और मांसपेशियों में दर्द",
                "• थकान और जी मिचलाना",
                "• त्वचा पर लाल चकत्ते",
                "कृपया डॉक्टर से सलाह लें।"
            ]
    },
    prevention_english: {
        user: "How to prevent Malaria?",
        bot: [
            "To prevent Malaria, you should:",
            "• Use mosquito nets while sleeping.",
            "• Apply mosquito repellent on exposed skin.",
            "• Wear long-sleeved clothes.",
            "• Prevent water stagnation around your home.",
            "Consult a doctor for anti-malarial medicines if you are travelling to a high-risk area."
        ]
    },
    outbreak_alert: {
        user: null, // No user message for an alert
            alert: "📢 प्रकोप चेतावनी! आपके क्षेत्र में खसरे के मामले पाए गए हैं। कृपया सुनिश्चित करें कि आपके बच्चों को MMR का टीका लगाया गया है। नजदीकी स्वास्थ्य केंद्र से संपर्क करें।"
        }
};

function createBubble(text, type) {
    const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${type}-bubble`;
        bubble.innerText = text;
        chatWindow.appendChild(bubble);
}

function runDemo(scenarioKey) {
    const scenario = demoScenarios[scenarioKey];
            
    if (scenario.user) {
        createBubble(scenario.user, 'user');
    }

    if (scenario.bot) {
        setTimeout(() => {
        scenario.bot.forEach((msg, index) => {
                    setTimeout(() => {
                    createBubble(msg, 'bot');
                    chatWindow.scrollTop = chatWindow.scrollHeight;
                    }, index * 800);
            });
        }, 500);
    }

    if (scenario.alert) {
        setTimeout(() => {
            createBubble(scenario.alert, 'alert');
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }, 500);
    }
}

// Charts Initialization
document.addEventListener('DOMContentLoaded', () => {
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    new Chart(accuracyCtx, {
        type: 'doughnut',
        data: {
            labels: ['Accurate Responses', 'Inaccurate/Failed'],
            datasets: [{
                data: [80, 20],
                backgroundColor: ['#0d9488', '#f1f5f9'],
                borderColor: ['#ffffff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
});

const awarenessCtx = document.getElementById('awarenessChart').getContext('2d');
new Chart(awarenessCtx, {
        type: 'bar',
        data: {
            labels: ['Before Arogya Mitra', 'After Arogya Mitra'],
            datasets: [{
                label: 'Community Health Awareness Index',
                data: [55, 66], // Represents a 20% increase from 55
                backgroundColor: ['#a5f3fc', '#0e7490'],
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                    tooltip: {
                    callbacks: {
                        label: function(context) {
                            let val = context.raw;
                            let label = context.dataset.label || '';
                            if(context.label === 'After Arogya Mitra') {
                                return `${label}: ${val} (+20% Increase)`;
                            }
                            return `${label}: ${val}`;
                        }
                    }
                }
            }
        }
    });
});
