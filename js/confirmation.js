function openModalConfirmation(modalObj, modeObj) {
	console.log("called");
	modalObj.modal.querySelector(".modal-body").innerHTML = modeObj.message;
	modalObj.bsModal.show();
	modalObj.btnYes.addEventListener("click", () => {
		modalObj.bsModal.hide();
		modeObj.yes();
	});
	modalObj.btnNo.addEventListener("click", () => {
		modalObj.bsModal.hide();
		modeObj.no();
	});
}
