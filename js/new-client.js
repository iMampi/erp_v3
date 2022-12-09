const DefaultValuesNewClientFormObj = {
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
	"type-vente": "1",
	encours: "",
	echeance: "",
	nif: "",
	stat: "",
	rcs: "",
	commissionable: "0",
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
	"type-vente": "1",
	nif: "",
	stat: "",
	rcs: "",
	commissionable: "all",
	note: "",
	"nom-commercial": "",
	"raison-sociale": "",
	"encours-min": "",
	"encours-max": "",
	"echeance-min": "",
	"echeance-max": "",
};
const personnalities = { 1: "human", 2: "company" };
var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();

async function saveNewclient(inputObj) {
	let url = "/database/save/new_client.php";
	let response = await sendData(url, inputObj);
	let result = await responseHandlerSaveNewClient(response);
	// console.log(result);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouveau client créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création du client");
	} else {
		throw new Error("wrong value returned");
	}
	return result[0] == "success";
}

async function responseHandlerSaveNewClient(response) {
	try {
		let myjson = JSON.parse(await response);
		//NOTE : the correct way for save. not correct for select query
		//NOTE : works for error also
		// TODO : handle for when it is an error
		// if (myjson[0])
		console.log(myjson);
		if (myjson[0]) {
			return ["success", Object.values(myjson[1])[0]];
		} else {
			return ["failure", Object.values(myjson[1])[0]];
		}
		// console.log(typeof myjson[0]);
		// return Object.values(myjson)[0];
	} catch (e) {
		// TODO : comment me
		return "error js: " + e;
	}
}

async function fecthAndAppendHTMLClientForm(refRow, selectedOption, disabled) {
	disabled = disabled || false;
	if (![false, true].includes(disabled)) {
		throw new Error("neither 'true' or 'false'.");
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
		fetch("/elements/tiers/clients/" + selectedOption + ".html")
			.then((resp) => resp.text())
			.then((txt) => {
				let doc = new DOMParser().parseFromString(txt, "text/html");

				// Save the HTML code of this file in the files array,
				// so we won't need to fetch it again.
				listDOM[selectedOption] = doc.body.innerHTML;

				//inputs are disabled or not?
				let inputs_ = doc.querySelectorAll(".input");
				inputs_.forEach((element) => {
					element.disabled = disabled;
				});
				// console.log("here");
				for (let i = doc.body.childNodes.length - 1; i >= 0; i--) {
					// console.log(i);
					refRow.parentNode.insertBefore(
						doc.body.childNodes[i],
						refRow.nextSibling
					);
				}
				// console.log("jf :");
				// console.log(refRow.parentNode);

				// The file is now available as 'listDOM[selectedOption]'.
			});
	}
	return refRow.parentNode;
}

