var a=document.getElementById("profnav");
var adata=a.textContent;
document.getElementById("prof").innerHTML=adata;

function openFullscreen() 
{
	if(document.fullscreenElement)
	{
		document.exitFullscreen()
	}
		
	else
	{
		document.documentElement.requestFullscreen();
	}
}
function openFullscreen2() 
{
	document.getElementById("m").requestFullscreen();
}