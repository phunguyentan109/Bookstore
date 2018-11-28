$(function(){
	$(".forgetPanel>div>p:nth-of-type(3) span, form + a").on("click", animateLoginForgot);
});

//================================================================================
// DRAWING SECTION
//================================================================================
function animateLoginForgot(){
	configLoginForgot();
	setTimeout(() => {
		$(".contentLogin").toggleClass("hide");
		$(".forgetPanel").toggleClass("hide");
	}, 650);
}

function configLoginForgot(){
	$(".customize-md-6:nth-of-type(1)").toggleClass("content-left-appear").toggleClass("content-left-disappear");
	$(".customize-md-6:nth-of-type(2)").toggleClass("content-right-appear").toggleClass("content-right-disappear");
	$(".forgetPanel>div:nth-of-type(1)").toggleClass("forgot-left-appear").toggleClass("forgot-left-disappear");
	$(".forgetPanel>div:nth-of-type(2)").toggleClass("forgot-right-appear").toggleClass("forgot-right-disappear");
}

