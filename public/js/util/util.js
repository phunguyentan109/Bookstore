/************************************************************************************* 
* ADD-ON WEB JS UTILITY
* Created & developed by: Nguyen Tan Phu
*
* This utility consists of several of function which is used in some works:
* - Ajax refactor functions
* - Object add-on functions
*************************************************************************************/

//==================================================================================
// FORM ADD-ON FUNCTIONS
//==================================================================================

function FormUtil(){};

// used in address.js, customer-address.js, customer.js
FormUtil.clearForm = (cssClass) => Array.from($(cssClass)).map(val => $(val).val(""));

// used in complete.js, address.js, complete.js, new-book.js
FormUtil.getObject = (cssClass) => {
	let obj = {};
	Array.from($(`${cssClass}`)).map(val => {
		let pair = $(val);
		obj[pair.attr("name")] = pair.val();
	})
	return obj;
}

//==================================================================================
// HTML ADD-ON FUNCTIONS
//==================================================================================

function HtmlUtil(){};

// used in new-book.js
HtmlUtil.showEmpty = (parent) => {
	let allChildren = $(parent).children().prop("tagName");
	let empty = $(`${allChildren}[name="empty"]`);
	let children = Array.from($(parent).children()).filter(child => $(child).attr("name") !== "empty");
	if(children.length === 0){
		$(empty).show();
	} else {
		$(empty).hide();
	}
}

// used in new-book.js
HtmlUtil.get$data = (selector, dataName) => Array.from($(selector)).map(val => $(val).data(dataName));

// used in new-book.js
HtmlUtil.disableBtn = (...selector) => {
	selector.forEach(val => {
		if($(val).attr("href") === "")
			$(val).attr("disabled", true);
		else
			$(val).attr("onclick", "return false;");
	})
}
HtmlUtil.enableBtn = (...selector) => {
	selector.forEach(val => {
		if($(val).attr("href") === "")
			$(val).attr("disabled", false);
		else
			$(val).removeAttr("onclick");
	})
};

// used in newbook.js
HtmlUtil.animateBtn = (selector) => $(selector).children("i").addClass("fa fa-spinner fa-spin");
HtmlUtil.unanimateBtn =  (selector) => $(selector).children("i").removeClass("fa fa-spinner fa-spin");

//==================================================================================
// HTML ADD-ON FUNCTIONS
//==================================================================================

function UploadUtil(){};

// used in new-book.js
UploadUtil.getUrl = (selector) => {
	let _url = window.URL || window.webkitURL;
	let file = $(selector)[0].files[0];
	$(selector).data()
	$(selector).replaceWith($(selector).val('').clone(true));
	return {detail: file, url: _url.createObjectURL(file)};
}