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

const audiencebtns=document.querySelectorAll('.audiencebtn');
const toggle=document.querySelectorAll('toggle');
audiencebtns.forEach(btn => {
    btn.addEventListener('click',() => {
        audiencebtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        toggle.forEach(toggle =>{
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

    if(!name.value.trim()) {
        name.classList.add('error');
        isValid = false;
    }
    if(!phonenumber.value.trim()) {
        phonenumber.classList.add('error');
        isValid = false;
    }
    if(!email.value.trim() || !/^\S+@\S+\.\S+&/.test(email.value)) {
        email.classList.add('error');
        isValid = false;
    }
    if(!message.value.trim()) {
        message.classList.add('error');
        isValid = false;
    }

    if (isValid) {
        alert("Your message was sent successfully");
        form.reset();
    } else{
        alert(you must type something)
    }
});