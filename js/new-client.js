document.addEventListener("DOMContentLoaded", () => {
	// definitions
	const selectTypePersonnality = document.getElementById("type-personnality");
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
			console.log("there" + JSON.stringify(listDOM));
			let doc = new DOMParser().parseFromString(
				listDOM[selectedOption],
				"text/html"
			);
			refRow.after(doc.body);
		} else {
			// Fetch the HTML code of this file.
			fetch("/elements/tiers/clients/" + selectedOption + ".html")
				.then((resp) => resp.text())
				.then((txt) => {
					let doc = new DOMParser().parseFromString(txt, "text/html");
					// Save the HTML code of this file in the files array,
					// so we won't need to fetch it again.
					listDOM[selectedOption] = doc.body.innerHTML;
					refRow.after(doc.body);

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
		return inputObj;
	}

	function submitIt(inputObj) {
		console.log("we subrmit it");
		let strObj = JSON.stringify();
		//console.log(dataObj);
		return sendData(strObj);
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
		} else if (value == 0) {
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
		sendData(getInputsValues()).then((resp) => console.log(resp));
	});
});
