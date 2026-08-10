/* =========================================================
   NIMEGAMI — LOGIN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const message = document.getElementById("loginMessage");


    /* =====================================================
       PASSWORD VISIBILITY
       ===================================================== */

    if (togglePassword) {

        togglePassword.addEventListener("click", () => {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                togglePassword.innerHTML = "🙈";

            } else {

                passwordInput.type = "password";

                togglePassword.innerHTML = "👁️";
            }

        });

    }


    /* =====================================================
       LOGIN FORM
       ===================================================== */

    if (loginForm) {

        loginForm.addEventListener("submit", (event) => {

            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();


            /* Clear previous message */

            if (message) {
                message.textContent = "";
                message.className = "";
            }


            /* =================================================
               VALIDATION
               ================================================= */

            if (!email || !password) {

                showMessage(
                    "Please enter your email and password.",
                    "error"
                );

                return;
            }


            if (!isValidEmail(email)) {

                showMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }


            /* =================================================
               GET REGISTERED USER
               ================================================= */

            const registeredUser =
                JSON.parse(
                    localStorage.getItem("nimegamiUser")
                );


            if (!registeredUser) {

                showMessage(
                    "No account found. Please register first.",
                    "error"
                );

                return;
            }


            /* =================================================
               CHECK LOGIN DETAILS
               ================================================= */

            if (
                email.toLowerCase() !==
                registeredUser.email.toLowerCase()
            ) {

                showMessage(
                    "Incorrect email or password.",
                    "error"
                );

                return;
            }


            if (password !== registeredUser.password) {

                showMessage(
                    "Incorrect email or password.",
                    "error"
                );

                return;
            }


            /* =================================================
               LOGIN SUCCESS
               ================================================= */

            const loggedInUser = {

                name: registeredUser.name,

                email: registeredUser.email,

                loggedIn: true,

                loginTime: new Date().toISOString()

            };


            localStorage.setItem(
                "nimegamiLoggedIn",
                JSON.stringify(loggedInUser)
            );


            showMessage(
                "Login successful! Welcome to Nimegami ✨",
                "success"
            );


            /* =================================================
               REDIRECT
               ================================================= */

            setTimeout(() => {

                window.location.href = "../explore.html";

            }, 1200);

        });

    }


    /* =====================================================
       EMAIL VALIDATION
       ===================================================== */

    function isValidEmail(email) {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    }


    /* =====================================================
       MESSAGE
       ===================================================== */

    function showMessage(text, type) {

        if (!message) return;

        message.textContent = text;

        message.className = `login-message ${type}`;

    }

});