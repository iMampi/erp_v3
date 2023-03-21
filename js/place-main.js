const DefaultValuesPlaceNewFormObj = {
uid:"",
actif:"1",
name:"",
adress:"",
phone:"",
note:""
};
const DefaultValuesPlaceFilterObj ={
    uid:"",
    actif:"1",
    name:"",
    adress:"",
    phone:"",
    note:""
}

var listDOM = {};
var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;


function generateRowTable(nodeModel, DataObj) {
	console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	// Naming <tr>
	newNode.id = "row-"+zeroLeftPadding(DataObj["uid"], 3, false);
		// newNode.querySelector("input.uid").value = DataObj["uid"];
	// TODO : use a dto or something
	newNode.querySelector("input.uid").value = DataObj["uid"];
	newNode.querySelector(".name.input").value=DataObj["name"];
	newNode.querySelector(".adress.input").value=DataObj["adress"];
	newNode.querySelector(".phone.input").value=DataObj["phone"];
	return newNode;
}

async function responseHandlerSavePlaceNew(response) {
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
	let url = "/database/save/new_place.php";
	let response = await sendData(url, inputObj);
	console.log("result!");
	console.log(response);
	let result = await responseHandlerSavePlaceNew(response);
	if (result[0] == "success") {
		ToastShowClosured(result[0], "Nouveau magasin créé avec succès");
	} else if (result[0] == "failure") {
		ToastShowClosured(result[0], "Echec de la création du magsin");
	} else {
		throw new Error("wrong value returned");
	}
	return [result[0] == "success", result[1]];
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
    const modalNew=document.getElementById("modal-main-new");
    const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});

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
						"/elements/warehouses/places/liste_places_table_001_base.html"
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

    //FUNCTIONS
    function cleanNewForm() {
		//check if authorized to create, should i bother to clean if form is empty?
		fetchSessionAuthorizationValue(
			"/session_request/session_request.php",
			"magasin",
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
			input.value = DefaultValuesPlaceNewFormObj[input.id];
		});
	}

    //EVENTHANDLERS
    try {
        divBtns.addEventListener('click',(event)=>{
            if (event.target.id=="btn-main-new"){
                bsModalNew.show();
            }else if (event.target.id=="btn-main-filter"){
                // bsModalFilter.show();
				// //since we use a common datalist for new and filter, we add "all" when needed.
				// let innerHTMLAll_="<option id='all'>all - Tous</option>";
				// let datalists=document.querySelectorAll('datalist');
				// datalists.forEach(element => {
				// 	element.innerHTML+=innerHTMLAll_
				// });
			}else if(event.target.id=="btn-remove-filter"){
				// console.log("remove filter ");
				// event.target.remove();
				// resetFilter();
				// filterItem(
				// 	{ actif: "1" },
				// 	tableBody
				// );
				// defaultFilterFlag = true;
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

})