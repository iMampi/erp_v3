const DefaultValuesCategorieNewFormObj = {
	uid: "",
	actif: "1",
    name:""
};
var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;

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

    const saveCreationObj = {
		message:
			"Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
		yes: () => {
			console.log("called saveCreationObj ");
			bsModalConfirmation.hide();

			let dataObj = getInputsValuesNew();
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

    //FUNCTION
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

    function getInputsValuesNew() {
        let inputObj = {};

        let inputs = modalCategorieNew.querySelectorAll(".input");
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
				modificationWatcher = openModalConfirmation(
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
				modificationWatcher = openModalConfirmation(
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
                bsModalCategorieFilter.show();
            }
        })
    } catch (error) {}
})