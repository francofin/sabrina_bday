// async function to send form input to signup endpoint / route on submit event
const signupFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    const fristNameEl = document.querySelector("#firstname-input-signup");
    const lastNameEl = document.querySelector("#lastname-input-signup");
    const emailEl = document.querySelector("#email-input-signup");

    // send signup request to endpoint
    fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value,
            first_name:fristNameEl.value,
            last_name: lastNameEl.value,
            email: emailEl.value
        }),
        headers: { "Content-Type": "application/json" }
    }).then(function () {
        document.location.replace("/dashboard");
    }).catch(err => console.log(err));
};

// listen for submit event on signup form
document.querySelector("#signup-form").addEventListener("submit", signupFormHandler);