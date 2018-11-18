$(function(){
	$(".forgetPanel>div>p:nth-of-type(2)").hide();
	// $(".content").hide();

	$(".intro-content>button").click(() => {
		$(".register-form form")[0].reset();
		clearAnimation();
		handleChangeMode();
	});

	$(".forgetPanel button").on("click", () => forgetSubmit());
});

// GLOBAL VARIABLE
let btn = $(".register-form>div>form>button");

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
function handleChangeMode(){
	Array.from($(".register-form form>.appear")).forEach(val => $(val).toggleClass("signup-appear"));
	toggleTitle("0");
	toggleRequest("0");
	if($(".register-form>div>h2").text() === "Login"){
		modeSignUp();
	} else {
		modeSignIn();
	}
	setTimeout(() => toggleTitle("1"), 800);
}

function modeSignUp(){
	btn.addClass("hideSItoSU");
	setTimeout(() => {
		btn.removeClass("hideSItoSU").addClass("modeSignUp").text("Register");
		toRegisterAction();
	}, 800);
}

function modeSignIn(){
	btn.removeClass("modeSignUp").addClass("hideSUtoSI");
	setTimeout(() => {
		btn.removeClass("hideSUtoSI").text("Sign in");
		toLoginAction();
	}, 800);
}

async function forgetSubmit(){
	try{
		FormUtil.onLoading(".forgetPanel button");
		let email = $(".forgetPanel input").val();
		let msg = await $.post("/api/user/forgot", {email: email});
		drawMsg(msg);
		FormUtil.offLoading(".forgetPanel button", "confirm email");
	}catch(err){
		console.error(err);
	}	
}

//==================================================================================
// DRAW INTERFACE
//==================================================================================
function clearAnimation(){
	btn.removeClass("btnSignup-appear");
	$(".intro-content>button").removeClass("beMember-appear");
	$(".intro-content>p:nth-of-type(2)").removeClass("beMember-appear");
	$(".register-form>div>h2").removeClass("name-appear");
	$(".register-form>div>p").removeClass("slogan-appear");
}

function toggleRequire(agree){
	$(".register-form form>div:nth-of-type(2) input").prop("required", agree);
	$(".register-form form>div:nth-of-type(3) input").prop("required", agree);
	$(".register-form form>div:nth-of-type(5) input").prop("required", agree);
}

function toRegisterAction(){
	$(".register-form>div>h2").text("Sign Up");
	$(".register-form>div>p").text("Enter required information below to register.");
	toggleRequire(true);
	$(".register-form form").attr("action", "/register");
	requestGetAccess();
}

function toLoginAction(){
	$(".register-form>div>h2").text("Login");
	$(".register-form>div>p").text("Enter your username and password to log on.");
	toggleRequire(false);
	$(".register-form form").attr("action", "/login");
	requestJoinUs();
}

function toggleTitle(agree){
	$(".register-form>div>h2").css("opacity", agree);
	$(".register-form>div>p").css("opacity", agree);
}

function requestGetAccess(){
	$(".intro-content>button").text("Get Access").toggleClass("join-color");
	$(".intro-content>p:nth-of-type(2)").text("Already have account? Login your account here:");
	toggleRequest("1");
}

function requestJoinUs(){
	$(".intro-content>button").text("Join Us").toggleClass("join-color");
	$(".intro-content>p:nth-of-type(2)").text("Don't have account? Want to be a member?");
	toggleRequest("1");
}

function toggleRequest(agree){
	$(".intro-content>button").css("opacity", agree);
	$(".intro-content>p:nth-of-type(2)").css("opacity", agree);
}

function drawMsg(msg){
	let announce = $(".forgetPanel>div>p:nth-of-type(2)");
	switch(msg){
		case "noexist":
		announce.html(`<i data-eva="alert-triangle-outline" data-eva-width="20" data-eva-height="20" data-eva-fill="#e0e0e0"></i> No account with that email address exists`);
		announce.addClass("error");
		break;
		case "sent":
		announce.html(`<i data-eva="checkmark-circle-outline" data-eva-width="20" data-eva-height="20" data-eva-fill="#e0e0e0"></i> An email has been sent to <span>${$(".forgetPanel input").val()}</span>`);
		announce.addClass("success");
		break;
	}
	eva.replace();	
	announce.show();
	$(".forgetPanel input").val("");
}