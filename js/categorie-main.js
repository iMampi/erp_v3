const DefaultValuesCategorieNewFormObj = {
	uid: "",
	actif: "1",
    name:""
};
var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

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
function fillInputsDetails(valueObj) {
	console.log("valueObj : ");
	console.log(valueObj);
	// let inputsElements = md.querySelectorAll(".input");
	let modalCategorieDetails_ = document.getElementById(
		"modal-categorie-details"
	);
	let inputsElements =
    modalCategorieDetails_.getElementsByClassName("input");

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
		} 
	}
}

function generateRowTableCategorie(nodeModel, DataObj) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(DataObj["uid"], 3, false);
	newNode.querySelector("input.uid").value = DataObj["uid"];
	newNode.querySelector(".name.input").value=DataObj["name"];
	return newNode;
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

async function responseHandlerSaveCategorieNew(response) {
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
async function responseHandlerSelectOneCategorieNew(response) {
	try {
		let myjson = JSON.parse(await response);
		//NOTE : the correct way for save. not correct for select query
		//NOTE : works for error also
		// TODO : handle for when it is an error
        // TODO : all seems to use the same logic. DRY in all others occurence
		console.log("myjson");
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

async function saveNew(inputObj) {
	console.log("saving new fr");
	console.log(inputObj);
	let url = "/database/save/new_categorie.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSaveCategorieNew(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouvelle catégorie créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création de la catégorie");
	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
}

document.addEventListener("DOMContentLoaded",()=>{
    //CACHING
    const divBtns = document.getElementById("div-btns");
    const tableBodyCategorie = document.getElementById("ze-tbody");

    ////modal new
    const modalCategorieNew=document.getElementById('modal-categorie-new');
    const bsModalCategorieNew = new bootstrap.Modal(modalCategorieNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveCategorieNew=modalCategorieNew.querySelector("#btn-save-new");
    const btnCancelCategorieNew=modalCategorieNew.querySelector("#btn-cancel-new");

    ////modal details
    const modalCategorieDetails=document.getElementById('modal-categorie-details');
    const bsModalCategorieDetails = new bootstrap.Modal(modalCategorieDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveCategorieDetails=modalCategorieDetails.querySelector("#btn-save");
    const btnCancelCategorieDetails=modalCategorieDetails.querySelector("#btn-cancel");
    const btnModifyCategorieDetails=modalCategorieDetails.querySelector("#btn-modify");


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

	////modal filter
	const modalFilter=document.getElementById("modal-filter");
    const bsmodalFilter = new bootstrap.Modal(modalConfirmation, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});	


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

			let dataObj = getFormInputsValues(modalCategorieNew);
			saveNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["uid"] = result[1];
					// console.log(dataObj);
					// TODO : cache html
					fetch(
						"/elements/warehouses/items/categories/liste_categories_table_001_base.html"
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

							tableBodyCategorie.append(
								generateRowTableCategorie(trModel, dataObj)
							);
							bsModalCategorieNew.hide();
							_cleanCategorieNewForm();
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
			bsModalCategorieNew.hide();
			cleanCategorieNewForm();
			bsModalConfirmation.hide();
			modificationWatcher = false;
		},
		no: () => {
			bsModalConfirmation.hide();
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
			cancelCategorieDetailsForm();
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

			let inputsValuesObj = getFormInputsValues(modalCategorieDetails);
			saveUpdatedCategorie(inputsValuesObj);
            console.log("modificationWatcher");
            console.log(modificationWatcher);
			return false;
		},
		no: () => {
			bsModalConfirmation.hide();
            console.log("modificationWatcher");
            console.log(modificationWatcher);

            return true;
		},
	};

	const deleteCategorieObj = {
		message: "Etes vous sûr de vouloir supprimer cette catégorie?",
		yes: () => {
			console.log("clicked deleteFournisseurObj" );
			deleteCategorie();
			bsModalConfirmation.hide();
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};
    //FUNCTION

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

	async function deleteCategorie() {
		let myurl = "/database/delete/delete_one_categorie.php";
		let myUid = modalCategorieDetails.querySelector("#uid").value;
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
				ToastShowClosured("success", "Catégorie effacée avec succès");
				bsModalCategorieDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression catégorie");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression catégorie.");
		}
	}


    async function saveUpdatedCategorie(inputsValuesObj) {
		console.log("saving update called");
		console.log(inputsValuesObj);
		let myurl = "/database/save/update_categorie.php";
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
			if (myjson[0] && myjson[1][0] == true) {
				console.log("succc");
				console.log(JSON.stringify(myjson));
				ToastShowClosured("success", "Categorie mis à jour avec succès.");
				let inputsForEdition =
					modalCategorieDetails.querySelectorAll(".input");
				disableInputs(inputsForEdition);
				// updateClientRow(table001, inputsValuesObj);
				btnSaveCategorieDetails.disabled = true;
				btnModifyCategorieDetails.disabled = false;
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

    function cancelCategorieDetailsForm(){
		let inputsForEdition =
		modalCategorieDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalCategorieDetails.hide();
		btnSaveCategorieDetails.disabled = true;
		btnModifyCategorieDetails.disabled = false;
		modificationWatcher=false;

	}

    async function showDetails(event) {
		// TODO : refactor
		// console.log("called here");
		let parent = event.target.parentNode.parentNode;
		let myuid = parent.querySelector(".input.uid").value;
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_categorie_details.php", {
			uid: myuid,
		})
			.then((resp) => {
				// console.log("shwodetail :");
				// console.log(resp);
				return responseHandlerSelectOneCategorieNew(resp);
			})
			.then((result) => {
				// console.log("result : " + JSON.stringify(result[1]));
				// TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
                console.log("result++");
                console.log(result);
				if (result[0]) {

						console.log("result[1]");
						console.log(result[1]);
						fillInputsDetails(result[1]);
				}
			});
	}

    function cleanCategorieNewForm() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"categorie",
			"create"
		).then((response) => {
			if (response["response"] > 0) {
				_cleanCategorieNewForm();
			}
		});
	}

    function _cleanCategorieNewForm() {
		console.log("cleaning");
		const inputsForm =
			modalCategorieNew.querySelectorAll(".input");
            inputsForm.forEach((input) => {
			console.log(input);
			input.value = DefaultValuesCategorieNewFormObj[input.id];
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

    //ADDEVENTLISTENER

    try {
        modalCategorieNew.addEventListener("input",()=>{
            modificationWatcher=true;
        })
    } catch (error) {}
    try {
        btnSaveCategorieNew.addEventListener("click",()=>{
			if (modificationWatcher) {
				openModalConfirmation(
					confirmationObj,
					saveCreationObj
				);
			} else {
				bsModalCategorieNew.hide();
			}        })
    } catch (error) {}
    try {
        btnCancelCategorieNew.addEventListener("click",()=>{
			if (modificationWatcher) {
				openModalConfirmation(
					confirmationObj,
					cancelCreationObj
				);
			} else {
				bsModalCategorieNew.hide();
			}        })
    } catch (error) {}

    try {
        divBtns.addEventListener('click',(event)=>{
            let target=event.target;
            if(target.id=="btn-main-new"){
                    bsModalCategorieNew.show();
            }else if(target.id=="btn-main-filter"){
                bsmodalFilter.show();
            }
        })
    } catch (error) {}

    try {
        tableBodyCategorie.addEventListener('click',(event)=>{
            if(event.target.classList.contains("btn-details")){
                showDetails(event);
				bsModalCategorieDetails.show();
            }
        })
    } catch (error) {
        
    }

    try {
        modalCategorieDetails.querySelector('.modal-footer').addEventListener('click',(event)=>{
            if (event.target.id=="btn-cancel"){
                console.log("cancelling details");
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelDetailsObj
                    );
                } else {
                    cancelCategorieDetailsForm();
                }
            }else if (event.target.id=="btn-modify"){
                let inputsForEdition =
                modalCategorieDetails.querySelectorAll(".input");
                makeCategorieDetailsInputsEditable(inputsForEdition);
                btnSaveCategorieDetails.disabled = false;
            }else if (event.target.id=="btn-save"){
                console.log("btn details save clicked");
                if (modificationWatcher) {
                    // console.log(modificationWatcher);
    
                    openModalConfirmation(
                        confirmationObj,
                        saveDetailsObj
                    );

                    // modificationWatcher = result;
                } else {
                    ToastShowClosured("success", "Client mis à jour avec succès.");
                    let inputsForEdition =
                        modalCategorieDetails.querySelectorAll(".input");
                    disableInputs(inputsForEdition);
                }
            }else if (event.target.id=="btn-delete"){
				openModalConfirmation(confirmationObj,deleteCategorieObj)
            }           
        })
    } catch (error) {
    }

    try {
        modalCategorieDetails.addEventListener('input',()=>{
            modificationWatcher=true;
        })
    } catch (error) {
    }

})