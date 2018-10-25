$(function(){
	loadUser();
	$("tbody").on("click", ".delete", (e) => removeUser($(e.target).closest(".delete").parents("tr")));
	$("tbody").on("click", ".edit", async(e) => editUser($(e.target).closest(".edit").parents("tr")));
	$("#addNew").on("click", () => createInterface());
	$("#save").on("click", async() => interactUser());
	$("#cancel").on("click", () => cancelForm());
})

//==================================================================================
// WORKING WITH DATA & MANIPULATE
//==================================================================================
function loadUser(){
	$("#userTable").DataTable({
		ajax: {
			url: "/api/user",
			dataSrc: (data) => Array.from(data).reverse()
		},
		columns: [
			{data: "viewname"},
			{data: "email"},
			{data: "username"},
			{
				data: "_id",
				render: (data, type, row) => `<a href="/app/customer/${data}"><i class="far fa-eye"></i> View list</a>` 
			},
			{
				render: () => `<button class="btn btn-success btn-sm edit">Edit</button>
							<button class="btn btn-danger btn-sm delete">Delete</button>`
			}
		],
		order: [],
		createdRow: (row, data, index) => $(row).data("id", data._id)
	});
}

function interactUser(){
	if($("#save").text() === "Confirm")
		storeUser();
	else
		updateUser();
}

async function storeUser(){
	await $.post("/api/user", gatherInput());
	reloadTable();
}

function editUser(user){
	updateInterface();
	bindData(user);
}

async function updateUser(){
	await $.ajax({method: "PUT", url: "/api/user/" + $("#save").data("id"), data: gatherInput()});
	reloadTable();
}

function bindData(user){
	$("#viewname").val(user.children("td:nth-of-type(1)").text());
	$("#email").val(user.children("td:nth-of-type(2)").text());
	$("#username").val(user.children("td:nth-of-type(3)").text());
	$("#user").val(user.children("td:nth-of-type(4)").text());
	$("#save").data("id", user.data("id"));
}

const gatherInput = () => FormUtil.getObject(".enterUser");

function cancelForm(){
	resetForm();
	$("#overlay").toggleClass("hide");
}

//==================================================================================
// DRAW HTML
//==================================================================================
function createInterface(){
	resetForm();
	$("#save").html(`Confirm`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Create new user");
}

function resetForm(){
	FormUtil.clearForm(".enterUser");
	$("#save").data("id", "");
}

function updateInterface(){
	resetForm();
	$("#save").html(`Save changes`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Update user's information");
}

function reloadTable(){
	$("#overlay").addClass("hide");
	$("#userTable").DataTable().ajax.reload();
}