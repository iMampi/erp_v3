// TODO : do me
const DefaultValuesFournisseurNewFormObj = {
	uid: "",
	"type-personnality": "1",
	actif: "1",
	evaluation: "2",
	declarable: "1",
	noms: "",
	prenoms: "",
	cin: "",
	"cin-date": "",
	"cin-lieu": "",
	"naissance-date": "",
	"naissance-lieu": "",
	adress: "",
	phone1: "",
	phone2: "",
	mail1: "",
	mail2: "",
	encours: "",
	echeance: "",
	nif: "",
	stat: "",
	rcs: "",
	note: "",
	"nom-commercial": "",
	"raison-sociale": "",
};
const DefaultValuesClientFilter = {
	uid: "",
	personnality: "all",
	actif: "1",
	evaluation: "all",
	declarable: "all",
	noms: "",
	prenoms: "",
	cin: "",
	"cin-date": "",
	"cin-lieu": "",
	"naissance-date": "",
	"naissance-lieu": "",
	adress: "",
	phone: "",
	mail: "",
	nif: "",
	stat: "",
	rcs: "",
	note: "",
	"nom-commercial": "",
	"raison-sociale": "",
	"encours-min": "",
	"encours-max": "",
	"echeance-min": "",
	"echeance-max": "",
};
const FieldsWithNumberValues = [
	"encours-min",
	"encours-max",
	"echeance-min",
	"echeance-max",
];
// TODO : doublon>>?
const personnalities = { 1: "human", 2: "company" };
// TODO : doublon>>?
var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

