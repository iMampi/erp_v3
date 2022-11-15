async function responseHandlerSelectOneClient(response) {
	try {
		// return JSON.parse(await response);
		let myjson = JSON.parse(await response);
		// console.log(myjson);
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
	input.getAttribut("disabled", "true");
}

document.addEventListener("DOMContentLoaded", () => {
	const btnsClientDetails = document.querySelectorAll(".btn-details");
	const modalClientDetails = document.getElementById("modal-clt-details");

	let refRowClientDetails = modalClientDetails.querySelector("#ref-row");

	async function showDetails(event) {
		console.log("called here");
		let parent = event.currentTarget.parentNode.parentNode;
		let myuid = parent.querySelector(".input.uid").value;
		// console.log(uid);
		sendData("/database/select/one_client_details.php", {
			uid: myuid,
		})
			// .then((resp) => console.log(resp));
			.then((resp) => responseHandlerSelectOneClient(resp))
			.then((result) => {
				console.log(result);
				// TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
				try {
					let antiKey_ = (
						(parseInt(result["type_personnality_uid"]) % 2) +
						1
					).toString();
					let classKey = "." + personnalities[antiKey_];
					let fieldsPersonnality =
						document.querySelectorAll(classKey);
					// console.log("calling removing");
					fieldsPersonnality.forEach((div) => div.remove());
				} finally {
					fecthAndAppendHTML(
						refRowClientDetails,
						personnalities[result["type_personnality_uid"]],
						true
					);

					fillInputsDetails(result);
				}
			});
		// .then((result) => fillInputs(result));
	}

	async function fillInputsDetails(valueObj) {
		let inputsElements = modalClientDetails.querySelectorAll(".input");
		//TODO : use a DTO
		inputsElements.forEach((element) => {
			if (element.id == "actif") {
				element.value = valueObj["active"];
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
				element.value = valueObj["nom_commercial"];
			} else if (element.id == "noms") {
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
		});
	}

	btnsClientDetails.forEach((btnClientDetails) => {
		btnClientDetails.addEventListener("click", (event) => {
			showDetails(event);

			// fecthAndAppendHTML();
		});
	});
});
