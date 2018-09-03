function fillMsg(msg, icon = "far fa-check-circle"){
	document.getElementById("icon").className = icon;
	$("#message").text(msg);
	showSnack();
}

function showSnack(){
	$("#snackbar").toggleClass("hide");
	setTimeout(() => $("#snackbar").toggleClass("hide"), 3000);
}

