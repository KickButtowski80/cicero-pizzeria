
// const form = document.getElementById('contact-form');

// form.addEventListener('submit', async function (e) {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const subject = document.getElementById('subject').value;
//     const message = document.getElementById('message').value;
//     const formData = {
//         name: name, email: email, subject: subject, message: message
//     }
//     // const formData = new FormData(dataForm);

//     try {
//         const response = await fetch('/api/contactFormEmailSender.js', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formData)
//         })
//         const data = await response.json()
//         const dialog = document.getElementById('response-form-dialog');
//         const message = document.querySelector('#response-form-dialog #message');
//         const successSvg = document.querySelector('#response-form-dialog #success');
//         const failSvg = document.querySelector('#response-form-dialog #fail');
//         const contactFormDialogCloseBtn = document.querySelector("#response-form-dialog  button");
//         const circleAround = document.querySelector('.rounded-full');
//         const submitBtn = document.querySelector("#contact-form button[type='submit']")

//         submitBtn.children[0].style.display = 'block'
//         submitBtn.children[0].style.margin = "0 auto";
//         submitBtn.children[1].innerHTML = "";
//         if (data.success) {
//             submitBtn.children[0].style.display = 'none';
//             submitBtn.children[1].innerHTML = 'sent';
//             dialog.style.display = "block";
//             message.innerHTML = `${data.message}`;
//             successSvg.style.display = 'block'
//             successSvg.classList.add('text-green-600');
//             contactFormDialogCloseBtn.classList.add('bg-green-600');
//             circleAround.classList.add('bg-green-100');

//         } else {
//             submitBtn.children[0].style.display = 'none';
//             submitBtn.children[1].innerHTML = 'not sent';
//             dialog.style.display = "block";
//             message.innerHTML = `${data.message}`;
//             failSvg.style.display = 'block'
//             failSvg.classList.add('text-red-600');
//             contactFormDialogCloseBtn.classList.add('bg-red-600');
//             circleAround.classList.add('bg-red-100');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// })


const form = document.getElementById('contact-form');
const submitBtn = document.querySelector("#contact-form button[type='submit']")

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Extract form data
    const formData = Object.fromEntries(new FormData(form).entries());

    // Show loading state on the submit button
    submitBtn.children[0].style.display = 'block';
    submitBtn.children[0].style.margin = "0 auto";
    submitBtn.children[1].innerHTML = "Sending...";

    try {
        // Simulate a longer fetch request
        setTimeout(async () => {
            const response = await fetch('/api/contactFormEmailSender.js', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            const dialog = document.getElementById('response-form-dialog');
            const messageEl = document.querySelector('#response-form-dialog #message');
            const successSvg = document.querySelector('#response-form-dialog #success');
            const failSvg = document.querySelector('#response-form-dialog #fail');
            const contactFormDialogCloseBtn = document.querySelector("#response-form-dialog  button");
            const circleAround = document.querySelector('.rounded-full');

            // Reset button state
            submitBtn.children[0].style.display = 'none';
            submitBtn.children[1].innerHTML = '';

            // Update UI based on response
            if (data.success) {
                submitBtn.children[1].innerHTML = 'sent';
                dialog.style.display = "block";
                messageEl.innerHTML = data.message;
                successSvg.style.display = 'block';
                successSvg.classList.add('text-green-600');
                contactFormDialogCloseBtn.classList.add('bg-green-600');
                circleAround.classList.add('bg-green-100');
            } else {
                submitBtn.children[1].innerHTML = 'not sent';
                dialog.style.display = "block";
                messageEl.innerHTML = data.message;
                failSvg.style.display = 'block';
                failSvg.classList.add('text-red-600');
                contactFormDialogCloseBtn.classList.add('bg-red-600');
                circleAround.classList.add('bg-red-100');
            }
        }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
        console.error('Error:', error);
    }
});
