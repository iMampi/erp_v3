
const DefaultValuesEmployeeNewFormObj = {
	actif: "1",
	adress: "",
	alloc: "0",
	avantages: "0",
	cin: "",
	"cin-date": "",
	"cin-lieu": "",
	"cnaps-num": "",
	csp: "1",
	debut: "",
	fin: "",
	hs: "0",
	magasin: "1",
	mail1: "",
	mail2: "",
	mailpro: "",
	matrimonial: "0",
	matricule: "",
	"naissance-date": "",
	"naissance-lieu": "",
	"nb-enfants": "0",
	noms: "",
	note: "",
	phone1: "",
	phone2: "",
	phonepro: "",
	poste: "",
	prenoms: "",
	"sal-variable": "0",
	"reduc-irsa": "0",
	"sal-base": "0",
	sexe: "1",
	smie: "1",
	"smie-num": "",
	uid: "",
	evaluation:"0",
};
const DTOFillInputsObj={
	uid:"uid",
	matricule:"matricule",
	adress:"adress",
	phone1:"phone1",
	phone2:'phone2',
	phonepro:"phonepro",
	mail1:'mail1',
	mail2:"mail2",
	mailpro:"mailpro",
	"actif": 'active_employee',
	note:'note',
	evaluation:"evaluation",
	noms:'noms',
	prenoms:"prenoms",
	cin:'cin',
	'cin-date':'cin_date',
	'cin-lieu': 'cin_lieu',
	'naissance-date':'naissance_date',
	'naissace-lieu':'naissance_lieu',
	debut:'debut',
	fin:"fin",
	poste:'poste',
	"csp":"categorie",
	'magasin':"principal_magasin_uid",
	'sal-base':"sal_base",
	'sal-variable':'sal_variable',
	'smie':"smie_uid",
	matrimonial:"matrimonial",
	"nb-enfants":'nb_enfants',
	"reduc-irsa":"reduc_irsa",
	"hs":"heures_supp",
	"cnaps-num":"cnaps_num",
	"smie-num":"smie_num",
	"alloc":"alloc_fam",
	avantages:"avantages",
	sexe:"sexe"
}
const ToastShowClosured = showMe();
var modificationWatcher= false;

async function saveNew(inputObj) {
	console.log("saving new fr");
	console.log(inputObj);
	let url = "/database/save/new_employee.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSaveEmployeeNew(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouvel employé créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création de la catégorie");
	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
}

