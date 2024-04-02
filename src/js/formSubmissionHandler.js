
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


        if (data.success) {
            // alert(`${data.message}`);
          // Your other logic here...
         const dialog = document.getElementById('response-form-dialog');
         dialog.style.display = "flex";
         const message = document.querySelector('#response-form-dialog #message')
         message.innerHTML = `${data.message}`
        
        } else {
            alert('There was an error adding the fields.', data.message);
       
        }
    } catch (error) {
        console.error('Error:', error);
    }


})


