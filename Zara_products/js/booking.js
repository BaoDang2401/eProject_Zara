function Submitcontact() {
    var date = document.getElementById("date").value;
    var time = document.getElementById("time").value;
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("messageInput").value;

    // Xóa thông báo lỗi trước đó
    var errorMessages = document.getElementsByClassName("error-message");
    for (var i = 0; i < errorMessages.length; i++) {
        errorMessages[i].innerHTML = "";
    }

    // Kiểm tra xem ngày, thời gian, tên, email và tin nhắn có được nhập hay không
    var hasError = false;
    if (date === "") {
        document.getElementById("dateError").innerHTML = "Please choose one date.";
        hasError = true;
    }
    if (time === "") {
        document.getElementById("timeError").innerHTML = "Please choose your time.";
        hasError = true;
    }
    if (name === "") {
        document.getElementById("nameError").innerHTML = "Please enter your name.";
        hasError = true;
    }
    if (email === "") {
        document.getElementById("emailError").innerHTML = "Please enter your email.";
        hasError = true;
    }
    if (message === "") {
        document.getElementById("messageError").innerHTML = "Please enter a message.";
        hasError = true;
    }

    // Kiểm tra xem có lỗi hay không
    if (hasError) {
        document.getElementById("errorMessage").innerHTML = "Please fill in all required fields.";
        return; // Dừng lại nếu có lỗi để ngăn người dùng bấm Submit
    }

    var successMessage =
        "Date: " + date +
        "<br>Time: " + time +
        "<br>Name: " + name +
        "<br>Email: " + email +
        "<br>Message: " + message;

    document.getElementById("successMessage").innerHTML = successMessage;
    $('#successModal').modal('show');
    // Reset giá trị của các trường input sau khi xử lý form
    document.getElementById("date").value = "";
    document.getElementById("time").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("messageInput").value = "";
}


