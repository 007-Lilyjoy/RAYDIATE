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