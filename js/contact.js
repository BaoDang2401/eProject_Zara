
function SubmitContact() {
    var name = document.getElementById("FullName").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("Email").value;
    var message = document.getElementById("messageInput").value;
    const errorMessage = document.getElementById("NameError");
    const errorMessageemail = document.getElementById("PhoneError");
    const errorMessagep = document.getElementById("EmailError");
    const errorMessagepp = document.getElementById("messageError");
    // Xóa thông báo lỗi trước đó
    // var errorMessages = document.getElementsByClassName("error-message");
    // for (var i = 0; i < errorMessages.length; i++) {
    //     errorMessages[i].innerHTML = "";
    // }

    if (name === "") {
        errorMessage.innerHTML = "Please enter your full name.";
    }
    if (tel === "") {
        errorMessageemail.innerHTML = "Please enter your phone number.";
    } else if (!/^\+84[0-9]{9}$/.test(tel)) {
        errorMessageemail.innerHTML = "Format: +84 xxx.xxx.xxx";
    }
    if (email === "") {
        errorMessagep.innerHTML = "Please enter your email.";
    } else if (!/^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{4,}\.[a-zA-Z0-9]{3,}/.test(email)) {
        errorMessagep.innerHTML = "Format: abc1@gmail.com";
    }
    if (message === "") {
        errorMessagepp.innerHTML = "Please enter a message.";
    }

    // alert("check eror")
    if (name && tel && email && message) {
        var successMessage =
            "<br>Full Name: " + name +
            "<br>Phone: " + tel +
            "<br>Email: " + email +
            "<br>Message: " + message;

        document.getElementById("successMessage").innerHTML = successMessage;
        $('#successModal').modal('show');
        // Reset giá trị của các trường input sau khi xử lý form
        document.getElementById("FullName").value = "";
        document.getElementById("Phone").value = "";
        document.getElementById("Email").value = "";
        document.getElementById("messageInput").value = "";
    }
}