function fillInputsDetails(valueObj) {
	// console.log("valueObj : ");
	// console.log(valueObj);
	// let inputsElements = md.querySelectorAll(".input");
	let modalFournisseurDetails_ = document.getElementById(
		"modal-fournisseur-details"
	);
	let inputsElements =
		modalFournisseurDetails_.getElementsByClassName("input");

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

// TODO : do me
// async function fillTableClients(myJson, myTableBody) {
// 	console.log("filling table");
// 	try {
// 		// TODO : to cache
// 		let response = await fetch(
// 			"/elements/tiers/clients/liste_clts_table_001_base.html"
// 		);
// 		let rowBaseText = await response.text();
// 		let doc = new DOMParser().parseFromString(rowBaseText, "text/html");
// 		let trModel = doc.querySelector("#row-001");

// 		myTableBody.innerHTML = "";
// 		console.log("myJson");
// 		console.log(myJson);
// 		myJson.forEach((elementObj) => {
// 			let newRow = generateRowTableClient(trModel, elementObj);
// 			myTableBody.appendChild(newRow);
// 		});
// 	} catch (error) {
// 		console.log("filling table err");
// 		console.log(error);
// 		return false;
// 	}
// 	if (myJson == { personnality: "all", actif: "1" }) {
// 		defaultFilterFlag = true;
// 	} else {
// 		defaultFilterFlag = false;
// 	}
// 	return true;
// }

// TODO:overkill
async function responseHandlerSelectOneFournisseur(response) {
	try {
		// return JSON.parse(await response);
		let myjson = JSON.parse(await response);
		// console.log(myjson);
		return myjson;
	} catch (e) {
		return "error 2";
	}
}

function generateRowTableFournisseur(nodeModel, DataObj) {
	// console.log(DataObj);
	console.log("generate row");
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-" + zeroLeftPadding(DataObj["uid"], 3, false);
	newNode.querySelector("input.uid").value = DataObj["uid"];
	if (
		DataObj["type_personnality_uid"] == "1" ||
		DataObj["type-personnality"] == "1"
	) {
		newNode.querySelector(".frnsr-name.input").value =
			DataObj["noms"] + " " + DataObj["prenoms"];
	} else if (
		DataObj["type_personnality_uid"] == "2" ||
		DataObj["type-personnality"] == "2"
	) {
		if (DataObj["nom_commercial"] !== undefined) {
			newNode.querySelector(".frnsr-name").value =
				DataObj["nom_commercial"] + " / " + DataObj["raison_sociale"];
		} else {
			newNode.querySelector(".frnsr-name").value =
				DataObj["nom-commercial"] + " / " + DataObj["raison-sociale"];
		}
	}
	return newNode;
}

// TODO : do me
// async function filterClient(inputObj, tableBodyClients) {
// 	let url = "/database/select/select_filtered_clients.php";
// 	let response = await sendData(url, inputObj);

// 	// console.log("error?");
// 	// console.log(response);
// 	let myjson = JSON.parse(response);

// 	return await fillTableClients(myjson, tableBodyClients);

// 	// console.log(myjson);
// 	// if (result[0] == "success") {
// 	// 	ToastShowClosured(result[0], "Nouveau client créé avec succès");
// 	// } else if (result[0] == "failure") {
// 	// 	ToastShowClosured(result[0], "Echec de la création du client");
// 	// } else {
// 	// 	throw new Error("wrong value returned");
// 	// }
// 	// return result[0] == "success";
// }

async function saveFournisseurNew(inputObj) {
	console.log("saving new fr");
	let url = "/database/save/new_fournisseur.php";
	let response = await sendData(url, inputObj);
	let result = await responseHandlerSaveFournisseurNew(response);
	console.log("result");
	console.log(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouveau client créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création du client");
	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
}

// TODO : do me
async function responseHandlerSaveFournisseurNew(response) {
	try {
		let myjson = JSON.parse(await response);
		//NOTE : the correct way for save. not correct for select query
		//NOTE : works for error also
		// TODO : handle for when it is an error
		console.log("myjson");
		console.log(myjson);
		if (myjson[0]) {
			return ["success", Object.values(myjson[1])[0]];
		} else {
			return ["failure", Object.values(myjson[1])[0]];
		}
	} catch (e) {
		// TODO : comment me
		return "error js: " + e;
	}
}

// TODO : centralized, used in other script, notemment client
async function fecthAndAppendHTMLFournisseurForm(
	refRow,
	selectedOption,
	disabled
) {
	console.log("vars here");
	console.log(refRow);
	console.log(selectedOption);
	console.log(disabled);
	console.log("--------");

	disabled = disabled || false;
	if (![false, true].includes(disabled)) {
		throw new Error("third param is neither 'true' or 'false'.");
	}
	if (
		!selectedOption ||
		refRow.parentNode.querySelector(`.${selectedOption}`) != undefined
	) {
		return false;
	}
	// function to cache fetched result

	if (listDOM[selectedOption]) {
		// The HTML code of this file has already been fetched.
		// It is available as 'files[selectedOption]'.
		// console.log("there" + JSON.stringify(listDOM));
		let doc = new DOMParser().parseFromString(
			listDOM[selectedOption],
			"text/html"
		);
		//inputs are disabled or not?

		let inputs_ = doc.querySelectorAll(".input");
		inputs_.forEach((element) => {
			element.disabled = disabled;
		});
		// refRow.after(doc.body);
		// for (let elems of doc.body.childNodes) {
		// 	refRow.parentNode.insertBefore(elems, refRow.nextSibling);
		// }
		for (let i = doc.body.childNodes.length - 1; i >= 0; i--) {
			refRow.parentNode.insertBefore(
				doc.body.childNodes[i],
				refRow.nextSibling
			);
		}
		return refRow.parentNode;
	} else {
		// Fetch the HTML code of this file.
		fetch("/elements/tiers/fournisseurs/" + selectedOption + ".html")
			.then((resp) => resp.text())
			.then((txt) => {
				let doc = new DOMParser().parseFromString(txt, "text/html");

				// Save the HTML code of this file in the files array,
				// so we won't need to fetch it again.
				// must be saved first or it wont work properly
				listDOM[selectedOption] = doc.body.innerHTML;

				//inputs are disabled or not?
				let inputs_ = doc.querySelectorAll(".input");
				inputs_.forEach((element) => {
					element.disabled = disabled;
				});
				for (let i = doc.body.childNodes.length - 1; i >= 0; i--) {
					refRow.parentNode.insertBefore(
						doc.body.childNodes[i],
						refRow.nextSibling
					);
				}

				// The file is now available as 'listDOM[selectedOption]'.
			});
	}
	return refRow.parentNode;
}

//////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
	// DEFINITION

	const tableBodyFournisseur = document.getElementById("ze-tbody");
	const table001 = document.getElementById("table-001");
	const btnFournisseurNew = document.getElementById("btn-fournisseur-new");

	const btnFournisseurFilter = document.getElementById(
		"btn-fournisseur-filter"
	);

	const btnSaveFournisseurNew = document.getElementById("btn-save-new");
	const btnCancelFournisseurNew = document.getElementById("btn-cancel-new");

	// creation new modal
	const modalFournisseurNew = document.getElementById(
		"modal-fournisseur-new"
	);
	const modalFournisseurDetails = document.getElementById(
		"modal-fournisseur-details"
	);

	const bsModalFournisseurNew = new bootstrap.Modal(modalFournisseurNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	const bsModalFournisseurDetails = new bootstrap.Modal(
		modalFournisseurDetails,
		{
			backdrop: "static",
			keyboard: false,
			focus: true,
		}
	);

	const selectTypePersonnality =
		modalFournisseurNew.querySelector("#type-personnality");

	const refRowFournisseurNew = modalFournisseurNew.querySelector("#ref-row");
	const refRowFournisseurDetails =
		modalFournisseurDetails.querySelector("#ref-row");

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
	const clonedBtnConfirmationYes = btnConfirmationYes.cloneNode(true);
	const clonedBtnConfirmationNo = btnConfirmationNo.cloneNode(true);

	// OBJECT for confirmation
	const confirmationObj = {
		modal: modalConfirmation,
		bsModal: bsModalConfirmation,
		btnYes: btnConfirmationYes,
		btnNo: btnConfirmationNo,
		clonedBtnYes: clonedBtnConfirmationYes,
		clonedBtnNo: clonedBtnConfirmationNo,
	};

	const quitCreation = {
		message:
			"Des champs ont été modifiés.<br>\
		Vos modifications vont être perdus.<br>\
		Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			bsModalFournisseurNew.hide();
			cleanFormFournisseurNew();
			bsModalConfirmation.hide();
			modificationWatcher = false;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const saveCreation = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modification?",
		yes: () => {
			console.log("called yes création");
			bsModalConfirmation.hide();

			let dataObj = getInputsValuesFournisseurNew();
			saveFournisseurNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["uid"] = result[1];
					// console.log(dataObj);
					// TODO : cache html
					fetch(
						"/elements/tiers/fournisseurs/liste_frnsrs_table_001_base.html"
					)
						.then((response) => {
							let tt = response.text();
							console.log("tt");
							console.log(tt);
							return tt;
						})
						.then((txt) => {
							// TODO : abstract this process
							let doc = new DOMParser().parseFromString(
								txt,
								"text/html"
							);
							let trModel = doc.querySelector("#row-001");

							tableBodyFournisseur.append(
								generateRowTableFournisseur(trModel, dataObj)
							);
							bsModalFournisseurNew.hide();
							_cleanFournisseurNewForm();
							console.log("yes saving called");
							return false;
						});
				} else {
					//TODO : show error
					return true;
				}
			});
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	// FUNCTIONS

	async function showDetails(event) {
		// TODO : refactor
		// console.log("called here");
		let parent = event.target.parentNode.parentNode;
		let myuid = parent.querySelector(".input.uid").value;
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_fournisseur_details.php", {
			uid: myuid,
		})
			.then((resp) => {
				// console.log("shwodetail :");
				// console.log(resp);
				return responseHandlerSelectOneFournisseur(resp);
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
							modalFournisseurDetails.querySelectorAll(classKey);
						// console.log("calling removing");
						// console.log(antiKey_);
						fieldsPersonnality.forEach((div) => div.remove());
					} finally {
						fecthAndAppendHTMLFournisseurForm(
							refRowFournisseurDetails,
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

	function getInputsValuesFournisseurNew() {
		let inputObj = {};

		let inputs = modalFournisseurNew.querySelectorAll(".input");
		// console.log("inputs");
		// console.log(inputs);
		inputs.forEach((input) => {
			inputObj[input.id] = input.value;
		});
		// console.log("inputObj");
		// console.log(inputObj);
		return inputObj;
	}

	function cleanFormFournisseurNew() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"fournisseur",
			"create"
		).then((response) => {
			if (response["response"] > 0) {
				_cleanFournisseurNewForm();
			}
		});
	}

	function _cleanFournisseurNewForm() {
		console.log("cleaning");
		const inputsFournisseurForm =
			modalFournisseurNew.querySelectorAll(".tiers-form.input");
		inputsFournisseurForm.forEach((input) => {
			console.log(input);
			input.value = DefaultValuesFournisseurNewFormObj[input.id];
		});

		let companyDivs = modalFournisseurNew.querySelectorAll(".company");
		if (companyDivs.length > 0) {
			console.log("truthy");
			companyDivs.forEach((div) => {
				div.remove();
			});
		}
		let humanDivs = modalFournisseurNew.querySelectorAll(".human");
		if (humanDivs.length == 0) {
			console.log("falsy");
			fecthAndAppendHTMLFournisseurForm(
				refRowFournisseurNew,
				"human",
				false
			);
		}
		// console.log(inputsClientForm);
	}
	// EVENT HANDLER

	try {
		btnFournisseurNew.addEventListener("click", () => {
			console.log("clicked btnfrsr new");
			bsModalFournisseurNew.show();
		});
	} catch (error) {}

	try {
		selectTypePersonnality.addEventListener("input", () => {
			console.log("fgt called");
			let value = selectTypePersonnality.value;
			if (value == 1) {
				try {
					let companies = document.querySelectorAll(".company");
					companies.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTMLFournisseurForm(
						refRowFournisseurNew,
						"human",
						false
					);
				}
			} else if (value == 2) {
				try {
					let humans = document.querySelectorAll(".human");
					humans.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTMLFournisseurForm(
						refRowFournisseurNew,
						"company",
						false
					);
				}
			} else {
				console.log("personnality type value error");
			}
		});
	} catch (e) {}

	try {
		btnCancelFournisseurNew.addEventListener("click", () => {
			//TODO : finish me , clean inputs
			console.log("cacnel clickd");
			if (modificationWatcher) {
				modificationWatcher = openModalConfirmation(
					confirmationObj,
					quitCreation
				);
			} else {
				bsModalFournisseurNew.hide();
			}
		});
	} catch (error) {}
	try {
		modalFournisseurNew.addEventListener("input", () => {
			console.log("nmodel new changed");
			modificationWatcher = true;
		});
	} catch (error) {}

	try {
		btnSaveFournisseurNew.addEventListener("click", () => {
			// TODO : add confirmation

			if (modificationWatcher) {
				modificationWatcher = openModalConfirmation(
					confirmationObj,
					saveCreation
				);
			} else {
				bsModalFournisseurNew.hide();
			}

			// let dataObj = getInputsValuesFournisseurNew();
			// saveFournisseurNew(dataObj).then((result) => {
			// 	if (result[0]) {
			// 		// insert uid of newly created client
			// 		dataObj["uid"] = result[1];
			// 		console.log("dataObj");
			// 		console.log(dataObj);
			// 		// TODO : use DOMParser
			// 		// TODO : cache html
			// 		fetch(
			// 			"/elements/tiers/fournisseurs/liste_frnsrs_table_001_base.html"
			// 		)
			// 			.then((response) => response.text())
			// 			.then((txt) => {
			// 				let doc = new DOMParser().parseFromString(
			// 					txt,
			// 					"text/html"
			// 				);
			// 				let trModel = doc.querySelector("#row-001");
			// 				let inputs = trModel.querySelectorAll(".input");
			// 				tableBodyFournisseur.append(
			// 					generateRowTableFournisseur(trModel, dataObj)
			// 				);
			// 			});

			// 		bsModalClientNew.hide();
			// 		_cleanFournisseurNewForm();
			// 	} else {
			// 		//TODO : show error
			// 	}
			// });
		});
		//TODO : if good, clean and close, and snckbar. if bad, snackbar, then with reason.
	} catch (error) {}

	try {
		table001.addEventListener("click", (e) => {
			console.log("log claslist");
			console.log(e.target.classList);
			if (e.target.classList.contains("btn-details")) {
				console.log("details clicked");
				showDetails(e);
				bsModalFournisseurDetails.show();
			}
		});
	} catch (error) {}

	try {
		modalFournisseurDetails
			.querySelector(".modal-footer")
			.addEventListener("click", (e) => {
				if ((e.target.id = "btn-cancel")) {
					if (modificationWatcher) {
						// TODO : do something
					} else {
						bsModalFournisseurDetails.hide();
					}
				}
			});
	} catch (error) {}
});
