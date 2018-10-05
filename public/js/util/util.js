/************************************************************************************* 
* ADD-ON WEB JS UTILITY
* Created & developed by: Nguyen Tan Phu
*
* This utility consists of several of function which is used in some works:
* - Ajax refactor functions
* - Object add-on functions
*************************************************************************************/

//==================================================================================
// AJAX REFACTOR
//==================================================================================

function AJUtil(){};

AJUtil.getJSON = async(path) => await $.getJSON(path);

AJUtil.getSingleJSON = async(path, id) => await $.getJSON(`${path}/${id}`);

AJUtil.put = async(url, data) => await $.ajax({method: "PUT", url: url, data: data});

//==================================================================================
// FORM ADD-ON FUNCTIONS
//==================================================================================

function FormUtil(){};

/* 
	getValues(cssClass) - Used in front-end
	This method accepts a cssClass and return list of values of inputs which has that cssClass
*/
FormUtil.getValues = (cssClass) => Array.from($(cssClass)).map(val => $(val).val());

FormUtil.getObjectValues = (cssClass, ...keys) => {
	let values = FormUtil.getValues(cssClass);
	return ObjectUtil.addKeyValue(values, ...keys);
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