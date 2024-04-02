
const form = document.getElementById('contact-form');
const submitBtn = document.querySelector("#contact-form input[type='submit'")

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
    //    setTimeout(()=>{
        
    //     submitBtn.style.backgroundColor= 'blue'
    //    }, 1000)
    debugger;
        if (data.success) {
            dialog.style.display = "block";
            message.innerHTML = `${data.message}`;
            successSvg.style.display= 'block'
            successSvg.classList.add('text-green-600');
            contactFormDialogCloseBtn.classList.add('bg-green-600');
            circleAround.classList.add('bg-green-100');
            // submitBtn.style.backgroundColor= 'green'

        } else {
            dialog.style.display = "block";
            message.innerHTML = 'please try again in 2 minutes ';
            failSvg.style.display = 'block'
            failSvg.classList.add('text-red-600');
            contactFormDialogCloseBtn.classList.add('bg-red-600');
            circleAround.classList.add('bg-red-100');
            // submitBtn.style.backgroundColor= 'red'
        }
    } catch (error) {
        console.error('Error:', error);
    }


})


