$(function(){
	loadAddress();
	$("tbody").on("click", ".delete", (e) => removeAddress($(e.target).closest(".delete").parents("tr")));
	$("tbody").on("click", ".edit", async(e) => editAddress($(e.target).closest(".edit").parents("tr")));
	$("#addNew").on("click", () => createInterface());
	$("#save").on("click", async() => interactAddress());
	$("#cancel").on("click", () => cancelForm());
})

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
const getID = () => (window.location.pathname).substring((window.location.pathname).lastIndexOf("/") + 1);

function loadAddress(){
	$("#addressTable").DataTable({
		ajax: {
			url: "/api/user/" + getID(),
			dataSrc: (data) => Array.from(data.address).reverse()
		},
		columns: [
			{data: "receiver"},
			{data: "address"},
			{data: "city"},
			{data: "country"},
			{data: "phone"},
			{
				render: () => `<button class="btn btn-success btn-sm edit">Edit</button>
							<button class="btn btn-danger btn-sm delete">Delete</button>`
			}
		],
		order: [],
		createdRow: (row, data, index) => $(row).data("id", data._id)
	});
}

async function removeAddress(address){
	await $.ajax({method: "DELETE", url: `/api/address/${address.data("id")}`});
	reloadTable();
}

function interactAddress(){
	if($("#save").text() === "Confirm")
		storeAddress();
	else
		updateAddress();
}

const gatherInput = () => FormUtil.getObject(".enterAddress"); 

async function storeAddress(){
	await $.post("/api/address", {address: gatherInput(), user: getID()});
	reloadTable();
}

function editAddress(address){
	updateInterface();
	bindData(address);
}

async function updateAddress(address){
	await $.ajax({method: "PUT", url: "/api/address/" + $("#save").data("id"), data: gatherInput()});
	reloadTable();
}

function bindData(address){
	$("#receiver").val(address.children("td:nth-of-type(1)").text());
	$("#address").val(address.children("td:nth-of-type(2)").text());
	$("#city").val(address.children("td:nth-of-type(3)").text());
	$("#country").val(address.children("td:nth-of-type(4)").text());
	$("#phone").val(address.children("td:nth-of-type(5)").text());
	$("#save").data("id", address.data("id"));
}

function cancelForm(){
	resetForm();
	$("#overlay").toggleClass("hide");
}

//==================================================================================
// DRAW INTERFACE
//==================================================================================
function resetForm(){
	FormUtil.clearForm(".enterAddress");
	$("#save").data("id", "");
}

function createInterface(){
	resetForm();
	$("#save").html(`Confirm`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Create new address");
}

function updateInterface(){
	resetForm();
	$("#save").html(`Save changes`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Update address's information");
}

function reloadTable(){
	$("#overlay").addClass("hide");
	$("#addressTable").DataTable().ajax.reload();
}