$(document).ready(function() {
    checkLoggedInUser();
  
    $('#registerForm').submit(function(event) {
      event.preventDefault();
  
      var fullname = $('#fullname').val();
      var username = $('#username').val();
      var password = $('#password').val();
      $('#fullnameOutput').text(fullname);

      if (checkExistingUser(username)) {
        $('#message').text('Tên người dùng đã tồn tại. Vui lòng chọn tên người dùng khác.');
        return;
      }
  
      saveUser(username, password, fullname);
  
      $('#username').val('');
      $('#password').val('');
      $('#message').text('Đăng kí thành công! Vui lòng đăng nhập để tiếp tục.');
    });
  
    $('#loginForm').submit(function(event) {
      event.preventDefault();
  
      var username = $('#loginUsername').val();
      var password = $('#loginPassword').val();
  
      if (!checkExistingUser(username)) {
        $('#message2').text('Tên người dùng không tồn tại. Vui lòng kiểm tra lại.');
        return;
      }
  
      if (!checkPassword(username, password)) {
        $('#message2').text('Mật khẩu không đúng. Vui lòng kiểm tra lại.');
        return;
      }
      $('#message2').text('Đăng nhập thành công!');
  
      saveLoggedInUser(username);
      showLoggedInUser(username);
      
    });
  
    $('a[href="/"]').click(function() {
      // Xóa thông tin người dùng đã đăng nhập
      removeLoggedInUser();
  
      // Hiển thị giao diện khi người dùng đăng xuất
      showLoggedOutUser();
    });
    // Bắt sự kiện khi người dùng nhấp vào thẻ "changename"
  $('#changename').click(function(event) {
    event.preventDefault();
    // Hiển thị popup thay đổi tên
    $('#changeNameModal').modal('show');
  });

  // Bỏ kích hoạt sự kiện click mặc định của thẻ "changename"
  
  // Bắt sự kiện khi người dùng nhấn nút "Thay đổi tên"
  $('#changename').click(function() {
    // Hiển thị popup thay đổi tên
    $('#changeNameModal').modal('show');
  });

  // Bắt sự kiện khi người dùng submit form thay đổi tên
  $('#changeNameForm').submit(function(event) {
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
$('#changepassword').click(function(event) {
    event.preventDefault();
    // Hiển thị popup thay đổi mật khẩu
    $('#changePasswordModal').modal('show');
  });
  
  // Bỏ kích hoạt sự kiện click mặc định của thẻ "changepassword"
  $('#changepassword').click(function() {
    // Hiển thị popup thay đổi mật khẩu
    $('#changePasswordModal').modal('show');
  });
  
  // Bắt sự kiện khi người dùng submit form thay đổi mật khẩu
  $('#changePasswordForm').submit(function(event) {
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