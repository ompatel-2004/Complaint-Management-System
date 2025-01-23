function DashboardHeader() {
  with (document) {
    write('<header class="mainwebpage-header" action="/addint" method="">');
    write('<div class="logo">');
    write('<img src="../images/mainwebpage/mainpagelogo.png" alt="Admin Logo" />');
    write("<span>Complaint Management</span>");
    write("</div>");
    write('<nav class="mainwebpage-nav">');
    write("<ul>");
    write("<li>");
    write('<a href="#">Details</a>');
    write("</li>");
    write("<li>");
    write('<a href="#">Contact Us</a>');
    write("</li>");
    write("<li>");
    write('<a href="#">Settings</a>');
    write("</li>");
    write("</ul>");
    write("</nav>");
    write('<div class="user-profile">');
    write("<ul>");
    // write('<a href="../Admin/adminlogin/AdminLogin.html">Admin Login</a>');
    write("&nbsp; &nbsp; &nbsp;");
    write('<a href="../User/userlogin/UserRole.html">Login</a>');
    write("&nbsp; &nbsp; &nbsp;");
    write('<a href="../User/userlogin/UserRoleSignup.html">Sign up</a>');
    write("</ul>");
    write("</div>");
    write("</header>;");

    // Add college-based photo below the navigation bar
    write('<div class="college-photo">');
    write('<img src="https://st.depositphotos.com/1598598/4756/i/450/depositphotos_47566019-stock-photo-folder-with-the-label-complaints.jpg  " alt="College Photo" />');
    write("</div>");
  }
}
