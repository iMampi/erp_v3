var currentUser;

const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');
//key magasin removed
const DTO_FILL_INPUT_HEADERS = {
    uid: "uid",
    date: "date",
    note: "libelle",
    state: "state",
    magasin: "magasin_uid",
    "totalHT-avant-remise": "total_ht_avant_remise",
    "totalTTC-avant-remise": "total_ttc_avant_remise",
    "remise-taux": "remise_taux",
    "remise-montant": "remise_montant",
    "totalHT-apres-remise": "total_ht_apres_remise",
    "totalTTC-apres-remise": "total_ttc_apres_remise",
    "TVA-avant-remise": "TVA-avant-remise",
    "TVA-apres-remise": "TVA-apres-remise"

}
const DTO_FILL_INPUT_ITEMS_ROWS = {

}
const DefaultValuesCommandeNewFormObj = {
    uid: "",
    state: 1,
    commercial: currentUser,
    client: "",
    date: TODAY,
    "totalHT-avant-remise": "",
    "TVA-avant-remise": "",
    "totalTTC-avant-remise": "",
    "remise-taux": "",
    "remise-montant": "",
    "totalHT-apres-remise": "",
    "TVA-apres-remise": "",
    "totalTTC-apres-remise": "",
    "note": ""
};

const DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_NEW = {
    "btn-new-client": false,
    "btn-see-client": false,
    "btn-add-item": false,
    "btn-new-item": false,
    "btn-cancel-new": false,
    "btn-save-new": false,
    "btn-validate-new": false,
}
const DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_DETAILS = {
    "btn-new-client": true,
    "btn-see-client": false,
    "btn-add-item": true,
    "btn-new-item": true,
    "btn-cancel": false,
    "btn-save": true,
    "btn-validate": true,
}

const DefaultValuesCommandeRowItem = {
    "item-uid": "",
    "item-name": "",
    "num-serie": "",
    "item-pu": "",
    "item-quantity": "",
    "item-prix-total": ""
};

var counterRowItem = 1;
var typingTimer;

var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;
var listDOM = {};

function disableInputs(inputElements) {
    inputElements.forEach(element => {
        element.disabled = true;
    });
}

function updateTableRow(mytable, dataObj) {
    let correspondances_ = { "uid": 'uid', "date": 'date', "client": 'client', "totalTTC": 'totalTTC-apres-remise', "state": 'state' }
    let row = mytable.querySelector("#row-" + dataObj["uid"]);
    console.log("dataObj table's row");
    console.log(dataObj);
    console.log(mytable);
    let inputsRow = row.querySelectorAll(".input");
    inputsRow.forEach((input) => {
        input.value = dataObj[correspondances_[input.id]];
        if (input.id === "totalTTC") {
            input.value = parseFloat(input.value).toFixed(2);
        }
    });
}

function makeCommandeFormEditabble(modal) {
    let notEditable = ["uid", "state", "commercial", "date", "totalHT-avant-remise", "TVA-avant-remise", "totalTTC-avant-remise", "totalHT-apres-remise", "TVA-apres-remise", "totalTTC-apres-remise", "item-name", "item-pu", "item-prix-total"];
    let inputs = modal.querySelectorAll(".input");
    inputs.forEach(input => {
        if (!notEditable.includes(input.id)) {
            input.disabled = false;
        }
    });
    let btns = modal.querySelectorAll(".btn");
    btns.forEach(btn => {
        if (btn.id !== "btn-modify") {
            btn.disabled = false;
        } else {
            btn.disabled = true;

        }
    });
}

function fillInputsDetailsHeaders(responseJSON, modalDetailsHeaders) {
    console.log("responseJSON : ");
    console.log(responseJSON);
    valueObj = responseJSON["header"];
    valueObj["TVA-avant-remise"] = roundToTwo(valueObj["total_ht_avant_remise"]);
    valueObj["TVA-apres-remise"] = roundToTwo(valueObj["total_ht_apres_remise"]);
    // let inputsElements = md.querySelectorAll(".input");

    let inputsElements =
        modalDetailsHeaders.querySelectorAll(".input");

    // console.log("inputsElement :");
    // console.log(inputsElements);
    // let inputsElements = document.querySelectorAll(
    // "#modal-clt-details .input"
    // );
    //TODO : use a DTO>> TO DUPLICATE EVERYWHERE ELSE
    for (let index = 0; index < inputsElements.length; index++) {
        let element = inputsElements[index];
        if (element.id === "client") {
            if (valueObj["raison_sociale"]) {
                element.value = valueObj["client_uid"] + " - " + valueObj["raison_sociale"] + " / " + valueObj["nom_commercial"];
            } else {
                element.value = valueObj["client_uid"] + " - " + valueObj["noms"] + " " + valueObj["prenoms"];
            }
        }
        else if (element.id === "commercial") {
            element.value = valueObj["user_uid"] + "//" + valueObj["user_name"];

        } else {
            element.value = valueObj[DTO_FILL_INPUT_HEADERS[element.id]];
        }

        // console.log(element.id);
        // console.log(DTO_FILL_INPUT[element.id]);
        // console.log(valueObj[DTO_FILL_INPUT[element.id]]);

    }
}

