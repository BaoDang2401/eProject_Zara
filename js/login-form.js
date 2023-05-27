$(document).ready(function () {
  checkLoggedInUser();

  $('#registerForm').submit(function (event) {
    event.preventDefault();

    var fullname = $('#fullname').val();
    var phone = $('#phone').val();
    var password = $('#password').val();
    var cfpassword = $('#cfpassword').val();
    $('#fullnameOutput').text(fullname);

    if (checkExistingUser(phone)) {
      $('#message').text('Phone does not exist. Kindly input your phone again.').css('color', 'red');
      return;
    }
    if (password !== cfpassword){
      
      $('#message').text('Password and confirm password are not match.').css('color', 'red');
      return;
    }
    saveUser(phone, password, fullname);

    $('#phone').val('');
    $('#password').val('');
    $('#message').text('Register successfully! Please login to continue.').css('color', 'green');
  });

  $('#loginForm').submit(function (event) {
    event.preventDefault();

    var phone = $('#loginPhone').val();
    var password = $('#loginPassword').val();

    if (!checkExistingUser(phone)) {
      $('#message2').text('Username does not exist. Please check again!').css('color', 'red');
      return;
    }

    if (!checkPassword(phone, password)) {
      $('#message2').text('Password is not correct. Please check again!').css('color', 'red');
      return;
    }
    $('#message2').text('Login successfully!');

    saveLoggedInUser(phone);
    showLoggedInUser(phone);

  });

  $('a[href="/"]').click(function () {
    // Xóa thông tin người dùng đã đăng nhập
    removeLoggedInUser();

    // Hiển thị giao diện khi người dùng đăng xuất
    showLoggedOutUser();
  });
  // Bắt sự kiện khi người dùng nhấp vào thẻ "changename"
  $('#changename').click(function (event) {
    event.preventDefault();
    // Hiển thị popup thay đổi tên
    $('#changeNameModal').modal('show');
  });

  // Bỏ kích hoạt sự kiện click mặc định của thẻ "changename"

  // Bắt sự kiện khi người dùng nhấn nút "Thay đổi tên"
  $('#changename').click(function () {
    // Hiển thị popup thay đổi tên
    $('#changeNameModal').modal('show');
  });

  // Bắt sự kiện khi người dùng submit form thay đổi tên
  $('#changeNameForm').submit(function (event) {
    event.preventDefault();

    // Lấy giá trị tên mới từ input
    var newName = $('#newNameInput').val();

    // Lưu tên mới vào localStorage hoặc nơi lưu trữ thông tin người dùng
    localStorage.setItem('fullname', newName);

    // Hiển thị tên mới trên giao diện
    $('#fullnameOutput').text(newName);

    // Đóng popup thay đổi tên
    $('#changeNameModal').modal('hide');
  });
  // Bắt sự kiện khi người dùng nhấp vào thẻ "changepassword"
  $('#changepassword').click(function (event) {
    event.preventDefault();
    // Hiển thị popup thay đổi mật khẩu
    $('#changePasswordModal').modal('show');
  });

  // Bỏ kích hoạt sự kiện click mặc định của thẻ "changepassword"
  $('#changepassword').click(function () {
    // Hiển thị popup thay đổi mật khẩu
    $('#changePasswordModal').modal('show');
  });

  // Bắt sự kiện khi người dùng submit form thay đổi mật khẩu
  $('#changePasswordForm').submit(function (event) {
    event.preventDefault();

    // Lấy giá trị mật khẩu mới từ input
    var newPassword = $('#newPasswordInput').val();

    // Lưu mật khẩu mới vào localStorage hoặc nơi lưu trữ thông tin người dùng
    var loggedInUser = localStorage.getItem('loggedInUser');
    if (localStorage.getItem('users')) {
      var users = JSON.parse(localStorage.getItem('users'));
      if (users.hasOwnProperty(loggedInUser)) {
        users[loggedInUser].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
      }
    }

    // Đóng popup thay đổi mật khẩu
    $('#changePasswordModal').modal('hide');
  });

});

function checkLoggedInUser() {
  if (localStorage.getItem('loggedInUser')) {
    var loggedInUser = localStorage.getItem('loggedInUser');
    showLoggedInUser(loggedInUser);
    // Lấy dữ liệu fullname từ localStorage và cập nhật vào thẻ <span>
    var fullname = localStorage.getItem('fullname');
    $('#fullnameOutput').text(fullname);
  } else {
    showLoggedOutUser();
  }
}

function saveLoggedInUser(phone) {
  localStorage.setItem('loggedInUser', phone);
}

function removeLoggedInUser() {
  localStorage.removeItem('loggedInUser');
}

function showLoggedInUser(phone) {
  $('#loggedInUser').text(phone);
  $('#navbar').show();
  $('#nav-name').show();
  $('#btn-hide').hide();
  $('#btn-checkout').show();
  $('#checkout-alert').hide();
  $('#change').show();
  $('#authModal').modal('hide');
}

function showLoggedOutUser() {
  $('#loggedInUser').text('');
  $('#navbar').hide();
  $('#checkout-alert').show();
  $('#btn-checkout').hide();
  $('#nav-name').hide();
  $('#change').hide();
  $('#btn-hide').show();
}

function checkExistingUser(phone) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));
    return users.hasOwnProperty(phone);
  }

  return false;
}

function saveUser(phone, password, fullname) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));
  } else {
    var users = {};
  }

  users[phone] = {
    password: password
  };

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('fullname', fullname); // Lưu tên đầy đủ vào localStorage
}



function checkPassword(phone, password) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));

    if (users.hasOwnProperty(phone) && users[phone].password === password) {
      return true;
    }
  }

  return false;
}