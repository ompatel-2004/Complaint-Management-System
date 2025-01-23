function header() {
    with (document) {
      // write('<form action="/register" method="post">\n');
      write('<header class="incharge-header">');
      write('<div class="logo">');
      write('<img src="/images/incharge/incharge_avatar.png" alt="Incharge Logo" />');
      write("<span>Incharge Dashboard</span>");
      write("</div>");
      write('<nav class="incharge-nav">');
      write("<ul>");
      write('<li><a href="/Mainwebpage/dashboard.html">Main Dashboard</a></li>');
  
      write('<li><a href="#">Settings</a></li>');
      write("</ul>");
      write("</nav>");
      write('<div class="incharge-profile">');
      write('<a href="./dashboard.html">Logout</a>');
      write("</div>");
      write('<div class="sidebar">');
      write("<h2>Incharge Panel</h2>");
      write("<ul>");

      write('<li><a href="/User/inchargemenus/html/incharge-complaint-status.html">Complaint Status</a></li>');
      write("</ul>");
      write("</div>");
      write("</header>");
      // write("</form>" + "\n");
    }
  }
  
//   function help() {
//     window.location.href = "./script.html";
//   }
  