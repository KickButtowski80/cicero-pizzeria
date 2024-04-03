
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
            if (data.success) {
                submitBtn.children[0].style.display = 'none';
                submitBtn.children[1].innerHTML = 'sent';
                setTimeout(() => {
                    submitBtn.children[1].innerHTML = 'send';
                }, 1000);
                dialog.style.display = "block";
                message.innerHTML = `${data.message}`;
                successSvg.style.display = 'block'
                successSvg.classList.add('text-green-600');
                contactFormDialogCloseBtn.classList.add('bg-green-600');
                circleAround.classList.add('bg-green-100');
                console.log('i am a success')
            } else {
                submitBtn.children[0].style.display = 'none';
                submitBtn.children[1].innerHTML = 'not sent';
                setTimeout(() => {
                    submitBtn.children[1].innerHTML = 'send';
                }, 1000);
                dialog.style.display = "block";
                message.innerHTML = `${data.message}`;
                failSvg.style.display = 'block'
                failSvg.classList.add('text-red-600');
                contactFormDialogCloseBtn.classList.add('bg-red-600');
                circleAround.classList.add('bg-red-100');
            }
        }, 2000)
    } catch (error) {
        console.error('Error:', error);
    }
})
