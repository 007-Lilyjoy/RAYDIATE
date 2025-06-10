document.addEventListener('DOMContentLoaded', function () {
    
    // FAQ Accordion toggle logic
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach((question) => {
        question.addEventListener('click', () => {
            const currentlyOpen = document.querySelector('.faq-answer.open');

            if (currentlyOpen && currentlyOpen !== question.nextElementSibling) {
                currentlyOpen.style.maxHeight = null;
                currentlyOpen.classList.remove('open');
            }
            const answer = question.nextElementSibling;
            if (answer.classList.contains('open')) {
                answer.style.maxHeight = null;
                answer.classList.remove('open');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.classList.add('open');
            }
        });
    });

    // Audience buttons toggle logic
    const audiencebtns = document.querySelectorAll('.audiencebtn');
    const toggle = document.querySelectorAll('.toggle');
    audiencebtns.forEach(btn => {
        btn.addEventListener('click', () => {
            audiencebtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            toggle.forEach(t => t.classList.remove('active'));
            const target = btn.getAttribute('data-target');
            const targetElement = document.getElementById(target);
            if(targetElement) {
                targetElement.classList.add('active');
            }
        });
    });

    // Contact form validation and submission
    const form = document.getElementById('contactform');
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name');
        const phonenumber = document.getElementById('phonenumber');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        let isValid = true;
        [name, phonenumber, email, message].forEach(input => input.classList.remove('error'));

        if (!name.value.trim()) {
            name.classList.add('error');
            isValid = false;
        }
        if (!phonenumber.value.trim()) {
            phonenumber.classList.add('error');
            isValid = false;
        }
        if (!email.value.trim() || !/^\S+@\S+\.\S+$/.test(email.value)) {
            email.classList.add('error');
            isValid = false;
        }
        if (!message.value.trim()) {
            message.classList.add('error');
            isValid = false;
        }

        if (isValid) {
            alert("Your message was sent successfully");
            form.reset();
        } else {
            alert("You must fill all fields correctly.");
        }
    });

    // Visitor counter stored in localStorage
    let visitCount = localStorage.getItem('visitCount');
    if (!visitCount) {
        visitCount = 1500;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }
    localStorage.setItem('visitCount', visitCount);

    const counterElement = document.querySelector('#visitCount');
    if (counterElement) {
        counterElement.textContent = `${visitCount}+ visitors`;
    }

   let puterInitialized = false;

const CONTEXT = `RayDiate was born out of a simple wish to ensure that all individuals could access energy without any limitations of where they come from.

RayDiate was founded by Lilyjoy Kinya Njagi. She had grown up in a small town where power failure was always a concern.

This issue would lead to very unproductive days and missing deadlines that were only possible to deliver by the presence of power.

It was also a very big inconvenience to people who worked remotely or students who wanted to study late at night.

She knew that this issue did not only affect her but majority of other people who lacked an alternative way of accessing power.

Ever since she grew up with the desire to make a difference in this sector. She always held deep in her heart that energy should be a basic human need and no one

should have to miss opportunities because of the lack of it.

Our mission at RayDiate is to provide accessible, reliable and affordable solar solutions to those who need it most, students

longing to study hard during nighttime, families, businesses and basically everyone.

We provide several products. We have Home solar systems, which are fitted on the rooftops of houses to provide power for everyday use.

We have Portable solar panels which are lightweight and durable, making them ideal for travelling, camping or even for emergency cases.

We also have lanterns which have auto sensor lights and store up energy during the day and provide energy at night.

Our team consists of Lilyjoy Kinya Njagi, who is the founder and vision lead. We also have Linet Mwende Boniface, who is the operations manager and

Raim Wambugu who is the marketing lead.`;

let conversationHistory = [];

function addMessage(text, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "message-user-message" : "message-bot-message";

    if (isUser) {
        messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
    } else {
        messageDiv.innerHTML = `
            <img class="chatbotlogo" src="images/Screenshot 2025-06-06 165017.png" alt="chatbot logo">
            <div class="message-text"><p>${text}</p></div>
        `;
    }

    const chatBody = document.getElementById("chat-body");
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Wait for Puter SDK to be ready
async function waitForPuter(maxWait = 5000) {
    const start = Date.now();
    return new Promise((resolve, reject) => {
        const check = () => {
            if (typeof puter !== "undefined" && puter.ai?.chat) {
                resolve(puter);
            } else if (Date.now() - start > maxWait) {
                reject("❌ SDK not ready");
            } else {
                setTimeout(check, 100);
            }
        };
        check();
    });
}

// Initialize Puter
async function initializePuter() {
    if (puterInitialized) return;

    try {
        console.log('🔄 Connecting to AI...');

        const puter = await waitForPuter();
        console.log('✅ Puter loaded successfully!');

        const testResponse = await puter.ai.chat('Hello, this is a connection test.', {
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 30
        });

        console.log('✅ Puter AI test successful:', testResponse);

        puterInitialized = true;

        addMessage("✨ AI connection established. Ask anything about RayDiate!", false);

    } catch (error) {
        console.error('❌ Puter initialization failed:', error);
        addMessage("⚠ Unable to connect. Please try again later.", false);
    }
}

// Call Puter AI with history
async function callPuterAI(userMessage) {
    if (!puterInitialized) {
        throw new Error('Puter not initialized');
    }

    const conversationContext = conversationHistory.slice(-6).map(msg =>
        `${msg.role === 'user' ? 'Client' : 'RayDiate'}: ${msg.content}`
    ).join('\n');

    const fullPrompt = `${CONTEXT}

Recent conversation:
${conversationContext}

Client: ${userMessage}
RayDiate:`;

    const reply = await puter.ai.chat(fullPrompt, {
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 500
    });

    if (reply?.choices?.[0]?.message?.content) {
    return reply.choices[0].message.content;
} else if (typeof reply === "string") {
    return reply;
} else {
    return JSON.stringify(reply); // Fallback: convert any object to string
}

}

// Handle user send
document.getElementById("send-button").addEventListener("click", async () => {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (!message) {
        alert("You have not typed anything");
        return;
    }

    addMessage(message, true);
    conversationHistory.push({ role: 'user', content: message });
    input.value = "";

    try {
        const reply = await callPuterAI(message);
        addMessage(reply, false);
        conversationHistory.push({ role: 'assistant', content: reply });
    } catch (err) {
        console.error(err);
        addMessage("⚠ Something went wrong. Try again later.", false);
    }
});

// Support sample question buttons
function setSample(text) {
    const input = document.getElementById("user-input");
    input.value = text;
    input.focus();
}

// Initialize Puter when the page loads
window.addEventListener("load", initializePuter);
})