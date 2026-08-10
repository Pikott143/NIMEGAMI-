/* =========================================================
   NIMEGAMI — REGISTER.JS
   Account Registration + Validation
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const registerForm = document.getElementById("registerForm");

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const termsCheckbox = document.getElementById("terms");

    const formMessage =
        document.getElementById("formMessage");

    const passwordToggles =
        document.querySelectorAll(".toggle-password");


    /* =====================================================
       SHOW MESSAGE
    ===================================================== */

    function showMessage(message, type = "error") {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.className =
            `form-message show ${type}`;

    }


    /* =====================================================
       HIDE MESSAGE
    ===================================================== */

    function hideMessage() {

        if (!formMessage) return;

        formMessage.textContent = "";

        formMessage.className =
            "form-message";

    }


    /* =====================================================
       SHOW / HIDE PASSWORD
    ===================================================== */

    passwordToggles.forEach(button => {

        button.addEventListener("click", () => {

            const targetId =
                button.getAttribute("data-target");

            const input =
                document.getElementById(targetId);

            const icon =
                button.querySelector("i");

            if (!input) return;


            if (input.type === "password") {

                input.type = "text";

                icon.classList.remove(
                    "fa-eye"
                );

                icon.classList.add(
                    "fa-eye-slash"
                );

                button.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            } else {

                input.type = "password";

                icon.classList.remove(
                    "fa-eye-slash"
                );

                icon.classList.add(
                    "fa-eye"
                );

                button.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        });

    });


    /* =====================================================
       PASSWORD VALIDATION
    ===================================================== */

    function validatePassword(password) {

        if (password.length < 6) {

            return {
                valid: false,
                message:
                    "Password must be at least 6 characters."
            };

        }

        return {
            valid: true
        };

    }


    /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

    function validateEmail(email) {

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        return emailPattern.test(email);

    }


    /* =====================================================
       CHECK EXISTING USER
    ===================================================== */

    function getUsers() {

        try {

            const users =
                localStorage.getItem(
                    "nimegamiUsers"
                );

            return users
                ? JSON.parse(users)
                : [];

        } catch (error) {

            console.error(
                "Unable to read users:",
                error
            );

            return [];

        }

    }


    /* =====================================================
       SAVE USERS
    ===================================================== */

    function saveUsers(users) {

        try {

            localStorage.setItem(
                "nimegamiUsers",
                JSON.stringify(users)
            );

            return true;

        } catch (error) {

            console.error(
                "Unable to save users:",
                error
            );

            return false;

        }

    }


    /* =====================================================
       FORM SUBMIT
    ===================================================== */

    registerForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            hideMessage();


            /* =============================================
               GET VALUES
            ============================================= */

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            /* =============================================
               NAME VALIDATION
            ============================================= */

            if (name.length < 2) {

                showMessage(
                    "Please enter your name."
                );

                nameInput.focus();

                return;

            }


            /* =============================================
               EMAIL VALIDATION
            ============================================= */

            if (!validateEmail(email)) {

                showMessage(
                    "Please enter a valid email address."
                );

                emailInput.focus();

                return;

            }


            /* =============================================
               PASSWORD VALIDATION
            ============================================= */

            const passwordResult =
                validatePassword(password);

            if (!passwordResult.valid) {

                showMessage(
                    passwordResult.message
                );

                passwordInput.focus();

                return;

            }


            /* =============================================
               CONFIRM PASSWORD
            ============================================= */

            if (password !== confirmPassword) {

                showMessage(
                    "Passwords do not match."
                );

                confirmPasswordInput.focus();

                return;

            }


            /* =============================================
               TERMS
            ============================================= */

            if (!termsCheckbox.checked) {

                showMessage(
                    "Please agree to the Terms of Service and Privacy Policy."
                );

                termsCheckbox.focus();

                return;

            }


            /* =============================================
               GET EXISTING USERS
            ============================================= */

            const users = getUsers();


            /* =============================================
               CHECK DUPLICATE EMAIL
            ============================================= */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    "An account with this email already exists."
                );

                emailInput.focus();

                return;

            }


            /* =============================================
               CREATE USER
            ============================================= */

            const newUser = {

                id:
                    Date.now().toString(),

                name: name,

                email: email,

                password: password,

                favorites: [],

                createdAt:
                    new Date().toISOString()

            };


            /* =============================================
               ADD USER
            ============================================= */

            users.push(newUser);


            /* =============================================
               SAVE USER
            ============================================= */

            const saved =
                saveUsers(users);


            if (!saved) {

                showMessage(
                    "Something went wrong while creating your account."
                );

                return;

            }


            /* =============================================
               SUCCESS
            ============================================= */

            showMessage(
                "Account created successfully! Welcome to Nimegami ✨",
                "success"
            );


            /* =============================================
               BUTTON
            ============================================= */

            const submitButton =
                registerForm.querySelector(
                    ".register-button"
                );


            const originalButtonHTML =
                submitButton.innerHTML;


            submitButton.innerHTML = `
                <i class="fa-solid fa-check"></i>
                Account Created!
            `;

            submitButton.disabled = true;


            /* =============================================
               AUTO LOGIN
            ============================================= */

            const loggedInUser = {

                id: newUser.id,

                name: newUser.name,

                email: newUser.email,

                favorites: []

            };


            localStorage.setItem(
                "nimegamiCurrentUser",
                JSON.stringify(loggedInUser)
            );


            /* =============================================
               REDIRECT
            ============================================= */

            setTimeout(() => {

                window.location.href =
                    "explore.html";

            }, 1500);

        }
    );


    /* =====================================================
       LIVE PASSWORD MATCH CHECK
    ===================================================== */

    confirmPasswordInput.addEventListener(
        "input",
        () => {

            if (
                confirmPasswordInput.value.length === 0
            ) {
                return;
            }


            if (
                passwordInput.value !==
                confirmPasswordInput.value
            ) {

                confirmPasswordInput.style.borderColor =
                    "#d65c5c";

            } else {

                confirmPasswordInput.style.borderColor =
                    "#6bab7e";

            }

        }
    );


    /* =====================================================
       CLEAR MESSAGE WHEN USER TYPES
    ===================================================== */

    [
        nameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput
    ].forEach(input => {

        input.addEventListener(
            "input",
            () => {

                if (
                    formMessage.classList.contains(
                        "show"
                    )
                ) {

                    hideMessage();

                }

            }
        );

    });


    /* =====================================================
       PREVENT SPACE-ONLY NAME
    ===================================================== */

    nameInput.addEventListener(
        "input",
        () => {

            nameInput.value =
                nameInput.value.replace(
                    /^\s+/,
                    ""
                );

        }
    );


    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "🌸 Nimegami Register System Loaded!"
    );

});