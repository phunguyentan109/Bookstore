/**==================================================================================*/
// FORM ADD-ON CLASS
// Developed: Phu Nguyen
// 
// This class is created for making the fom - data manipulation becomes more and more 
// convenient.  
/*==================================================================================*/

export default class FormUtil{

	static clearForm(cssClass){
		return Array.from($(cssClass)).map(val => $(val).val(""));
	}

	static getObject(cssClass){
		let obj = {};
		Array.from($(`${cssClass}`)).map(val => {
			let pair = $(val);
			obj[pair.attr("name")] = pair.val();
		})
		return obj;
	}

	static bindObject(cssClass, obj){
		for(let key of Object.keys(obj)){
			let selector = $(`${cssClass}[name = '${key}']`);
			let data = FormHelper.getTypeData(selector.data("type"), obj[key]);
			selector.val(data);
		}
	}

}

class FormHelper{

	static getTypeData(type, val) {
		if(Array.isArray(val) && val.length > 0 && type === "paragraphs")
			return val.reduce((acc, next) => acc += next + "\n", "");
		return val !== null ? val.toString() : val;
	}
	
}