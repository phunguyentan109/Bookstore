$(async() => {
	$(".checkoutPage").hide();
	let carts = await getCartList();
	if(carts.length > 0){
		$(".noBookPlace").hide();
		$(".checkoutPage").show();
		var sum = 0;
		carts.forEach(function(cart){
			addCart(cart);
			if(cart.book.discount > 0){
				sum += (cart.book.price*(100-cart.book.discount)/100)*cart.quantity;
			} else {
				sum += cart.book.price*cart.quantity;
			}
		});
		addTotal(sum.toFixed(2));
	} else {
		$(".noBookPlace").show();
	}

	$(".listCart").on("click", "#increase", (e) => {
		let target = $(e.target).closest("#increase").parent().children(".quantity");
		retrieveAmount(target, Number(target.text())+1);
	});

	$(".listCart").on("click", "#decrease", (e) => {
		let target = $(e.target).closest("#decrease").parent().children(".quantity");
		retrieveAmount(target, Number(target.text())-1);
	});

	$(".listCart").on("click", ".remove", function(){
		deleteCart($(this).parents(".book-row"));
	})
});

//==================================================================================
// GET JSON DATA
//==================================================================================

const getCartList = async() => await $.getJSON("/api/cart");

//==================================================================================
// WORKING WITH DATA ON FRONTEND 
//==================================================================================

function retrieveAmount(target, num){
	if(target.text() <= 10 && num <= 10){
		$(".btn").toggleClass("disabled");
		changeQuantity(target.parents(".book-row"), num);
	} else {
		alert("Only 10 items for each product is allowed!");
	}
}

function addTotal(sum){
	$("#notional").text(`$${sum}`);
	$("#subtotal").text(`$${Number(sum)+15}`);
}

//==================================================================================
// DRAW HTML 
//==================================================================================

function addCart(cart){
	var deliveryHtml = '<span class="type standard"><i class="fas fa-truck space-icon"></i>Standard</span>';
	if(cart.book.deliveryFast){
		deliveryHtml = '<span class="type fast"><i class="fas fa-rocket space-icon"></i>Fast Delivery</span>';
	}
	var price = `<h4 class="price">$${(cart.book.price*cart.quantity).toFixed(2)}</h4>`;
	if(cart.book.discount > 0){
		price = `<h4 class="price">$${((cart.book.price*(100-cart.book.discount)/100)*cart.quantity).toFixed(2)}</h4>
				<p class="old-price">$${(cart.book.price*cart.quantity).toFixed(2)}</p>
				<p class="discount">-${cart.book.discount}%</p>`;
	}
	var newBook = $('<div class="row book-row">'+
						'<div class="col-md-6 detail-content">'+
							'<img src="'+cart.book.image+'" class="cart-img">'+
							'<div>'+
								'<h4 class="name">'+cart.book.name+'</h4>'+
								'<p class="author">'+cart.book.author.name+'</p>'+
								'<p class="delivery">'+deliveryHtml+'</p>'+
								'<p class="option">'+
									'<a href="#">Wishlist</a>'+
									'<a href="#" class="remove">Remove</a>'+
								'</p>'+
							'</div>'+
						'</div>'+
						'<div class="col-md-3">'+price+'</div>'+
						'<div class="col-md-3">'+
							'<div class="amountEdit">'+
								'<button class="btn btn-default" id="decrease"><i class="fas fa-minus icon-amount"></i></button>'+
								'<p class="quantity">'+cart.quantity+'</p>'+
								'<button class="btn btn-default" id="increase"><i class="fas fa-plus icon-amount"></i></button>'+
							'</div>'+
						'</div>'+
					'</div>');
	newBook.data("id", cart._id);
	$(".listCart").append(newBook);
}

//==================================================================================
// CALL AJAX 
//==================================================================================

async function changeQuantity(cart, quantity){
	let updateQuantity = await $.ajax({
		method: 'PUT',
		url: '/api/cart/' + cart.data("id"),
		data: {amount: quantity}
	})
	$(".btn").toggleClass("disabled");
	cart.find(".quantity").text(quantity);
};

async function deleteCart(cart){
	let deletedCart = await $.ajax({
		method: 'DELETE',
		url: '/api/cart/' + cart.data("id")
	})
	cart.remove();
	let carts = await $.getJSON("api/cart/")
	if(carts.length == 0){			
		$(".checkoutPage").hide();
		$(".noBookPlace").show();
	}
}