async function addItemRowsLoop(numberOfRows, modalDetailsItemsTable) {
    for (let i = 0; i < numberOfRows; ++i) {
        console.log("counterRowItem : " + counterRowItem);
        await addItem(modalDetailsItemsTable);
    }
    return new Promise((resolve, reject) => resolve(true));
}

function disableInputsAndButtons(tableNode) {
    console.log('disable this shit');
    let nodesToDisable = tableNode.querySelectorAll(".input, .btn");

    for (let index = 0; index < nodesToDisable.length; index++) {
        nodesToDisable[index].disabled = true;
    }
}

function fillInputsDetailsItem(arrayData, rowNode) {
    const idToKey = {
        "row-uid": "uid",
        "item-uid": "item_uid",
        "item-name": "item_name",
        "num-serie": "description_item",
        "item-pu": "prix_unitaire",
        "item-prix-total": "prix_total",
        "item-quantity": "quantity"
    }
    let inputs = rowNode.querySelectorAll(".input");
    for (let k = 0; k < inputs.length; k++) {
        let input = inputs[k];
        input.value = arrayData[idToKey[input.id]];
    }
}

async function fillInputsDetailsItems(itemsArray, modalDetailsItemsTable) {

    let numberOfRows = itemsArray.length;
    await addItemRowsLoop(numberOfRows, modalDetailsItemsTable);
    disableInputsAndButtons(modalDetailsItemsTable);
    let rowsToFill = modalDetailsItemsTable.querySelectorAll(".item-commande-row");

    for (let j = 0; j < numberOfRows; j++) {
        fillInputsDetailsItem(itemsArray[j], rowsToFill[j]);

    }
}




async function responseHandlerSelectOneCommande(response) {
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
        if (myjson["header"][0] && myjson["items"][0]) {
            return ["success", { "header": myjson["header"][1][0], "items": myjson["items"][1] }];
        } else {
            return ["failure", myjson];
        }
    } catch (e) {
        // TODO : comment me
        return "error js: " + e;
    }
}

function removeItem(target, mode) {
    console.log("remove me");
    if (mode === "target") {
        let rowId = target.parentNode.parentNode.remove();
    } else if (mode === "node") {
        target.remove();
    } else {
        throw new Error("mode is not valid");
    }

}

function removeItemRows(nodeList) {
    if (nodeList.length === 0) {
        return false;
    }
    nodeList.forEach((element, index) => {
        removeItem(element, "node");
    });
    return true;
}

