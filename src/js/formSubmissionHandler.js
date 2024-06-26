
const form = document.getElementById('contact-form');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formData = {
        name: name, email: email, subject: subject, message: message
    }
    // left for learning purposes 
    // const formData = new FormData(dataForm);

    try {
        const response = await fetch('/api/contactFormEmailSender.js', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        const data = await response.json()
        const dialog = document.getElementById('response-form-dialog');
        const message = document.querySelector('#response-form-dialog #message');
        const successSvg = document.querySelector('#response-form-dialog #success');
        const failSvg = document.querySelector('#response-form-dialog #fail');
        const contactFormDialogCloseBtn = document.querySelector("#response-form-dialog  button");
        const circleAround = document.querySelector('.rounded-full');
        const submitBtn = document.querySelector("#contact-form button[type='submit']")

        submitBtn.children[0].style.display = 'block'
        submitBtn.children[0].style.margin = "0 auto";
        submitBtn.children[1].innerHTML = "";

        setTimeout(() => {
            submitBtn.children[0].style.display = 'none';
            submitBtn.children[1].innerHTML = data.success ? 'sent' : 'not sent';
            setTimeout(() => {
                submitBtn.children[1].innerHTML = 'send';
            }, 1000);
            dialog.style.display = "block";
            message.innerHTML = `${data.message}`;

            // Apply classes based on data.success
            if (data.success) {
                successSvg.style.display = 'block';
                failSvg.style.display = 'none';
                successSvg.classList.add('text-green-600');
                failSvg.classList.remove('text-red-600');
                contactFormDialogCloseBtn.classList.add('bg-green-600');
                contactFormDialogCloseBtn.classList.remove('bg-red-600'); circleAround.classList.add('bg-green-100');
                circleAround.classList.remove('bg-red-100');
            } else {
                successSvg.style.display = 'none';
                failSvg.style.display = 'block';
                failSvg.classList.add('text-red-600');
                successSvg.classList.remove('text-green-600');
                contactFormDialogCloseBtn.classList.add('bg-red-600');
                contactFormDialogCloseBtn.classList.remove('bg-green-600');
                circleAround.classList.add('bg-red-100');
                circleAround.classList.remove('bg-green-100');
            }
        }, 2000);

    } catch (error) {
        console.error('Error:', error);
    }
})
