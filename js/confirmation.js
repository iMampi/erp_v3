function openModalConfirmation(modalObj, modeObj) {
	console.log("called confirmation");
	console.log(modalObj);
	modalObj.modal.querySelector(".modal-body").innerHTML = modeObj.message;
	modalObj.bsModal.show();
	// let yesListener =() => {
	// 	// modalObj.bsModal.hide();
	// 	console.log("lieck yes");
	// 	console.log();
	// 	let result = modeObj.yes();
	// 	if (!result) {
	// 		// btnConfirmationYes = btnsConfirmations["clonedBtnYes"];
	// 		// btnConfirmationNo = btnsConfirmations["clonedBtnNo"];
	// 		modalObj.btnYes = modalObj["clonedBtnYes"];
	// 		modalObj.btnYes.removeEventListener("click", yesListener);
	// 		modalObj.btnNo = modalObj["clonedBtnNo"];
	// 	}
	// 	return result};
	function yesListener(){
				console.log("lieck yes");
		let result = modeObj.yes();
		if (!result) {
			// btnConfirmationYes = btnsConfirmations["clonedBtnYes"];
			// btnConfirmationNo = btnsConfirmations["clonedBtnNo"];
			modalObj.btnYes.removeEventListener("click", yesListener);
			// modalObj.btnYes = modalObj["clonedBtnYes"];
			// modalObj.btnNo = modalObj["clonedBtnNo"];
		}
		return result};
	function noListener(){
		console.log("lieck no");
		modalObj.bsModal.hide();
		modeObj.no();
			modalObj.btnNo.removeEventListener("click", noListener);
			// modalObj.btnYes = modalObj["clonedBtnYes"];
			// modalObj.btnNo = modalObj["clonedBtnNo"];
		}

	modalObj.btnYes.addEventListener("click", yesListener);
	modalObj.btnNo.addEventListener("click", noListener);
	// console.log(modalObj.btnYes);
}
