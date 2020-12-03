<?php
$first=$_POST["firstname"];
$last=$_POST["lastname"];
$user=$_POST["username"];
$password=$_POST["password"];
$email=$_POST["email"];
$mobile=$_POST["phone"];
$age=$_POST["age"];
$gender=$_POST["gen"];
$sql="SELECT COUNT(*) as cntUser FROM users WHERE username='".$user."'";
$result=mysqli_query($conn, $sql);
$row=mysqli_fetch_assoc($result);
$count=$row['cntUser'];
if($count>0)
	echo "Username already exists";
else	
{
	$stmt=$conn->prepare("INSERT INTO users (firstname, lastname, username, password, email, mobile, age, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
	$stmt->bind_param("ssssssss", $first, $last, $user, $password, $email, $mobile, $age, $gender);
	$stmt->execute();
	if($stmt->error)	
		echo "User already exists";
	else
		header('Location: login.php');
	$stmt->close();
}
$conn->close();
?>