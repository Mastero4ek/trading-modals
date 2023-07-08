//hidden password

const hiddenPassword = (input, show, hide) => {
    const passInput = document.getElementById(input);

    if (passInput === null) return

    const password = passInput.querySelector('input'),
        passShow = passInput.querySelector(show),
        passHide = passInput.querySelector(hide);

    passShow.addEventListener('click', () => {
        passHide.classList.toggle('hide-input')
        passShow.classList.toggle('hide-input')

        if (password.type === "password") {
            password.type = "text";
        } else {
            password.type = "password";
        }
    })

    passHide.addEventListener('click', () => {
        passHide.classList.toggle('hide-input')
        passShow.classList.toggle('hide-input')

        if (password.type === "text") {
            password.type = "password";
        } else {
            password.type = "text";
        }
    })
}

hiddenPassword('login-password', '.icon-open', '.icon-close')
hiddenPassword('register-password', '.icon-open', '.icon-close')
hiddenPassword('confirm-password', '.icon-open', '.icon-close')

// default style inputs

const defaultStyle = (formWrapperId) => {
    const form = document.getElementById(formWrapperId)

    if (form === null) return

    form.reset()

    const allInputs = form.querySelectorAll('.required'),
        allSelect = form.querySelectorAll('select'),
        termsCheck = form.querySelector('[name="check"]'),
        checkbox = form.querySelector('[name="check"] ~ label > span');

    if (allInputs !== null) {
        allInputs.forEach((input) => {
            const span = input.nextElementSibling

            if (span !== null) {
                if (input.value === '') {
                    span.classList.remove('span-hide')
                }
            }

            input.addEventListener('input', () => {
                if (input.value === '') {
                    span.classList.remove('span-hide')
                }

                if (span !== null) {
                    span.classList.add('span-hide')
                }

                input.classList.remove('input-error')
            })
        })
    }

    if (allSelect !== null) {
        allSelect.forEach((select) => {
            const span = select.nextElementSibling

            if (span !== null) {
                if (select.value === '') {
                    span.classList.remove('span-hide')
                }
            }

            select.addEventListener('change', () => {
                if (select.value === '') {
                    span.classList.remove('span-hide')
                }

                if (span !== null) {
                    span.classList.add('span-hide')
                }

                select.classList.remove('input-error')
            })
        })
    }

    if (termsCheck !== null) {
        checkbox.addEventListener('click', () => {
            checkbox.classList.remove('span-error')
        })
    }
}

defaultStyle('login-form')
defaultStyle('register-form')

//validate form

const validateForm = (form) => {
    const allInputs = form.querySelectorAll('.required'),
        allSelect = form.querySelectorAll('select'),
        termsCheck = form.querySelector('[name="check"]'),
        checkbox = form.querySelector('[name="check"] ~ label > span');

    let success = true

    if (allInputs !== null) {
        allInputs.forEach((input) => {
            if (input.value === '') {
                input.classList.add('input-error')
                success = false
            }
        })
    }

    if (allSelect !== null) {
        allSelect.forEach((select) => {
            if (select.value === '') {
                select.classList.add('input-error')
                success = false
            }
        })
    }

    if (termsCheck !== null) {
        if (!termsCheck.checked) {
            checkbox.classList.add('span-error')
            success = false
        }
    }

    return success
}

//disabled controls form

const disabledForm = (form) => {
    const allInputs = form.querySelectorAll('input'),
        allSelect = form.querySelectorAll('select'),
        termsCheck = form.querySelector('[name="check"]'),
        checkbox = form.querySelector('[name="check"] ~ label > span'),
        formBtn = form.querySelector('.modal__send-btn > button');

    if (allInputs !== null) {
        allInputs.forEach(input => input.disabled = true)
    }

    if (allSelect !== null) {
        allSelect.forEach(select => select.disabled = true)
    }

    if (termsCheck !== null) {
        termsCheck.disabled = true
        checkbox.disabled = true
    }

    if (formBtn !== null) {
        formBtn.disabled = true
    }
}

//submit form

const submitForm = (formWrapperId) => {
    const form = document.getElementById(formWrapperId)

    if (form === null) return

    const sendForm = () => {
        const formData = new FormData(form)

        console.log(formData);
        disabledForm(form)
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if (validateForm(form)) {
            sendForm()
        }
    })
}

submitForm('login-form')
submitForm('register-form')