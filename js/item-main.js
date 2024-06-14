var currentUser;
var defaultAutoNumericOptions =
{
	decimalCharacter: ",",
	digitGroupSeparator: " ",
	watchExternalChanges: true
};

const DefaultValuesItemNewFormObj = {
	code: "",
	actif: "1",
	declarable: "1",
	name: "",
	type: "1",
	measurement: "1",
	stockable: "0",
	identifiable: "0",
	"prix-vente": "0,00",
	"famille": "",
	"categorie": "",
	pamp: "",
	note: "",
	"prix-variable": false
};
const DefaultValuesItemFilterObj = {
	code: "",
	actif: "1",
	declarable: "all",
	name: "",
	type: "all",
	measurement: "all",
	stockable: "all",
	identifiable: "all",
	"famille": "",
	"categorie": "",
	"prix-vente-min": "0,00",
	"prix-vente-max": "0,00",
	"pamp-min": "0",
	"pamp-max": "0",
	note: "",
	"prix-variable": false
}
const TYPE_ITEM = ["service", "bien"];

const DTO_FILL_INPUT = {
	"code": "code",
	"actif": "active",
	"declarable": "declarable",
	"name": "name",
	"type": "type_item",
	"famille": "famille",
	"categorie": "categorie",
	"measurement": "unite_mesure_uid",
	"stockable": "stockable",
	"identifiable": "identifiable",
	"prix-vente": "prix_vente",
	"pamp": "prix_achat_mp",
	"note": "note",
	"prix-variable": "prix_variable"
}

var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

function fillButtonText(objectData, BtnNode) {
	// TODO : to refactor. there's redondancy
	if (["fournisseur", "client"].includes(BtnNode.id)) {
		let client = formatCLientNameSearchResult(objectData);
		setInputValue(BtnNode, client);
	} else if (["categorie", "famille"].includes(BtnNode.id)) {
		setInputValue(BtnNode, objectData.text);

	}
}

function updateFamilleRow(mytable, dataObj) {
	// let row = mytable.querySelector(
	// "#row-" + zeroLeftPadding(parseInt(dataObj["uid"]), 3, false)
	// );
	let row = mytable.querySelector(
		"#row-" + dataObj["code"]
	);
	console.log("dataObj update frnsr row");
	console.log(dataObj);
	console.log(mytable);
	let inputsRow = row.querySelectorAll(".input");
	// TODO : use a DTO
	inputsRow.forEach((input) => {
		// console.log(input.classList);
		if (input.classList.contains("name", "input")) {
			input.value = dataObj["name"];
		} else if (input.classList.contains("code", "input")) {
			input.value = dataObj["code"];
		} else if (input.classList.contains("actif", "input")) {
			input.value = dataObj["actif"];
		} else if (input.classList.contains("declarable", "input")) {
			input.value = dataObj["declarable"];
		} else if (input.classList.contains("type", "input")) {
			input.value = TYPE_ITEM[dataObj["type"]];
		} else if (input.classList.contains("famille", "input")) {
			input.value = dataObj["famille"];
		} else if (input.classList.contains("categorie", "input")) {
			input.value = dataObj["categorie"];
		} else if (input.classList.contains("measurement", "input")) {
			input.value = dataObj["measurement"];
		} else if (input.classList.contains("stockable", "input")) {
			input.value = dataObj["stockable"];
		} else if (input.classList.contains("identifiable", "input")) {
			input.value = dataObj["identifiable"];
		} else if (input.classList.contains("prix-vente", "input")) {
			input.value = dataObj["prix-vente"];
		} else if (input.classList.contains("pamp", "input")) {
			input.value = dataObj["pamp"];
		} else if (input.classList.contains("note", "input")) {
			input.value = dataObj["note"];
		} else if (input.classList.contains("prix-variable", "input")) {
			input.value = dataObj["prix-variable"];
		}
	});
}



function makeDetailsInputsEditable(inputElements) {
	// console.log("inputElements");
	// console.log(inputElements.values());
	// console.log(inputElements.item());
	inputElements.forEach((input) => {
		if (!["uid", "code", "pamp"].includes(input.id)) {
			input.disabled = false;
		} else {
			input.disabled = true;

		}
	});
}

