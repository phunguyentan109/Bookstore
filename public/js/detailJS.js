$(function(){
	$(".btn-watched").on("click", function(){
		$(".each-watched").toggleClass("hide-watched");
	});

	$("#writeCmt").on("click", () => {
		$("#cmtInput").toggleClass("hideInput");
		$("#avaImg").toggleClass("hideInput");
		$("#placeWrite").toggleClass("hideInput");
	}); 
})