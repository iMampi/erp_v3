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

async function saveNewclient(inputObj) {
	let url = "/database/save/new_client.php";
	let response = await sendData(url, inputObj);
	let result = await responseHandlerSaveNewClient(response);
	if (result[0] == "sucess") {
	} else if (result[0] == "failure") {
	} else {
		throw new Error("wrong value returned");
	}
	// TODO : finish me
	let deleteMe = document.getElementById("div-selection");
	deleteMe.textContent = result[0] + " :: " + result[1];
}

async function sendData(url, inputObj) {
	let strObj = JSON.stringify(inputObj);

	const response = await fetch(url, {
		method: "POST",
		body: strObj,
	});

	//note: change response.text() to const data = await response.json() If we return JSON we must also use .json() instead of .text() in JavaScript:
	let resp = await response.text();
	// console.log(resp);
	return resp;
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

function fecthAndAppendHTML(refRow, selectedOption, disabled) {
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
		return;
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
				console.log("here");
				for (let i = doc.body.childNodes.length - 1; i >= 0; i--) {
					// console.log(i);
					refRow.parentNode.insertBefore(
						doc.body.childNodes[i],
						refRow.nextSibling
					);
				}

				// The file is now available as 'listDOM[selectedOption]'.
			});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// definitions
	const selectTypePersonnality = document.getElementById("type-personnality");

	const modalMainNewClient = document.getElementById("modal-clt-new");
	const btnCancelNewClient = document.getElementById("cancel-new-client");

	const btnSaveNewClient = document.getElementById("save-new-client");
	const refRowClientNew = modalMainNewClient.querySelector("#ref-row");

	function getInputsValues() {
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

	function cleanNewClientForm() {
		const inputsClientForm =
			modalMainNewClient.querySelectorAll(".client-form.input");
		// console.log("canceling");
		inputsClientForm.forEach((input) => {
			// console.log(input.id);
			input.value = DefaultValuesNewClientFormObj[input.id];
		});
		fecthAndAppendHTML(refRowClientNew, "human", false);
		// console.log(inputsClientForm);
	}

	// action
	selectTypePersonnality.addEventListener("input", () => {
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

	btnSaveNewClient.addEventListener("click", () => {
		// const resp = submitIt(getInputsValues());
		// sendData("/database/save/new_client.php", getInputsValues())
		// 	.then((resp) => responseHandlerSaveNewClient(resp))
		// 	.then((result) => console.log(result));
		saveNewclient(getInputsValues());
	});
	//TODO : if good, clean and close, and snckbar. if bad, snackbar, then with reason.

	btnCancelNewClient.addEventListener("click", () => {
		cleanNewClientForm();
	});
});
