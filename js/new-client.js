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
const personnalities = { 1: "human", 2: "company" };
var listDOM = {};

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

async function fecthAndAppendHTML(refRow, selectedOption, disabled) {
	console.log("gthypp called");
	disabled = disabled || false;
	if (![false, true].includes(disabled)) {
		throw new Error("neither 'true' or 'false'.");
	}
	// function to cache fetched result
	// if (!selectedOption) || (refRow.parentNode.querySelector(`.${selectedOption}`)) {
	if (
		!selectedOption ||
		refRow.parentNode.querySelector(`.${selectedOption}`) != undefined
	) {

		return false;
	}

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
				console.log("jf :");
				console.log(refRow.parentNode);

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

	function cleanClientNewForm() {
		const inputsClientForm =
			modalClientNew.querySelectorAll(".client-form.input");
		// console.log("canceling");
		inputsClientForm.forEach((input) => {
			// console.log(input.id);
			input.value = DefaultValuesNewClientFormObj[input.id];
		});

		fecthAndAppendHTML(refRowClientNew, "human", false);
		// console.log(inputsClientForm);
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
					fecthAndAppendHTML(refRowClientNew, "human", false);
				}
			} else if (value == 2) {
				try {
					let humans = document.querySelectorAll(".human");
					humans.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTML(refRowClientNew, "company", false);
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
					cleanClientNewForm();
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
			bsModalClientNew.hide();
			fetchSessionAuthorizationValue(
				"/session_request/session_request.php",
				"client",
				"create"
			).then((response) => {
				if (response["response"] > 0) {
					cleanClientNewForm();
				}
			});
			// console.log(sessionValue);
		});
	} catch (error) {}
});
