
const form = document.getElementById('contact-form');

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    const dataForm = {
        name, email, subject, message
    }
    // const formData = new FormData(dataForm);


    const response = await fetch('/api/contactFormEmailSender.js', {
        method: 'POST',
        body: dataForm
    })
    const data = response.json()
debugger;

    if (data.success) {
        alert('Fields were successfully added!');
    } else {
        alert('There was an error adding the fields.');
    }



})

