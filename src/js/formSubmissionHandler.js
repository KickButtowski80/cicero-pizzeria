
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
    import('./components/dialog.html').then((module) => {
        // The imported module contains the content of dialog.html
        // You can use it as needed, e.g., append it to the DOM
        const dialogContent = module.default; // Assuming dialog.html exports its content as default
        const dialogContainer = document.getElementById('dialog-container'); // Replace with your actual container element

        // Append the dialog content to your container
        dialogContainer.innerHTML = dialogContent;
    });
        } else {
            alert('There was an error adding the fields.', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }


})


