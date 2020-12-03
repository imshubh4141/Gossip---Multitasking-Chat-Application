<?php
include 'dbconnection.php';

$user=$_POST["username"];
$password=$_POST["password"];
if($user!="" && $password!="")
{
	$sql_query="select count(*) as cntUser from users where username='".$user."' and password='".$password."'";
    $result=mysqli_query($conn,$sql_query);
    $row=mysqli_fetch_array($result);
    $count=$row['cntUser'];
    if($count>0)
	{
    	$_SESSION['username']=$user;
        header('Location: homepage.php');
		$file=fopen("user.txt","w") or die("Unable to open file!");
		fwrite($file,$user);
		fclose($file);
    }
	else
	{
    	echo "Invalid username/password";
    }
}
?>