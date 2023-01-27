const DefaultValuesEmployeeNewFormObj={}

var modificationWatcher= false;

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
    //FUNCTIONS

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
			console.log(input);
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
				console.log("filter me");
			bsModalFilter.show();
		    } 
        })    
    } catch (error) {}
})