function fillInputsDetails(valueObj) {
	console.log("valueObj : ");
	console.log(valueObj);
	// let inputsElements = md.querySelectorAll(".input");
	let modalDetails_ = document.getElementById(
		"modal-item-details"
	);
	let inputsElements =
		modalDetails_.getElementsByClassName("input");

	// console.log("inputsElement :");
	// console.log(inputsElements);
	// let inputsElements = document.querySelectorAll(
	// "#modal-clt-details .input"
	// );
	//TODO : use a DTO>> TO DUPLICATE EVERYWHERE ELSE
	for (let index = 0; index < inputsElements.length; index++) {
		let element = inputsElements[index];
		if (["famille", "categorie"].includes(element.id)) {
			element.value = valueObj[DTO_FILL_INPUT[element.id] + "_uid"] + " - " + valueObj[DTO_FILL_INPUT[element.id]];
		} else {
			element.value = valueObj[DTO_FILL_INPUT[element.id]];
		}
		// console.log(element.id);
		// console.log(DTO_FILL_INPUT[element.id]);
		// console.log(valueObj[DTO_FILL_INPUT[element.id]]);

	}
}

async function responseHandlerSelectOneItem(response) {
	try {
		console.log("response++");
		console.log(response);
		let myjson = JSON.parse(await response);
		//NOTE : the correct way for save. not correct for select query
		//NOTE : works for error also
		// TODO : handle for when it is an error
		// TODO : all seems to use the same logic. DRY in all others occurence
		console.log("myjson select");
		console.log(myjson);
		if (myjson[0]) {
			return ["success", myjson[1]];
		} else {
			return ["failure", Object.values(myjson[1])[0]];
		}
	} catch (e) {
		// TODO : comment me
		return "error js: " + e;
	}
}

