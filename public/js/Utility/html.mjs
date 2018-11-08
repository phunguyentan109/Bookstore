/*==================================================================================*/
// HTML ADD-ON CLASS
// Developed: Phu Nguyen
// 
// This class is created for manipulating the html tag becomes more and more 
// convenient.  
/*==================================================================================*/

export default class HtmlUtil {

	static showEmpty(parent) {
		let allChildren = $(parent).children().prop("tagName");
		let empty = $(`${allChildren}[name="empty"]`);
		let children = Array.from($(parent).children()).filter(child => $(child).attr("name") !== "empty");
		if(children.length === 0){
			$(empty).show();
		} else {
			$(empty).hide();
		}
	}

	static get$data(selector, dataName) {
		return Array.from($(selector)).map(val => $(val).data(dataName));
	}

	static disableBtn(...selector) {
		selector.forEach(val => {
			if($(val).attr("href") === "")
				$(val).attr("disabled", true);
			else
				$(val).attr("onclick", "return false;");
		});
	}

	static enableBtn(...selector) {
		selector.forEach(val => {
			if($(val).attr("href") === "")
				$(val).attr("disabled", false);
			else
				$(val).removeAttr("onclick");
		});
	};

	static animateBtn(selector) {
		return $(selector).children("i").addClass("fa fa-spinner fa-spin");
	}

	static unanimateBtn(selector) { 
		return $(selector).children("i").removeClass("fa fa-spinner fa-spin");
	}

	static getUrlId() {
		let url = window.location.pathname;
		return url.substring(url.lastIndexOf("/") + 1);
	}

}