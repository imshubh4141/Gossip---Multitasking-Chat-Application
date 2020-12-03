<?php
$user=$_SESSION['username'];
$sql="select * from users where username='".$user."'";
$result=mysqli_query($conn, $sql);
$user1=mysqli_fetch_assoc($result);
echo htmlspecialchars($user1["password"]);
?>