async function responseHandlerSaveItemNew(response) {
	try {
		let myjson = JSON.parse(await response);
		//NOTE : the correct way for save. not correct for select query
		//NOTE : works for error also
		// TODO : handle for when it is an error
		// TODO : all seems to use the same logic. DRY in all others occurence
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

async function saveNew(inputObj) {
	console.log("saving new fr");
	console.log(inputObj);
	let url = "/database/save/new_item.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSaveItemNew(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouvel article créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création de l'article");
	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
}

function generateRowTable(nodeModel, DataObj) {
	console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-" + DataObj["code"];

	// newNode.querySelector("input.uid").value = DataObj["uid"];
	// TODO : use a dto or something
	newNode.querySelector("input.code").value = DataObj["code"];
	newNode.querySelector(".name.input").value = DataObj["name"];
	newNode.querySelector(".type.input").value = TYPE_ITEM[DataObj["type"]] || TYPE_ITEM[DataObj["type_item"]];
	newNode.querySelector(".category.input").value = DataObj["category"] || DataObj["categorie"];
	newNode.querySelector(".famille.input").value = DataObj["famille"];
	newNode.querySelector(".prix-vente.input").value = DataObj["prix-vente"] || DataObj["prix_vente"] || "";
	newNode.querySelector(".pamp.input").value = DataObj["pamp"] || DataObj["prix_achat_mp"] || "";
	newNode.querySelector(".declarable.input").value = DataObj["declarable"];
	return newNode;
}


function getFormInputsValues(modalRef) {
	let inputObj = {};

	let inputs = modalRef.querySelectorAll(".input");
	// console.log("inputs");
	// console.log(inputs);
	inputs.forEach((input) => {
		inputObj[input.id] = getInputValue(myInput).trim();

	});
	// console.log("inputObj");
	// console.log(inputObj);
	return inputObj;
}

document.addEventListener("DOMContentLoaded", () => {
	//CACHING ELEMENTS
	const divBtns = document.getElementById("div-btns");
	const tableBody = document.getElementById("ze-tbody");
	////modal new
	const modalNew = document.getElementById("modal-item-new");
	const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	// const btnSaveNew=modalNew.querySelector("#btn-save-new");
	// const btnCancelNew=modalNew.querySelector("#btn-cancel-new");

	////modal item detail
	const modalItemDetails = document.getElementById("modal-item-details");
	const bsModalItemDetails = new bootstrap.Modal(modalItemDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	const btnSaveItemDetails = modalItemDetails.querySelector("#btn-save");
	const btnCancelItemDetails = modalItemDetails.querySelector("#btn-cancel");
	const btnModifyItemDetails = modalItemDetails.querySelector("#btn-modify");

	////modal confirmation
	const modalConfirmation = document.getElementById("modal-confirmation");
	const bsModalConfirmation = new bootstrap.Modal(modalConfirmation, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	const btnConfirmationYes = modalConfirmation.querySelector("#btn-confirmation-yes"
	);
	const btnConfirmationNo = modalConfirmation.querySelector("#btn-confirmation-no"
	);

	////modal filter
	const modalFilter = document.getElementById("modal-filter");
	const bsModalFilter = new bootstrap.Modal(modalFilter, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	const btnApplyFilter = modalFilter.querySelector("#btn-apply-filter")
	const btnCancelFilter = modalFilter.querySelector("#btn-cancel-filter")
	const btnResetFilter = modalFilter.querySelector("#btn-reset-filter")
	const footerModalFilter = modalFilter.querySelector(".modal-footer");

	//CONFIRMATION OBJ
	const confirmationObj = {
		modal: modalConfirmation,
		bsModal: bsModalConfirmation,
		btnYes: btnConfirmationYes,
		btnNo: btnConfirmationNo,
	};

	const cancelCreationObj = {
		message:
			"Des champs ont été modifiés.<br>\
		Vos modifications vont être perdus.<br>\
		Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			bsModalNew.hide();
			cleanNewForm();
			bsModalConfirmation.hide();
			// modificationWatcher = false;
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};

	const saveCreationObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
		yes: () => {
			console.log("called saveCreationObj ");
			bsModalConfirmation.hide();

			let dataObj = getFormInputsValues(modalNew);
			dataObj["categorie-uid"] = dataObj["categorie"].split(' - ')[0];
			dataObj["categorie"] = dataObj["categorie"].split(' - ')[1];
			dataObj["famille-uid"] = dataObj["famille"].split(' - ')[0];
			dataObj["famille"] = dataObj["famille"].split(' - ')[1];
			dataObj["prix-vente"] = parseFloat(dataObj["prix-vente"]).toFixed(2);
			console.log("dataObj");
			console.log(dataObj);
			saveNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["uid"] = result[1][0];
					// console.log(dataObj);
					// TODO : cache html
					fetch(
						"/elements/warehouses/items/liste_items_table_001_base.html"
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

							tableBody.append(
								generateRowTable(trModel, dataObj)
							);
							bsModalNew.hide();
							_cleanNewForm();
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
			return false;

		},
	};

	const cancelDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
			Vos modifications vont être perdus.<br>\
			Êtes vous sûr de vouloir quitter ce formulaire?",
		yes: () => {
			console.log("cancelDetailsObj");
			bsModalConfirmation.hide();
			cancelItemDetailsForm();
			return false;

		},
		no: () => {
			bsModalConfirmation.hide();
			return true;
		},
	};

	const saveDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modification?",
		yes: () => {
			console.log("called yes");
			bsModalConfirmation.hide();

			let dataObj = getFormInputsValues(modalItemDetails);
			dataObj["categorie-uid"] = dataObj["categorie"].split(' - ')[0];
			dataObj["categorie"] = dataObj["categorie"].split(' - ')[1];
			dataObj["famille-uid"] = dataObj["famille"].split(' - ')[0];
			dataObj["famille"] = dataObj["famille"].split(' - ')[1];
			dataObj["prix-vente"] = parseFloat(dataObj["prix-vente"]).toFixed(2);

			saveUpdatedItem(dataObj);
			return false;
		},
		no: () => {
			bsModalConfirmation.hide();
			return true;
		},
	};

	const deleteItemObj = {
		message: "Etes vous sûr de vouloir supprimer cette article?",
		yes: () => {
			console.log("clicked deleteFournisseurObj");
			deleteItem();
			bsModalConfirmation.hide();
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};


	//FUNCTIONS

	function changeStateFieldFilter(target) {
		let checked = target.checked;
		let fieldName = target.id.split("--")[1];
		let inputs = modalFilter.querySelectorAll("." + fieldName);
		inputs.forEach((myinput) => {
			if (checked) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	function insertButtonRemoveFilter() {
		let myHtml =
			'<button id="btn-remove-filter" class="col-auto btn btn-danger me-auto">supprimer le filtre</button>';
		let mydiv = divBtns.lastElementChild;
		let myNode = new DOMParser().parseFromString(myHtml, "text/html");
		mydiv.prepend(myNode.body.childNodes[0]);
	}

	function filterButtonDropdown(nodeListLI, term) {
		console.log("fifi fafamille");
		term = term.trim();
		if (term) {
			nodeListLI.forEach(LI => {
				LI.classList.remove("visually-hidden");
				if (!LI.querySelector("a").textContent.toLowerCase().includes(term)) {
					LI.classList.add("visually-hidden");
				}
			});
		}

	}

	async function fillMainTable(myJson, myTableBody) {
		console.log("filling table");
		try {
			// TODO : to cache
			let response = await fetch(
				"/elements/warehouses/items/liste_items_table_001_base.html"
			);
			let rowBaseText = await response.text();
			let doc = new DOMParser().parseFromString(rowBaseText, "text/html");
			let trModel = doc.querySelector("#row-001");

			myTableBody.innerHTML = "";
			console.log("myJson");
			console.log(myJson);
			myJson.forEach((elementObj) => {
				let newRow = generateRowTable(trModel, elementObj);
				myTableBody.appendChild(newRow);
			});
		} catch (error) {
			console.log("filling table err");
			console.log(error);
			return false;
		}
		if (myJson == { actif: "1" }) {
			defaultFilterFlag = true;
		} else {
			defaultFilterFlag = false;
		}
		return true;
	}

	async function filterItem(inputObj, tableBodyCategorie) {
		let url = "/database/select/select_filtered_items.php";
		let response = await sendData(url, inputObj);

		console.log("error?");
		console.log(response);
		let myjson = JSON.parse(response);

		return await fillMainTable(myjson, tableBodyCategorie);

	}

	function getDataFilter() {
		let dataFilterObj = {};
		let checkboxes = modalFilter.querySelectorAll(
			"input[type=checkbox]:checked"
		);

		checkboxes.forEach((checkboxe) => {
			let fieldName = checkboxe.id.split("--")[1];
			let inputs = modalFilter.querySelectorAll("." + fieldName);
			inputs.forEach((myinput) => {
				dataFilterObj[myinput.id] = myinput.value;
			});
		});

		return dataFilterObj;
	}


	function appendHTMLFilterBasic() {
		let name = "filter_basic";
		let modalFilterBody = modalFilter.querySelector(".modal-body ");

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
			fetch("/elements/warehouses/items/item_" + name + ".html")
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



	function appendHTMLFilterAdvanced() {
		let name = "filter_advanced";
		let modalFilterBody = modalFilter.querySelector(".modal-body ");

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
			fetch("/elements/warehouses/items/item_" + name + ".html")
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
		let inputs = modalFilter.querySelectorAll(".input");
		let checkboxes = modalFilter.querySelectorAll(
			"input[type=checkbox]"
		);
		checkboxes.forEach((checkbox) => {
			if (
				["checkbox--actif", "checkbox--declarable", "checkbox--name"].includes(
					checkbox.id
				)
			) {
				checkbox.checked = true;
			} else {
				checkbox.checked = false;
			}
		});
		inputs.forEach((myinput) => {
			myinput.value = DefaultValuesItemFilterObj[myinput.id];
			if (["declarable", "name", "actif"].includes(myinput.id)) {
				myinput.disabled = false;
			} else {
				myinput.disabled = true;
			}
		});
	}

	function removeTableRow(myUid) {
		console.log("collapsing " + myUid);
		try {
			let trToDelete = document.getElementById(
				"row-" + myUid
			);
			trToDelete.classList.add("collapse-row");
			return true;
		} catch (err) {
			return false;
		}
	}

	async function deleteItem() {
		// TODO : DRY
		let myurl = "/database/delete/delete_one_item.php";
		let myUid = modalItemDetails.querySelector("#code").value;
		let response = await sendData(myurl, { code: myUid });
		console.log("response");
		console.log(response);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = JSON.parse(response);
		// let myjson = await response.json();
		if (Array.isArray(myjson)) {
			console.log("x");
			console.log(myjson);

			if (myjson[0] && myjson[1]["nb_affected_row"] == "1") {
				removeTableRow(myUid);
				// console.log(x);
				// console.log(myjson);
				ToastShowClosured("success", "Article effacé avec succès");
				bsModalItemDetails.hide();
			} else {
				ToastShowClosured("failure", "Échec suppression article");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression article.");
		}
	}
	async function saveUpdatedItem(inputsValuesObj) {
		console.log("succ1");

		console.log("saving update called");
		console.log(inputsValuesObj);
		let myurl = "/database/save/update_item.php";
		let response = await sendData(myurl, inputsValuesObj);
		console.log(response);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = await JSON.parse(response);
		console.log("myjson");
		console.log(myjson);
		console.log("Array.isArray(myjson)");
		console.log(Array.isArray(myjson));
		if (Array.isArray(myjson)) {
			// note : structure particuliere retourné par la funciton sql
			if (myjson[0]) {
				console.log("succc");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("success", "Article mis à jour avec succès.");
				let inputsForEdition =
					modalItemDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				updateFamilleRow(tableBody, inputsValuesObj);
				btnSaveItemDetails.disabled = true;
				btnModifyItemDetails.disabled = false;
				return false;
			} else {
				console.log("faileeddd");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("failure", "Echec de la mise à jour.");
				return true;
			}
		} else {
			console.log("faileeddd2");

			ToastShowClosured(
				"failure",
				"Echec de la mise à jour, contactez l'administrateur système."
			);
			return true;
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

	function cancelItemDetailsForm() {
		// TODO : DRY
		let inputsForEdition =
			modalItemDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalItemDetails.hide();
		btnSaveItemDetails.disabled = true;
		btnModifyItemDetails.disabled = false;
		modificationWatcher = false;
	}

	async function showDetails(event) {
		// TODO : refactor
		console.log("called here");
		let parent = event.target.parentNode.parentNode.parentNode;
		console.log("parent");
		console.log(parent);
		let mycode = parent.querySelector(".input.code").value;
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_item_details.php", {
			code: mycode,
		})
			.then((resp) => {
				console.log("shwodetail :");
				console.log(resp);
				return responseHandlerSelectOneItem(resp);
			})
			.then((result) => {
				// console.log("result : " + JSON.stringify(result[1]));
				// TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
				console.log("result++");
				console.log(result);
				if (result[0]) {

					console.log("result[1]");
					console.log(result[1][0]);
					fillInputsDetails(result[1][0]);
				}
			});
	}


	function cleanNewForm() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"item",
			"create"
		).then((response) => {
			console.log("response");
			console.log(response);
			if (response["response"] > 0) {
				_cleanNewForm();
			}
		});
	}

	function _cleanNewForm() {
		console.log("cleaning");
		const inputsForm =
			modalNew.querySelectorAll(".input");
		inputsForm.forEach((input) => {
			// console.log(input);
			input.value = DefaultValuesItemNewFormObj[input.id];
		});
	}

	//EVENTHANDLER
	try {
		modalFilter.addEventListener('hidden.bs.modal', () => {
			let datalists = document.querySelectorAll("datalist");
			datalists.forEach(element => {
				element.querySelector("#all").remove();
			});
		})
	} catch (error) {

	}
	try {
		divBtns.addEventListener('click', (event) => {
			if (event.target.id == "btn-main-new") {
				bsModalNew.show();
			} else if (event.target.id == "btn-main-filter") {
				bsModalFilter.show();
				//since we use a common datalist for new and filter, we add "all" when needed.
				let innerHTMLAll_ = "<option id='all'>all - Tous</option>";
				let datalists = document.querySelectorAll('datalist');
				datalists.forEach(element => {
					element.innerHTML += innerHTMLAll_
				});
			} else if (event.target.id == "btn-remove-filter") {
				console.log("remove filter ");
				event.target.remove();
				resetFilter();
				filterItem(
					{ actif: "1" },
					tableBody
				);
				defaultFilterFlag = true;
			}
		})
	} catch (error) {

	}

	try {
		modalNew.addEventListener('click', (event) => {
			if (event.target.classList.contains("dropdown-toggle")) {
				if (event.target.classList.contains("is-invalid")) {
					event.target.classList.remove("is-invalid");
					modificationWatcher = true;
				}
			}
			if (event.target.classList.contains("search-result")) {
				console.log("chossed item");
				console.log(event);
				let dropdownNode = event.target.parentNode.parentNode.parentNode;
				fillButtonText({ text: event.target.textContent }, dropdownNode.querySelector(".dropdown-toggle"));
				// trNOde.querySelector("#item-num-serie").textContent = "...";



			} else if (event.target.id == "btn-cancel-new") {
				if (modificationWatcher) {
					openModalConfirmation(
						confirmationObj,
						cancelCreationObj
					);
				} else {
					bsModalNew.hide();
				}
			} else if (event.target.id == "btn-save-new") {
				if (modificationWatcher) {
					openModalConfirmation(
						confirmationObj,
						saveCreationObj
					);
				} else {
					bsModalNew.hide();
				}
			}
		})
	} catch (error) {

	}

	try {
		modalNew.addEventListener('input', (event) => {
			console.log("input done");
			modificationWatcher = true;
			if (event.target.id === "prix-variable") {
				modalNew.querySelector("#prix-vente").disabled = modalNew.querySelector("#prix-variable").checked;
				modalNew.querySelector("#prix-vente").value = "0,00"
			} else if (["search-famille", "search-categorie"].includes(event.target.id)) {
				console.log("searching famille");
				let myDropdown = event.target.parentNode.parentNode.parentNode;
				filterButtonDropdown(myDropdown.querySelectorAll("li.result"), event.target.value);

			}
		})
	} catch (error) {

	}

	try {
		modalItemDetails.addEventListener("input", () => {
			modificationWatcher = true;
		})
	} catch (error) { }

	try {
		modalItemDetails.addEventListener("click", (event) => {
			if (event.target.id == "btn-cancel") {
				console.log("cancelling details");
				if (modificationWatcher) {
					openModalConfirmation(
						confirmationObj,
						cancelDetailsObj
					);
				} else {
					cancelItemDetailsForm();
				}
			} else if (event.target.id == "btn-modify") {
				let inputsForEdition =
					modalItemDetails.querySelectorAll(".input");
				makeDetailsInputsEditable(inputsForEdition);
				btnSaveItemDetails.disabled = false;
			} else if (event.target.id == "btn-save") {
				console.log("btn details save clicked");
				if (modificationWatcher) {
					openModalConfirmation(
						confirmationObj,
						saveDetailsObj
					);

					// modificationWatcher = result;
				} else {
					console.log("succ2");
					ToastShowClosured("success", "Client mis à jour avec succès.");
					let inputsForEdition =
						modalItemDetails.querySelectorAll(".input");
					disableInputs(inputsForEdition);
				}
			} else if (event.target.id == "btn-delete") {
				openModalConfirmation(confirmationObj, deleteItemObj)
			}
		})
	} catch (error) { }

	try {
		tableBody.addEventListener("click", (event) => {
			if (event.target.classList.contains("btn-details")) {
				showDetails(event);
				bsModalItemDetails.show();
			}
		})
	} catch (error) { }

	try {
		modalFilter.addEventListener("click", (event) => {
			if (event.target.id == "btn-apply-filter") {
				let myobj = getDataFilter();

				console.log(myobj);
				filterItem(myobj, tableBody);
				bsModalFilter.hide();
				if (!divBtns.querySelector("#btn-remove-filter")) {
					insertButtonRemoveFilter();
				}
			} else if (event.target.id == "btn-cancel-filter") {
				appendHTMLFilterBasic();
				resetFilter();
				bsModalFilter.hide();
			} else if (event.target.id == "btn-reset-filter") {
				resetFilter();
			} else if (event.target.id == "btn-filter-advanced") {
				appendHTMLFilterAdvanced();
			} else if (event.target.id == "btn-filter-basic") {
				appendHTMLFilterBasic();

			}

		})
	} catch (error) { }

	try {
		modalFilter.addEventListener("input", (event) => {
			let target = event.target;
			if (target.type == "checkbox") {
				changeStateFieldFilter(target);
			}
		});
	} catch (error) { }
})