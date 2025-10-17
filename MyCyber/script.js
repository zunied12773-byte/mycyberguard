document.addEventListener('DOMContentLoaded', (event) => {
    // --- Password Checker Logic (for password-checker.html) ---
    const passwordInput = document.getElementById('passwordInput');
    if (passwordInput) {
        const strengthDisplay = document.getElementById('strengthDisplay');
        const adviceText = document.querySelector('.advice-text');

        passwordInput.addEventListener('input', updatePasswordStrength);

        function updatePasswordStrength() {
            const password = passwordInput.value;
            let strength = 0;
            let advice = "";

            // Check 1: Length
            if (password.length >= 8) {
                strength += 1;
            } else {
                advice = "Password is too short. Try to use at least 8 characters.";
            }

            // Check 2: Uppercase Letters
            if (/[A-Z]/.test(password)) {
                strength += 1;
            } else {
                advice = "Add an uppercase letter.";
            }

            // Check 3: Numbers
            if (/[0-9]/.test(password)) {
                strength += 1;
            } else {
                advice = "Add a number.";
            }

            // Check 4: Special Symbols
            if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
                strength += 1;
            } else {
                advice = "Add a special symbol.";
            }

            if (password.length === 0) {
                strengthDisplay.style.width = '0%';
                adviceText.textContent = "";
                return;
            }

            // Update the visual strength display and advice
            if (strength === 1) {
                strengthDisplay.style.width = '25%';
                strengthDisplay.style.backgroundColor = '#ff6347'; // Red
                adviceText.textContent = advice;
            } else if (strength === 2) {
                strengthDisplay.style.width = '50%';
                strengthDisplay.style.backgroundColor = '#ffd700'; // Yellow
                adviceText.textContent = advice;
            } else if (strength === 3) {
                strengthDisplay.style.width = '75%';
                strengthDisplay.style.backgroundColor = '#1e90ff'; // Blue
                adviceText.textContent = advice;
            } else if (strength === 4) {
                strengthDisplay.style.width = '100%';
                strengthDisplay.style.backgroundColor = '#32cd32'; // Green
                adviceText.textContent = "Great job! This is a strong password.";
            }
        }
    }

    // --- Cybersecurity Quiz Logic (for quiz.html) ---
    const quizContainer = document.getElementById('quiz-container');
    const submitBtn = document.getElementById('submit-quiz-btn');
    if (quizContainer) {
        const quizQuestions = [
            {
                question: "What is phishing?",
                options: ["A type of malware that encrypts files", "A social engineering attack to steal data", "A software bug"],
                answer: "A social engineering attack to steal data"
            },
            {
                question: "What is a strong password length?",
                options: ["4-6 characters", "8-10 characters", "12+ characters"],
                answer: "12+ characters"
            },
            {
                question: "What does MFA stand for?",
                options: ["Malware File Analyzer", "Multi-Factor Authentication", "Mobile Fraud Alert"],
                answer: "Multi-Factor Authentication"
            },
            {
                question: "What is a firewall?",
                options: ["A tool for checking password strength", "A network security system that blocks unauthorized access", "A type of virus"],
                answer: "A network security system that blocks unauthorized access"
            },
            {
                question: "What is a Trojan horse?",
                options: ["A piece of hardware", "A type of firewall", "A program disguised as something harmless"],
                answer: "A program disguised as something harmless"
            },
            {
                question: "What is a denial-of-service (DoS) attack?",
                options: ["An attack that floods a system with traffic to make it unavailable", "An attack that steals passwords", "An attack that uses AI"],
                answer: "An attack that floods a system with traffic to make it unavailable"
            },
            {
                question: "What is the purpose of antivirus software?",
                options: ["To slow down your computer", "To detect, prevent, and remove malware", "To secure network connections"],
                answer: "To detect, prevent, and remove malware"
            },
            {
                question: "What does 'HTTPS' at the start of a URL indicate?",
                options: ["The website is old", "The connection to the website is encrypted and secure", "The website is for business use"],
                answer: "The connection to the website is encrypted and secure"
            }
        ];

        function buildQuiz() {
            quizQuestions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.className = 'quiz-question';
                questionDiv.innerHTML = `
                    <h3>${index + 1}. ${q.question}</h3>
                    <ul class="quiz-options">
                        ${q.options.map(option => `
                            <li>
                                <input type="radio" name="question${index}" value="${option}" id="q${index}-${option.replace(/\s/g, '-')}" required>
                                <label for="q${index}-${option.replace(/\s/g, '-')}">${option}</label>
                            </li>
                        `).join('')}
                    </ul>
                `;
                quizContainer.appendChild(questionDiv);
            });
        }

        function showResults() {
            const answerContainers = quizContainer.querySelectorAll('.quiz-question');
            let score = 0;
            const resultsDiv = document.getElementById('quiz-results');
            const scoreDisplay = document.getElementById('quiz-score');
            const adviceDisplay = document.getElementById('quiz-advice');

            quizQuestions.forEach((q, index) => {
                const answerContainer = answerContainers[index];
                const selector = `input[name=question${index}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                // Add classes to highlight correct and incorrect answers
                const correctOption = answerContainer.querySelector(`input[value="${q.answer}"]`).parentNode;
                
                if (userAnswer === q.answer) {
                    score++;
                    correctOption.classList.add('correct-answer');
                } else {
                    if (userAnswer) {
                        const incorrectOption = answerContainer.querySelector(`input[value="${userAnswer}"]`).parentNode;
                        incorrectOption.classList.add('incorrect-answer');
                    }
                    correctOption.classList.add('correct-answer');
                }
            });

            scoreDisplay.textContent = `Your score: ${score} out of ${quizQuestions.length}`;
            if (score === quizQuestions.length) {
                adviceDisplay.textContent = "Excellent! You are a cyber pro!";
            } else if (score >= quizQuestions.length / 2) {
                adviceDisplay.textContent = "Good job! You have a solid understanding of the basics.";
            } else {
                adviceDisplay.textContent = "You can improve! Review the Cyber Dictionary to learn more.";
            }
            
            // Show results with a fade-in effect
            resultsDiv.style.opacity = '0';
            resultsDiv.classList.remove('results-hidden');
            setTimeout(() => {
                resultsDiv.style.opacity = '1';
            }, 10);
        }

        submitBtn.addEventListener('click', showResults);
        buildQuiz();
    }
    // --- Secure Text Encryptor Logic (for encryptor.html) ---
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    if (encryptBtn && decryptBtn) {
        const inputText = document.getElementById('inputText');
        const outputText = document.getElementById('outputText');

        encryptBtn.addEventListener('click', () => {
            const originalText = inputText.value;
            if (originalText.trim() === '') {
                outputText.value = "Please enter text to encrypt.";
                return;
            }
            const encryptedText = btoa(originalText); // btoa() is a built-in function to encode text
            outputText.value = encryptedText;
        });

        decryptBtn.addEventListener('click', () => {
            const encryptedText = inputText.value;
            if (encryptedText.trim() === '') {
                outputText.value = "Please enter text to decrypt.";
                return;
            }
            try {
                const decryptedText = atob(encryptedText); // atob() is a built-in function to decode text
                outputText.value = decryptedText;
            } catch (e) {
                outputText.value = "Invalid input for decryption.";
            }
        });
    }
});
