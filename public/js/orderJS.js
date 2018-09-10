$(async() => {
	let carts = await getCartList();
	if(carts.length > 0){
		$(".noBookPlace").hide();
		$(".checkoutPage").show();
		var sum = 0;
		carts.forEach(function(cart){
			if(cart.book.discount > 0){
				sum += (cart.book.price*(100-cart.book.discount)/100)*cart.quantity;
			} else {
				sum += cart.book.price*cart.quantity;
			}
		});
		addTotal(sum.toFixed(2));
	}

	$("#btnUseOther").on("click", () => {
		$("#addContent").toggleClass("closeDiff");
		$(".eachForm").toggleClass("closeForm");
		$(".saveAddress").toggleClass("closeBtn");
	});
})

//==================================================================================
// GET JSON DATA
//==================================================================================

const getCartList = async() => await $.getJSON("/api/cart");

//==================================================================================
// WORKING WITH DATA ON FRONTEND 
//==================================================================================

function addTotal(sum){
	$("#notional").text(`$${sum}`);
	$("#subtotal").text(`$${Number(sum)+15}`);
}