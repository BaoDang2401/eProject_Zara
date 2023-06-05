
function SubmitContact() {
    var name = document.getElementById("FullName").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("Email").value;
    var message = document.getElementById("messageInput").value;
    const errorMessage = document.getElementById("nameError");
    const errorMessageemail = document.getElementById("phoneError");
    const errorMessagep = document.getElementById("emailError");
    const errorMessagepp = document.getElementById("messageError");

    var hasError = false;

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("messageError").innerHTML = "";

    if (!name) {
        errorMessage.innerHTML = "Please enter your full name.";
    }
    if (!tel) {
        errorMessageemail.innerHTML = "Please enter your phone number.";
    } else {
        if (!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(tel)) {
            errorMessageemail.innerHTML = "Only 10 digit numbers are accepted";
            hasError = true;
        } else if (tel.length !== 10) {
            errorMessageemail.innerHTML = "Only 10 digit numbers are accepted.";
            hasError = true;
        }
        // else {
        //     errorMessageemail.innerHTML = "Only 10 digit numbers are accepted";
        //     hasError = true;
        // }
    }
    if (!email) {
        errorMessagep.innerHTML = "Please enter your email.";
    } else if (!/^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{4,}\.[a-zA-Z0-9]{3,}/.test(email)) {
        errorMessagep.innerHTML = "Format: abc1@gmail.com";
    }
    if (!message) {
        errorMessagepp.innerHTML = "Please enter a message.";
    }


    // location.reload()
    if (!hasError) {
        console.log('!!!!!!!!!')
        saveUser(phone, password, name);
        // document.getElementById("message").innerHTML = "Register successfully, please login to continue. <br> You can use \"friendlyZara\" code to get 10% discount.";
        // document.getElementById("message").style = "color: green";
        if (name && tel && email && message) {
            var successMessage =
                "<br>Full Name: " + name +
                "<br>Phone: " + tel +
                "<br>Email: " + email +
                "<br>Message: " + message;

            document.getElementById("successMessage").innerHTML = successMessage;
            $('#successModal').modal('show');

            // Reset giá trị của các trường input sau khi xử lý form
            name.value = '';
            tel.value = '';
            email.value = '';
            message.value = '';
        }
        return;
    }
}