$(async() => {
	calculatePrice();
	$("#btnUseOther").on("click", () => createAddress());
	$(".rowAddress").on("click", "#select", (e) => changeStatus(e));
	$(".editBtn").on("click", (e) => editAddress(e));
	$("#cancel").on("click", () => closeEnterAddress());
	$(".saveAddress").on("click", () => sendFormData());
})

var open = false;

//==================================================================================
// WORKING WITH DATA 
//==================================================================================

async function calculatePrice(){
	let carts = await AJUtil.getJSON("/api/cart");
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
	let data = FormUtil.getObjectValues(".inputValue", "receiver", "address", "city", "country");
	let address = await AJUtil.put(`/api/address/${id}`, data, {new: true});
	redrawAddress(address);
	closeEnterAddress();
	clearForm();
}

function findAddress(id){
	let hidden = (Array.from($("input[type='hidden']"))).filter(val => $(val).val() === id);
	return $(hidden[0]).parents(".address-container");
}

//==================================================================================
// DRAW HTML
//==================================================================================

function setTotal(sum){
	$("#notional").text(`$${sum}`);
	$("#subtotal").text(`$${Number(sum)+15}`);
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









