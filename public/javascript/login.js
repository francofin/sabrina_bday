// async function to send form input to login endpoint / route on submit event
const loginFormHandler = async function (event) {
    event.preventDefault();

    // get form values for POST to endpoint
    const usernameEl = document.querySelector("#username-input-login");
    const passwordEl = document.querySelector("#password-input-login");
    

    // forward login request containing username and password to the endpoint
    fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            username: usernameEl.value,
            password: passwordEl.value
        }),
        headers: { "Content-Type": "application/json" }
    }).then(function () {
        document.location.replace("/dashboard");
    }).catch(err => console.log(err));
};

// listen for submit event on login form
document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
