
const form = document.getElementById('contact-form');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const formData = {
        name:name, email:email, subject:subject, message:message
    }
    // const formData = new FormData(dataForm);


    const response = await fetch('/api/contactFormEmailSender.js', {
        method: 'POST',
        body: JSON.stringify(formData)
    })
    const data = response.json()
debugger;

    if (data.success) {
        alert('Fields were successfully added!');
    } else {
        alert('There was an error adding the fields.');
    }



})

