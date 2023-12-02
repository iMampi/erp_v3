// var currentUser;

const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');
var modificationWatcher = false;
var typingTimer;
var ModalFlag = false;
var myCache = {};

var counterRowItem = 1;

const URL_TABLE_DETAILS_OBJ = {
    view: "/elements/commandes/commande_table_details_base.html",
    new: "/elements/avoirs_clt/avoir_clt_based_table_details_base.html"
};

const DefaultValuesAvoirNewFormObj = {
    "num-avoir": "",
    "fact-origin": "Choississez une facture",
    "commercial": currentUser,
    "client": "Choississez un client",
    "date": TODAY,
    "note": "",
    "type": "0",
    "totalHT-avant-remise": "",
    "TVA-avant-remise": "",
    "totalTTC-avant-remise": "",
    "remise-taux": "",
    "remise-montant": "",
    "totalHT-apres-remise": "",
    "TVA-apres-remise": "",
    "totalTTC-apres-remise": ""
};

const InputsDisabledByDefaultAvoirBasedNewFormArray = [
    'num-avoir',
    "commercial",
    "client",
    "magasin",
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

const InputsDisabledByDefaultAvoirSimpleNewFormArray = [
    'num-avoir',
    "commercial",
    "magasin",
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

const InputsDisabledByDefaultAvoirBasedRowItemArray = [
    "item-uid",
    "item-name",
    "num-serie",
    "item-pu",
    "item-prix-total"
];
const InputsDisabledByDefaultAvoirSimpleRowItemArray = [
    "item-uid",
    "item-name",
    "num-serie",
    "item-pu",
    "item-quantity",
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

const ToastShowClosured = showMe();


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
    rowNode.querySelector("#item-prix-total").value = formatNumber(formatedNumberToFloat(price) * formatedNumberToFloat(quantity) * -1);
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

function addRowTable(tableBody, dataObj) {
    return new Promise((resolve, reject) => {
        console.log("addding new avoir");
        if (myCache["tableRow"]) {
            console.log("from cahce");
            counterRowItem++;
            let doc = new DOMParser().parseFromString(
                myCache["tableRow"],
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");
            console.log("trModel");
            console.log(trModel);

            tableBody.append(
                generateRowTable(trModel, dataObj)
            );
            resolve(true);

        } else {

            fetch("/elements/avoirs_clt/liste_avoirs_clt_table_001_base.html")
                .then((response) =>
                    response.text()
                )
                .then((txt) => {
                    // TODO : abstract this process
                    console.log("from fetch");

                    let doc = new DOMParser().parseFromString(
                        txt,
                        "text/html"
                    );

                    // caching
                    myCache["tableRow"] = doc.body.innerHTML;

                    let trModel = doc.querySelector("#row-001");
                    console.log("trModel");
                    console.log(trModel);

                    tableBody.append(
                        generateRowTable(trModel, dataObj)
                    );

                    // bsModalNew.hide();
                    // _cleanNewForm();
                    // console.log("yes saving called");
                    resolve(true);


                });
        }
    })
}

function generateRowTable(nodeModel, DataObj) {
    //MARQUE PAGE
    console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    DataObj["num-avoir"] = zeroLeftPadding(DataObj["num-avoir"], 4)
    newNode.id = "row-" + DataObj["uid"];
    // newNode.querySelector("input.uid").value = DataObj["uid"];
    // TODO : use a dto or something
    newNode.querySelector(".input.commande-uid").value = DataObj["new-commande-uid"];
    newNode.querySelector(".input.date").value = DataObj["date"];
    newNode.querySelector(".client.input").value = DataObj["client"];
    //TODO : format the numbers
    newNode.querySelector(".total.input").value = formatNumber(DataObj["totalTTC-apres-remise"]);
    newNode.querySelector(".num-avoir.input").value = DataObj["num-avoir"];
    return newNode;
}

async function responseHandlerSaveAvoirNew(response) {
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

function grabAvoirDataForm(modal) {
    let data = { header: {}, items: [] };
    const headersName = ["num-avoir", "fact-origin", "commande-uid", "commercial", 'type', "state", "client", "date", "note", "magasin", "totalHT-avant-remise", "totalTTC-avant-remise", "remise-taux", "remise-montant", "totalHT-apres-remise", "totalTTC-apres-remise"];
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
                data["header"][input.id] = getInputValue(input)
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

async function saveAvoirNew(inputObj) {
    console.log("saving avoir");
    formatFloatsForDatabase(inputObj);
    // console.log("data");
    // console.log(data);
    let url = "/database/save/new_avoir.php";
    let response = await sendData(url, inputObj);

    console.log("errore?");
    console.log(response);
    let result = await responseHandlerSaveAvoirNew(response);
    // TODO ; to refactor
    if (result[0] == "success") {
        ToastShowClosured(result[0], "Avoir sauvegardé avec succès");
    } else if (result[0] == "failure") {
        ToastShowClosured(result[0], "Echec de la sauvegarde de l'avoir");
    } else {
        throw new Error("wrong value returned");
    }
    return [result[0] == "success", result[1]];
}

function formatFloatsForDatabase(inputObj) {
    //TODO : to put in helpers.js
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

function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}

function fillHeadersFactureOrigin(modalNode, headersData) {
    modalNode.querySelector('#fact-origin').textContent = headersData['num_facture'];
    modalNode.querySelector('#commande-uid').value = headersData['commande_uid'];
    modalNode.querySelector('#client').textContent = formatStringClientName(headersData);
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

function addDatalistElement(datalistNode, arrayData, mode, term = "") {
    //TODO : Refactor me
    let LIs = datalistNode.querySelectorAll("li");
    LIs.forEach(LI => {
        if (LI.id !== "search-container") {
            datalistNode.removeChild(LI);
        }
    })
    if ((Array.isArray(arrayData)) && (arrayData.length || arrayData[0] != undefined)) {
        console.log("array is ok");
        if (mode === "facture") {
            arrayData = [arrayData]
        }

        arrayData.forEach(element => {
            let option_ = document.createElement("option");
            if (mode === "facture") {
                console.log("facture xxx");
                console.log(element[1]["items"]);
                let headers_ = element[1]["header"];

                let newLi = document.createElement("li");
                let newA = document.createElement("a");
                newA.classList.add("dropdown-item", "fst-italic", "search-result");
                newA.setAttribute("href", "#");
                newA.textContent = headers_['num_facture'] + " - ";
                newA.dataset.headers = JSON.stringify(headers_);
                newA.dataset.items = JSON.stringify(element[1]["items"]);
                newA.dataset.value = headers_['num_facture'];


                if (headers_.noms == "") {
                    console.log("client company");

                    newA.textContent += (headers_["raison_sociale"] || "") + " / " + (headers_["nom_commercial"] || "");
                    // option_.label += (headers_["raison_sociale"] || "") + " / " + (headers_["nom_commercial"] || "");
                } else if (headers_["raison_sociale"] == "") {
                    console.log("client humain");
                    newA.textContent += headers_.noms + " " + headers_.prenoms;
                    // option_.label += headers_.noms + " " + headers_.prenoms;
                }

                console.log("xmar");
                newA.textContent += " - " + formatNumber(headers_['total_ttc_apres_remise']);
                newLi.appendChild(newA);
                datalistNode.appendChild(newLi);

                // option_.label += " - " + formatNumber(headers_['total_ttc_apres_remise']);
                // datalistNode.append(option_);
                return;
            } else if (mode == "item") {
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
            // datalistNode.append(option_);
            return;
        });
    } else {
        console.log("empty arrayy");

        let newLi = document.createElement("li");
        newLi.classList.add("dropdown-item", "fst-italic", "search-result");
        newLi.textContent = "aucun résultat pour \"" + term + "\"";
        datalistNode.append(newLi);


        // let option_ = document.createElement("option");
        // option_.value = "Néant";
        // option_.label = "aucun résultat pour \"" + term + "\"";
        // datalistNode.append(option_);
        return;
    }

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

async function searchFacture(inputObj) {
    console.log("searching Facture");
    let url = "/database/select/one_facture_client_details_for_avoir.php";
    // let url = "/database/select/select_filtered_factures.php";
    let response = await sendData(url, inputObj);

    console.log("error?");
    console.log(response);
    let myjson = await responseHandlerSelectOneCommande(response);
    // let myjson = JSON.parse(await response);

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

function addItem(tableFactureBody, mode) {
    console.log("table name");
    console.log(tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id);
    if (!["new", "view"].includes(mode)) {
        throw new Error("mode must be 'new' or 'view'.");
    };
    let newInputDisabled = ["input-uid", "num-serie"];
    return new Promise((resolve, reject) => {
        console.log("addding item");
        if (myCache["item-row-" + mode]) {
            console.log("from cahce");
            counterRowItem++;
            let doc = new DOMParser().parseFromString(
                myCache["item-row-" + mode],
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");

            trModel.querySelectorAll(".input").forEach(input_ => {
                input_.disabled = input_.id != "item-quantity";
            });
            trModel.querySelector("#btn-new-item").disabled = true;
            trModel.querySelector("#btn-del-item").disabled = tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id == "modal-avoir-new-based";

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
                    myCache["item-row-" + mode] = doc.body.innerHTML;

                    let trModel = doc.querySelector("#row-001");

                    trModel.querySelectorAll(".input").forEach(input_ => {
                        input_.disabled = input_.id != "item-quantity";
                    });
                    trModel.querySelector("#btn-new-item").disabled = true;
                    trModel.querySelector("#btn-del-item").disabled = tableFactureBody.parentNode.parentNode.parentNode.parentNode.parentNode.id == "modal-avoir-new-based";

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

function addName(listNode, value, selectable, myJSON = {}) {
    let newLi = document.createElement("li");
    if (selectable) {
        let newA = document.createElement("a");
        newA.textContent = typeof value == "string" ? value : formatName(value);
        newA.classList.add("dropdown-item", "fst-italic", "search-result");
        newA.setAttribute("href", "#");
        newLi.appendChild(newA);
    } else {
        newLi.textContent = typeof value == "string" ? value : formatName(value);
        newLi.classList.add("fst-italic", "px-2",);
    }

    listNode.appendChild(newLi);
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
    // TODO : to test when data mock available
    if (!['new', 'view'].includes(mode)) {
        throw new Error("Mode must be 'new' or 'view'.");
    }
    let idToKey = {
        "initial-quantity": "remaining_quantity",
        "row-uid": "uid",
        "item-uid": "item_uid",
        "item-name": "item_name",
        "num-serie": "description_item",
        "item-pu": "prix_unitaire",
    }
    if (mode === "view") {
        idToKey["item-quantity"] = "remaining_quantity";
    } else {
        rowNode.querySelector("#item-quantity").setAttribute("max", arrayData["remaining_quantity"]);
        rowNode.querySelector("#initial-quantity").textContent = arrayData["remaining_quantity"];
    }
    let inputs = rowNode.querySelectorAll(".input");
    for (let k = 0; k < inputs.length; k++) {
        let input = inputs[k];
        if (["item-prix-total", "item-quantity"].includes(input.id)) {
            input.value = 0;
        } else if (input.id === "item-pu") {
            input.value = formatNumber(arrayData[idToKey[input.id]]);
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
        // element.disabled = element.id !== "fact-origin";
        element.disabled = InputsDisabledByDefaultAvoirBasedNewFormArray.includes(element.id);
    });
    modal.querySelectorAll('.btn').forEach(element => {
        // element.disabled = element.id !== 'btn-cancel-avoir';
        element.disabled = !['btn-cancel-avoir', 'fact-origin'].includes(element.id);
    });
    bsModal.show();

}
// TODO :finish me
async function getCachedData(key) {
    if (!myCache["defautItemAvoirSimpleJSON"]) {
        let resp = await searchItem({ code: "cstm_avr", name: "cstm_avr" });
        myCache["defautItemAvoirSimpleJSON"] = resp[0];

    }
    return myCache["defautItemAvoirSimpleJSON"];
}

async function openNewAvoirFactureSimple(modal, bsModal) {
    console.log("avoir simple");
    bsModal.show();

    modal.querySelectorAll('.input').forEach(element => {
        // element.disabled = element.id !== "fact-origin";
        element.disabled = InputsDisabledByDefaultAvoirSimpleNewFormArray.includes(element.id);

    });

    await addItem(modal.querySelector("#table-avoir"), "new");

    let defautItemAvoirSimpleJSON = await getCachedData("defautItemAvoirSimpleJSON");

    modal.querySelector("#item-uid").value = defautItemAvoirSimpleJSON["code"];
    modal.querySelector("#item-name").value = defautItemAvoirSimpleJSON["name"];
    modal.querySelector("#item-quantity").value = "1";
    modal.querySelector("#item-quantity").disabled = true;
    modal.querySelector("#num-serie").disabled = false;
    modal.querySelector("#item-pu").disabled = false;
    modal.querySelector("#initial-quantity").textContent = "1";

    modal.querySelectorAll('.btn').forEach(element => {
        // element.disabled = element.id !== 'btn-cancel-avoir';
        element.disabled = !['btn-cancel-avoir', 'fact-origin', 'client', "btn-del-item"].includes(element.id);
    });


}


function getInputValue(node) {
    if (node.tagName == "BUTTON") {
        return node.textContent;
    }
    return node.value;
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
        'modal-avoir-new-based': DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_NEW,
        'modal-avoir-new-simple': DEFAULT_BUTTONS_DISABLED_STATE_AVOIR_NEW,
    };
    let btns = modal.querySelectorAll(".btn");
    btns.forEach(myBtn => {
        myBtn.disabled = refObj[modal.id][myBtn.id];
    });
}

function cleanNewForm(modal, disable = false) {
    console.log("cleaning");
    let dictSelectorObj = {
        'modal-avoir-new-based': InputsDisabledByDefaultAvoirBasedNewFormArray,
        'modal-avoir-new-simple': InputsDisabledByDefaultAvoirBasedNewFormArray
    }
    let array1 = dictSelectorObj[modal.id].concat(InputsDisabledByDefaultAvoirBasedRowItemArray);

    const inputsForm = modal.querySelectorAll(".input");

    inputsForm.forEach((input) => {
        // console.log(input);
        input.disabled = array1.includes(input.id);

        let myValue = DefaultValuesAvoirNewFormObj[input.id];
        if (myValue == undefined) {
            return false;
        }
        input.value = myValue;
        console.log(input.tagName);
        if (input.tagName == "BUTTON") {
            input.textContent = DefaultValuesAvoirNewFormObj[input.id];
        }
    });
}

async function DefaultModalAvoirInputs(modal, min_row = 1) {
    //remove other item rows
    let itemRows = modal.querySelectorAll(".item-commande-row");
    removeItemRows(itemRows);
    if (min_row != 0) {
        await addItem(modalm, "new");
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
    const myList = document.getElementById("my-list");

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
    const modalChooseNew = document.getElementById("modal-choose-new");
    const bsModalChooseNewAvoir = new bootstrap.Modal(modalChooseNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const modalAvoirNewBased = document.getElementById("modal-avoir-new-based");
    const bsModalAvoirNewBased = new bootstrap.Modal(modalAvoirNewBased, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const modalAvoirNewSimple = document.getElementById("modal-avoir-new-simple");
    const bsModalAvoirNewSimple = new bootstrap.Modal(modalAvoirNewSimple, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const montantHTAvantRemiseInputNewBased = modalAvoirNewBased.querySelector("#totalHT-avant-remise");
    const TVAAvantRemiseInputNewBased = modalAvoirNewBased.querySelector("#TVA-avant-remise");
    const montantTTCAvantRemiseInputNewBased = modalAvoirNewBased.querySelector("#totalTTC-avant-remise");
    const remiseTauxInputNewBased = modalAvoirNewBased.querySelector("#remise-taux");
    const remiseMontantInputNewBased = modalAvoirNewBased.querySelector("#remise-montant");
    const montantHTApresRemiseInputNewBased = modalAvoirNewBased.querySelector("#totalHT-apres-remise");
    const TVAApresRemiseInputNewBased = modalAvoirNewBased.querySelector("#TVA-apres-remise");
    const montantTTCApresRemiseInputNewBased = modalAvoirNewBased.querySelector("#totalTTC-apres-remise");

    const montantHTAvantRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#totalHT-avant-remise");
    const TVAAvantRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#TVA-avant-remise");
    const montantTTCAvantRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#totalTTC-avant-remise");
    const remiseTauxInputNewSimple = modalAvoirNewSimple.querySelector("#remise-taux");
    const remiseMontantInputNewSimple = modalAvoirNewSimple.querySelector("#remise-montant");
    const montantHTApresRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#totalHT-apres-remise");
    const TVAApresRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#TVA-apres-remise");
    const montantTTCApresRemiseInputNewSimple = modalAvoirNewSimple.querySelector("#totalTTC-apres-remise");

    // montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased

    ////// today's date
    try {
        modalAvoirNewBased.querySelector('#date').value = TODAY;
        modalAvoirNewSimple.querySelector('#date').value = TODAY;

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

    // TODO : to refactor. not optimal
    const cancelCreationObj = {
        message:
            "Des champs ont été modifiés.<br>\
		Vos modifications vont être perdus.<br>\
		Êtes vous sûr de vouloir quitter ce formulaire?",
        yes: () => {
            bsModalAvoirNewBased.hide();
            bsModalAvoirNewSimple.hide();
            DefaultModalAvoirInputs(modalAvoirNewBased, 0);
            DefaultModalAvoirInputs(modalAvoirNewSimple, 0);
            bsModalConfirmation.hide();
            modificationWatcher = false;
        },
        no: () => {
            bsModalConfirmation.hide();
        },
    };

    const saveNewAvoirObj = {
        message:
            "Des champs ont été modifiés.<br>\
				Vos modifications vont être enregistrées de facon définitive.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {

            let dataModalAvoirNew = grabAvoirDataForm(modalAvoirNewBased);
            console.log("dataModalAvoirNew");
            console.log(dataModalAvoirNew);
            saveAvoirNew(dataModalAvoirNew).then((result) => {
                console.log(result);
                if (result[0]) {
                    // insert uid of newly created client
                    dataModalAvoirNew["header"]["num-avoir"] = result[1][0];
                    dataModalAvoirNew["header"]["new-commande-uid"] = result[1][1];

                    addRowTable(tableBody, dataModalAvoirNew["header"]).then(res => {
                        //close and clean the rest
                        bsModalAvoirNewBased.hide();
                        bsModalChooseNewAvoir.hide();
                        DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                        bsModalConfirmation.hide();
                        console.log("yes saving avoir called");
                        modificationWatcher = false;
                        return false;
                    })



                } else {
                    //TODO : show error
                    return true;
                }

            })
        }
    }

    //FUNCTIONS





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

                    let inputsHeader = modalAvoirNewBased.querySelector("#commande-header")
                    fillInputsDetailsHeaders(result[1], inputsHeader);
                    fillInputsDetailsItems(result[1]["items"], modalFactureDetails.querySelector("#table-facture"));
                } else {
                    throw new Error(result);
                }
            });
    }

    function getDataFacture(target) {
        // return [JSON.parse(document.querySelector("option[value='" + code + "']").getAttribute("data-headers")),
        // JSON.parse(document.querySelector("option[value='" + code + "']").getAttribute("data-items"))];
        return [JSON.parse(target.getAttribute("data-headers")),
        JSON.parse(target.getAttribute("data-items"))];
    }


    //EVENTHANDLER

    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new")
                bsModalChooseNewAvoir.show();
        })
    } catch (error) {

    }

    try {
        modalChooseNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel") {
                bsModalChooseNewAvoir.hide();
            } else if (event.target.id == "btn-avoir-facture") {
                console.log(
                    "step 1"
                );
                openNewAvoirFactureBased(modalAvoirNewBased, bsModalAvoirNewBased);
            } else if (event.target.id == "btn-avoir-simple") {
                //TODO : place code here
                openNewAvoirFactureSimple(modalAvoirNewSimple, bsModalAvoirNewSimple);

            }
        })
    } catch (error) {
        console.log("erroree " + error);
    }

    try {
        modalAvoirNewBased.addEventListener('click', (event) => {
            console.log("testeur click");
            console.log(event.target);
            if (event.target.id == "btn-cancel-avoir") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalAvoirNewBased.hide();
                    DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                }
            } else if (event.target.id == "btn-add-item") {
                // addItem(tableItemsFactureNew).then(() => modificationWatcher = true);
            } else if (event.target.classList.contains("btn-del")) {
                // removeItem(event.target, "target");
                // modificationWatcher = true;
                // console.log("remove");
                // updateTotalPrice(montantHTAvantRemiseInputNewBased, modalCommandeNew.querySelectorAll("#item-prix-total"))
                // updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
            } else if (event.target.id == "btn-create-avoir") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        saveNewAvoirObj
                    );
                } else {
                    // bsModalConfirmation.hide();
                }
            } else if (event.target.classList.contains("search-result")) {
                console.log("chossed fact");
                console.log(event);

                // console.log(getDataFacture(event.target));
                // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                let val = event.target.value;
                fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target)[0]);
                fillInputsDetailsItems(getDataFacture(event.target)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');

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
        modalAvoirNewBased.addEventListener('input', (event) => {
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
                // clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
                // } else if ((event.target.id === "fact-origin") && (["insertText"].includes(event.inputType))) {
                //     console.log("searching fact1");
                //     console.log(event.inputType);
                //     clientDataList.innerHTML = "";
                //     clearTimeout(typingTimer);
                //     let term = event.target.value.trim();
                //     if (term) {
                //         // TODO : sanitize here
                //         clientDataList.innerHTML = "<li  value='Searching for \"" + event.target.value.trim() + "\"'></li>";
                //         typingTimer = setTimeout(() => { searchLive(term, factureDataList, "facture") }, 1500);
                //     }
            } else if (event.target.id === "search-facture") {
                console.log("searching fact2");
                // console.log(event.inputType);
                let hint = event.target.value.trim();
                // TODO : sanitize hint
                if (hint) {
                    let selection;
                    let LIs = myList.querySelectorAll("li");
                    LIs.forEach(LI => {
                        if (LI.id !== "search-container") {
                            myList.removeChild(LI);
                        }
                    })
                    //// START - grabing data
                    clearTimeout(typingTimer)
                    addName(myList, "Searching for \"" + event.target.value + "\"", false);
                    typingTimer = setTimeout(() => { searchLive(hint, myList, "facture") }, 1500);
                    //// END - grabing data
                    console.log("markman");
                    // if (selection == undefined) {
                    //     selection = "no match for \"" + search.value + "\"";
                    // };
                    // console.log("typed : " + JSON.stringify(selection));
                    // console.log(selection);
                    // LIs = myList.querySelectorAll("li");
                    // for (let index = 0; index < LIs.length; index++) {
                    //     if (LIs[index].id !== "search-container") {
                    //         myList.removeChild(LIs[index]);
                    //     }
                    // }

                    // addName(myList, selection,true)


                } else {
                    let LIs = myList.querySelectorAll("li");
                    for (let index = 0; index < LIs.length; index++) {
                        let j = LIs[index].id;
                        if (LIs[index].id !== "search-container") {
                            myList.removeChild(LIs[index]);
                        }
                    }
                }

                // } else if ((event.target.id === "fact-origin") && (!event.key) && (!["deleteContentBackward", "deleteContentForward"].includes(event.inputType))) {
                //     console.log("chossed fact");
                //     console.log(event);

                //     console.log(getDataFacture(event.target.value));
                //     // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                //     removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                //     let val = event.target.value;
                //     fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target.value)[0]);
                //     fillInputsDetailsItems(getDataFacture(event.target.value)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');
                //     // if (event.target.parentNode.parentNode.querySelector("#item-quantity").value > 0) {
                //     //     fillItemNameAndPrice(event.target, 0);
                //     // } else {
                //     //     fillItemNameAndPrice(event.target, 1);
                //     // }
                //     // const itemTotalPriceInputs = modalCommandeNew.querySelectorAll(".item-prix-total");
                //     // console.log("itemTotalPriceInputs");
                //     // console.log(itemTotalPriceInputs);
                //     // updateTotalPrice(montantHTAvantRemiseInputNewBased, itemTotalPriceInputs);
                //     // updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
            } else if (event.target.classList.contains("search-result")) {
                console.log("chossed fact");
                console.log(event);

                console.log(getDataFacture(event.target.value));
                // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                let val = event.target.value;
                fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target.value)[0]);
                fillInputsDetailsItems(getDataFacture(event.target.value)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');

            } else if (event.target.id == "item-quantity") {
                console.log("qtt called");
                updateItemTotalPrice(event.target.parentNode.parentNode)
                updateTotalPrice(montantHTAvantRemiseInputNewBased, modalAvoirNewBased.querySelectorAll("#item-prix-total"));
                updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
                try {
                    modalAvoirNewBased.querySelector("#btn-create-avoir").disabled = true;

                    if (parseInt(montantTTCApresRemiseInputNewBased.value) < 0) {
                        modalAvoirNewBased.querySelector("#btn-create-avoir").disabled = false;
                    }
                } catch (error) {
                    console.log("error here cannot create not autho");
                }

            }
        });
    } catch (error) {
        console.log("error 356");
    }


    try {
        modalAvoirNewSimple.addEventListener('click', (event) => {
            console.log("testeur click");
            console.log(event.target);
            if (event.target.id == "btn-cancel-avoir") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        cancelCreationObj
                    );
                } else {
                    bsModalAvoirNewSimple.hide();
                    DefaultModalAvoirInputs(modalAvoirNewSimple, 0);
                }
            } else if (event.target.id == "btn-add-item") {
                // addItem(tableItemsFactureNew).then(() => modificationWatcher = true);
            } else if (event.target.classList.contains("btn-del")) {
                // removeItem(event.target, "target");
                // modificationWatcher = true;
                // console.log("remove");
                // updateTotalPrice(montantHTAvantRemiseInputNewBased, modalCommandeNew.querySelectorAll("#item-prix-total"))
                // updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
            } else if (event.target.id == "btn-create-avoir") {
                if (modificationWatcher) {
                    openModalConfirmation(
                        confirmationObj,
                        saveNewAvoirObj
                    );
                } else {
                    // bsModalConfirmation.hide();
                }
            } else if (event.target.classList.contains("search-result")) {
                console.log("chossed fact");
                console.log(event);

                // console.log(getDataFacture(event.target));
                // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                let val = event.target.value;
                fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target)[0]);
                fillInputsDetailsItems(getDataFacture(event.target)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');

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
        modalAvoirNewSimple.addEventListener('input', (event) => {
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
                // clientDataList.innerHTML = "";
                clearTimeout(typingTimer);
                let term = event.target.value.trim();
                if (term) {
                    // TODO : sanitize here
                    clientDataList.innerHTML = "<option value='Searching for \"" + event.target.value.trim() + "\"'></option>";
                    typingTimer = setTimeout(() => { searchLive(term, clientDataList, "client") }, 1500);
                }
                // } else if ((event.target.id === "fact-origin") && (["insertText"].includes(event.inputType))) {
                //     console.log("searching fact1");
                //     console.log(event.inputType);
                //     clientDataList.innerHTML = "";
                //     clearTimeout(typingTimer);
                //     let term = event.target.value.trim();
                //     if (term) {
                //         // TODO : sanitize here
                //         clientDataList.innerHTML = "<li  value='Searching for \"" + event.target.value.trim() + "\"'></li>";
                //         typingTimer = setTimeout(() => { searchLive(term, factureDataList, "facture") }, 1500);
                //     }
            } else if (event.target.id === "search-facture") {
                console.log("searching fact2");
                // console.log(event.inputType);
                let hint = event.target.value.trim();
                // TODO : sanitize hint
                if (hint) {
                    let selection;
                    let LIs = myList.querySelectorAll("li");
                    LIs.forEach(LI => {
                        if (LI.id !== "search-container") {
                            myList.removeChild(LI);
                        }
                    })
                    //// START - grabing data
                    clearTimeout(typingTimer)
                    addName(myList, "Searching for \"" + event.target.value + "\"", false);
                    typingTimer = setTimeout(() => { searchLive(hint, myList, "facture") }, 1500);
                    //// END - grabing data
                    console.log("markman");
                    // if (selection == undefined) {
                    //     selection = "no match for \"" + search.value + "\"";
                    // };
                    // console.log("typed : " + JSON.stringify(selection));
                    // console.log(selection);
                    // LIs = myList.querySelectorAll("li");
                    // for (let index = 0; index < LIs.length; index++) {
                    //     if (LIs[index].id !== "search-container") {
                    //         myList.removeChild(LIs[index]);
                    //     }
                    // }

                    // addName(myList, selection,true)


                } else {
                    let LIs = myList.querySelectorAll("li");
                    for (let index = 0; index < LIs.length; index++) {
                        let j = LIs[index].id;
                        if (LIs[index].id !== "search-container") {
                            myList.removeChild(LIs[index]);
                        }
                    }
                }

                // } else if ((event.target.id === "fact-origin") && (!event.key) && (!["deleteContentBackward", "deleteContentForward"].includes(event.inputType))) {
                //     console.log("chossed fact");
                //     console.log(event);

                //     console.log(getDataFacture(event.target.value));
                //     // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                //     removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                //     let val = event.target.value;
                //     fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target.value)[0]);
                //     fillInputsDetailsItems(getDataFacture(event.target.value)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');
                //     // if (event.target.parentNode.parentNode.querySelector("#item-quantity").value > 0) {
                //     //     fillItemNameAndPrice(event.target, 0);
                //     // } else {
                //     //     fillItemNameAndPrice(event.target, 1);
                //     // }
                //     // const itemTotalPriceInputs = modalCommandeNew.querySelectorAll(".item-prix-total");
                //     // console.log("itemTotalPriceInputs");
                //     // console.log(itemTotalPriceInputs);
                //     // updateTotalPrice(montantHTAvantRemiseInputNewBased, itemTotalPriceInputs);
                //     // updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
            } else if (event.target.classList.contains("search-result")) {
                console.log("chossed fact");
                console.log(event);

                console.log(getDataFacture(event.target.value));
                // DefaultModalAvoirInputs(modalAvoirNewBased, 0);
                removeItemRows(modalAvoirNewBased.querySelectorAll(".item-commande-row"));
                let val = event.target.value;
                fillHeadersFactureOrigin(modalAvoirNewBased, getDataFacture(event.target.value)[0]);
                fillInputsDetailsItems(getDataFacture(event.target.value)[1], modalAvoirNewBased.querySelector('#table-avoir'), 'new');

            } else if (event.target.id == "item-quantity") {
                console.log("qtt called");
                updateItemTotalPrice(event.target.parentNode.parentNode)
                updateTotalPrice(montantHTAvantRemiseInputNewBased, modalAvoirNewBased.querySelectorAll("#item-prix-total"));
                updateAllHeaderPrices(montantHTAvantRemiseInputNewBased, TVAAvantRemiseInputNewBased, montantTTCAvantRemiseInputNewBased, remiseTauxInputNewBased, remiseMontantInputNewBased, montantHTApresRemiseInputNewBased, TVAApresRemiseInputNewBased, montantTTCApresRemiseInputNewBased);
                try {
                    modalAvoirNewBased.querySelector("#btn-create-avoir").disabled = true;

                    if (parseInt(montantTTCApresRemiseInputNewBased.value) < 0) {
                        modalAvoirNewBased.querySelector("#btn-create-avoir").disabled = false;
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