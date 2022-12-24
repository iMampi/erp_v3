function openModalConfirmation(modalObj, modeObj) {
	console.log("called confirmation");
	modalObj.modal.querySelector(".modal-body").innerHTML = modeObj.message;
	modalObj.bsModal.show();
	modalObj.btnYes.addEventListener("click", () => {
		// modalObj.bsModal.hide();
		let result = modeObj.yes();
		if (!result) {
			// btnConfirmationYes = btnsConfirmations["clonedBtnYes"];
			// btnConfirmationNo = btnsConfirmations["clonedBtnNo"];
			modalObj.btnYes = modalObj["clonedBtnYes"];
			modalObj.btnNo = modalObj["clonedBtnNo"];
		}
		return result;
	});
	modalObj.btnNo.addEventListener("click", () => {
		modalObj.bsModal.hide();
		modeObj.no();
	});
	console.log(modalObj.btnYes);
}
