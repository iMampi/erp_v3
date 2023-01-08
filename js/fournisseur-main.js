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
const DefaultValuesFournisseurFilter = {
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


function updateFournisseurRow(mytable, dataObj) {
	let row = mytable.querySelector(
		"#row-" + zeroLeftPadding(parseInt(dataObj["uid"]), 3, false)
	);
	console.log("dataObj update frnsr row");
	console.log(dataObj);
	let inputsRow = row.querySelectorAll(".input");
	inputsRow.forEach((input) => {
		// console.log(input.classList);
		if (input.classList.contains("frnsr-name", "input")) {
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

function disableInputs(inputNodeList) {
	inputNodeList.forEach((element) => {
		disableInput(element);
	});
}
function disableInput(input) {
	input.setAttribute("disabled", "true");
}

function makeFournisseurDetailsInputsEditable(inputElements) {
	// console.log("inputElements");
	// console.log(inputElements.values());
	// console.log(inputElements.item());
	let typeVenteFlag = false;
	inputElements.forEach((input) => {
		if (!["uid", "type-personnality"].includes(input.id)) {
			if (input.id == "type-vente" && input.value == "0") {
				typeVenteFlag = true;
			}
			input.disabled = false;
		}
	});
	// inputElements.forEach((input) => {
	// 	if (["encours", "echeance"].includes(input.id)) {
	// 		input.disabled = true;
	// 	}
	// });
}

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
			element.value = valueObj["active_fournisseur"];
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

async function filterFournisseur(inputObj, tableBodyClients) {
	let url = "/database/select/select_filtered_fournisseurs.php";
	let response = await sendData(url, inputObj);

	console.log("error?");
	console.log(response);
	let myjson = JSON.parse(response);

	return await fillTableFournisseurs(myjson, tableBodyClients);


}

// TODO : do me
async function fillTableFournisseurs(myJson, myTableBody) {
	console.log("filling table");
	try {
		// TODO : to cache
		let response = await fetch(
			"/elements/tiers/fournisseurs/liste_frnsrs_table_001_base.html"
		);
		let rowBaseText = await response.text();
		let doc = new DOMParser().parseFromString(rowBaseText, "text/html");
		let trModel = doc.querySelector("#row-001");

		myTableBody.innerHTML = "";
		console.log("myJson");
		console.log(myJson);
		if(myJson.length>0){

			myJson.forEach((elementObj) => {
				let newRow = generateRowTableFournisseur(trModel, elementObj);
				myTableBody.appendChild(newRow);

			});
		}else{
			let emptyRow = generateEmptyRowTableFournisseur(trModel);
			myTableBody.appendChild(emptyRow);
		}


	} catch (error) {
		console.log("filling table err");
		console.log(error);
		return false;
	}
	if (myJson == { personnality: "all", actif: "1" }) {
		defaultFilterFlag = true;
	} else {
		defaultFilterFlag = false;
	}
	return true;
}

// TODO:overkill
async function responseHandlerSelectOneFournisseur(response) {
	try {
		// return JSON.parse(await response);
		let myjson = JSON.parse(await response);
		console.log(" selct one myjson");
		console.log(myjson);
		return myjson;
	} catch (e) {
		return "error 2";
	}
}




function generateRowTableFournisseur(nodeModel, DataObj) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	
	newNode.id = "row-"+zeroLeftPadding(DataObj["uid"], 3, false);
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
function generateEmptyRowTableFournisseur(nodeModel) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	let newId="row-000";
	newNode.id = newId;
	newNode.querySelector("input.uid").value = "Néant";
	newNode.querySelector(".frnsr-name.input").value ="Néant";
	newNode.querySelector(".btn-details").disabled =true;
	
	return newNode;
}


async function saveFournisseurNew(inputObj) {
	console.log("saving new fr");
	console.log(inputObj);
	let url = "/database/save/new_fournisseur.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSaveFournisseurNew(response);
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
	const divBtns = document.getElementById("div-btns");


	const tableBodyFournisseur = document.getElementById("ze-tbody");
	const table001 = document.getElementById("table-001");
	const btnFournisseurNew = document.getElementById("btn-fournisseur-new");

	const btnFournisseurFilter = document.getElementById(
		"btn-fournisseur-filter"
	);
	const btnCancelModalFournisseurFilter = document.getElementById(
		"btn-cancel-filter"
	);



	// creation new modal
	const modalFournisseurNew = document.getElementById(
		"modal-fournisseur-new"
	);

	const btnSaveFournisseurNew =
		modalFournisseurNew.querySelector("#btn-save-new");
	const btnCancelFournisseurNew =
		modalFournisseurNew.querySelector("#btn-cancel-new");

	const modalFournisseurDetails = document.getElementById(
		"modal-fournisseur-details"
	);



	const btnSaveFournisseurDetails =
		modalFournisseurDetails.querySelector("#btn-save");
	const btnCancelFournisseurDetails =
		modalFournisseurDetails.querySelector("#btn-cancel");
	const btnDeleteFournisseurDetails =
		modalFournisseurDetails.querySelector("#btn-delete");
	const btnModifyFournisseurDetails =
		modalFournisseurDetails.querySelector("#btn-modify");

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
	const modalFournisseurFilter = document.getElementById("modal-fournisseur-filter");
	const btnResetFilter = document.getElementById("btn-reset-filter");
	const bsModalFournisseurFilter = new bootstrap.Modal(modalFournisseurFilter, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

	const btnApplyFournisseurFilter =
	modalFournisseurFilter.querySelector("#btn-apply-filter");
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

	var btnConfirmationYes = modalConfirmation.querySelector(
		"#btn-confirmation-yes"
	);
	var btnConfirmationNo = modalConfirmation.querySelector(
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

	const quitCreationObj = {
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

	const saveCreationObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modification?",
		yes: () => {
			console.log("called 	const saveCreationObj ");
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

	const quitDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
			Vos modifications vont être perdus.<br>\
			Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			console.log("cancelFournisseurDetailsForm");
			bsModalConfirmation.hide();
			cancelFournisseurDetailsForm();
			
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const saveDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
			Vos modifications vont être enregistrés.<br>\
			Êtes vous sûr de vouloir sauvegarder ces changements?",
		yes: () => {
			console.log("clicked saveDetailsObj" );

			let inputsValuesObj = getInputsValuesFournisseurDetails();
			let updated_succesfully=!saveUpdatedFournisseurDetails(inputsValuesObj);
			if (updated_succesfully){
				btnSaveFournisseurDetails.disabled = true;
				btnModifyFournisseurDetails.disabled = false;

			}
			bsModalConfirmation.hide();
			return updated_succesfully;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const deleteFournisseurObj = {
		message: "Etes vous sûr de vouloir supprimer ce fournisseur?",
		yes: () => {
			console.log("clicked deleteFournisseurObj" );
			deleteFournisseur();
			bsModalConfirmation.hide();
			// btnConfirmationYes=clonedBtnConfirmationYes;
			// for modificationWatcher
			return false;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	// FUNCTIONS

	function insertButtonRemoveFilter() {
		let myHtml =
			'<button id="btn-remove-filter" class="col-auto btn btn-danger me-auto">supprimer le filtre</button>';
		let mydiv = divBtns.lastElementChild;
		let myNode = new DOMParser().parseFromString(myHtml, "text/html");
		mydiv.prepend(myNode.body.childNodes[0]);
	}

	function getDataFournisseurFilter() {
		let dataFilterObj = {};
		let checkboxes = modalFournisseurFilter.querySelectorAll(
			"input[type=checkbox]:checked"
		);

		checkboxes.forEach((checkboxe) => {
			let fieldName = checkboxe.id.split("--")[1];
			let inputs = modalFournisseurFilter.querySelectorAll("." + fieldName);
			inputs.forEach((myinput) => {
				dataFilterObj[myinput.id] = myinput.value;
			});
		});

		return dataFilterObj;
	}

	function changeStateFieldClientFilter(target) {
		let checked = target.checked;
		let fieldName = target.id.split("--")[1];
		let inputs = modalFournisseurFilter.querySelectorAll("." + fieldName);
		inputs.forEach((myinput) => {
			if (checked) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	function filterPersonnalityHandler() {
		let inputPersonnalityFilter =
			modalFournisseurFilter.querySelector("#personnality");

		let checkboxNomCommercial = modalFournisseurFilter.querySelector(
			"#checkbox--nom-commercial"
		);
		let checkboxRaisonSociale = modalFournisseurFilter.querySelector(
			"#checkbox--raison-sociale"
		);
		let checkboxNoms = modalFournisseurFilter.querySelector("#checkbox--noms");
		let checkboxPrenoms =
		modalFournisseurFilter.querySelector("#checkbox--prenoms");

		let inputNomCommercial =
		modalFournisseurFilter.querySelector("#nom-commercial");
		let inputRaisonSociale =
		modalFournisseurFilter.querySelector("#raison-sociale");
		let inputNoms = modalFournisseurFilter.querySelector("#noms");
		let inputPrenoms = modalFournisseurFilter.querySelector("#prenoms");

		inputPersonnalityFilter.addEventListener("input", (e) => {
			console.log("called");
			if (e.target.value == "1") {
				checkboxNomCommercial.disabled = true;
				checkboxRaisonSociale.disabled = true;
				checkboxNomCommercial.checked = false;
				checkboxRaisonSociale.checked = false;
				inputRaisonSociale.value = "";
				inputNomCommercial.value = "";
				inputRaisonSociale.disabled = true;
				inputNomCommercial.disabled = true;
				checkboxNoms.disabled = false;
				checkboxPrenoms.disabled = false;
			} else if (e.target.value == "2") {
				checkboxNomCommercial.disabled = false;
				checkboxRaisonSociale.disabled = false;
				checkboxNoms.disabled = true;
				checkboxPrenoms.disabled = true;
				checkboxNoms.checked = false;
				checkboxPrenoms.checked = false;
				inputNoms.value = "";
				inputPrenoms.value = "";
				inputNoms.disabled = true;
				inputPrenoms.disabled = true;
			} else if (e.target.value == "all") {
				checkboxNomCommercial.disabled = false;
				checkboxRaisonSociale.disabled = false;
				checkboxNoms.disabled = false;
				checkboxPrenoms.disabled = false;
			}
		});
	}

	function appendHTMLFilterAdvanced() {
		let name = "filter_advanced";
		let modalFilterBody = modalFournisseurFilter.querySelector(".modal-body ");

		modalFilterBody.querySelector(".container").remove();

		if (listDOM[name]) {
			// The HTML code of this file has already been fetched.
			// It is available as 'files[selectedOption]'.
			let doc = new DOMParser().parseFromString(
				listDOM[name],
				"text/html"
			);
			modalFilterBody.appendChild(doc.body.childNodes[0]);
		} else {
			// Fetch the HTML code of this file.
			fetch("/elements/tiers/fournisseurs/fournisseur_" + name + ".html")
				.then((resp) => resp.text())
				.then((txt) => {
					let doc = new DOMParser().parseFromString(txt, "text/html");

					listDOM[name] = doc.body.innerHTML;
					// The file is now available as 'listDOM[selectedOption]'.
					// we do this before appending because for some reason, doc becomes empty

					// Save the HTML code of this file in the files array,
					// so we won't need to fetch it again.

					modalFilterBody.appendChild(doc.body.childNodes[0]);
				});
		}
	}

	function resetFilter() {
		let inputs = modalFournisseurFilter.querySelectorAll(".input");
		let checkboxes = modalFournisseurFilter.querySelectorAll(
			"input[type=checkbox]"
		);
		checkboxes.forEach((checkbox) => {
			if (
				["checkbox--personnality", "checkbox--actif"].includes(
					checkbox.id
				)
			) {
				checkbox.checked = true;
			} else {
				checkbox.checked = false;
			}
		});
		inputs.forEach((myinput) => {
			myinput.value = DefaultValuesFournisseurFilter[myinput.id];
			if (["personnality", "actif"].includes(myinput.id)) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	function appendHTMLFilterBasic() {
		let name = "filter_basic";
		let modalFilterBody = modalFournisseurFilter.querySelector(".modal-body ");

		modalFilterBody.querySelector(".container").remove();

		if (listDOM[name]) {
			// The HTML code of this file has already been fetched.
			// It is available as 'files[selectedOption]'.
			let doc = new DOMParser().parseFromString(
				listDOM[name],
				"text/html"
			);

			modalFilterBody.appendChild(doc.body.childNodes[0]);
		} else {
			// Fetch the HTML code of this file.
			fetch("/elements/tiers/fournisseurs/fournisseur_" + name + ".html")
				.then((resp) => resp.text())
				.then((txt) => {
					let doc = new DOMParser().parseFromString(txt, "text/html");
					listDOM[name] = doc.body.innerHTML;

					// Save the HTML code of this file in the files array,
					// so we won't need to fetch it again.

					modalFilterBody.appendChild(doc.body.childNodes[0]);

					// The file is now available as 'listDOM[selectedOption]'.
				});
		}

		// add eventlistener to inputpersonnalityfilter
	}

	function removeTableRow(frnsrUid) {
		console.log("collapsing " + frnsrUid);
		try {
			let trToDelete = document.getElementById(
				"row-" + zeroLeftPadding(frnsrUid, 3, false)
			);
			trToDelete.classList.add("collapse-row");
			return true;
		} catch (err) {
			return false;
		}
	}

    async function deleteFournisseur() {
		let myurl = "/database/delete/delete_one_fournisseur.php";
		let frnsrUid = modalFournisseurDetails.querySelector("#uid").value;
		let response = await sendData(myurl, { uid: frnsrUid });
		console.log("response");
		console.log(response);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = JSON.parse(response);
		// let myjson = await response.json();
		if (Array.isArray(myjson)) {
			if (myjson[0] && myjson[1]["nb_affected_row"] == "1") {
				let x = removeTableRow(frnsrUid);
				console.log(x);
				ToastShowClosured("success", "Fournisseur effacé avec succès");
				bsModalFournisseurDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression frounisseur");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression frounisseur.");
		}
	}

	function getInputsValuesFournisseurDetails() {
		//TODO : add paramater "modal", to delimit the dom. and take it out
		let inputObj = {};
		let inputs = modalFournisseurDetails.querySelectorAll(".input");
		inputs.forEach((input) => {
			inputObj[input.id] = input.value;
		});
		// console.log(inputObj);
		return inputObj;
	}

	function cancelFournisseurDetailsForm(){
		let inputsForEdition =
		modalFournisseurDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalFournisseurDetails.hide();
		btnSaveFournisseurDetails.disabled = true;
		btnModifyFournisseurDetails.disabled = false;
		modificationWatcher=false;

	}

	async function saveUpdatedFournisseurDetails(inputsValuesObj) {

		console.log("saving update called");
		let myurl = "/database/save/update_fournisseur.php";
		let response = await sendData(myurl, inputsValuesObj);
		console.log(response);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = await JSON.parse(response);
		console.log("myjson");
		console.log(myjson);
		if (Array.isArray(myjson)) {
			// note : structure particuliere retourné par la funciton sql
			if (myjson[0] && myjson[1][0] >= 1) {
				console.log("succc");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("success", "Fournisseur mis à jour avec succès.");
				let inputsForEdition =
					modalFournisseurDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				updateFournisseurRow(table001, inputsValuesObj);
				btnSaveFournisseurDetails.disabled = true;
				btnModifyFournisseurDetails.disabled = false;
				// return false for modificationWatcher
				return false;
			} else {
				console.log("faileeddd");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("failure", "Echec de la mise à jour.");
				// return true for modificationWatcher

				return true;
			}
		} else {
			console.log("faileeddd2");

			ToastShowClosured(
				"failure",
				"Echec de la mise à jour, contactez l'administrateur système."
			);

			// return true for modificationWatcher

			return true;
		}
	}

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
						console.log("result[1]");
						console.log(result[1]);
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
					quitCreationObj
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
			if (modificationWatcher) {
				modificationWatcher = openModalConfirmation(
					confirmationObj,
					saveCreationObj
				);
			} else {
				bsModalFournisseurNew.hide();
			}


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
			.addEventListener("input", (e) => {
				console.log("modification input details");
				modificationWatcher=true;
			})
		} catch (error) {}



		try {
		modalFournisseurDetails
			.querySelector(".modal-footer")
			.addEventListener("click", (e) => {
				let target = e.target;
				if (target.id == "btn-cancel") {
					console.log("cancelling details");
					if (modificationWatcher) {
						modificationWatcher = openModalConfirmation(
							confirmationObj,
							quitDetailsObj
						);
		
					} else {
						cancelFournisseurDetailsForm();
					}
				} else if (target.id == "btn-modify") {
					let inputsForEdition =
					modalFournisseurDetails.querySelectorAll(".input");
					makeFournisseurDetailsInputsEditable(inputsForEdition);
					btnSaveFournisseurDetails.disabled = false;

				} else if (target.id == "btn-delete") {
					console.log("entering delete me");
					openModalConfirmation(
						confirmationObj,
						deleteFournisseurObj
					);
				} else if (target.id == "btn-save") {
					console.log("clieck save details");

					if (modificationWatcher) {
						// TODO : do something

						modificationWatcher = openModalConfirmation(
							confirmationObj,
							saveDetailsObj
						);
						// bsModalFournisseurDetails.hide();
						// btnSaveFournisseurDetails.disabled = true;
						// btnModifyFournisseurDetails.disabled = false;
						// TODO : change modification watcher when succesful
						// modificationWatcher=false;

					} else {
						bsModalFournisseurDetails.hide();
						btnSaveFournisseurDetails.disabled = true;
						btnModifyFournisseurDetails.disabled = false;
						modificationWatcher=false;


					}
				}
			});
	} catch (error) {}

	try {
		btnFournisseurFilter.addEventListener("click", () => {
			bsModalFournisseurFilter.show();
		});
	} catch (error) {}

	try {
		btnCancelModalFournisseurFilter.addEventListener("click", () => {
			appendHTMLFilterBasic();
			resetFilter();
			bsModalFournisseurFilter.hide();
		});
	} catch (error) {}

	try {
		modalFournisseurFilter.addEventListener("click", (event) => {
			let target = event.target;
			if (target.id == "btn-filter-basic") {
				appendHTMLFilterBasic();
			} else if (target.id == "btn-filter-advanced") {
				appendHTMLFilterAdvanced();
			}

			if (target.id == "personnality") {
				filterPersonnalityHandler();
			}
		});
	} catch (error) {}

	try {
		modalFournisseurFilter.addEventListener("input", (event) => {
			let target = event.target;
			if (target.type == "checkbox") {
				changeStateFieldClientFilter(target);
			}
		});
	} catch (error) {}

	try {
		btnResetFilter.addEventListener("click", () => {
			resetFilter();
		});
	} catch (error) {}

	try {
		btnApplyFournisseurFilter.addEventListener("click", () => {
			let myobj = getDataFournisseurFilter();
			Object.entries(myobj).forEach((arr_) => {
				if (
					FieldsWithNumberValues.includes(arr_[0]) &
					(arr_[0] === "")
				) {
					myobj[arr_[0]] = 0;
				}
			});
			console.log(myobj);
			filterFournisseur(myobj, tableBodyFournisseur);
			bsModalFournisseurFilter.hide();
			// let testing =
				// !defaultFilterFlag &
				// !divBtns.querySelector("#btn-remove-filter");
			// console.log("testing");
			// console.log(!defaultFilterFlag);
			// console.log(!divBtns.querySelector("#btn-remove-filter"));
			// console.log(testing);
			if (!divBtns.querySelector("#btn-remove-filter")) {
				insertButtonRemoveFilter();
			}
			// filterClients(getDataClientFilter());
			// bsModalClientFilter.hide();
		});
	} catch (error) {}

	try {
		divBtns.addEventListener("click", (e) => {
			if (e.target.id == "btn-remove-filter") {
				e.target.remove();
				resetFilter();
				filterFournisseur(
					{ personnality: "all", actif: "1" },
					tableBodyFournisseur
				);
				defaultFilterFlag = true;
			}
		});
	} catch (error) {}

});
