$(function(){
	$.getJSON("/api/cart")
	.then(function(carts){
		if(carts.length > 0){
			var sum = 0;
			carts.forEach(function(cart){
				addCart(cart);
				if(cart.book.discount > 0){
					sum += (cart.book.price*(100-cart.book.discount)/100)*cart.quantity;
				} else {
					sum += cart.book.price*cart.quantity;
				}
			});
			addTotal(sum);
		} else {
			createEmptyCart();
		}
	})

	$(".listCart").on("click", "#increase", function(){
		var quantity = Number($("#quantity").text());
		if(quantity < 10){
			$(".btn").toggleClass("disabled");
			changeQuantity($(this).parents(".book-row"), quantity+1);
		} else {
			alert("The item has reached the max quantity allowed");
		}
	});

	$(".listCart").on("click", ".remove", function(){
		deleteCart($(this).parents(".book-row"));
	})
});

function addCart(cart){
	var deliveryHtml = '<span class="type standard"><i class="fas fa-truck space-icon"></i>Standard</span>';
	if(cart.book.deliveryFast){
		deliveryHtml = '<span class="type fast"><i class="fas fa-rocket space-icon"></i>Fast Delivery</span>';
	}
	var price = '<h4 class="price">'+cart.book.price*cart.quantity+'đ</h4>';
	if(cart.book.discount > 0){
		price = '<h4 class="price">'+(cart.book.price*(100-cart.book.discount)/100)*cart.quantity+'đ</h4>'+
				'<p class="old-price">'+cart.book.price*cart.quantity+'đ</p>'+
				'<p class="discount">-'+cart.book.discount+'%</p>';
	}
	var interface = $('<h4 class="content-title" id="bookListHeader"><i class="fas fa-list-ul cate-icon"></i> Your cart</h4>'+
				 	  '<div class="row cheader">'+
						'<div class="col-md-6">Books</div>'+
						'<div class="col-md-3">Price</div>'+
						'<div class="col-md-3">Amount</div>'+
					  '</div>');
	var newBook = $('<div class="row book-row">'+
						'<div class="col-md-6 detail-content">'+
							'<img src="'+cart.book.image+'" class="cart-img">'+
							'<div>'+
								'<h4 class="name">'+cart.book.name+'</h4>'+
								'<p class="author">'+cart.book.author+'</p>'+
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
								'<p id="quantity">'+cart.quantity+'</p>'+
								'<button class="btn btn-default" id="increase"><i class="fas fa-plus icon-amount"></i></button>'+
							'</div>'+
						'</div>'+
					'</div>');
	newBook.data("id", cart._id);
	$(".listCart").append(interface);
	$(".listCart").append(newBook);
}

function addTotal(total){
	var totalHtml = $('<div class="col-md-4 totalContent">'+
						'<h4 class="content-title"><i class="fas fa-list-ul cate-icon"></i> Order Detail</h4>'+
						'<form class="horizon">'+
							'<input type="text" name="" placeholder="Type discount code here...">'+
							'<button>Apply</button>'+
						'</form>'+
						'<p class="applied"><i class="far fa-check-circle"></i> BADC1123423 is used</p>'+
						'<p class="apply-dis"></p>'+
						'<div class="notional">'+
							'<p>Notional Price</p>'+ 
							'<p>'+total+'</p>'+
						'</div>'+
						'<div class="subtotal">'+
							'<p>Total Price</p>'+ 
							'<p>'+total+'</p>'+
						'</div>'+	
					'</div>');
	$(".checkoutPage").append(totalHtml);
}

function createEmptyCart(){
	var noBook = $('<div class="row">'+
						'<div class="col-md-12">'+
							'<h4 class="content-title"><i class="fas fa-list-ul cate-icon"></i> Your cart</h4>'+
							'<div class="no-item">'+
								'<i class="fas fa-cart-arrow-down fa-6x"></i>'+
								'<p>You have no book in your cart. Continue shopping?</p>'+
								'<a href="/store">Back to store</a>'+
							'</div>'+
						'</div>'+
					'</div>');
	$(".noBookPlace").append(noBook);
};

function changeQuantity(cart, quantity){
	$.ajax({
		method: 'PUT',
		url: '/api/cart/' + cart.data("id"),
		data: {amount: quantity}
	}).then(function(data){
		$(".btn").toggleClass("disabled");
		$("#quantity").text(quantity);
	})
	.catch(function(err){
		console.log(err);
	});
};

function deleteCart(cart){
	$.ajax({
		method: 'DELETE',
		url: '/api/cart/' + cart.data("id")
	}).then(function(data){
		cart.remove();
		$.getJSON("api/cart/")
		.then(function(carts){
			if(carts.length == 0){			
				$("#bookListHeader").remove();
				$(".cheader").remove();
				$(".totalContent").remove();
				createEmptyCart();
			}
		})
	}).catch(function(err){
		console.log(err);
	})
}
