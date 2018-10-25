$(async() => {
	calculatePrice();
	$("#btnUseOther").on("click", () => createAddress());
	$(".rowAddress").on("click", "#select", (e) => changeStatus(e));
	$(".editBtn").on("click", (e) => editAddress(e));
	$("#cancel").on("click", () => closeEnterAddress());
	$(".saveAddress").on("click", () => sendFormData());
	$(".rowCare + .row").on("click", ".clickCover", (e) => toggleCover($(e.target).closest(".clickCover")));
	$(".checkBox").on("click", (e) => checkBox($(e.target).closest(".checkBox").children("i")));
	$(".submitOrder").on("click", () => submitOrder());
})

var open = false;

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================

async function calculatePrice(){
	let carts = await $.getJSON("/api/cart");
	if(carts.length > 0){
		$(".noBookPlace").hide();
		$(".checkoutPage").show();
		var sum = 0;
		carts.forEach(cart => {
			if(cart.book.discount > 0){
				sum += (cart.book.price*(100-cart.book.discount)/100)*cart.quantity;
			} else {
				sum += cart.book.price*cart.quantity;
			}
		drawCover(cart);
		});
		setTotal(sum.toFixed(2));
	}
}

function hasAddress(){
	if($(".rowAddress").find(".col-md-6").length > 0){
		return true;
	}
	return false;
}

function changeStatus(e){
	removeSelect();
	addSelect($(e.target).closest("#select"));
}

function editAddress(e) {
	disableAllBtn();
	let address = $(e.target).closest(".editBtn");
	clearForm();
	$("#another").data("add-id", address.parent().children("input").val());
	fillAddress(address.parents(".address-container"));
	$("#another").text("Save changes");
	if(open === false) openEnterAddress();
}

function createAddress(){
	clearForm();
	if(open === false) openEnterAddress();
}

function sendFormData(){
	if($("#another").text() === "Save changes"){
		updateAddress($("#another").data("add-id"));
	} else {
		
	}
}

async function updateAddress(id){
	let data = FormUtil.getObject(".inputValue");
	let address = await $.ajax({method: "PUT", url: `/api/address/${id}`, data: data});
	redrawAddress(address);
	closeEnterAddress();
	clearForm();
}

function findAddress(id){
	let hidden = (Array.from($("input[type='hidden']"))).filter(val => $(val).val() === id);
	return $(hidden[0]).parents(".address-container");
}

function toggleCover(cover){
	if(cover.attr("class") !== "clickCover") uncoverBook(cover);
	else coverBook(cover);
}

async function submitOrder(){
	if($(".selected").length > 0){
		let addressId = $(".selected").parent().children("input").val();
		let address = await $.getJSON("/api/address/" + addressId);
		let total = $("#subtotal").text();
		let order = {...address};
		order.money = Number($("#subtotal").text().substring(1, total.length));
		if($(".fas.fa-check-square").attr("name") === "fast") order.deliveryFast = true;
		let orderId = await $.post("/api/order/new", order);
		let listCover = $(".rowCare + .row>.col-md-2");
		for(let cover of listCover){
			let item = $(cover).data("info");
			let bookOrder = {
				order: orderId,
				book: item.book._id,
				price: item.book.price,
				discount: item.book.discount,
				quantity: item.quantity
			}
			if($(cover).children("div").attr("class") === "selectCover") bookOrder.cover = true;
			await $.post("/api/orbook/new", bookOrder);
		}
		await $.post("/api/cart/clear");
		window.location.href = "/order/" + orderId;
	} else {
		alert("Please select the address for shipment!");
	}
}

//==================================================================================
// DRAW HTML
//==================================================================================

function setTotal(sum){
	$("#notional").text(`$${sum}`);
	$("#shipping").text(`$${15}`);
	$("#cover").text(`$${0}`);
	$("#subtotal").text(`$${Number(sum)+15}`);
}

function drawCover(cart){
	let book = $(`<div class="col-md-2">
					<div style="background-image: url(${cart.book.image})">
						<p class="clickCover"><i class="far fa-bookmark"></i> Try cover?</p>
						<p><i class="fas fa-dollar-sign"></i> 5</p>
					</div>
				</div>`);
	book.data("amount", cart.quantity);
	book.data("info", cart);
	$(".rowCare + .row").append(book);			
}

function addSelect(button){
	button.html(`<i class="fas fa-check"></i> Selected`);
	button.attr("disabled", true);
	button.attr("class", "selected");
}

function removeSelect(){
	let allBtn = $(".rowAddress").find(".selected");
	allBtn.attr("class", "unselected");
	allBtn.html("Use this address");
	allBtn.html("Use this address");
	allBtn.attr("disabled", false);
}

