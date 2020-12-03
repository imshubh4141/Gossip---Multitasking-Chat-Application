<?php
include "dbconnection.php";
error_reporting(0);
if(strlen($_POST["confirmpass"])>0)
{
	$pass=$_POST["newpass"];
	$user=$_SESSION['username'];
	$stmt=$conn->prepare("UPDATE users SET password='".$pass."' WHERE username='".$user."'");
	$stmt->execute();
	$stmt->close();
}
else if(isset($_POST["newuser"]))
{
	$user=$_POST["newuser"];
	$user1=$_SESSION['username'];
	$stmt=$conn->prepare("UPDATE users SET username='".$user."' WHERE username='".$user1."'");
	$stmt->execute();
	if($stmt->error)
	{	
		echo "Username already exists";
	}
	$stmt->close();
}
session_destroy();
?>
<!doctype html>
<head>
    <meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="login.css">
    <title>Gossip - Login</title>
	<script src="http://use.edgefonts.net/montserrat:n4:default;source-sans-pro:n2:default.js" type="text/javascript"></script>
</head>
<body>
<div class="login_form">
  <section class="login-wrapper">
    <div class="logo">
		 <img class="lo" src="logo.png">
    </div>
	<div class="fo">
    <form id="login" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
      <label for="username">User Name*</label>
      <input  required name="username" type="text" autocapitalize="off" autocorrect="off"/>
      <label for="password">Password*</label>
      <input class="password" id="password" required name="password" type="password" />
      <div class="hide-show" onClick="show()">
		  <span>Show</span>
      </div>
		<br>
		<br>
		<p id="invalid"></p>
		<br>
        <label class="reg" for="sub">Not Registered? <a href="registration.php" id="reg">Create an account</a></label>
		<button class="sub" type="submit">Sign In</button>
    </form>
	</div>	
  </section>
</div>
</body>
<div id="verify">
	<?php
		include "logdb.php";
	?>
</div>
<script type="text/javascript" src="log.js"></script>
</html>