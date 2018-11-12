$(function(){

	$(".join").click(() => {
		resetForm();
		clearBeginAnimation();
		
		//add some field box for typing information and change the button
		prepareSignUp();
		if($(".button-signup").css("margin-top") === "7.01563px"){
			$(".button-signup").removeClass("show_btn_si");
			$(".button-signup").css("opacity", "0");
			$(".button-signup").css("transform", "translateX(-40px)")
			setTimeout(function(){
				$(".button-signup").css("opacity", "1");
				$(".button-signup").css("transform", "translateX(0px)");
				$(".button-signup").toggleClass("show_btn_su");
				$(".button-signup").text("Register");
			}, 800);
		} else {
			$(".button-signup").css("opacity", "0");
			$(".button-signup").css("transform", "translateX(40px)")
			$(".button-signup").toggleClass("show_btn_su");
			setTimeout(function(){
				$(".button-signup").css("opacity", "1");
				$(".button-signup").css("transform", "translateX(0px)");
				$(".button-signup").toggleClass("show_btn_si");
				$(".button-signup").text("Sign in");
			}, 800);
		}

		//change the title and the action of the form
		$(".title").css("opacity", "0");
		$(".title-des").css("opacity", "0");
		setTimeout(function(){
			if($(".title").text() === "Login"){
				$(".title").text("Sign Up");
				$(".title-des").text("Enter required information below to register.");
				$("#email").prop("required", true);
				$("#re-email").prop("required", true);
				$("#re-password").prop("required", true);
				$("#authenForm").attr("action", "/register");
			} else {
				$(".title").text("Login");
				$(".title-des").text("Enter your username and password to log on.");
				$("#email").prop("required", false);
				$("#re-email").prop("required", false);
				$("#re-password").prop("required", false);
				$("#authenForm").attr("action", "/login");
			}
			$(".title").css("opacity", "1");
			$(".title-des").css("opacity", "1");
		}, 800);

		//add valid confirm email and password
		if($(".title").text() === "Sign Up"){
			$("#re-email").on("keyup", validConfirmEmail);
			$("#re-email").on("change", validConfirmEmail);
			$("#re-password").on("keyup", validConfirmPassword);
			$("#re-password").on("change", validConfirmPassword);
		} else {
			$("#re-email").off("keyup");
			$("#re-email").off("change");
			$("#re-password").off("keyup");
			$("#re-password").off("change");
		}

		//change the join us button and the line for become member
		$(".join").css("opacity", "0");
		$(".become-member").css("opacity", "0");
		setTimeout(function(){
			if($(".join").text() === "Join Us"){
				$(".join").text("Get Access");
				$(".join").toggleClass("join-color");
				$(".become-member").text("Already have account? Login your account here:");
				$(".join").css("opacity", "1");
				$(".become-member").css("opacity", "1");
			} else {
				$(".join").text("Join Us");
				$(".join").toggleClass("join-color");
				$(".become-member").text("Don't have account? Want to be a member?");
				$(".join").css("opacity", "1");
				$(".become-member").css("opacity", "1");	
			}
		}, 800)	
	});

	$("#forget").on("click", openForgetForm);
});

function resetForm(){
	$("#authenForm")[0].reset();
	$("#re-email").get(0).setCustomValidity("");
	$("#re-password").get(0).setCustomValidity("");
	clearBeginAnimation();
}

function clearBeginAnimation(){
	$(".button-signup").removeClass("button-signup-appear-bottom");
	$(".join").removeClass("join-appear-left");
	$(".become-member").removeClass("become-member-appear-left");
	$(".title").removeClass("name-appear-up");
	$(".title-des").removeClass("slogan-appear-up");
}

function prepareSignUp(){
	Array.from($(".added")).forEach(val => $(val).toggleClass("signup-appear"));
}

function validConfirmEmail(){
	if($("#re-email").val() !== $("#email").val()){
		$("#re-email").get(0).setCustomValidity("Emails is not matched.");
	} else {
		$("#re-email").get(0).setCustomValidity("");
	}
}

function validConfirmPassword(){
	if($("#re-password").val() !== $("#password").val()){
		$("#re-password").get(0).setCustomValidity("Passwords is not matched.");
	} else {
		$("#re-password").get(0).setCustomValidity("");
	}
}

function openForgetForm(){
	console.log("forget");
}
