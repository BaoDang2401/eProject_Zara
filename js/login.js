$(document).ready(function() {
  checkLoggedInUser();

  $('#registerForm').submit(function(event) {
    event.preventDefault();

    var fullname = $('#fullname').val();
    var username = $('#username').val();
    var password = $('#password').val();
    $('#fullnameOutput').text(fullname);

    if (checkExistingUser(username)) {
      $('#message').text('Username is already existed. Please choose another username.');
      return;
    }

    saveUser(username, password, fullname);

    $('#username').val('');
    $('#password').val('');
    $('#message').text('Register successfully! Please login to continue.');
  });

  $('#loginForm').submit(function(event) {
    event.preventDefault();

    var username = $('#loginUsername').val();
    var password = $('#loginPassword').val();

    if (!checkExistingUser(username)) {
      $('#message2').text('Username does not exist. Please check again!');
      return;
    }

    if (!checkPassword(username, password)) {
      $('#message2').text('Password is not correct. Please check again!');
      return;
    }
    $('#message2').text('Login successfully!');

    saveLoggedInUser(username);
    showLoggedInUser(username);
  });

  $('a[href="/"]').click(function() {
    // Xóa thông tin người dùng đã đăng nhập
    removeLoggedInUser();

    // Hiển thị giao diện khi người dùng đăng xuất
    showLoggedOutUser();
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

function saveLoggedInUser(username) {
  localStorage.setItem('loggedInUser', username);
}

function removeLoggedInUser() {
  localStorage.removeItem('loggedInUser');
}

function showLoggedInUser(username) {
  $('#loggedInUser').text(username);
  $('#navbar').show();
  $('#nav-name').show();
  $('#btn-hide').hide();
  $('#authModal').modal('hide');
}

function showLoggedOutUser() {
  $('#loggedInUser').text('');
  $('#navbar').hide();
  $('#nav-name').hide();
  $('#btn-hide').show();
}

function checkExistingUser(username) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));
    return users.hasOwnProperty(username);
  }

  return false;
}

function saveUser(username, password, fullname) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));
  } else {
    var users = {};
  }

  users[username] = {
    password: password
  };

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('fullname', fullname); // Lưu tên đầy đủ vào localStorage
}



function checkPassword(username, password) {
  if (localStorage.getItem('users')) {
    var users = JSON.parse(localStorage.getItem('users'));

    if (users.hasOwnProperty(username) && users[username].password === password) {
      return true;
    }
  }

  return false;
}