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
async function showMe() {}

function fillInputsDetails(valueObj) {
	console.log("dhfh : ");
	// console.log(md);
	// let inputsElements = md.querySelectorAll(".input");
	let md = document.getElementById("modal-clt-details");
	let inputsElements = md.getElementsByClassName("input");
	console.log("trans : ");
	console.log(inputsElements);
	// let inputsElements = document.querySelectorAll(
	// "#modal-clt-details .input"
	// );
	// console.log(inputsElements);
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

document.addEventListener("DOMContentLoaded", () => {
	const btnsClientDetails = document.querySelectorAll(".btn-details");
	const modalClientDetails = document.getElementById("modal-clt-details");

	let refRowClientDetails = modalClientDetails.querySelector("#ref-row");

	const btnDelClient = modalClientDetails.querySelector("#btn-delete");
	const table001 = document.getElementById("table-001");

	var bsModalClientDetails = new bootstrap.Modal(modalClientDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

	const btnCancelModalClientDetails = document
		.getElementById("modal-clt-details")
		.querySelector("#btn-cancel");

	async function deleteClient() {
		let myurl = "/database/delete/delete_one_client.php";
		let cltUid = modalClientDetails.querySelector("#uid").value;
		let response = await sendData(myurl, { uid: cltUid });
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = JSON.parse(response);
		// let myjson = await response.json();
		if (Array.isArray(myjson)) {
			if (myjson[0] && myjson[1]["nb_affected_row"] == "1") {
				removeTableRow(cltUid);
				ToastShowClosured("success", "Client effacé avec succès");
				bsModalClientDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression client");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression client");
		}
	}

	function removeTableRow(cltUid) {
		try {
			let trToDelete = document.getElementById("row-" + cltUid);
			trToDelete.classList.add("collapse-row");
			return true;
		} catch (err) {
			return false;
		}
	}
	function appendAndFill(refRow, selection, disabled) {
		return new Promise((resolve, reject) => {
			let calling = fecthAndAppendHTML(refRow, selection, disabled);
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
						console.log("calling removing");
						console.log(antiKey_);
						fieldsPersonnality.forEach((div) => div.remove());
						// return [
						// 	appendAndFill(
						// 		refRowClientDetails,
						// 		personnalities[
						// 			result[1]["type_personnality_uid"]
						// 		],
						// 		true
						// 	),
						// 	result[1],
						// ];
					} finally {
						fecthAndAppendHTML(
							refRowClientDetails,
							personnalities[result[1]["type_personnality_uid"]],
							true
						).then((newDom) => {
							setTimeout(() => {
								fillInputsDetails(result[1]);
							}, 200);
							// bsModalClientDetails.show();
						});
						// let newDom =
						// 	document.getElementById("modal-clt-details");
						// fillInputsDetails(newDom, result[1]);
						//must use time out. because when we update the DOM with appendAndFill, it does not update directly
						// setTimeout(() => {
						// 	fillInputsDetails(result[1]);
						// }, 200);
						// try {
						// 	fecthAndAppendHTML(
						// 		s
						// 		personnalities[
						// 			result[1]["type_personnality_uid"]
						// 		],
						// 		true
						// 	);
						// } finally {
						// 	fillInputsDetails(result[1]);
						// }
					}
				}
			});

		// .then((result) => fillInputs(result));
	}

	// btnsClientDetails.forEach((btnClientDetails) => {
	// 	btnClientDetails.addEventListener("click", (event) => {
	// 		showDetails(event);

	// 		// fecthAndAppendHTML();
	// 	});
	// });
	try {
		btnDelClient.addEventListener("click", () => {
			// TODO : test authority
			deleteClient();
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
		btnCancelModalClientDetails.addEventListener("click", () => {
			bsModalClientDetails.hide();
		});
	} catch (e) {}
});
