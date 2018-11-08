/*==================================================================================*/
// UPLOAD ADD-ON CLASS
// Developed: Phu Nguyen
// 
// This class is created for making the uploading becomes more and more 
// convenient.  
/*==================================================================================*/

export default class UploadUtil{

	static getUrl(selector) {
		let _url = window.URL || window.webkitURL;
		let file = $(selector)[0].files[0];
		$(selector).data()
		$(selector).replaceWith($(selector).val('').clone(true));
		return {detail: file, url: _url.createObjectURL(file)};
	}

}