function addItem(tableFactureBody) {
    return new Promise((resolve, reject) => {
        console.log("addding item");
        if (listDOM["itemRow"]) {
            console.log("from cahce");
            counterRowItem++;
            let doc = new DOMParser().parseFromString(
                listDOM["itemRow"],
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");
            console.log("trModel");
            console.log(trModel);

            tableFactureBody.querySelector('tbody').append(
                generateRowItem(trModel, ["", "", "", "", "", ""])
            );
            resolve(true);

        } else {

            fetch("/elements/commandes/commande_table_details_base.html")
                .then((response) =>
                    response.text()
                )
                .then((txt) => {
                    // TODO : abstract this process
                    console.log("from fetch");
                    counterRowItem++;

                    let doc = new DOMParser().parseFromString(
                        txt,
                        "text/html"
                    );

                    // caching
                    listDOM["itemRow"] = doc.body.innerHTML;

                    let trModel = doc.querySelector("#row-001");
                    console.log("trModel");
                    console.log(trModel);

                    tableFactureBody.querySelector('tbody').append(
                        generateRowItem(trModel, ["", "", "", "", "", ""])
                    );
                    // bsModalNew.hide();
                    // _cleanNewForm();
                    // console.log("yes saving called");
                    resolve(true);


                });
        }
    })
}

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
    const inputsForm =
        modal.querySelectorAll(".input");

    inputsForm.forEach((input) => {
        // console.log(input);
        input.disabled = disable;
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

async function DefaultModalCommandeNew(modal, min_row = 1) {
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


function generateRowTable(nodeModel, DataObj) {
    //MARQUE PAGE
    console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + DataObj["uid"];
    // newNode.querySelector("input.uid").value = DataObj["uid"];
    // TODO : use a dto or something
    newNode.querySelector("input.date").value = DataObj["date"];
    newNode.querySelector(".client.input").value = DataObj["client"];
    //TODO : format the numbers
    newNode.querySelector(".totalTTC.input").value = DataObj["totalTTC-apres-remise"];
    newNode.querySelector(".uid.input").value = DataObj["uid"];
    newNode.querySelector(".state.input").value = DataObj["state"];
    return newNode;
}

async function responseHandlerUpdateCommande(response) {
    try {
        let myjson = JSON.parse(await response);
        //NOTE : the correct way for save. not correct for select query
        //NOTE : works for error also
        // TODO : handle for when it is an error
        // TODO : all seems to use the same logic. DRY in all others occurence
        console.log("myjson26");
        console.log(myjson);
        if (myjson[0]) {
            // TODO : inconsistency, should be uniformed. but works for now
            try {
                return ["success", myjson[1][0][0]];
            } catch (error) {
                return ["success", myjson[1]];
            }
        } else {
            return ["failure", Object.values(myjson[1])[0]];
        }
    } catch (e) {
        // TODO : comment me
        return "error js: " + e;
    }
}
async function responseHandlerSaveCommandeNew(response) {
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

function formatFloatsForDatabase(inputObj) {
    const keysWithNumbers = ["remise-montant", "remise-taux", "totalHT-apres-remise", "totalHT-avant-remise", "totalTTC-apres-remise", "totalTTC-avant-remise"];
    let headersKeys = Object.keys(inputObj["header"])
    headersKeys.forEach(key => {
        if (keysWithNumbers.includes(key)) {
            inputObj["header"][key] = formatedNumberToFloat(inputObj["header"][key]);
        }
    });
    inputObj["items"].forEach(row_array => {
        row_array[2] = formatedNumberToFloat(row_array[2]);
        row_array[3] = formatedNumberToFloat(row_array[3]);
    });
    return inputObj
}


async function saveCommandeNew(inputObj) {
    console.log("saving  comande");
    formatFloatsForDatabase(inputObj);
    // console.log("data");
    // console.log(data);
    let url = "/database/save/new_commande.php";

    let response = await sendData(url, inputObj);

    console.log("error?");
    console.log(response);
    let result = await responseHandlerSaveCommandeNew(response);
    if (result[0] == "success") {
        ToastShowClosured(result[0], "Commandes sauvegardées avec succès");
    } else if (result[0] == "failure") {
        ToastShowClosured(result[0], "Echec de la sauvegarde de la commande");
    } else {
        throw new Error("wrong value returned");
    }
    return [result[0] == "success", result[1]];
}

async function saveCommandeModified(inputObj) {
    console.log("saving  comande");
    formatFloatsForDatabase(inputObj);
    // console.log("data");
    // console.log(data);
    let url = "/database/save/update_commande.php";

    let response = await sendData(url, inputObj);

    console.log("error?");
    console.log(response);
    let result = await responseHandlerUpdateCommande(response);
    if (result[0] == "success") {
        ToastShowClosured(result[0], "Commandes sauvegardées avec succès");
    } else if (result[0] === "failure") {
        ToastShowClosured(result[0], "Echec de la sauvegarde de la commande");
    } else {
        throw new Error("wrong value returned");
    }
    return [result[0] === "success", result[1]];
}



function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}


//SAVING COMMANDE NEW
function grabCommandeDataForm(modal) {
    let data = { header: {}, items: [] };
    const headersName = ["uid", "commercial", 'state', "client", "date", "note", "magasin", "totalHT-avant-remise", "totalTTC-avant-remise", "remise-taux", "remise-montant", "totalHT-apres-remise", "totalTTC-apres-remise"];
    //grab only essential headers data
    //grab only essential item data
    // TODO : refactor me
    let headerInputs;
    let tableBodyRows;
    if (modal.id === "modal-details") {
        headerInputs = modal.querySelector("#commande-header").querySelectorAll(".input");
        tableBodyRows = modal.querySelector("#table-facture").querySelector('tbody').querySelectorAll("tr");
    } else {
        headerInputs = modal.querySelector("#new-modal-body-heads").querySelectorAll(".input");
        tableBodyRows = modal.querySelector("#new-modal-body-table").querySelector('tbody').querySelectorAll("tr");
    }

    headerInputs.forEach(input => {
        try {
            if (headersName.includes(input.id)) {
                data["header"][input.id] = input.value
            }
        } catch (error) {
            console.log("ehrror : " + error);
        }
    });



    // console.log(tableBodyRows);
    tableBodyRows.forEach(row => {
        // console.log(row);
        let rowID = row.querySelector("#row-uid").value;
        let itemID = row.querySelector("#item-uid").value;
        let quantity = row.querySelector("#item-quantity").value;
        let prixUnitaire = row.querySelector("#item-pu").value;
        let numSerie = row.querySelector("#num-serie").value;
        data["items"].push([rowID, itemID, quantity, prixUnitaire, numSerie]);
    });
    return data;
}

//PRICE MANIPULATION
function updateTotalPrice(baseMontantInput, priceListNode) {
    console.log("updateTotalPrice");
    const pricesRaw = [];
    priceListNode.forEach(element => {
        pricesRaw.push(formatedNumberToFloat(element.value));
    });
    return baseMontantInput.value = formatNumber(pricesRaw.reduce((partialSum, a) => partialSum + formatedNumberToFloat(a), 0));
}

function updateItemTotalPrice(rowNode) {
    const price = rowNode.querySelector("#item-pu").value;
    const quantity = rowNode.querySelector("#item-quantity").value;
    rowNode.querySelector("#item-prix-total").value = formatNumber(formatedNumberToFloat(price) * formatedNumberToFloat(quantity));
}

function tauxAndMontantDiscountInputHandler(baseMontantInput, tauxInput, montantInput, mode) {
    // mode: 1 = taux changed ; 2 = montant changed 
    let baseMontant = formatedNumberToFloat(baseMontantInput.value);
    if (mode == 1) {
        montantInput.value = (baseMontant * formatedNumberToFloat(tauxInput.value) / 100 || 0).toFixed(2);
    } else if (mode == 2) {
        tauxInput.value = (formatedNumberToFloat(montantInput.value) / formatedNumberToFloat(baseMontant) * 100 || 0).toFixed(2);
    }
}

function totalTTCDiscountedHandler(baseMontantInput, discountedMontantInput, montantDiscount) {
    console.log("totalTTCDiscountedHandler");
    discountedMontantInput.value = formatNumber(formatedNumberToFloat(baseMontantInput.value) - formatedNumberToFloat(montantDiscount.value))
}

function TVAHandler(discountedMontantInput, TVAInput, TotalTTCInput, mode) {
    // Handles TVA and total update
    // NOTE : mode = 1: ht to ttc;mode = 2: ttc to ht;
    console.log("TVAHandler");
    if (mode == 1) {

        let TVA = formatedNumberToFloat(discountedMontantInput.value) * 0.20;
        TVAInput.value = formatNumber(TVA || 0);
        TotalTTCInput.value = formatNumber(formatedNumberToFloat(discountedMontantInput.value) + TVA);
    } else if (mode == 2) {
        let HT = formatedNumberToFloat(TotalTTCInput.value) / 1.2;
        discountedMontantInput.value = formatNumber(HT);
        TVAInput.value = formatNumber(formatedNumberToFloat(TotalTTCInput.value) - HT);

    } else {

    }
}

function updateAllHeaderPrices(montantHTAvantRemiseInput, TVAAvantRemiseInput, montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput) {

    TVAHandler(montantHTAvantRemiseInput, TVAAvantRemiseInput, montantTTCAvantRemiseInput, 1);
    tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, 1)
    totalTTCDiscountedHandler(montantTTCAvantRemiseInput, montantTTCApresRemiseInput, remiseMontantInput);
    TVAHandler(montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput, 2);
}


document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const itemDataList = document.getElementById("item-list");
    const clientDataList = document.getElementById("client-list");


    ////modal new
    const modalCommandeNew = document.getElementById("modal-commande-new");
    const bsModalCommandeNew = new bootstrap.Modal(modalCommandeNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
    const tableItemsFactureNew = modalCommandeNew.querySelector("#table-facture");
    const remiseTauxInputNew = modalCommandeNew.querySelector("#remise-taux");
    const remiseMontantInputNew = modalCommandeNew.querySelector("#remise-montant");
    const montantHTAvantRemiseInputNew = modalCommandeNew.querySelector("#totalHT-avant-remise");
    const montantHTApresRemiseInputNew = modalCommandeNew.querySelector("#totalHT-apres-remise");
    const TVAAvantRemiseInputNew = modalCommandeNew.querySelector("#TVA-avant-remise");
    const TVAApresRemiseInputNew = modalCommandeNew.querySelector("#TVA-apres-remise");
    const montantTTCAvantRemiseInputNew = modalCommandeNew.querySelector("#totalTTC-avant-remise");
    const montantTTCApresRemiseInputNew = modalCommandeNew.querySelector("#totalTTC-apres-remise");
    currentUser = modalCommandeNew.querySelector("#commercial").value;

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

    ////modal item detail
    const modalCommandeDetails = document.getElementById("modal-details");
    const bsModalCommandeDetails = new bootstrap.Modal(modalCommandeDetails, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
    const tableItemsFactureDetails = modalCommandeDetails.querySelector("#table-facture");

    const remiseTauxInputDetails = modalCommandeDetails.querySelector("#remise-taux");
    const remiseMontantInputDetails = modalCommandeDetails.querySelector("#remise-montant");
    const montantHTAvantRemiseInputDetails = modalCommandeDetails.querySelector("#totalHT-avant-remise");
    const montantHTApresRemiseInputDetails = modalCommandeDetails.querySelector("#totalHT-apres-remise");
    const TVAAvantRemiseInputDetails = modalCommandeDetails.querySelector("#TVA-avant-remise");
    const TVAApresRemiseInputDetails = modalCommandeDetails.querySelector("#TVA-apres-remise");
    const montantTTCAvantRemiseInputDetails = modalCommandeDetails.querySelector("#totalTTC-avant-remise");
    const montantTTCApresRemiseInputDetails = modalCommandeDetails.querySelector("#totalTTC-apres-remise");

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
            bsModalCommandeNew.hide();
            DefaultModalCommandeNew(modalCommandeNew);
            bsModalConfirmation.hide();
            modificationWatcher = false;
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

            let dataModalCommandeNew = grabCommandeDataForm(modalCommandeNew);
            console.log("dataModalCommandeNew");
            console.log(dataModalCommandeNew);
            saveCommandeNew(dataModalCommandeNew).then((result) => {
                if (result[0]) {
                    // insert uid of newly created client
                    dataModalCommandeNew["header"]["uid"] = result[1][0];
                    dataModalCommandeNew["header"]["state"] = 1;
                    // console.log(dataObj);
                    // TODO : cache html
                    fetch(
                        "/elements/commandes/liste_commandes_table_001_base.html"
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
                                generateRowTable(trModel, dataModalCommandeNew["header"])
                            );
                            bsModalCommandeNew.hide();
                            DefaultModalCommandeNew(modalCommandeNew);
                            bsModalConfirmation.hide();
                            console.log("yes saving called");
                            return false;
                        });
                } else {
                    //TODO : show error
                    return true;
                }
            });
            bsModalCommandeNew.hide();
        }
    }

    const validateCreationObj = {
        message:
            "<h2>Votre Commande va être sauvegarder et transformer en facture.</h2><br>\
				Aucune modification ne possible.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {

            let dataModalCommandeNew = grabCommandeDataForm(modalCommandeNew);
            dataModalCommandeNew["header"]["state"] = 2;
            console.log("dataModalCommandeNew");
            console.log(dataModalCommandeNew);
            saveCommandeNew(dataModalCommandeNew).then((result) => {
                if (result[0]) {
                    // insert uid of newly created client
                    dataModalCommandeNew["header"]["uid"] = result[1][0];
                    // dataModalCommandeNew["header"]["state"] = 1;
                    // console.log(dataObj);
                    // TODO : cache html

                    fetch(
                        "/elements/commandes/liste_commandes_table_001_base.html"
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
                                generateRowTable(trModel, dataModalCommandeNew["header"])
                            );
                            bsModalCommandeNew.hide();
                            DefaultModalCommandeNew(modalCommandeNew);
                            bsModalConfirmation.hide();
                            console.log("yes saving called");
                            return false;
                        });
                } else {
                    //TODO : show error
                    return true;
                }
            });
            bsModalCommandeNew.hide();
        }
    }

    const cancelCommandeDetailsObj = {
        message:
            "Des champs ont été modifiés.<br>\
		Vos modifications vont être perdus.<br>\
		Êtes vous sûr de vouloir quitter ce formulaire?",
        yes: () => {
            bsModalCommandeDetails.hide();
            DefaultModalCommandeNew(modalCommandeDetails, 0);
            bsModalConfirmation.hide();
            modificationWatcher = false;
        },
        no: () => {
            bsModalConfirmation.hide();
        },
    };

    const validateCommandeDetailsObj = {
        message:
            "<h2>Votre Commande va être sauvegarder et transformer en facture.</h2><br>\
				Aucune modification ne sera possible.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {

            let dataModalCommandeDetails = grabCommandeDataForm(modalCommandeDetails);
            dataModalCommandeDetails["header"]["state"] = 2;
            console.log("dataModalCommandeDetails");
            console.log(dataModalCommandeDetails);
            saveCommandeModified(dataModalCommandeDetails).then((result) => {
                if (result[0]) {
                    modalCommandeDetails.querySelector("#state").value = "2";
                    disableInputs(modalCommandeDetails.querySelectorAll(".input"));
                    defaultButtons(modalCommandeDetails);
                    modalCommandeDetails.querySelector("#btn-modify").disabled = true;
                    bsModalConfirmation.hide();
                    updateTableRow(tableBody, dataModalCommandeDetails["header"]);
                    console.log("yes saving called");
                    return false;
                } else {
                    //TODO : show error
                    return true;
                }
            });
            bsModalCommandeNew.hide();
        }
    }

    const saveCommandeDetailsObj = {
        message:
            "<h2>Votre Commande va être sauvegarder.</h2><br>\
				Aucune modification ne sera possible.<br>\
            Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {

            let dataModalCommandeDetails = grabCommandeDataForm(modalCommandeDetails);
            console.log("dataModalCommandeDetails");
            console.log(dataModalCommandeDetails);
            saveCommandeModified(dataModalCommandeDetails).then((result) => {
                if (result[0]) {
                    disableInputs(modalCommandeDetails.querySelectorAll(".input"));
                    defaultButtons(modalCommandeDetails);
                    bsModalConfirmation.hide();
                    updateTableRow(tableBody, dataModalCommandeDetails["header"]);
                    console.log("yes saving called");
                    return false;
                } else {
                    //TODO : show error
                    return true;
                }
            });
            bsModalCommandeNew.hide();
        }
    }

    //FUNCTION

    async function showCommandeDetails(event) {
        // TODO : refactor
        console.log("called here");
        let parent = event.target.parentNode.parentNode.parentNode;
        // console.log("parent");
        // console.log(parent);
        let myuid = parent.querySelector(".input.uid").value;
        // console.log("myuid tr");
        // console.log(myuid);
        sendData("/database/select/one_commande_details.php", {
            uid: myuid,
        })
            .then((resp) => {
                console.log("shwodetail :");
                console.log(resp);
                return responseHandlerSelectOneCommande(resp);
            })
            .then((result) => {
                // console.log("result : " + JSON.stringify(result[1]));
                // TODO : implement this part in new-client into a function cleanClass(). and optimize : if same personnality called, no nedd to recall.
                console.log("result+-+");
                console.log(result);
                if (result[0] === "success") {

                    console.log("result[1]");
                    console.log(result[1]);
                    try {

                        let btnModify = modalCommandeDetails.querySelector('#btn-modify');
                        btnModify.disabled = false;
                        if (result[1]['header']["state"] == "2") {
                            btnModify.disabled = true;
                        }
                    } catch {

                    }

                    let inputsHeader = modalCommandeDetails.querySelector("#commande-header")
                    fillInputsDetailsHeaders(result[1], inputsHeader);
                    fillInputsDetailsItems(result[1]["items"], modalCommandeDetails.querySelector("#table-facture"));
                } else {
                    throw new Error(result);
                }
            });
    }


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

    function getName(code) {
        return document.querySelector("option[value='" + code + "']").getAttribute("label");
    }

    function fillItemNameAndPrice(inputCodeNode) {
        const defaultQuantity = 1;
        const inputName = inputCodeNode.parentNode.parentNode.querySelector("#item-name");
        const inputPU = inputCodeNode.parentNode.parentNode.querySelector("#item-pu");
        const inputQuantity = inputCodeNode.parentNode.parentNode.querySelector("#item-quantity");
        const inputTotalPrice = inputCodeNode.parentNode.parentNode.querySelector("#item-prix-total");
        let valName = inputCodeNode.value;
        inputName.value = getName(valName);
        let valPU = document.getElementById("item-list").querySelector("option[value='" + valName + "']").dataset.prix;
        inputPU.value = formatNumber(valPU);
        inputQuantity.value = defaultQuantity;
        inputTotalPrice.value = formatNumber(valPU * defaultQuantity)

    }

    async function searchLive(term, datalistNode, mode) {
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




    //EVENTHANDLER

    // today's date
    try {
        modalCommandeNew.querySelector('#date').value = TODAY;

    } catch (error) {
        console.log("dont know what happened");
    }

    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new")
                bsModalCommandeNew.show();
        })
    } catch (error) {

    }

    try {
        modalCommandeNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel-new") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalCommandeNew.hide();
                    defaultButtons(modalCommandeNew)
                }
            } else if (event.target.id == "btn-add-item") {
                addItem(tableItemsFactureNew).then(() => modificationWatcher = true);
            } else if (event.target.classList.contains("btn-del")) {
                removeItem(event.target, "target");
                modificationWatcher = true;
                console.log("remove");
                updateTotalPrice(montantHTAvantRemiseInputNew, modalCommandeNew.querySelectorAll("#item-prix-total"))
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            } else if (event.target.id == "btn-save-new") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        saveCreationObj
                    );
                } else {
                    bsModalConfirmation.hide();
                }
            } else if (event.target.id == "btn-validate-new") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        validateCreationObj
                    );
                } else {
                    bsModalCommandeNew.hide();
                }
            }
        })
    } catch (error) {

    }

    ////modalCommandeNew event handler
    try {
        modalCommandeNew.addEventListener('keyup', (event) => {
            console.log("event keyup");
            console.log(event);
            if ((event.target.id == "item-uid") && (event.key)) {
                console.log("searching item");
                itemDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    itemDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, itemDataList, "item") }, 1500);
                }
            } else if ((event.target.id == "client") && (event.key)) {
                console.log("searching client");
                clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
            } else if ((event.target.id == "item-uid") && (!event.key)) {
                console.log("item selected");
                let val = event.target.value;
                console.log(getName(val));
                fillItemNameAndPrice(event.target);
                const itemTotalPriceInputs = modalCommandeNew.querySelectorAll(".item-prix-total");
                console.log("itemTotalPriceInputs");
                console.log(itemTotalPriceInputs);
                updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            } else if ((event.target.id == "client") && (!event.key)) {
                console.log("client selected");
            } else if (event.target.id == "item-quantity") {
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);


            }
        })

    } catch (error) {

    }

    try {
        modalCommandeNew.addEventListener('input', (event) => {
            console.log("event input");
            console.log(event);
            modificationWatcher = true;

            if ((event.target.id == "item-uid") && (event.key)) {

            } else if ((event.target.id == "item-uid") && (!event.key)) {
            } else if (event.target.id == "item-quantity") {
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            }
        });
    } catch (error) {
    }

    ////modalCommandeNew event handler
    try {
        modalCommandeDetails.addEventListener('keyup', (event) => {
            console.log("event keyup");
            console.log(event);
            if ((event.target.id == "item-uid") && (event.key)) {
                console.log("searching item");
                itemDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    itemDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, itemDataList, "item") }, 1500);
                }
            } else if ((event.target.id == "client") && (event.key)) {
                console.log("searching client");
                clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
            } else if ((event.target.id == "item-uid") && (!event.key)) {
                console.log("item selected");
                let val = event.target.value;
                console.log(getName(val));
                fillItemNameAndPrice(event.target);
                const itemTotalPriceInputs = modalCommandeDetails.querySelectorAll(".item-prix-total");
                console.log("itemTotalPriceInputs");
                console.log(itemTotalPriceInputs);
                updateTotalPrice(montantHTAvantRemiseInputDetails, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputDetails, TVAAvantRemiseInputDetails, montantTTCAvantRemiseInputDetails, remiseTauxInputDetails, remiseMontantInputDetails, montantHTApresRemiseInputDetails, TVAApresRemiseInputDetails, montantTTCApresRemiseInputDetails);
            } else if ((event.target.id == "client") && (!event.key)) {
                console.log("client selected");
            } else if (event.target.id == "item-quantity") {
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeDetails.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputDetails, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputDetails, TVAAvantRemiseInputDetails, montantTTCAvantRemiseInputDetails, remiseTauxInputDetails, remiseMontantInputDetails, montantHTApresRemiseInputDetails, TVAApresRemiseInputDetails, montantTTCApresRemiseInputDetails);
            }
        })
    } catch (error) {

    }

    try {
        modalCommandeDetails.addEventListener('input', (event) => {
            console.log("event input");
            console.log(event);
            modificationWatcher = true;

            if ((event.target.id == "item-uid") && (event.key)) {

            } else if ((event.target.id == "item-uid") && (!event.key)) {
            } else if (event.target.id == "item-quantity") {
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeDetails.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputDetails, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputDetails, TVAAvantRemiseInputDetails, montantTTCAvantRemiseInputDetails, remiseTauxInputDetails, remiseMontantInputDetails, montantHTApresRemiseInputDetails, TVAApresRemiseInputDetails, montantTTCApresRemiseInputDetails);
            }
        });
    } catch (error) {
    }

    try {
        tableBody.addEventListener("click", (event) => {
            if (event.target.classList.contains("btn-details")) {
                showCommandeDetails(event);
                bsModalCommandeDetails.show();
            }
        })
    } catch (error) { }

    try {
        modalCommandeNew.addEventListener('input', (event) => {
            // TODO : restrict event
            if (event.target.id == 'remise-taux') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 1);
            } else if (event.target.id == 'remise-montant') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 2);

            }
            totalTTCDiscountedHandler(montantTTCAvantRemiseInputNew, montantTTCApresRemiseInputNew, remiseMontantInputNew);
            TVAHandler(montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, 2);
        })

    } catch (error) {

    }

    try {
        modalCommandeDetails.addEventListener('input', (event) => {
            // TODO : restrict event
            if (event.target.id == 'remise-taux') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputDetails, remiseTauxInputDetails, remiseMontantInputDetails, 1);
            } else if (event.target.id == 'remise-montant') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputDetails, remiseTauxInputDetails, remiseMontantInputDetails, 2);
            }
            totalTTCDiscountedHandler(montantTTCAvantRemiseInputDetails, montantTTCApresRemiseInputDetails, remiseMontantInputDetails);
            TVAHandler(montantHTApresRemiseInputDetails, TVAApresRemiseInputDetails, montantTTCApresRemiseInputDetails, 2);
        })

    } catch (error) {

    }

    try {
        modalCommandeDetails.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCommandeDetailsObj
                    );
                } else {
                    DefaultModalCommandeNew(modalCommandeDetails, 0);
                    defaultButtons(modalCommandeDetails);
                    bsModalCommandeDetails.hide();
                }
            } else if (event.target.id == "btn-modify") {
                if (modalCommandeDetails.querySelector('#state').value !== "2") {
                    makeCommandeFormEditabble(modalCommandeDetails);
                }
            } else if (event.target.id == "btn-add-item") {
                addItem(tableItemsFactureDetails).then(() => modificationWatcher = true);
            } else if (event.target.id === "btn-save") {
                openModalConfirmation(
                    confirmationObj,
                    saveCommandeDetailsObj
                );
            } else if (event.target.id === "btn-validate") {
                openModalConfirmation(
                    confirmationObj,
                    validateCommandeDetailsObj
                );
                //     } else if (event.target.classList.contains("btn-del")) {
                //         removeItem(event.target, "target");
                //         modificationWatcher = true;
                //         console.log("remove");
                //         updateTotalPrice(montantHTAvantRemiseInputNew, modalCommandeNew.querySelectorAll("#item-prix-total"))
                //         updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
                //     } else if (event.target.id == "btn-save-new") {
                //         if (modificationWatcher) {
                //             openModalConfirmation(
                //                 confirmationObj,
                //                 saveCreationObj
                //             );
                //         } else {
                //             bsModalConfirmation.hide();
                //         }
                //     }
                // })
            }
        })
    } catch (error) {

    }


})