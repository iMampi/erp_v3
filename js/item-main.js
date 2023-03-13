const DefaultValuesItemNewFormObj = {
	code: "",
	actif: "1",
    declarable:"1",
    name:"",
    type:"1",
    measurement:"1",
    stockable:"0",
    identifiable:"0",
    "prix-vente":"",
    pamp:"",
    note:""
};
const TYPE_ITEM=["service","bien"];

const DTO_FILL_INPUT={
	"code":"code",
	"actif":"active",
	"declarable":"declarable",
	"name":"name",
	"type":"type_item",
	"famille":"famille",
	"categorie":"categorie",
	"measurement":"unite_mesure_uid",
	"stockable":"stockable",
	"identifiable":"identifiable",
	"prix-vente":"prix_vente",
	"pamp":"prix_achat_mp",
	"note":"note"
}

var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

function makeDetailsInputsEditable(inputElements) {
	// console.log("inputElements");
	// console.log(inputElements.values());
	// console.log(inputElements.item());
	inputElements.forEach((input) => {
		if ( !["uid","code","pamp"].includes(input.id)) {
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
		element.value=valueObj[DTO_FILL_INPUT[element.id]];
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
	newNode.id = "row-"+zeroLeftPadding(DataObj["uid"], 3, false);
	// newNode.querySelector("input.uid").value = DataObj["uid"];
	newNode.querySelector("input.code").value = DataObj["code"];
	newNode.querySelector(".name.input").value=DataObj["name"];
	newNode.querySelector(".type.input").value=TYPE_ITEM[DataObj["type"]];
	newNode.querySelector(".category.input").value=DataObj["category"];
	newNode.querySelector(".famille.input").value=DataObj["famille"];
	newNode.querySelector(".prix-vente.input").value=DataObj["prix-vente"];
	newNode.querySelector(".pamp.input").value=DataObj["pamp"];
	newNode.querySelector(".declarable.input").value=DataObj["declarable"];
	return newNode;
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

document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    ////modal new
    const modalNew=document.getElementById("modal-item-new");
    const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    // const btnSaveNew=modalNew.querySelector("#btn-save-new");
    // const btnCancelNew=modalNew.querySelector("#btn-cancel-new");

    ////modal item detail
    const modalItemDetails=document.getElementById("modal-item-details");
    const bsModalItemDetails = new bootstrap.Modal(modalItemDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveItemDetails=modalItemDetails.querySelector("#btn-save");
    const btnCancelItemDetails=modalItemDetails.querySelector("#btn-cancel");
    const btnModifyItemDetails=modalItemDetails.querySelector("#btn-modify");

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
			saveNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["uid"] = result[1];
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

			let inputsValuesObj = getFormInputsValues(modalItemDetails);
			saveUpdatedItem(inputsValuesObj);
			return false;
		},
		no: () => {
			bsModalConfirmation.hide();
            return true;
		},
	};


    //FUNCTIONS
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
			if (myjson[0] && myjson[1][0] == true) {
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

	function cancelItemDetailsForm(){
		// TODO : DRY
		let inputsForEdition =
		modalItemDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalItemDetails.hide();
		btnSaveItemDetails.disabled = true;
		btnModifyItemDetails.disabled = false;
		modificationWatcher=false;
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
						console.log(result[1]);
						fillInputsDetails(result[1]);
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
        divBtns.addEventListener('click',(event)=>{
            if (event.target.id=="btn-main-new"){
                bsModalNew.show();
            }
        })
    } catch (error) {
        
    }

    try {
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
            }        })
    } catch (error) {
        
    }

    try {
        modalNew.addEventListener('input',(event)=>{
            modificationWatcher=true;
        })
    } catch (error) {
        
    }

	try {
		modalItemDetails.addEventListener("input", () => {
			modificationWatcher=true;
		})
		} catch (error) {}

	try {
		modalItemDetails.addEventListener("click", (event) => {
			if(event.target.id=="btn-cancel"){
                console.log("cancelling details");
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelDetailsObj
                    );
                } else {
                    cancelItemDetailsForm();
                }			
			}else if(event.target.id=="btn-modify"){
                let inputsForEdition =
                modalItemDetails.querySelectorAll(".input");
                makeDetailsInputsEditable(inputsForEdition);
                btnSaveItemDetails.disabled = false;
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
				openModalConfirmation(confirmationObj,deleteCategorieObj)			}
		})
		} catch (error) {}

	try {
		tableBody.addEventListener("click", (event) => {
			if (event.target.classList.contains("btn-details")){
				showDetails(event);
				bsModalItemDetails.show();
			}
		})
		} catch (error) {}
})