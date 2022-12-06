async function responseHandlerSelectOneClient(response) {
	try {
		// return JSON.parse(await response);
		let myjson = JSON.parse(await response);
		console.log(myjson);
		return myjson;
	} catch (e) {
		return "error 2";
	}
}
function disableInputs(inputNodeList) {
	inputNodeList.forEach((element) => {
		disableInput(element);
	});
}
function disableInput(input) {
	input.setAttribute("disabled", "true");
}

function updateClientRow(mytable, dataObj) {
	let row = mytable.querySelector(
		"#row-" + zeroLeftPadding(dataObj["uid"], 3, false)
	);
	console.log(dataObj);
	let inputsRow = row.querySelectorAll(".input");
	inputsRow.forEach((input) => {
		// console.log(input.classList);
		if (input.classList.contains("clt-name", "input")) {
			if (
				dataObj["noms"] == undefined &&
				dataObj["prenoms"] == undefined
			) {
				input.value =
					dataObj["nom-commercial"] +
					" / " +
					dataObj["raison-sociale"];
			} else if (
				dataObj["nom-commercial"] == undefined &&
				dataObj["raison-sociale"] == undefined
			) {
				input.value = dataObj["noms"] + " " + dataObj["prenoms"];
			}
		}
	});
}

async function showMe() {}

function fillInputsDetails(valueObj) {
	// console.log("valueObj : ");
	// console.log(valueObj);
	// let inputsElements = md.querySelectorAll(".input");
	let md = document.getElementById("modal-clt-details");
	let inputsElements = md.getElementsByClassName("input");

	// console.log("inputsElement :");
	// console.log(inputsElements);
	// let inputsElements = document.querySelectorAll(
	// "#modal-clt-details .input"
	// );
	//TODO : use a DTO
	for (let index = 0; index < inputsElements.length; index++) {
		let element = inputsElements[index];
		// }
		// inputsElements.forEach((element) => {
		if (element.id == "actif") {
			element.value = valueObj["active_client"];
		} else if (element.id == "adress") {
			element.value = valueObj["adress"];
		} else if (element.id == "cin") {
			element.value = valueObj["cin"];
		} else if (element.id == "cin-date") {
			element.value = valueObj["cin_date"];
		} else if (element.id == "cin-lieu") {
			element.value = valueObj["cin_lieu"];
		} else if (element.id == "commissionable") {
			element.value = valueObj["commissionable"];
		} else if (element.id == "declarable") {
			element.value = valueObj["declarable"];
		} else if (element.id == "encours") {
			element.value = valueObj["encours"];
		} else if (element.id == "evaluation") {
			element.value = valueObj["evaluation"];
		} else if (element.id == "mail1") {
			element.value = valueObj["mail1"];
		} else if (element.id == "mail2") {
			element.value = valueObj["mail2"];
		} else if (element.id == "naissance-date") {
			element.value = valueObj["naissance_date"];
		} else if (element.id == "naissance-lieu") {
			element.value = valueObj["naissance_lieu"];
		} else if (element.id == "echeance") {
			element.value = valueObj["nb_jour"];
		} else if (element.id == "nif") {
			element.value = valueObj["nif"];
		} else if (element.id == "nom-commercial") {
			console.log("filled noms-comm");
			element.value = valueObj["nom_commercial"];
		} else if (element.id == "noms") {
			console.log("filled noms");
			element.value = valueObj["noms"];
		} else if (element.id == "note") {
			element.value = valueObj["note"];
		} else if (element.id == "phone1") {
			element.value = valueObj["phone1"];
		} else if (element.id == "phone2") {
			element.value = valueObj["phone2"];
		} else if (element.id == "prenoms") {
			element.value = valueObj["prenoms"];
		} else if (element.id == "raison-sociale") {
			element.value = valueObj["raison_sociale"];
		} else if (element.id == "rcs") {
			element.value = valueObj["rcs"];
		} else if (element.id == "stat") {
			element.value = valueObj["stat"];
		} else if (element.id == "type-personnality") {
			element.value = valueObj["type_personnality_uid"];
		} else if (element.id == "type-vente") {
			element.value = valueObj["type_vente"];
		} else if (element.id == "uid") {
			element.value = valueObj["uid"];
		}
		// });
	}
}

