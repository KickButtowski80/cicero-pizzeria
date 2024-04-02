
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
        const svg = document.querySelector('#response-form-dialog svg');

        if (data.success) {
         dialog.style.display = "block";
         message.innerHTML = `${data.message}`;
         svg.classList.add('text-green-600');
        
        } else {
            dialog.style.display = "block";
         message.innerHTML = `${data.message}`
       
        }
    } catch (error) {
        console.error('Error:', error);
    }


})


