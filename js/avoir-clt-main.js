var currentUser;

const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');
var modificationWatcher = false;
var typingTimer;
var ModalFlag = false;
var listDOM = {};

var counterRowItem = 1;

const URL_TABLE_DETAILS_OBJ = {
    view: "/elements/commandes/commande_table_details_base.html",
    new: "/elements/avoirs_clt/avoir_clt_table_details_base.html"
};

const DefaultValuesAvoirNewFormObj = {
    "num-avoir": "",
    "fact-origin": "",
    "commercial": "",
    "client": "",
    "date": TODAY,
    "note": "",
    "totalHT-avant-remise": "0.00",
    "TVA-avant-remise": "0.00",
    "totalTTC-avant-remise": "0.00",
    "remise-taux": "0.00",
    "remise-montant": "0.00",
    "totalHT-apres-remise": "0.00",
    "TVA-apres-remise": "0.00",
    "totalTTC-apres-remise": "0.00"
};

const InputsDisabledByDefaultAvoirNewFormArray = [
    'num-avoir',
    "commercial",
    "client",
    "magasin",
    "type",
    "note",
    "date",
    "totalHT-avant-remise",
    "TVA-avant-remise",
    "totalTTC-avant-remise",
    "remise-taux",
    "remise-montant",
    "totalHT-apres-remise",
    "TVA-apres-remise",
    "totalTTC-apres-remise"
];

const InputsDisabledByDefaultAvoirRowItemArray = [
    "item-uid",
    "item-name",
    "num-serie",
    "item-pu",
    "item-prix-total"
];

const DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_DETAILS = {

    "btn-new-client": true,
    "btn-add-item": true,
    "btn-del-item": true,
    "btn-new-item": true
}

const DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_NEW = {
    "btn-new-client": true,
    "btn-add-item": true,
    "btn-del-item": true,
    "btn-new-item": true,
    "btn-create-avoir": true
}

// const inputAvoirToDbFieldObject = {
//     "fact-origin": "num_facture",
//     "row-uid": "commande_uid",
//     : "client_uid",
//     : "libelle",
//     : "state",
//     : "total_ht_apres_remise",
//     : "total_ttc_apres_remise	",

// }

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

function updateAllHeaderPrices(montantHTAvantRemiseInput, TVAAvantRemiseInput, montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput) {

    TVAHandler(montantHTAvantRemiseInput, TVAAvantRemiseInput, montantTTCAvantRemiseInput, 1);
    tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, 1)
    totalTTCDiscountedHandler(montantTTCAvantRemiseInput, montantTTCApresRemiseInput, remiseMontantInput);
    TVAHandler(montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput, 2);
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

function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}

function fillHeadersFactureOrigin(modalNode, headersData) {
    modalNode.querySelector('#client').value = formatStringClientName(headersData);
    modalNode.querySelector('#totalHT-avant-remise').value = "0.00";
    modalNode.querySelector('#TVA-avant-remise').value = "0.00";
    modalNode.querySelector('#totalTTC-avant-remise').value = "0.00";
    modalNode.querySelector('#totalHT-apres-remise').value = "0.00";
    modalNode.querySelector('#TVA-apres-remise').value = "0.00";
    modalNode.querySelector('#totalTTC-apres-remise').value = "0.00";
    modalNode.querySelector('#remise-taux').value = headersData['remise_taux'];
    modalNode.querySelector('#remise-montant').value = "0.00";
    return;
}

