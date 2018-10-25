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

FormUtil.getValues = (cssClass) => Array.from($(cssClass)).map(val => $(val).val());

FormUtil.getObjectValues = (cssClass, ...keys) => {
	let values = FormUtil.getValues(cssClass);
	return ObjectUtil.addKeyValue(values, ...keys);
}

// used in address.js, user.js
FormUtil.clearForm = (cssClass) => Array.from($(cssClass)).map(val => $(val).val(""));

// used in address.js, complete.js
FormUtil.getObject = (cssClass) => {
	let obj = {};
	Array.from($(`${cssClass}`)).map(val => {
		let pair = $(val);
		obj[pair.attr("name")] = pair.val();
	})
	return obj;
}

//==================================================================================
// OBJECT ADD-ON FUNCTIONS
//==================================================================================

function ObjectUtil(){};

ObjectUtil.addKeyValue = (values, ...keys) => {
	let obj = {};
	for(var i = 0; i < keys.length; i++){
		obj[keys[i]] = values[i];
	}
	return obj;
}