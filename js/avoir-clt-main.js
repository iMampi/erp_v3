const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');
var modificationWatcher = false;
var typingTimer;

const InputsDisabledByDefaultAvoirNewFormArray = [
    'num-avoir',
    "commercial",
    "date",
    "total-ht",
    "TVA",
    "total-ttc"
];

const InputsDisabledByDefaultCommandeRowItemArray = [
    "item-name",
    "item-pu",
    "item-prix-total"
];

function defaultButtons(modal) {
    const refObj = {
        "modal-details": DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_DETAILS,
        'modal-commande-new': DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_NEW
    };
    let btns = modal.querySelectorAll(".btn");
    btns.forEach(myBtn => {
        myBtn.disabled = refObj[modal.id][myBtn.id];
    });
}

function cleanNewForm(modal, disable = false) {
    console.log("cleaning");
    let array1 = InputsDisabledByDefaultAvoirNewFormArray.concat(InputsDisabledByDefaultCommandeRowItemArray);

    const inputsForm = modal.querySelectorAll(".input");

    inputsForm.forEach((input) => {
        // console.log(input);
        if (array1.includes(input.id)) {
            input.disabled = true;
        } else {
            input.disabled = disable;
        }
        let myValue = DefaultValuesCommandeNewFormObj[input.id];
        if (myValue == undefined) {
            myValue = DefaultValuesCommandeRowItem[input.id];
            if (myValue == undefined) {
                return false;
            }
        }
        input.value = myValue;
    });
}

async function DefaultModalCommandInputs(modal, min_row = 1) {
    //remove other item rows
    let itemRows = modal.querySelectorAll(".item-commande-row");
    removeItemRows(itemRows);
    if (min_row != 0) {
        await addItem(modal);
    };
    defaultButtons(modal);
    //clean an dput to deafult value
    cleanNewForm(modal, modal.id === "modal-details");

}

document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const itemDataList = document.getElementById("item-list");
    const clientDataList = document.getElementById("client-list");


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
    ////modal new
    const modalAvoirNew = document.getElementById("modal-avoir-new");
    const bsModalAvoirNew = new bootstrap.Modal(modalAvoirNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    ////// today's date
    try {
        modalCommandeNew.querySelector('#date').value = TODAY;

    } catch (error) {
        console.log("dont know what happened");
    }
    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new")
                bsModalAvoirNew.show();
        })
    } catch (error) {

    }

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
            bsModalAvoirNew.hide();
            DefaultModalCommandInputs(modalAvoirNew);
            bsModalConfirmation.hide();
            modificationWatcher = false;
        },
        no: () => {
            bsModalConfirmation.hide();
        },
    };

    //FUNCTIONS
    async function searchClient(inputObj) {
        console.log("searching ITEM");
        let url = "/database/select/selection_clients.php";
        let response = await sendData(url, inputObj);

        console.log("error?");
        console.log(response);
        let myjson = JSON.parse(response);
        console.log(myjson);

        return myjson;
        // return await fillMainTable(myjson, tableBodyCategorie);

    }

    async function searchItem(inputObj) {
        console.log("searching ITEM");
        let url = "/database/select/selection_items.php";
        let response = await sendData(url, inputObj);

        console.log("error?");
        console.log(response);
        let myjson = JSON.parse(response);

        return myjson;
        // return await fillMainTable(myjson, tableBodyCategorie);

    }

    async function searchLive(term, datalistNode, mode) {
        console.log("searching LIVE");
        let search = { "client": searchClient, "item": searchItem }

        let inputObj = {
            "client": { uid: term, noms: term, prenoms: term, "nom-commercial": term, "raison-sociale": term },
            "item": { code: term, name: term }
        };
        let result = await search[mode](inputObj[mode]);
        // let result = await searchItem(inputObj);
        addDatalistElement(datalistNode, result, mode, term);
    }

    function addDatalistElement(datalistNode, arrayData, mode, term = "") {
        datalistNode.innerHTML = "";
        if ((Array.isArray(arrayData)) && (arrayData.length || arrayData[0] != undefined)) {
            console.log("array is ok");
            arrayData.forEach(element => {
                let option_ = document.createElement("option");
                if (mode == "item") {
                    option_.value = element.code;
                    option_.label = element.name;
                    option_.dataset.prix = element.prix_vente;
                } else if (mode == "client") {
                    let val = element.uid + " - ";
                    if (element.noms == "") {
                        console.log("client company");

                        val += (element["raison_sociale"] || "") + " / " + (element["nom_commercial"] || "");
                    } else if (element["raison_sociale"] == "") {
                        console.log("client humain");
                        val += element.noms + " " + element.prenoms;
                    }
                    option_.value = val;
                    option_.label = val;
                }
                datalistNode.append(option_);
            });
        } else {
            console.log("empty arrayy");
            let option_ = document.createElement("option");
            option_.value = "Néant";
            option_.label = "aucun résultat pour \"" + term + "\"";
            datalistNode.append(option_);
        }

    }

    //EVENTHANDLER

    try {
        modalAvoirNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel-new") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalAvoirNew.hide();
                    // defaultButtons(modalCommandeNew)
                }
            } else if (event.target.id == "btn-add-item") {
                // addItem(tableItemsFactureNew).then(() => modificationWatcher = true);
            } else if (event.target.classList.contains("btn-del")) {
                // removeItem(event.target, "target");
                // modificationWatcher = true;
                // console.log("remove");
                // updateTotalPrice(montantHTAvantRemiseInputNew, modalCommandeNew.querySelectorAll("#item-prix-total"))
                // updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            } else if (event.target.id == "btn-save-new") {
                if (modificationWatcher) {
                    //     openModalConfirmation(
                    //         confirmationObj,
                    //         saveCreationObj
                    //     );
                } else {
                    // bsModalConfirmation.hide();
                }
            } else if (event.target.id == "btn-validate-new") {
                if (modificationWatcher) {
                    //     openModalConfirmation(
                    //         confirmationObj,
                    //         validateCreationObj
                    //     );
                } else {
                    //     // bsModalCommandeNew.hide();
                }
            }
        })
    } catch (error) {
    }

    try {
        modalAvoirNew.addEventListener('input', (event) => {
            console.log("event input");
            console.log(event);
            modificationWatcher = true;

            if ((event.target.id == "item-uid") && (event.inputType === "insertText")) {
                console.log("searching item");
                itemDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    itemDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, itemDataList, "item") }, 1500);
                }
            } else if ((event.target.id == "item-uid") && (!event.key)) {

            } else if ((event.target.id == "client") && (event.inputType === "insertText")) {
                console.log("searching client");
                clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
            } else if (event.target.id == "item-quantity") {
                // updateItemTotalPrice(event.target.parentNode.parentNode)
                // const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                // updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                // updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            }
        });
    } catch (error) {
        console.log("error 356");
    }
})