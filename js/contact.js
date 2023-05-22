
function Submit() {
    var name = document.getElementById("FullName").value;
    var tel = document.getElementById("tel").value;
    var email = document.getElementById("Email").value;
    var message = document.getElementById("messageInput").value;

    // Xóa thông báo lỗi trước đó
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].innerHTML = "";
    }

    // Kiểm tra xem tên, sđt, email và tin nhắn có được nhập hay không
    var hasError = false;

    if (!name) {
        document.getElementById("NameError").innerHTML = "Please enter your full name.";
        hasError = true;
    }
    if (!tel) {
        document.getElementById("PhoneError").innerHTML = "Please enter your phone number.";
        hasError = true;
    } else if (!/^\+84[0-9]{9}$/.test(tel)) {
        document.getElementById("PhoneError").innerHTML = "Format: +84 xxx.xxx.xxx";
        hasError = true;
    }
    if (!email) {
        document.getElementById("EmailError").innerHTML = "Please enter your email.";
        hasError = true;
    } else if (!/^[a-zA-Z0-9]{4,}@[a-zA-Z0-9]{4,}\.[a-zA-Z0-9]{3,}/.test(email)) {
        document.getElementById("EmailError").innerHTML = "Format: abc1@gmail.com";
        hasError = true;
    }
    if (message === "") {
        document.getElementById("messageError").innerHTML = "Please enter a message.";
        hasError = true;
    }

    // Kiểm tra xem có lỗi hay không
    if (hasError) {
        document.getElementById("errorMessage").innerHTML = "Please fill in all required fields.";
        return;
        // Dừng lại nếu có lỗi để ngăn người dùng bấm Submit
    }

    // alert("check eror")

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


