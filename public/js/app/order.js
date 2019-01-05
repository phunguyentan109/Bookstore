$(function(){
    loadOrder();
    $("tbody").on("click", ".cancel", (e) => updateStatus($(e.target).closest(".cancel").parents("tr"), "Cancelled"));
    $("tbody").on("click", ".complete", (e) => updateStatus($(e.target).closest(".complete").parents("tr"), "Completed"));
})

function loadOrder() {
    $("#orderTable").DataTable({
        ajax: {
            url: "/api/order",
            dataSrc: (data) => Array.from(data).reverse()
        },
        columns: [
            {
                data: "_id",
                render: (data) => {
                    return `#KB${data.substring(0,5).toUpperCase()}`;
                }
            },
            {data: "receiver"},
            {data: "dateCreated"},
            {data: "money"},
            {data: "status"},
            {
				render: () => `<button class="btn btn-danger btn-sm cancel">Cancelled</button>
                                <button class="btn btn-success btn-sm complete">Completed</button>`
			}
        ],
        order: [],
        createdRow: (row, data, index) => $(row).data("id", data._id)
    })
}

async function updateStatus(order, state){
    await $.ajax({
        method: "PUT",
        url: "/api/order/" + order.data("id"),
        data: {status: state}
    });
    reloadTable();
}

function reloadTable(){
	$("#orderTable").DataTable().ajax.reload();
}
