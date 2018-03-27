$(document).ready(function(){
	$(".content").toggleClass("content-show");
	setTimeout(function(){
		$(".become-member").toggleClass("join-appear");
		$(".join").toggleClass("join-appear");
		$(".button-signup").toggleClass("show_btn_si");
		setTimeout(function(){
			$(".social-account").toggleClass("social-appear");
			setTimeout(function(){
				$(".button-facebook").toggleClass("btn-appear");
				$(".button-twitter").toggleClass("btn-appear");
				$(".button-google").toggleClass("btn-appear");	
			}, 500);
		}, 500);

	}, 700)

	$(".join").click(function(){
		$(".email").toggleClass("signup-appear");
		$(".re-email").toggleClass("signup-appear");
		$(".re-password").toggleClass("signup-appear");
		if($(".button-signup").css("margin-top") === "7.01563px"){
			$(".button-signup").toggleClass("show_btn_si");
			setTimeout(function(){
				$(".button-signup").toggleClass("show_btn_su");
				$(".button-signup").css("margin-top", "8%");
				$(".button-signup").text("Register");
			}, 800);
		} else {
			$(".button-signup").toggleClass("show_btn_su");
			setTimeout(function(){
				$(".button-signup").toggleClass("show_btn_si");
				$(".button-signup").css("margin-top", "2%");
				$(".button-signup").text("Sign in");
			}, 800);
		}
	});	
});
