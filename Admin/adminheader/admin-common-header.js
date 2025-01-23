function header() {
  with (document) {
    // write('<form action="/register" method="post">\n');
    write('<header class="admin-header">');
    write('<div class="logo">');
    write('<img src="/images/admin/admin_header.png" alt="Admin Logo" />');
    write("<span>Admin Dashboard</span>");
    write("</div>");
    write('<nav class="admin-nav">');
    write("<ul>");
    write('<li><a href="/Mainwebpage/dashboard.html">Main Dashboard</a></li>');
    write('<li><a href="#">Settings</a></li>');
    write("</ul>");
    write("</nav>");
    write('<div class="user-profile">');
    // write(
    //   '<img src="./Admin/images/admin_user_avatar.png" alt="User Avatar" />'
    // );
    // write("<span>Admin User</span>");
    write('<a href="/Admin/adminlogin/AdminLogin.html">Logout</a>');
    write("</div>");
    write('<div class="sidebar">');
    write("<h2>Admin Panel</h2>");
    write("<ul>");
    write('<li><a href="/Admin/adminmenus/html/admin.html">Admins</a></li>');
    write('<li><a href="/Admin/adminmenus/html/floor.html">Floor</a></li>');
    write('<li><a href="/Admin/adminmenus/html/class.html">Class</a></li>');
    write('<li><a href="/Admin/adminmenus/html/category.html">Category</a></li>');
    write('<li><a href="/Admin/adminmenus/html/facility.html">Facility</a></li>');
    write('<li><a href="/Admin/adminmenus/html/incharge.html">Incharge</a></li>');
    write('<li><a href="/Admin/adminmenus/html/status.html">Status</a></li>');
    write("</ul>");
    write("</div>");
    write("</header>");
    // write("</form>" + "\n");
  }
}

function help() {
  window.location.href = "./script.html";
}
