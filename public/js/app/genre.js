$(function(){
	loadGenre();
	$("tbody").on("click", ".delete", (e) => removeGenre($(e.target).closest(".delete").parents("tr")));
	$("tbody").on("click", ".edit", async(e) => editGenre($(e.target).closest(".edit").parents("tr")));
	$("#addNew").on("click", () => createInterface());
	$("#save").on("click", async() => interactGenre());
	$("#cancel").on("click", () => cancelForm());
})

//==============================================================================
// WORKING WITH DATA & MANIPULATE
//==============================================================================
function loadGenre(){
	$("#genreTable").DataTable({
		ajax: {
			url: "/api/genre",
			dataSrc: (data) => Array.from(data).reverse()
		},
		columns: [
			{data: "name"},
			{data: "description"},
			{
				render: () => `<button class="btn btn-success btn-sm edit">Edit</button>
							<button class="btn btn-danger btn-sm delete">Delete</button>`
			}
		],
		order: [],
		createdRow: (row, data, index) => $(row).data("info", data)
	});
}

async function removeGenre(genre){
	await $.ajax({method: "DELETE", url: `/api/genre/${(genre.data("info"))._id}`});
	reloadTable();
}

function interactGenre(){
	if($("#save").text() === "Confirm")
		storeGenre();
	else
		updateGenre();
}

async function storeGenre(){
	await $.post("/api/genre", gatherInput());
	reloadTable();
}

function editGenre(genre){
	updateInterface();
	bindData(genre);
}

async function updateGenre(){
	await $.ajax({method: "PUT", url: "/api/genre/" + $("#save").data("id"), data: gatherInput()});
	reloadTable();
}

function bindData(genre){
	FormUtil.bindObject(".enterGenre", genre.data("info"));
	$("#save").data("id", (genre.data("info"))._id);
}

const gatherInput = () => FormUtil.getObject(".enterGenre");

function cancelForm(){
	resetForm();
	$("#overlay").toggleClass("hide");
}

//==============================================================================
// DRAW HTML
//==============================================================================
function createInterface(){
	resetForm();
	$("#save").html(`Confirm`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Create new genre");
}

function resetForm(){
	FormUtil.clearForm(".enterGenre");
	$("#save").data("id", "");
}

function updateInterface(){
	resetForm();
	$("#save").html(`Save changes`);
	$("#overlay").toggleClass("hide");
	$(".overlay-content>h2").text("Update genre's information");
}

function reloadTable(){
	$("#overlay").addClass("hide");
	$("#genreTable").DataTable().ajax.reload();
}