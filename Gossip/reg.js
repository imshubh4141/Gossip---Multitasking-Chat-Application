function first()
{
	var x1=document.getElementById("firstname").value;
    if(x1.length>20)
	{
		document.getElementById("sub").disabled=true;
        return false;
	}
	else
	{
		document.getElementById("sub").disabled=false;
		return true;
	}
}
function last()
{
	var x2=document.getElementById("lastname").value;
    if(x2.length>20)
	{
		document.getElementById("sub").disabled=true;
        return false;
	}
	else
	{
		document.getElementById("sub").disabled=false;
		return true;
	}
}
function pass()
{
	var p=document.getElementById("password").value;
	if(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(p))
	{
		var b=document.getElementById("invalidpassword");
		document.getElementById("pass").removeChild(b);
		document.getElementById("sub").disabled=false;
		return (true);		
	}
    var a=document.createElement("p");
	a.setAttribute("id","invalidpassword");
	document.getElementById("pass").appendChild(a);
	document.getElementById("invalidpassword").innerHTML="Invalid Password";
	document.getElementById("sub").disabled=true;
    return (false);
}
function show() 
{ 
	var temp=document.getElementById("password"); 
    if (temp.type=="password") 
		temp.type="text";  
	else
		temp.type="password";  
} 
function show1() 
{ 
	var temp1=document.getElementById("confirmpassword"); 
    if (temp1.type=="password") 
		temp1.type="text";  
	else
		temp1.type="password";  
} 
function show3() 
{ 
	var temp1=document.getElementById("otp"); 
    if (temp1.type=="password") 
		temp1.type="text";  
	else
		temp1.type="password";  
} 
function confirm()
{
	var x1=document.getElementById("password").value;
	var x2=document.getElementById("confirmpassword").value;
	var b=document.createElement("p");
		b.setAttribute("id","invalidpass");		
		document.getElementById("con").appendChild(b);
	var a=document.createElement("p");
		a.setAttribute("id","Validpass");
		document.getElementById("con").appendChild(a);
    if(x1==x2)
	{
		var b=document.getElementById("invalidpass");
		document.getElementById("con").removeChild(b);
		document.getElementById("Validpass").innerHTML="Passwords match";
		document.getElementById("sub").disabled=false;
        return true;
	}
	else
	{
		var a=document.getElementById("Validpass");
		document.getElementById("con").removeChild(a);
		document.getElementById("invalidpass").innerHTML="Passwords dont match";
		document.getElementById("sub").disabled=true;
		return false;
	}
}
function mob()
{
	var x1=document.getElementById("number").value;
    if (x1.length==10)
	{
		document.getElementById("sub").disabled=false;
		return true;
	}
	else
	{
		document.getElementById("sub").disabled=true;
        return false;
	}
}
function ag()
{
	var h1=document.getElementById("age").value;
	if(h1<16)
	{
		var z=document.createElement("p");
		z.setAttribute("id","invalidage");
		document.getElementById("ag").appendChild(z);
		document.getElementById("invalidage").innerHTML="Age should be atleast 16 yrs";
		document.getElementById("sub").disabled=true;
        return false;
	}
	else
	{
		var z=document.getElementById("invalidage");
		document.getElementById("ag").removeChild(z);
		document.getElementById("sub").disabled=false;
		return true;
	}
}
var a=document.getElementById("verify");
var adata=a.textContent;
document.getElementById("invalid").innerHTML=adata;
if(adata.length<30)
	document.getElementById("invalid").style.display="inline";