function addItem(tableFactureBody, mode) {
    console.log("table name");
    console.log(tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    if (!["new", "view"].includes(mode)) {
        throw new Error("mode must be 'new' or 'view'.");
    };
    let newInputDisabled = ["input-uid", "num-serie"];
    return new Promise((resolve, reject) => {
        console.log("addding item");
        if (listDOM["item-row-" + mode]) {
            console.log("from cahce");
            counterRowItem++;
            let doc = new DOMParser().parseFromString(
                listDOM["item-row-" + mode],
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");

            trModel.querySelectorAll(".input").forEach(input_ => {
                input_.disabled = input_.id != "item-quantity";
            });
            trModel.querySelector("#btn-new-item").disabled = true;
            trModel.querySelector("#btn-del-item").disabled = tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id == "modal-avoir-new";

            console.log("trModel");
            console.log(trModel);

            tableFactureBody.querySelector('tbody').append(
                generateRowItem(trModel, ["", "", "", "", "", ""])
            );
            resolve(true);

        } else {

            fetch(URL_TABLE_DETAILS_OBJ[mode])
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
                    listDOM["item-row-" + mode] = doc.body.innerHTML;

                    let trModel = doc.querySelector("#row-001");

                    trModel.querySelectorAll(".input").forEach(input_ => {
                        input_.disabled = input_.id != "item-quantity";
                    });
                    trModel.querySelector("#btn-new-item").disabled = true;
                    trModel.querySelector("#btn-del-item").disabled = tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id == "modal-avoir-new";

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

async function addItemRowsLoop(numberOfRows, modalDetailsItemsTable, mode) {
    for (let i = 0; i < numberOfRows; ++i) {
        console.log("counterRowItem : " + counterRowItem);
        await addItem(modalDetailsItemsTable, mode);
    }
    return new Promise((resolve, reject) => resolve(true));
}

async function fillInputsDetailsItems(itemsArray, modalDetailsItemsTable, mode) {
    if (!['new', 'view'].includes(mode)) {
        throw new Error("Mode must be 'new' or 'view'.");
    };
    let numberOfRows = itemsArray.length;
    await addItemRowsLoop(numberOfRows, modalDetailsItemsTable, mode);
    // disableInputsAndButtons(modalDetailsItemsTable);
    let rowsToFill = modalDetailsItemsTable.querySelectorAll(".item-commande-row");

    for (let j = 0; j < numberOfRows; j++) {
        fillInputsDetailsItem(itemsArray[j], rowsToFill[j], mode);

    }
}

function fillItemsFactureOrigin(modalNode, itemsData, mode) {
    itemsData.forEach(rowData => {

    })
}

function formatStringClientName(HeaderDataObject) {
    let formatedResult;
    if (HeaderDataObject["raison_sociale"]) {
        formatedResult = HeaderDataObject["client_uid"] + " - " + HeaderDataObject["raison_sociale"] + " / " + HeaderDataObject["nom_commercial"];
    } else {
        formatedResult = HeaderDataObject["client_uid"] + " - " + HeaderDataObject["noms"] + " " + HeaderDataObject["prenoms"];
    }
    return formatedResult;
}


function fillInputsDetailsHeaders(responseJSON, modalDetailsHeaders) {
    console.log("responseJSON : ");
    console.log(responseJSON);
    valueObj = responseJSON["header"];
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
        } else if (element.id === "commercial") {
            element.value = valueObj["user_uid"] + "//" + valueObj["user_name"];
        } else if (element.id === "date") {
            console.log("datetime");
            console.log(valueObj["datetime"].slice(0, 11));
            element.value = valueObj["datetime"].slice(0, 10);

        } else {
            element.value = valueObj[DTO_FILL_INPUT_HEADERS[element.id]];
        }

        // console.log(element.id);
        // console.log(DTO_FILL_INPUT[element.id]);
        // console.log(valueObj[DTO_FILL_INPUT[element.id]]);

    }
}

function fillInputsDetailsItem(arrayData, rowNode, mode) {
    if (!['new', 'view'].includes(mode)) {
        throw new Error("Mode must be 'new' or 'view'.");
    }
    let idToKey = {
        "initial-quantity": "quantity",
        "row-uid": "uid",
        "item-uid": "item_uid",
        "item-name": "item_name",
        "num-serie": "description_item",
        "item-pu": "prix_unitaire",
    }
    if (mode === "view") {
        idToKey["item-quantity"] = "quantity";
    } else {
        rowNode.querySelector("#item-quantity").setAttribute("max", arrayData["quantity"]);
        rowNode.querySelector("#initial-quantity").textContent = arrayData["quantity"];
    }
    let inputs = rowNode.querySelectorAll(".input");
    for (let k = 0; k < inputs.length; k++) {
        let input = inputs[k];
        if (["item-prix-total", "item-quantity"].includes(input.id)) {
            input.value = 0;
        } else {
            input.value = arrayData[idToKey[input.id]];
        }
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

function openNewAvoirFactureBased(modal, bsModal) {
    modal.querySelectorAll('.input').forEach(element => {
        element.disabled = element.id !== "fact-origin";
    });
    modal.querySelectorAll('.btn').forEach(element => {
        element.disabled = element.id !== 'btn-cancel-avoir';
    });
    bsModal.show();

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


function defaultButtons(modal) {
    const refObj = {
        "modal-details": DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_DETAILS,
        'modal-avoir-new': DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_NEW
    };
    let btns = modal.querySelectorAll(".btn");
    btns.forEach(myBtn => {
        myBtn.disabled = refObj[modal.id][myBtn.id];
    });
}

function cleanNewForm(modal, disable = false) {
    console.log("cleaning");
    let array1 = InputsDisabledByDefaultAvoirNewFormArray.concat(InputsDisabledByDefaultAvoirRowItemArray);

    const inputsForm = modal.querySelectorAll(".input");

    inputsForm.forEach((input) => {
        // console.log(input);
        if (array1.includes(input.id)) {
            input.disabled = true;
        } else {
            input.disabled = disable;
        }
        let myValue = DefaultValuesAvoirNewFormObj[input.id];
        if (myValue == undefined) {
            myValue = DefaultValuesAvoirNewFormObj[input.id];
            if (myValue == undefined) {
                return false;
            }
        }
        input.value = myValue;
    });
}

async function DefaultModalAvoirInputs(modal, min_row = 1) {
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
    const factureDataList = document.getElementById("facture-list");


    ////modal confirmation
    const modalConfirmation = document.getElementById("modal-confirmation");
    const bsModalConfirmation = new bootstrap.Modal(modalConfirmation, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
    // const modalConfirmation2 = document.getElementById("modal-new");
    // const bsModalConfirmation2 = new bootstrap.Modal(modalConfirmation2, {
    //     backdrop: "static",
    //     keyboard: false,
    //     focus: true,
    // });
    const btnConfirmationYes = modalConfirmation.querySelector("#btn-confirmation-yes"
    );
    const btnConfirmationNo = modalConfirmation.querySelector("#btn-confirmation-no"
    );

    ////modal new
    const modalChooseNew = document.getElementById("modal-choose-new");
    const bsModalChooseNew = new bootstrap.Modal(modalChooseNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const modalAvoirNew = document.getElementById("modal-avoir-new");
    const bsModalAvoirNew = new bootstrap.Modal(modalAvoirNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const montantHTAvantRemiseInputNew = modalAvoirNew.querySelector("#totalHT-avant-remise");
    const TVAAvantRemiseInputNew = modalAvoirNew.querySelector("#TVA-avant-remise");
    const montantTTCAvantRemiseInputNew = modalAvoirNew.querySelector("#totalTTC-avant-remise");
    const remiseTauxInputNew = modalAvoirNew.querySelector("#remise-taux");
    const remiseMontantInputNew = modalAvoirNew.querySelector("#remise-montant");
    const montantHTApresRemiseInputNew = modalAvoirNew.querySelector("#totalHT-apres-remise");
    const TVAApresRemiseInputNew = modalAvoirNew.querySelector("#TVA-apres-remise");
    const montantTTCApresRemiseInputNew = modalAvoirNew.querySelector("#totalTTC-apres-remise");

    montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew

    ////// today's date
    try {
        modalAvoirNew.querySelector('#date').value = TODAY;

    } catch (error) {
        console.log("dont know what happened : " + error);
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
            DefaultModalAvoirInputs(modalAvoirNew, 0);
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

    async function searchFacture(inputObj) {
        console.log("searching Facture");
        let url = "/database/select/one_facture_client_details.php";
        let response = await sendData(url, inputObj);

        console.log("error?");
        console.log(response);
        let myjson = await responseHandlerSelectOneCommande(response);
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
        let search = { "client": searchClient, "item": searchItem, "facture": searchFacture }

        let inputObj = {
            "client": { uid: term, noms: term, prenoms: term, "nom-commercial": term, "raison-sociale": term },
            "item": { code: term, name: term },
            "facture": { uid: null, "num-facture": term }
        };
        let result = await search[mode](inputObj[mode]);
        // let result = await searchItem(inputObj);
        addDatalistElement(datalistNode, result, mode, term);
    }



    async function showCommandeDetails(event) {
        // TODO : refactor
        console.log("called here");
        let parent = event.target.parentNode.parentNode;
        console.log("parent");
        console.log(parent);
        let myuid = parent.querySelector(".input.commande-uid").value;
        console.log("myuid tr");
        console.log(myuid);
        console.log("num-fact tr");
        console.log(parent.querySelector(".input.num-fact").value);
        sendData("/database/select/one_facture_client_details.php", {
            uid: myuid,
            "num-facture": parent.querySelector(".input.num-fact").value,
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

                    let inputsHeader = modalAvoirNew.querySelector("#commande-header")
                    fillInputsDetailsHeaders(result[1], inputsHeader);
                    fillInputsDetailsItems(result[1]["items"], modalFactureDetails.querySelector("#table-facture"));
                } else {
                    throw new Error(result);
                }
            });
    }


    function addDatalistElement(datalistNode, arrayData, mode, term = "") {
        datalistNode.innerHTML = "";
        if ((Array.isArray(arrayData)) && (arrayData.length || arrayData[0] != undefined)) {
            console.log("array is ok");
            if (mode === "facture") {
                console.log("facture xxx");
                console.log(arrayData[1]["items"]);
                let headers_ = arrayData[1]["header"];

                let option_ = document.createElement("option");
                option_.value = headers_['num_facture'];
                option_.label = headers_['num_facture'] + " - ";
                option_.dataset.headers = JSON.stringify(headers_);
                option_.dataset.items = JSON.stringify(arrayData[1]["items"]);

                if (headers_.noms == "") {
                    console.log("client company");

                    option_.label += (headers_["raison_sociale"] || "") + " / " + (headers_["nom_commercial"] || "");
                } else if (headers_["raison_sociale"] == "") {
                    console.log("client humain");
                    option_.label += headers_.noms + " " + headers_.prenoms;
                }
                option_.label += " - " + formatNumber(headers_['total_ttc_apres_remise']);
                datalistNode.append(option_);
                return;
            }

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
                return;
            });
        } else {
            console.log("empty arrayy");
            let option_ = document.createElement("option");
            option_.value = "Néant";
            option_.label = "aucun résultat pour \"" + term + "\"";
            datalistNode.append(option_);
            return;
        }

    }

    function getDataFacture(code) {
        return [JSON.parse(document.querySelector("option[value='" + code + "']").getAttribute("data-headers")),
        JSON.parse(document.querySelector("option[value='" + code + "']").getAttribute("data-items"))];
    }


    //EVENTHANDLER

    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new")
                bsModalChooseNew.show();
        })
    } catch (error) {

    }

    try {
        modalChooseNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel") {
                bsModalChooseNew.hide();
            } else if (event.target.id == "btn-avoir-facture") {
                console.log(
                    "step 1"
                );
                openNewAvoirFactureBased(modalAvoirNew, bsModalAvoirNew);
            } else if (event.target.id == "btn-avoir-no-base") {
                //TODO : place code here
            }
        })
    } catch (error) {
        console.log("erroree " + error);
    }

    try {
        modalAvoirNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel-avoir") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalAvoirNew.hide();
                    DefaultModalAvoirInputs(modalAvoirNew, 0);
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

            } else if ((event.target.id === "client") && (event.inputType === "insertText")) {
                console.log("searching client");
                clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
            } else if ((event.target.id === "fact-origin") && (event.inputType === "insertText")) {
                console.log("searching fact");
                clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, factureDataList, "facture") }, 1500);
                }
            } else if ((event.target.id === "fact-origin") && (!event.key)) {
                console.log("chossed fact");
                console.log(getDataFacture(event.target.value));
                let val = event.target.value;
                fillHeadersFactureOrigin(modalAvoirNew, getDataFacture(event.target.value)[0]);
                fillInputsDetailsItems(getDataFacture(event.target.value)[1], modalAvoirNew.querySelector('#table-avoir'), 'new');
                // if (event.target.parentNode.parentNode.querySelector("#item-quantity").value > 0) {
                //     fillItemNameAndPrice(event.target, 0);
                // } else {
                //     fillItemNameAndPrice(event.target, 1);
                // }
                // const itemTotalPriceInputs = modalCommandeNew.querySelectorAll(".item-prix-total");
                // console.log("itemTotalPriceInputs");
                // console.log(itemTotalPriceInputs);
                // updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                // updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            } else if (event.target.id == "item-quantity") {
                console.log("qtt called");
                updateItemTotalPrice(event.target.parentNode.parentNode)
                updateTotalPrice(montantHTAvantRemiseInputNew, modalAvoirNew.querySelectorAll("#item-prix-total"));
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
                try {
                    modalAvoirNew.querySelector("#btn-create-avoir").disabled = true;

                    if (parseInt(montantTTCApresRemiseInputNew.value) > 0) {
                        modalAvoirNew.querySelector("#btn-create-avoir").disabled = false;
                    }
                } catch (error) {
                    console.log("error here cannot create not autho");
                }

            }
        });
    } catch (error) {
        console.log("error 356");
    }
})