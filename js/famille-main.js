const DefaultValuesFamilleNewFormObj = {
	uid: "",
	actif: "1",
    name:""
};
const DefaultValuesFamilleFilterObj = {
	uid: "",
	actif: "1",
	name: ""
};

var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

function generateRowTable(nodeModel, DataObj) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(DataObj["uid"], 3, false);
	newNode.querySelector("input.uid").value = DataObj["uid"];
	newNode.querySelector(".name.input").value=DataObj["name"];
	return newNode;
}

function updateFamilleRow(mytable, dataObj) {
	let row = mytable.querySelector(
		"#row-" + zeroLeftPadding(parseInt(dataObj["uid"]), 3, false)
	);
	console.log("dataObj update frnsr row");
	console.log(dataObj);
	console.log(mytable);
	let inputsRow = row.querySelectorAll(".input");
	inputsRow.forEach((input) => {
		// console.log(input.classList);
		if (input.classList.contains("name", "input")) {
			input.value=dataObj["name"]
		}
	});
}

function makeCategorieDetailsInputsEditable(inputElements) {
	// console.log("inputElements");
	// console.log(inputElements.values());
	// console.log(inputElements.item());
	let typeVenteFlag = false;

	inputElements.forEach((input) => {
		if (input.id!="uid") {

			input.disabled = false;
		}else{
            input.disabled = true;

        }
	});
}

async function saveNew(inputObj) {
	console.log("saving new fr");
	console.log(inputObj);
	let url = "/database/save/new_famille.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSaveFamilleNew(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouvelle catégorie créé avec succès");
		modificationWatcher=false;
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création de la catégorie");
		modificationWatcher=true;

	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
}

async function responseHandlerSaveFamilleNew(response) {
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

async function responseHandlerSelectOneFamille(response) {
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



function generateEmptyRowTableCategorie(nodeModel) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	let newId="row-000";
	newNode.id = newId;
	newNode.querySelector("input.uid").value = "Néant";
	newNode.querySelector(".name.input").value ="Néant";
	newNode.querySelector(".btn-details").disabled =true;
	
	return newNode;
}

function fillInputsDetails(valueObj) {
	console.log("valueObj : ");
	console.log(valueObj);
	// let inputsElements = md.querySelectorAll(".input");
	let modalDetails_ = document.getElementById(
		"modal-famille-details"
	);
	let inputsElements =
    modalDetails_.getElementsByClassName("input");

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
			element.value = valueObj["active"];
		} else if (element.id == "uid") {
			element.value = valueObj["uid"];
		} else if (element.id == "name") {
			element.value = valueObj["name"];
		} else if (element.id == "adress") {
			element.value = valueObj["adresse"];
		} else if (element.id == "phone") {
			element.value = valueObj["phone"];
		} else if (element.id == "note") {
			element.value = valueObj["note"];
		} 
	}
}