function makeEditable(inputElements) {
	inputElements.forEach((input) => {
		if (!["uid", "type-personnality"].includes(input.id)) {
			input.disabled = false;
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const modalClientDetails = document.getElementById("modal-clt-details");

	let refRowClientDetails = modalClientDetails.querySelector("#ref-row");

	const btnDelClient = modalClientDetails.querySelector("#btn-delete");
	const btnModifyClientDetails =
		modalClientDetails.querySelector("#btn-modify");
	const table001 = document.getElementById("table-001");

	var bsModalClientDetails = new bootstrap.Modal(modalClientDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

	//confirmation modal
	const modalConfirmation = document.getElementById("modal-confirmation");
	const bsModalConfirmation = new bootstrap.Modal(modalConfirmation, {
		backdrop: false,
		keyboard: false,
		focus: true,
	});

	const btnConfirmationYes = modalConfirmation.querySelector(
		"#btn-confirmation-yes"
	);
	const btnConfirmationNo = modalConfirmation.querySelector(
		"#btn-confirmation-no"
	);
	// OBJECT for confirmation
	const confirmationDetailsObj = {
		modal: modalConfirmation,
		bsModal: bsModalConfirmation,
		btnYes: btnConfirmationYes,
		btnNo: btnConfirmationNo,
	};

	const quitDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être perdus.<br>\
				Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			let inputsForEdition =
				modalClientDetails.querySelectorAll(".input");
			disableInputs(inputsForEdition);
			bsModalClientDetails.hide();
			modificationWatcher = false;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const saveDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modification?",
		yes: () => {
			let inputsValuesObj = getInputsValuesClientDetails();
			saveUpdatedClient(inputsValuesObj).then((result) => {
				if (result) {
					modificationWatcher = false;
				}
			});
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const deteleClientObj = {
		message: "Etes vous sûr de vouloir supprimer ce client?",
		yes: () => {
			deleteClient();
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const btnCancelModalClientDetails =
		modalClientDetails.querySelector("#btn-cancel");

	const btnSaveModalClientDetails =
		modalClientDetails.querySelector("#btn-save");

	function getInputsValuesClientDetails() {
		//TODO : add paramater "modal", to delimit the dom. and take it out
		let inputObj = {};
		let inputs = modalClientDetails.querySelectorAll(".input");
		inputs.forEach((input) => {
			inputObj[input.id] = input.value;
		});
		// console.log(inputObj);
		return inputObj;
	}

	async function deleteClient() {
		let myurl = "/database/delete/delete_one_client.php";
		let cltUid = modalClientDetails.querySelector("#uid").value;
		let response = await sendData(myurl, { uid: cltUid });
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = JSON.parse(response);
		// let myjson = await response.json();
		if (Array.isArray(myjson)) {
			if (myjson[0] && myjson[1]["nb_affected_row"] == "1") {
				let x = removeTableRow(cltUid);
				console.log(x);
				ToastShowClosured("success", "Client effacé avec succès");
				bsModalClientDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression client");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression client");
		}
	}

	async function saveUpdatedClient(inputsValuesObj) {
		let myurl = "/database/save/update_client.php";
		let response = await sendData(myurl, inputsValuesObj);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = await JSON.parse(response);

		if (Array.isArray(myjson)) {
			// note : structure particuliere retourné par la funciton sql
			if (myjson[0] && myjson[1][0] >= 1) {
				ToastShowClosured("success", "Client mis à jour avec succès.");
				let inputsForEdition =
					modalClientDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				updateClientRow(table001, inputsValuesObj);
				btnSaveModalClientDetails.disabled = true;
				btnModifyClientDetails.disabled = false;
				return true;
			} else {
				ToastShowClosured("failure", "Echec de la mise à jour.");
				return false;
			}
		} else {
			ToastShowClosured(
				"failure",
				"Echec de la mise à jour, contactez l'administrateur système."
			);
			return false;
		}
	}

	function removeTableRow(cltUid) {
		console.log("collapsing " + cltUid);
		try {
			let trToDelete = document.getElementById(
				"row-" + zeroLeftPadding(cltUid, 3, false)
			);
			trToDelete.classList.add("collapse-row");
			return true;
		} catch (err) {
			return false;
		}
	}
	function appendAndFill(refRow, selection, disabled) {
		return new Promise((resolve, reject) => {
			let calling = fecthAndAppendHTMLClientForm(
				refRow,
				selection,
				disabled
			);
			if (calling) {
				resolve(calling);
			} else {
				reject(false);
			}
		});
	}

	async function showDetails(event) {
		// TODO : refactor
		// console.log("called here");
		let parent = event.target.parentNode.parentNode;
		let myuid = parent.querySelector(".input.uid").value;
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_client_details.php", {
			uid: myuid,
		})
			.then((resp) => {
				// console.log("shwodetail :");
				// console.log(resp);
				return responseHandlerSelectOneClient(resp);
			})
			.then((result) => {
				// console.log("result : " + JSON.stringify(result[1]));
				// TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
				if (result[0]) {
					try {
						let antiKey_ = (
							(parseInt(result[1]["type_personnality_uid"]) % 2) +
							1
						).toString();
						let classKey = "." + personnalities[antiKey_];
						let fieldsPersonnality =
							modalClientDetails.querySelectorAll(classKey);
						// console.log("calling removing");
						// console.log(antiKey_);
						fieldsPersonnality.forEach((div) => div.remove());
					} finally {
						fecthAndAppendHTMLClientForm(
							refRowClientDetails,
							personnalities[result[1]["type_personnality_uid"]],
							true
						).then((newDom) => {
							setTimeout(() => {
								fillInputsDetails(result[1]);
							}, 200);
							// bsModalClientDetails.show();
						});

						//must use time out. because when we update the DOM with appendAndFill, it does not update directly
					}
				}
			});
	}

	try {
		btnDelClient.addEventListener("click", () => {
			openModalConfirmation(confirmationDetailsObj, deteleClientObj);
		});
	} catch (e) {}

	try {
		table001.addEventListener("click", (e) => {
			if (e.target.id == "btn-details") {
				// TODO :refactor
				showDetails(e);
				bsModalClientDetails.show();
			}
		});
	} catch (e) {}

	try {
		btnModifyClientDetails.addEventListener("click", (e) => {
			let inputsForEdition =
				modalClientDetails.querySelectorAll(".input");
			makeEditable(inputsForEdition);
		});
	} catch (e) {}

	try {
		btnSaveModalClientDetails.addEventListener("click", (e) => {
			if (modificationWatcher) {
				// console.log(modificationWatcher);

				openModalConfirmation(confirmationDetailsObj, saveDetailsObj);
			}
		});
	} catch (e) {}

	modalClientDetails.addEventListener("input", () => {
		modificationWatcher = true;
	});

	try {
		btnCancelModalClientDetails.addEventListener("click", () => {
			//TODO : finish me , clean inputs
			if (modificationWatcher) {
				openModalConfirmation(confirmationDetailsObj, quitDetailsObj);
			} else {
				let inputsForEdition =
					modalClientDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				bsModalClientDetails.hide();
			}
		});
	} catch (error) {}

	try {
		btnModifyClientDetails.addEventListener("click", () => {
			btnSaveModalClientDetails.disabled = false;
			btnModifyClientDetails.disabled = true;
		});
	} catch (e) {}
});
