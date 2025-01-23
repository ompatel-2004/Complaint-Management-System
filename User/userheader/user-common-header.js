function header(username) {
  with (document) {
    // write('<form action="/register" method="post">\n');
    write('<header class="user-header">');
    write('<div class="logo">');
    write('<img src="/images/user/user_avatar.png" alt="User Logo" />');
    write("<span>User Dashboard</span>");
    write("</div>");
    write('<nav class="user-nav">');
    write("<ul>");
    write('<li><a href="/Mainwebpage/dashboard.html">Main Dashboard</a></li>');

    write('<li><a href="#">Settings</a></li>');
    write("</ul>");
    write("</nav>");
    write('<div class="user-profile">');
    write('<a href="/User/userlogin/UserRoleLogin.html">Logout</a>');
    write("</div>");
    write('<div class="sidebar">');
    write("<h2>User Panel</h2>");
    write("<ul>");
    write("<li>");
    write('<a href="/User/usermenus/html/user-add-complaint.html">Add Complaint</a>');
    write("</li>");
    write('<li><a href="/User/usermenus/html/user-complaint-status.html">Complaint Status</a></li>');
    // write('<li><a href="./category.html">Category</a></li>');
    // write('<li><a href="./facility.html">Facility</a></li>');
    // write('<li><a href="./incharge.html">Incharge</a></li>');
    // write('<li><a href="./status.html">Status</a></li>');
    write("</ul>");
    write("</div>");
    write("</header>");
    // write("</form>" + "\n");
  }
}


function help() {
  window.location.href = "./script.html";
}