document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    ////modal new
    const modalNew=document.getElementById("modal-famille-new");
    const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveNew=modalNew.querySelector("#btn-save-new");
    const btnCancelNew=modalNew.querySelector("#btn-cancel-new");

    ////modal confirmation
    const modalConfirmation=document.getElementById("modal-confirmation");
    const bsModalConfirmation = new bootstrap.Modal(modalConfirmation, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnConfirmationYes=modalConfirmation.querySelector(		"#btn-confirmation-yes"
    );
    const btnConfirmationNo=modalConfirmation.querySelector(		"#btn-confirmation-no"
    );

	////modal details
    const modalFamilleDetails=document.getElementById("modal-famille-details");
    const bsModalFamilleDetails = new bootstrap.Modal(modalFamilleDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveFamilleDetails=modalFamilleDetails.querySelector("#btn-save"
    );
    const btnCancelFamilleDetails=modalFamilleDetails.querySelector("#btn-cancel"
    );
    const btnModifyFamilleDetails=modalFamilleDetails.querySelector("#btn-modify"
    );


	////modal filter
    const modalFilter=document.getElementById("modal-filter");
    const bsModalFilter = new bootstrap.Modal(modalFilter, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
	// const btnApplyFilter=modalFilter.querySelector("#btn-apply-filter")
	// const btnCancelFilter=modalFilter.querySelector("#btn-cancel-filter")
	// const btnResetFilter=modalFilter.querySelector("#btn-reset-filter")
	// const footerModalFilter=modalFilter.querySelector(".modal-footer");

    //CONFIRMATION OBJ
    
    const confirmationObj = {
		modal: modalConfirmation,
		bsModal: bsModalConfirmation,
		btnYes: btnConfirmationYes,
		btnNo: btnConfirmationNo,
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
			saveNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["uid"] = result[1][0];
					// console.log(dataObj);
					// TODO : cache html
					fetch(
						"/elements/warehouses/items/familles/liste_familles_table_001_base.html"
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

	const saveDetailsObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modification?",
		yes: () => {
			console.log("called yes");
			bsModalConfirmation.hide();

			let inputsValuesObj = getFormInputsValues(modalFamilleDetails);
			saveUpdatedFamille(inputsValuesObj);
			return false;
		},
		no: () => {
			bsModalConfirmation.hide();
            return true;
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
			cancelFamilleDetailsForm();
            return false;
			
		},
		no: () => {
			bsModalConfirmation.hide();
            return true;
		},
	};

	const deleteCategorieObj = {
		message: "Etes vous sûr de vouloir supprimer cette catégorie?",
		yes: () => {
			console.log("clicked deleteFournisseurObj" );
			deleteFamille();
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

	function resetFilter() {
		let inputs = modalFilter.querySelectorAll(".input");
		let checkboxes = modalFilter.querySelectorAll(
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
			myinput.value = DefaultValuesFamilleFilterObj[myinput.id];
			if ([ "actif"].includes(myinput.id)) {
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

	async function filterFamille(inputObj, tableBodyCategorie) {
		let url = "/database/select/select_filtered_familles.php";
		let response = await sendData(url, inputObj);
	
		console.log("error?");
		console.log(response);
		let myjson = JSON.parse(response);
	
		return await fillMainTable(myjson, tableBodyCategorie);
	
	}

	async function fillMainTable(myJson, myTableBody) {
		console.log("filling table");
		try {
			// TODO : to cache
			let response = await fetch(
				"/elements/warehouses/items/familles/liste_familles_table_001_base.html"
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
		if (myJson == { actif: "1"}) {
			defaultFilterFlag = true;
		} else {
			defaultFilterFlag = false;
		}
		return true;
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

	async function deleteFamille() {
		// TODO : DRY
		let myurl = "/database/delete/delete_one_famille.php";
		let myUid = modalFamilleDetails.querySelector("#uid").value;
		let response = await sendData(myurl, { uid: myUid });
		console.log("response");
		console.log(response);
		// TODO : we dont use await response.json because it is already handled in senData () as respones.text(). so we have to call JSON method manually;
		let myjson = JSON.parse(response);
		// let myjson = await response.json();
		if (Array.isArray(myjson)) {
							console.log("x");
				console.log(myjson);

			if (myjson[0] && myjson[1][0]) {
				removeTableRow(myUid);
				// console.log(x);
				// console.log(myjson);
				ToastShowClosured("success", "Famille effacée avec succès");
				bsModalFamilleDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression famille");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression famille.");
		}
	}

	function removeTableRow(myUid) {
		console.log("collapsing " + myUid);
		try {
			let trToDelete = document.getElementById(
				"row-" + zeroLeftPadding(myUid, 3, false)
			);
			trToDelete.classList.add("collapse-row");
			return true;
		} catch (err) {
			return false;
		}
	}

	async function saveUpdatedFamille(inputsValuesObj) {
		console.log("succ1");

		console.log("saving update called");
		console.log(inputsValuesObj);
		let myurl = "/database/save/update_famille.php";
		let response = await sendData(myurl, inputsValuesObj);
		console.log("response");
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
				ToastShowClosured("success", "Categorie mis à jour avec succès.");
				let inputsForEdition =
					modalFamilleDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				updateFamilleRow(tableBody, inputsValuesObj);
				btnSaveFamilleDetails.disabled = true;
				btnModifyFamilleDetails.disabled = false;
				modificationWatcher=false;

				return false;
			} else {
				console.log("faileeddd");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("failure", "Echec de la mise à jour.");
				modificationWatcher=true;
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

	function cancelFamilleDetailsForm(){
		// TODO : DRY
		let inputsForEdition =
		modalFamilleDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalFamilleDetails.hide();
		btnSaveFamilleDetails.disabled = true;
		btnModifyFamilleDetails.disabled = false;
		modificationWatcher=false;

	}

    async function showDetails(event) {
		// TODO : refactor
		console.log("called here");
		let parent = event.target.parentNode.parentNode;
		let myuid = parent.querySelector(".input.uid").value;
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_famille_details.php", {
			uid: myuid,
		})
			.then((resp) => {
				console.log("shwodetail :");
				console.log(resp);
				return responseHandlerSelectOneFamille(resp);
			})
			.then((result) => {
				// console.log("result : " + JSON.stringify(result[1]));
				// TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
                console.log("result++");
                console.log(result);
				if (result[0]) {

						console.log("result[1]");
						console.log(result[1]);
						fillInputsDetails(result[1][0]);
				}
			});
	}

    function getFormInputsValues(modalRef) {
        let inputObj = {};

        let inputs = modalRef.querySelectorAll(".input");
        // console.log("inputs");
        // console.log(inputs);
        inputs.forEach((input) => {
            inputObj[input.id] = input.value;
        });
        // console.log("inputObj");
        // console.log(inputObj);
        return inputObj;
    }

    function cleanNewForm() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"famille",
			"create"
		).then((response) => {
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
			console.log(input);
			input.value = DefaultValuesFamilleNewFormObj[input.id];
		});
	}

    //EVENTLISTENER
    try{
        divBtns.addEventListener('click',(event)=>{
            if(event.target.id=="btn-main-new"){
                
                bsModalNew.show();
            }else if(event.target.id=="btn-main-filter"){
				console.log("filter me");
			bsModalFilter.show();
		}else if(event.target.id=="btn-remove-filter"){
			console.log("remove filter ");
			event.target.remove();

			resetFilter();
			filterFamille(
				{ actif: "1" },
				tableBody
			);
			defaultFilterFlag = true;
		} 
        })
    } catch (error) {}

    try{
        modalNew.addEventListener('click',(event)=>{
            if (event.target.id=="btn-cancel-new"){
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalNew.hide();
                } 
            }else if (event.target.id=="btn-save-new"){
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
    } catch (error) {}

    try {
		modalNew.addEventListener("input", (event) => {
            modificationWatcher=true;		});
	} catch (error) {}

	try {
		tableBody.addEventListener("click", (event) => {
			if(event.target.classList.contains("btn-details")){
				console.log("see");
				showDetails(event);
				bsModalFamilleDetails.show();
			}
		});
	} catch (error) {}

	try {
		modalFamilleDetails.addEventListener("click", (event) => {
			if(event.target.id=="btn-cancel"){
                console.log("cancelling details");
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelDetailsObj
                    );
                } else {
                    cancelFamilleDetailsForm();
                }			
			}else if(event.target.id=="btn-modify"){
                let inputsForEdition =
                modalFamilleDetails.querySelectorAll(".input");
                makeCategorieDetailsInputsEditable(inputsForEdition);
                btnSaveFamilleDetails.disabled = false;
			}else if(event.target.id=="btn-save"){
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
                        modalFamilleDetails.querySelectorAll(".input");
                    disableInputs(inputsForEdition);
                }
			}else if(event.target.id=="btn-delete"){
				openModalConfirmation(confirmationObj,deleteCategorieObj)

			}
		});
	} catch (error) {}

	try {
		modalFamilleDetails.addEventListener("input", () => {
			modificationWatcher=true;
		})
		} catch (error) {}

	try {
		footerModalFilter.addEventListener("click", (event) => {
			if (event.target.id=="btn-apply-filter"){
				let myobj = getDataFilter();
			
				console.log(myobj);
				filterFamille(myobj, tableBody);
				bsModalFilter.hide();
				if (!divBtns.querySelector("#btn-remove-filter")) {
					insertButtonRemoveFilter();
				}
			}else if (event.target.id=="btn-cancel-filter"){
				resetFilter();
				bsModalFilter.hide();
			}else if (event.target.id=="btn-reset-filter"){
				resetFilter();
			}

		})
	} catch (error) {}

	try {
		modalFilter.addEventListener("input", (event) => {
			let target = event.target;
			if (target.type == "checkbox") {
				changeStateFieldFilter(target);
			}
		});
	} catch (error) {}




})