document.addEventListener("DOMContentLoaded", () => {
	// definitions
	const selectTypePersonnality = document.getElementById("type-personnality");

	const modalClientNew = document.getElementById("modal-clt-new");
	const btnCancelClientNew = document.getElementById("btn-cancel-client-new");

	const btnClientFilter = document.getElementById("btn-client-filter");
	const btnClientNew = document.getElementById("btn-client-new");

	const btnSaveNewClient = document.getElementById("btn-save-client-new");
	const refRowClientNew = modalClientNew.querySelector("#ref-row");
	const typeVenteInput = document.querySelector("#modal-clt-new #type-vente");
	const encoursInput = document.querySelector("#modal-clt-new #encours");
	const echeanceInput = document.querySelector("#modal-clt-new #echeance");

	const bsModalClientNew = new bootstrap.Modal(modalClientNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

	const btnResetFilter = document.getElementById("btn-reset-filter");

	//confirmation modal
	const modalConfirmation = document.getElementById("modal-confirmation");
	const bsModalConfirmation = new bootstrap.Modal(modalConfirmation, {
		backdrop: false,
		keyboard: false,
		focus: true,
	});

	//modal filter
	const modalClientFilter = document.getElementById("modal-client-filter");

	const btnCancelModalClientFilter =
		modalClientFilter.querySelector("#btn-cancel-filter");
	const btnApplyModalClientFilter =
		modalClientFilter.querySelector("#btn-apply-filter");
	const bsmodalClientFilter = new bootstrap.Modal(modalClientFilter, {
		backdrop: "static",
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
	const confirmationObj = {
		modal: modalConfirmation,
		bsModal: bsModalConfirmation,
		btnYes: btnConfirmationYes,
		btnNo: btnConfirmationNo,
	};

	const quitCreation = {
		message:
			"Des champs ont été modifiés.<br>\
			Vos modifications vont être perdus.<br>\
			Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			bsModalClientNew.hide();
			cleanFormClientNew();
			modificationWatcher = false;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	// FUNCTIONS

	function resetFilter() {
		let inputs = modalClientFilter.querySelectorAll(".input");
		let checkboxes = modalClientFilter.querySelectorAll(
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
			myinput.value = DefaultValuesClientFilter[myinput.id];
			if (["personnality", "actif"].includes(myinput.id)) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	// TODO : DRY : combine those tow function
	function appendHTMLFilterBasic() {
		let name = "filter_basic";
		let modalFilterBody = modalClientFilter.querySelector(".modal-body ");

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
			fetch("/elements/tiers/clients/client_" + name + ".html")
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

	// function

	function appendHTMLFilterAdvanced() {
		let name = "filter_advanced";
		let modalFilterBody = modalClientFilter.querySelector(".modal-body ");

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
			fetch("/elements/tiers/clients/client_" + name + ".html")
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

	function filterPersonnalityHandler() {
		let inputPersonnalityFilter =
			modalClientFilter.querySelector("#personnality");

		let checkboxNomCommercial = modalClientFilter.querySelector(
			"#checkbox--nom-commercial"
		);
		let checkboxRaisonSociale = modalClientFilter.querySelector(
			"#checkbox--raison-sociale"
		);
		let checkboxNoms = modalClientFilter.querySelector("#checkbox--noms");
		let checkboxPrenoms =
			modalClientFilter.querySelector("#checkbox--prenoms");

		let inputNomCommercial =
			modalClientFilter.querySelector("#nom-commercial");
		let inputRaisonSociale =
			modalClientFilter.querySelector("#raison-sociale");
		let inputNoms = modalClientFilter.querySelector("#noms");
		let inputPrenoms = modalClientFilter.querySelector("#prenoms");

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
	function changeStateFieldClientFilter(target) {
		let checked = target.checked;
		let fieldName = target.id.split("--")[1];
		let inputs = modalClientFilter.querySelectorAll("." + fieldName);
		inputs.forEach((myinput) => {
			if (checked) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	function filterClients() {}
	function getDataClientFilter() {
		let dataFilterObj = {};
		let checkboxes = modalClientFilter.querySelectorAll(
			"input[type=checkbox]:checked"
		);

		checkboxes.forEach((checkboxe) => {
			let fieldName = checkboxe.id.split("-")[1];
			let inputs = modalClientFilter.querySelectorAll("." + fieldName);
			inputs.forEach((myinput) => {
				dataFilterObj[myinput.id] = myinput.value;
			});
		});

		return dataFilterObj;
	}

	function cleanFormClientNew() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"client",
			"create"
		).then((response) => {
			if (response["response"] > 0) {
				_cleanClientNewForm();
			}
		});
	}

	function _cleanClientNewForm() {
		const inputsClientForm =
			modalClientNew.querySelectorAll(".client-form.input");
		inputsClientForm.forEach((input) => {
			input.value = DefaultValuesNewClientFormObj[input.id];
		});

		let companyDivs = modalClientNew.querySelectorAll(".company");
		if (companyDivs.length > 0) {
			console.log("truthy");
			companyDivs.forEach((div) => {
				div.remove();
			});
		}
		let humanDivs = modalClientNew.querySelectorAll(".human");
		if (humanDivs.length == 0) {
			console.log("falsy");
			fecthAndAppendHTMLClientForm(refRowClientNew, "human", false);
		}
		// console.log(inputsClientForm);
	}

	function getInputsValuesClientNew() {
		//TODO : add paramater "modal", to delimit the dom. and take it out
		let inputObj = {};
		let modalBodyHeads = document.getElementById(
			"new-client-modal-body-heads"
		);
		let inputs = modalBodyHeads.querySelectorAll(".input");
		inputs.forEach((input) => {
			inputObj[input.id] = input.value;
		});
		console.log(inputObj);
		return inputObj;
	}

	function typeVenteInputBehavior() {
		if (typeVenteInput.value == "1") {
			encoursInput.disabled = false;
			echeanceInput.disabled = false;
		} else if (typeVenteInput.value == "0") {
			encoursInput.disabled = true;
			encoursInput.value = "0";
			echeanceInput.disabled = true;
			echeanceInput.value = "0";
		}
	}

	// action
	try {
		selectTypePersonnality.addEventListener("input", () => {
			console.log("fgt called");
			let value = selectTypePersonnality.value;
			if (value == 1) {
				try {
					let companies = document.querySelectorAll(".company");
					companies.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTMLClientForm(
						refRowClientNew,
						"human",
						false
					);
				}
			} else if (value == 2) {
				try {
					let humans = document.querySelectorAll(".human");
					humans.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTMLClientForm(
						refRowClientNew,
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
		btnSaveNewClient.addEventListener("click", () => {
			// const resp = submitIt(getInputsValuesClientNew());
			// sendData("/database/save/new_client.php", getInputsValuesClientNew())
			// 	.then((resp) => responseHandlerSaveNewClient(resp))
			// 	.then((result) => console.log(result));
			saveNewclient(getInputsValuesClientNew()).then((result) => {
				if (result) {
					//TODO :close and clean
					bsModalClientNew.hide();
					_cleanClientNewForm();
				} else {
					//TODO : show error
				}
			});
		});
		//TODO : if good, clean and close, and snckbar. if bad, snackbar, then with reason.
	} catch (error) {}

	try {
		typeVenteInput.addEventListener("input", () => {
			typeVenteInputBehavior();
		});
	} catch (error) {}

	try {
		btnClientNew.addEventListener("click", () => {
			bsModalClientNew.show();
		});
	} catch (error) {}

	try {
		btnCancelClientNew.addEventListener("click", () => {
			//TODO : finish me , clean inputs
			if (modificationWatcher) {
				openModalConfirmation(confirmationObj, quitCreation);
			} else {
				bsModalClientNew.hide();
			}
		});
	} catch (error) {}

	try {
		btnClientFilter.addEventListener("click", () => {
			bsmodalClientFilter.show();
		});
	} catch (error) {}

	try {
		btnCancelModalClientFilter.addEventListener("click", () => {
			appendHTMLFilterBasic();
			resetFilter();
			bsmodalClientFilter.hide();
		});
	} catch (error) {}

	try {
		btnApplyModalClientFilter.addEventListener("click", () => {
			console.log(getDataClientFilter());
			// filterClients(getDataClientFilter());
			// bsmodalClientFilter.hide();
		});
	} catch (error) {}

	modalClientNew.addEventListener("input", () => {
		modificationWatcher = true;
	});

	try {
		modalClientFilter.addEventListener("input", (event) => {
			let target = event.target;
			if (target.type == "checkbox") {
				changeStateFieldClientFilter(target);
			}
		});
	} catch (error) {}

	try {
		modalClientFilter.addEventListener("click", (event) => {
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
		btnResetFilter.addEventListener("click", () => {
			resetFilter();
		});
	} catch (error) {}
});