async function responseHandlerSaveEmployeeNew(response) {
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

async function responseHandlerSelectOneEmployee(response) {
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

function makeEmployeeDetailsInputsEditable(inputElements) {
	inputElements.forEach((input) => {
		if (input.id!="matricule") {
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
		"modal-employee-details"
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
		// console.log(element.id+ " -- " +DTOFillInputsObj[element.id]);
		element.value = valueObj[DTOFillInputsObj[element.id]];

	}
}

function generateRowTable(nodeModel, DataObj) {
	console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(DataObj["matricule"], 3, false);
	DataObj["matricule"] = zeroLeftPadding(DataObj["matricule"], 4, false);
	newNode.querySelector("input.matricule").value = DataObj["matricule"];
	newNode.querySelector(".noms.input").value=DataObj["noms"];
	newNode.querySelector(".prenoms.input").value=DataObj["prenoms"];
	newNode.querySelector(".debut.input").value=DataObj["debut"];
	newNode.querySelector(".fin.input").value=DataObj["fin"];
	newNode.querySelector(".poste.input").value=DataObj["poste"];
	newNode.querySelector(".matricule.input").value=DataObj["matricule"];
	return newNode;
}

document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    
    ////modal new
    const modalNew=document.getElementById("modal-employee-new");
    const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveNew=modalNew.querySelector("#btn-save-new");
    const btnCancelNew=modalNew.querySelector("#btn-cancel-new");

    ////modal details
	
    const modalEmployeeDetails=document.getElementById("modal-employee-details");
    const bsModalEmployeeDetails = new bootstrap.Modal(modalEmployeeDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveDetails=modalEmployeeDetails.querySelector("#btn-save");
    const btnCancelDetails=modalEmployeeDetails.querySelector("#btn-cancel");
    const btnModifyDetails=modalEmployeeDetails.querySelector("#btn-modify");

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
			console.log(dataObj);
			saveNew(dataObj).then((result) => {
				if (result[0]) {
					// insert uid of newly created client
					dataObj["matricule"] = result[1];
					// console.log(dataObj);
					// TODO : cache html
					fetch(
						"/elements/tiers/employees/liste_emps_table_001_base.html"
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
			cancelFamilleDetailsForm();
            return false;
			
		},
		no: () => {
			bsModalConfirmation.hide();
            return true;
		},
	};

	const deleteEmployeeObj = {
		message: "Etes vous sûr de vouloir supprimer cette catégorie?",
		yes: () => {
			console.log("clicked deleteFournisseurObj" );
			deleteEmployee();
			bsModalConfirmation.hide();
		},
		no: () => {
			bsModalConfirmation.hide();
		},
	};



    //FUNCTIONS

	async function deleteEmployee() {
		// TODO : DRY
		let myurl = "/database/delete/delete_one_employee.php";
		let myUid = modalEmployeeDetails.querySelector("#matricule").value;
		let response = await sendData(myurl, { matricule: myUid });
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
				ToastShowClosured("success", "Employé effacé avec succès");
				bsModalFamilleDetails.hide();
			} else {
				ToastShowClosured("failure", "Echec suppression employé");
			}
		} else {
			ToastShowClosured(myjson[0], "Echec suppression employé.");
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

	function cancelEmployeeDetailsForm(){
		// TODO : DRY
		let inputsForEdition =
		modalEmployeeDetails.querySelectorAll(".input");
		disableInputs(inputsForEdition);

		bsModalEmployeeDetails.hide();
		btnSaveDetails.disabled = true;
		btnModifyDetails.disabled = false;
		modificationWatcher=false;

	}

	async function showDetails(event) {
		// TODO : refactor
		console.log("called here");
		let parent = event.target.parentNode.parentNode;
		let myuid = zeroLeftPadding(parent.querySelector(".input.matricule").value,4,false);
		// console.log("myuid tr");
		// console.log(myuid);
		sendData("/database/select/one_employee_details.php", {
			matricule: myuid,
		})
			.then((resp) => {
				console.log("shwodetail :");
				console.log(resp);
				return responseHandlerSelectOneEmployee(resp);
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

	function getFormInputsValues(modalRef) {
		console.log("modalRef");
		console.log(modalRef);
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
			"employee",
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
			// console.log(input);
			input.value = DefaultValuesEmployeeNewFormObj[input.id];
		});
	}

    //EVENTHANDLER

    try {
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
        })    } catch (error) {}

	try {
			tableBody.addEventListener("click", (event) => {
				if(event.target.classList.contains("btn-details")){
					console.log("see");
					showDetails(event);
					bsModalEmployeeDetails.show();
				}
			});
		} catch (error) {}
    try {
        modalNew.querySelector(".modal-footer").addEventListener('click',(event)=>{
            if(event.target.id=="btn-cancel-new"){
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalNew.hide();
                }
            }else if(event.target.id=="btn-save-new"){
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
		modalNew.addEventListener("input",()=>{
			modificationWatcher=true;
		})
	} catch (error) {}

	try {
		modalEmployeeDetails.addEventListener("click",(event)=>{
			if(event.target.id=="btn-modify"){
				let inputsForEdition =
                modalEmployeeDetails.querySelectorAll(".input");
                makeEmployeeDetailsInputsEditable(inputsForEdition);
                btnSaveDetails.disabled = false;
			}else if(event.target.id=="btn-cancel"){
                console.log("cancelling details");
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelDetailsObj
                    );
                } else {
                    cancelEmployeeDetailsForm();
                }
			}else if(event.target.id=="btn-delete"){
				openModalConfirmation(confirmationObj,deleteEmployeeObj)
			}
		})
	} catch (error) {
		
	}

	try {
		modalEmployeeDetails.addEventListener("input",()=>{
			modificationWatcher=true
		})
	} catch (error) {
		
	}
})