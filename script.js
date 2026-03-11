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

document.addEventListener("DOMContentLoaded", () => {
    const revealTargets = [
        ...document.querySelectorAll(".edu-item"),
        ...document.querySelectorAll(".skills-icons div"),
        ...document.querySelectorAll(".accordion-item"),
        document.querySelector(".obj"),
        document.querySelector(".profile .pic"),
        document.querySelector(".contact form"),
        document.querySelector(".footer")
    ].filter(Boolean);

    revealTargets.forEach((el) => el.classList.add("reveal"));

    if (!("IntersectionObserver" in window)) {
        revealTargets.forEach((el) => el.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));

});