function disableAllBtn(ask){
	removeSelect();
	$(".rowAddress").find(".unselected").attr("disabled", ask);
}

function closeEnterAddress(){
	$("#addContent").addClass("closeDiff");
	$(".eachForm").addClass("closeForm");
	$(".saveAddress").addClass("closeBtn");
	$("#rowDelivery").addClass("hideCheader");
	$(".btnCancel").addClass("closeCancel");
	open = false;
	disableAllBtn(false);
}

function openEnterAddress(){
	open = true;
	disableAllBtn(true);
	$("#addContent").removeClass("closeDiff");
	$(".eachForm").removeClass("closeForm");
	$(".saveAddress").removeClass("closeBtn");
	$("#rowDelivery").removeClass("hideCheader");
	$(".btnCancel").removeClass("closeCancel");
}

function fillAddress(address){
	$("#receiver").val(address.children("h3").text());
	let fullAddr = address.children("p")["0"].textContent;
	let splitAddr = fullAddr.substring(8, fullAddr.length).split(", ");
	$("#address").val(splitAddr[0].trim());
	$("#city").val(splitAddr[1]);
	$("#country").val(address.children("p")["1"].textContent);
}

function clearForm(){
	let form = $(".inputValue");
	for(var inp of form) 
		$(inp).val("");
	$("#another").text("Use this address");
	$("#another").data("add-id", "");
}

function redrawAddress(address){
	let addressHTML = findAddress(address._id);
	addressHTML.children("h3").text(address.receiver);
	addressHTML.children("p")["0"].innerHTML = `<b>Address:</b> ${address.address}, ${address.city}</p>`;
	addressHTML.children("p")["1"].textContent = address.country;
}

function coverBook(cover){
	cover.addClass("coverHor");
	cover.html(`<i class="fas fa-bookmark"></i> Covered!`);
	cover.parent().children("p:nth-of-type(2)").addClass("cover");
	cover.parent().addClass("selectCover");
	
	let price = 5 * cover.parents(".col-md-2").data("amount");
	cover.parent().children("p:nth-of-type(2)").html(`<i class="fas fa-dollar-sign"></i> ${price}`);
	addPrice("#cover", price);
}

function uncoverBook(cover){
	cover.removeClass("coverHor");
	cover.html(`<i class="far fa-bookmark"></i> Try cover?`);
	cover.parent().children("p:nth-of-type(2)").removeClass("cover");
	cover.parent().removeClass("selectCover");
	let price = 5 * cover.parents(".col-md-2").data("amount");
	subPrice("#cover", price);
}

function checkBox(e){
	if(e.attr("class") === "fas fa-square"){
		removeCheckBox();
		e.attr("class", "fas fa-check-square");
		if(e.attr("name") === "fast") addPrice("#shipping", 5);
		else subPrice("#shipping", 5);	
	}
}

function removeCheckBox(){
	for(var check of $(".fas.fa-check-square")){
		$(check).attr("class", "fas fa-square");
	}
}

function addPrice(selector, number){
	let current = $(selector).text();
	$(selector).css("font-weight", "bold");
	if(current.indexOf("+") === -1){
		let curNumber = Number(current.substring(1, current.length));
		$(selector).html(`$${number + curNumber} <small>+${number}</small>`);
	} else {
		let addLength = $(`${selector}>small`).text().length + 1;
		let curNumber = Number(current.substring(1, current.length - addLength));
		let addNum = Number($(`${selector}>small`).text());
		$(selector).html(`$${number + curNumber} <small>+${number + addNum}</small>`);
	}
	addTotalPrice(number);
}

function subPrice(selector, number){
	let current = $(selector).text();
	let addLength = $(`${selector}>small`).text().length + 1;
	let curNumber = Number(current.substring(1, current.length - addLength));
	let left = Number($(`${selector}>small`).text()) - number;
	if(left <= 0){
		$(selector).html(`$${curNumber - number}`);
		$(selector).css("font-weight", "normal");
	} else {
		$(selector).html(`$${curNumber - number} <small>+${left}</small>`);
	}
	subTotalPrice(number);
}

function addTotalPrice(number){
	let current = $("#subtotal").text();
	let currentNum = Number(current.substring(1, current.length));
	$("#subtotal").css("font-weight", "bold");
	$("#subtotal").text(`$${currentNum + number}`);
}

function subTotalPrice(number){
	let current = $("#subtotal").text();
	let currentNum = Number(current.substring(1, current.length));
	$("#subtotal").text(`$${currentNum - number}`);
	if($("#cover").text().indexOf("+") === -1 && $("#shipping").text().indexOf("+") === -1){
		$("#subtotal").css("font-weight", "normal");
	}
}











