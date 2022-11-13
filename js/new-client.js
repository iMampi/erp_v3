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

document.addEventListener("DOMContentLoaded", () => {
	// definitions
	const selectTypePersonnality = document.getElementById("type-personnality");

	const modalMainNewClient = document.getElementById("modal-clt-new");
	const btnCancelNewClient = document.getElementById("cancel-new-client");

	const btnSaveNewClient = document.getElementById("save-new-client");
	const refRow = document.getElementById("ref-row");
	var listDOM = {};

	function fecthAndAppendHTML(selectedOption) {
		// function to cache fetched result
		if (!selectedOption) {
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

	function getInputsValues() {
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
		fecthAndAppendHTML("human");
		// console.log(inputsClientForm);
	}

	async function sendData(inputObj) {
		let strObj = JSON.stringify(inputObj);

		const response = await fetch("/database/save/new_client.php", {
			method: "POST",
			body: strObj,
		});

		//note: change response.text() to const data = await response.json() If we return JSON we must also use .json() instead of .text() in JavaScript:
		let resp = await response.text();
		// console.log(resp);
		return resp;
	}

	async function responseHandler(response) {
		try {
			// return JSON.parse(await response);
			let myjson = JSON.parse(await response);
			return Object.values(myjson)[0];
		} catch (e) {
			return "error";
		}
	}
	// action
	selectTypePersonnality.addEventListener("input", () => {
		let value = selectTypePersonnality.value;
		if (value == 1) {
			try {
				let companies = document.querySelectorAll(".company");
				companies.forEach((div) => div.remove());
			} finally {
				fecthAndAppendHTML("human");
			}
		} else if (value == 2) {
			try {
				let humans = document.querySelectorAll(".human");
				humans.forEach((div) => div.remove());
			} finally {
				fecthAndAppendHTML("company");
			}
		} else {
			console.log("personnality type value error");
		}
	});

	btnSaveNewClient.addEventListener("click", () => {
		// const resp = submitIt(getInputsValues());
		sendData(getInputsValues())
			.then((resp) => responseHandler(resp))
			.then((result) => console.log(result));
	});
	//TODO : if good, clean and close, and snckbar. if bad, snackbar, then with reason.

	btnCancelNewClient.addEventListener("click", () => {
		cleanNewClientForm();
	});
});
