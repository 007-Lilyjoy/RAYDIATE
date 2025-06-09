document.addEventListener('DOMContentLoaded', function () {
    const questions =
        document.querySelectorAll('.faq-question');
    questions.forEach((question) => {
        question.addEventListener('click', () => {
            const currentlyOpen =
                document.querySelector('.faq-answer.open');

            if (currentlyOpen && currentlyOpen !== question.nextElementSibling) {
                currentlyOpen.style.maxHeight = null;
                currentlyOpen.classList.remove('open')
            }
            const answer = question.nextElementSibling;
            if (answer.classList.contains('open')) {
                answer.style.maxHeight = null;
                answer.classList.remove('open');
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.classList.add('open');
            }
        });
    });
});

const audiencebtns = document.querySelectorAll('.audiencebtn');
const toggle = document.querySelectorAll('toggle');
audiencebtns.forEach(btn => {
    btn.addEventListener('click', () => {
        audiencebtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        toggle.forEach(toggle => {
            toggle.classList.remove('active');
        });
        const target = btn.getAttribute('data target');
        document.getElementById(target).classList.add('active')
    });
});


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
    if (!email.value.trim() || !/^\S+@\S+\.\S+&/.test(email.value)) {
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
        alert(you must type something)
    }
});

letvisitCount = localStorage.getItem('visitCount');
if (!visitCount) {
    visitCount = 1500;
} else {
    visitCount = parseInt(visitCount) + 1;
}

localStorage.setItem('visitCount', visitCount);

document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.querySelector('#footercount');
    if (counterElement) {
        counterElement.textContent = `${footercount}+visitors`;
    }
});

//origin mission products team
let context = `RayDiate was born out of a simple wish to ensure that all individuals could access energy without any limitations of where they come from. 
    RayDiate was founded by Lilyjoy Kinya Njagi. She had grown up in a small town where power failure was always a concern. 
    This issue would lead to very unproductive days and missing deadlines that were only possible to deliver by the presense of power.
     It was also a very big inconvinience to people who worked remotely or students who wanted to study late at night.
      She knew that this issue did not only affect her but majority of other people who lacked an alternative way of accessing power.
       Ever since she grew up with the desire to make a difference in this sector. She always held deep in her heart that energy should be a basic human need and no one 
       should have to miss oppurtunities because of the lack of it.
       Our mission at RayDiate is to provide accessible, reliable and affordable solar solutions to those who need it most, students
       longing to study hard during nightime, families, businesses and basically everyone.
       We provide several products. We have Home solar systems, which are fitted on the rooftops of houses to provide power for everyday use.
        We have Portable solar panels which are lightweight and durable, making them ideal for travelling, camping or even for emergency cases.
        We also have lanterns which have auto sensor lights and store up energy during the day and provide energy at night.
        Our team consists of Lilyjoy Kinya Njagi, who is the founder and vision lead. We also have Linet Mwende Boniface, who is the operations manager and 
        Raim Wambugu who is the marketing lead`

async function SendMessage() {
    const input = document.getElementById('user-input');
    const message = input.value.trim();
    if (message === '') {
        alert("You have not typed anything.");
        return;
    }
    const chatBody = document.getElementById('chat-body');
    const UserMsg = document.createElement('div');
    UserMsg.className = 'message-user-message';
    UserMsg.innerHTML = `<div class= "message-text">${message}</div>`;
    chatBody.appendChild(UserMsg);

    input.value = "";
    try{
        const reply = await puter.ai.chat({
            messages: [
                {role: 'system', content: context},
                {role: 'user', content: message},
            ]
        });


        const botMsg = document.createElement('div');
        botMsg.className = 'message-bot-message';
        botMsg.innerHTML = `<img class="chatbotlogo" src="images/Screenshot 2025-06-06 165017.png" alt="chatbot logo">
        <div class="message-text">${reply.choices[0].message.content}</div>
        `;

        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    } catch (error) {
        console.error ("chat error:", error);
        alert("Try Again?")
    }
    
}

function setSample(question) {
    document.getElementById('user-input').value = question;
    SendMessage();
}