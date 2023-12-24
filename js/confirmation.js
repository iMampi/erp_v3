function openModalConfirmation(modalObj, modeObj) {
	console.log("called confirmation");
	console.log(modalObj);
	modalObj.modal.querySelector(".modal-body").innerHTML = modeObj.message;
	modalObj.bsModal.show();
	function yesListener() {
		console.log("lieck yes");
		// callback executed
		let result = modeObj.yes();
		if (!result) {
			modalObj.btnYes.removeEventListener("click", yesListener);
			modalObj.btnNo.removeEventListener("click", noListener);
			modificationWatcher = false
		};
	}
	function noListener() {
		console.log("lieck no");
		modalObj.bsModal.hide();
		// callback executed
		modeObj.no();

		modalObj.btnYes.removeEventListener("click", yesListener);
		modalObj.btnNo.removeEventListener("click", noListener);
		modificationWatcher = true;
	}

	modalObj.btnYes.addEventListener("click", yesListener);
	modalObj.btnNo.addEventListener("click", noListener);
}
