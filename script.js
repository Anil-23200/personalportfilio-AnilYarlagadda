function contactMe(event) {
    event.preventDefault(); 
    emailjs.init({
        publicKey: '-e3iVlZmkErzJUW8P',
    });

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    

    const info = {
        form_name: name,
        form_email: email,
        text: message
    };

    emailjs.send('service_31vvnof', 'template_v1jfss2', info)
        .then(function () {
            alert("Email Sent Successfully!");
        })
        .catch(function (error) {
            console.log(error);
            alert("Email Not Sent!");
        });
}