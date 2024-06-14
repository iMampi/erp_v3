var currentUser;
var defaultAutoNumericOptions =
{
    decimalCharacter: ",",
    digitGroupSeparator: " ",
    watchExternalChanges: true
}

const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');

var typingTimer;

const NUMBER_INPUT_ITEM_ROW = [
    "item-pu",
    "item-prix-total",
];

const ERROR_FLAG_MESSAGE_OBJ = {
    "out-of-stock": "Stock insufficant pour un article. Ajustez la quantité.",
    "required": "Veuillez remplir correctement le champ en rouge.",
    "num serie not available": "Numero de serie n'est plus disponible.",
    "num serie double": "Numero de serie répété. Corrigez le."

}

const REQUIRED_INPUT_HEADERS = [
    "state",
    "commercial",
    "client",
    "date",
    "magasin",
    "totalHT-avant-remise",
    "TVA-avant-remise",
    "totalTTC-avant-remise",
    "totalHT-apres-remise",
    "TVA-apres-remise",
    "totalTTC-apres-remise"
]
const REQUIRED_STANDARD_INPUT_ITEM_ROW = [
    "item-uid",
    "item-pu",
    "item-quantity"
]

const DTO_FILL_INPUT_ITEM_ROW = [
    { inputId: "row-uid", objectKey: ["uid"] },
    { inputId: "item-uid", objectKey: ["code", "item_uid"] },
    { inputId: "item-name", objectKey: ["name", "item_name"] },
    { inputId: "item-libelle", objectKey: ["description_item", "libelle"] },
    { inputId: "item-num-serie", objectKey: ["num_serie"] },
    { inputId: "item-pu", objectKey: ["prix_unitaire", "prix_vente"] },
    { inputId: "item-prix-total", objectKey: ["prix_total"] },
    { inputId: "stockable", objectKey: ["stockable"] },
    { inputId: "identifiable", objectKey: ["identifiable"] },
    { inputId: "item-quantity", objectKey: ["quantity"] },
    { inputId: "prix-variable", objectKey: ["prix-variable"] }
];

const NUMBER_INPUT_HEADERS = [
    "totalHT-avant-remise",
    "totalTTC-avant-remise",
    "remise-taux",
    "remise-montant",
    "totalHT-apres-remise",
    "totalTTC-apres-remise",
    "TVA-avant-remise",
    "TVA-apres-remise"
];

const DTO_FILL_INPUT_HEADERS = {
    "num-fact": "num_facture",
    // date: "date",
    date: "datetime",
    note: "libelle",
    payment: "payment",
    magasin: "magasin_uid",
    "totalHT-avant-remise": "total_ht_avant_remise",
    "totalTTC-avant-remise": "total_ttc_avant_remise",
    "remise-taux": "remise_taux",
    "remise-montant": "remise_montant",
    "totalHT-apres-remise": "total_ht_apres_remise",
    "totalTTC-apres-remise": "total_ttc_apres_remise",
    "TVA-avant-remise": "TVA_avant_remise",
    "TVA-apres-remise": "TVA_apres_remise"
}
const DefaultValuesCommandeNewFormObj = {
    uid: "",
    state: 1,
    commercial: currentUser,
    client: "Choisissez un client",
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

const InputsDisabledByDefaultCommandeNewFormArray = [
    'uid',
    "state",
    "commercial",
    "date",
    "totalHT-avant-remise",
    "TVA-avant-remise",
    "totalTTC-avant-remise",
    "totalHT-apres-remise",
    "TVA-apres-remise",
    "totalTTC-apres-remise"
];

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
    "item-uid": "Choisissez un article",
    "item-name": "",
    "item-pu": "",
    "item-quantity": "",
    "item-prix-total": "",

};

const InputsDisabledByDefaultCommandeRowItemArray = [
    "item-name",
    "item-pu",
    "item-prix-total",
    "item-num-serie"
]

var currentUser;

var counterRowItem = 1;
var typingTimer;

var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;
var myCache = {};

// start FAILURE/invalid Handler
// TODO : to refactor. to combine with grab. now, looping 2 times. make it 1.
function checkRequiredInputs(modalNode) {
    let result = [true];

    let checkingHeaders = checkRequiredInputHeaders(modalNode.querySelector("#commande-header"));
    if (!checkingHeaders[0]) {
        return checkingHeaders;
    };

    let itemRows = modalNode.querySelectorAll(".item-commande-row");
    for (let index = 0; index < itemRows.length; index++) {

        let checkingRow = checkRequiredInputItemRow(itemRows[index]);
        if (!checkingRow[0]) {
            result = checkingRow;
        }
    };

    return result;
}

function checkRequiredInputHeaders(headerContainer) {
    let result = [true];
    for (let index = 0; index < REQUIRED_INPUT_HEADERS.length; index++) {
        let myInput = headerContainer.querySelector("#" + REQUIRED_INPUT_HEADERS[index]);
        let value = getInputValue(myInput).trim();
        let test = [value.startsWith('Chois'), value == "", value == null, value == "..."];
        if (test.some((val) => val)) {
            result = [false, myInput];
            break;

        }
    }

    return result;
}

function checkRequiredInputItemRow(itemRow) {
    let result = [true];

    let requiredSet = JSON.parse(JSON.stringify(REQUIRED_STANDARD_INPUT_ITEM_ROW));
    let identifiable = itemRow.querySelector(".input.identifiable").value;
    let prixVariable = itemRow.querySelector(".input.prix-variable").value;

    if (identifiable == 1) {
        requiredSet.push("identifiable")
    }
    if (prixVariable == 1) {
        requiredSet.push("prix-variable")
    }
    for (let index = 0; index < REQUIRED_STANDARD_INPUT_ITEM_ROW.length; index++) {
        let myInput = itemRow.querySelector("#" + REQUIRED_STANDARD_INPUT_ITEM_ROW[index]);
        let value = getInputValue(myInput).trim();
        let test = [value.startsWith('Chois'), value == "", value == null, value == "...", parseInt(value) == 0];
        if (test.some((val) => val)) {
            result = [false, myInput];
            break;
        }
    };
    return result;

}

function identifyInvalidType(array_message, modal) {

    // for required
    if (!array_message[0]) {
        return inputRequired(array_message[1]);
    }
    // for numSerie problems
    if (array_message[0].includes("num serie")) {
        return invalidNumSerie(array_message[0], modal);
    }

    // for stock verification
    if (array_message[0].includes("not enough stock")) {
        return outOfStock(array_message[0].split("//")[1], modal);
    }
}

function invalidNumSerie(message, modal) {

    let msg = message.split("//");
    let tbody = modal.querySelector("#table-facture > tbody");
    let btnTargetObj = tbody.querySelectorAll("button[value=\"" + msg[1] + "\"]");


    let inputFail = btnTargetObj[btnTargetObj.length - 1].parentNode.parentNode.parentNode.parentNode.querySelector("#item-num-serie");
    inputFail.classList.add("is-invalid");

    // return "num serie double" or "num serie not available"
    return msg[0];


}

function outOfStock(item_code, modal) {
    let tbody = modal.querySelector("#table-facture > tbody");
    // let btnTarget = tbody.querySelector("button[contains(.,\"" + item_code + "\")]");
    let btnTarget = tbody.querySelector("button[value=\"" + item_code + "\"]");
    let inputFail = btnTarget.parentNode.parentNode.parentNode.parentNode.querySelector("#item-quantity");
    inputFail.classList.add("is-invalid");
    return "out-of-stock";
}

function inputRequired(inputNode) {
    inputNode.classList.add("is-invalid");
    return "required";
}
// end FAILURE/invalid Handler

function filterNumSerie(nodeListLI, term) {
    term = term.trim();
    if (term) {
        nodeListLI.forEach(LI => {
            LI.classList.remove("visually-hidden");
            if (!LI.querySelector("a").textContent.toLowerCase().includes(term)) {
                LI.classList.add("visually-hidden");
            }
        });
    }
}

function cleanDropdown(dropdownNode) {
    // TODO : replace the hard coding with the funciton in the rest of the script replace 
    let LIs = dropdownNode.querySelectorAll("li");
    LIs.forEach(LI => {
        console.log(LI.id);
        if (LI.id !== "search-container") {
            dropdownNode.removeChild(LI);
        }
    })
}





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

    let identifiablesInputs = modal.querySelectorAll("#identifiable");
    identifiablesInputs.forEach(input => {

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

function formatCLientNameSearchResult(objectData) {
    let val = objectData.uid + " - ";
    if ("client_uid" in objectData) {
        val = objectData.client_uid + " - ";
    }
    if (objectData.noms == "") {
        // console.log("client company");

        val += (objectData["raison_sociale"] || "") + " / " + (objectData["nom_commercial"] || "");
    } else if (objectData["raison_sociale"] == "") {
        // console.log("client humain");
        val += objectData.noms + " " + objectData.prenoms;
    };
    return val;
}

function addName(listNode, value, selectable, myJSON = {}) {
    console.log("addname");
    let newLi = document.createElement("li");
    newLi.classList.add("result");
    if (selectable) {
        let newA = document.createElement("a");
        newA.textContent = typeof value == "string" ? value : formatCLientNameSearchResult(value);
        newA.classList.add("dropdown-item", "fst-italic", "search-result");
        newA.setAttribute("href", "#");
        if (myJSON) {
            newA.dataset.infos = JSON.stringify(myJSON);
        }

        newLi.appendChild(newA);
    } else {
        newLi.textContent = typeof value == "string" ? value : formatCLientNameSearchResult(value);
        newLi.classList.add("fst-italic", "px-2",);
    }

    listNode.appendChild(newLi);
}

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
        let numSerie = row.querySelector("#item-num-serie").value;
        let libelle = row.querySelector("#item-libelle").value;
        let identifiable = row.querySelector("#identifiable").value;
        let stockable = row.querySelector("#stockable").value;
        data["items"].push([rowID, itemID, quantity, prixUnitaire, numSerie, libelle, identifiable, stockable]);
    });
    return data;
}


function generateRowTable(nodeModel, DataObj) {
    //MARQUE PAGE
    console.log(DataObj);

    let newNode = nodeModel.cloneNode(true);
    DataObj["num-facture"] = zeroLeftPadding(DataObj["num-facture"], 5)
    newNode.id = "row-" + DataObj["num-facture"];

    // TODO : use a dto or something
    newNode.querySelector(".num-fact.input").value = DataObj["num-facture"];
    newNode.querySelector("input.date").value = DataObj["date"];
    newNode.querySelector(".client.input").value = DataObj["client"];

    newNode.querySelector(".totalTTC.input").value = AutoNumeric.format(parseFloat(DataObj["totalTTC-apres-remise"]), defaultAutoNumericOptions);

    newNode.querySelector(".payment.input").value = DataObj["payment"] || "impayé";

    return newNode;
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
        let customMessage = "Echec de la sauvegarde de la commande.";
        // identifyInvalidType(result[1], modal);
        try {
            customMessage = ERROR_FLAG_MESSAGE_OBJ[identifyInvalidType(result[1], modal)];

        } catch (error) {
            console.log("e message : " + error);
        }
        ToastShowClosured(result[0], customMessage);
    } else {
        throw new Error("wrong value returned");
    }
    return [result[0] == "success", result[1]];
}

function generateRowAddItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);
    return newNode;
}

function fillInputsDetailsHeaders(responseJSON, modalDetailsHeaders) {
    console.log("responseJSON : ");
    console.log(responseJSON);
    valueObj = responseJSON["header"];
    // valueObj["TVA-avant-remise"] = valueObj["total_ht_avant_remise"];
    // valueObj["TVA-apres-remise"] = valueObj["total_ht_apres_remise"];

    valueObj["TVA_avant_remise"] = AutoNumeric.format(parseFloat(valueObj["total_ttc_avant_remise"]) - parseFloat(valueObj["total_ht_avant_remise"]), defaultAutoNumericOptions);
    valueObj["TVA_apres_remise"] = AutoNumeric.format(valueObj["total_ttc_apres_remise"] - valueObj["total_ht_apres_remise"], defaultAutoNumericOptions);

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
            fillClientButton(valueObj, element);
        }
        else if (element.id === "commercial") {
            element.value = valueObj["user_uid"] + "//" + valueObj["user_name"];

        } else {
            if (NUMBER_INPUT_HEADERS.includes(element.id)) {
                if (element.id === "remise-montant") {
                    AutoNumeric.getAutoNumericElement(element).update({ maximumValue: AutoNumeric.unformat(valueObj["total_ttc_avant_remise"], defaultAutoNumericOptions) });
                }
                element.value = AutoNumeric.format(valueObj[DTO_FILL_INPUT_HEADERS[element.id]], defaultAutoNumericOptions);
            } else {
                if (element.id === "date") {
                    element.value = valueObj[DTO_FILL_INPUT_HEADERS[element.id]].substring(0, 10)
                } else {

                    element.value = valueObj[DTO_FILL_INPUT_HEADERS[element.id]];
                }


            }
        }

        // console.log(element.id);
        // console.log(DTO_FILL_INPUT[element.id]);
        // console.log(valueObj[DTO_FILL_INPUT[element.id]]);

    }
}

async function addItemRowsLoop(numberOfRows, modalDetailsItemsTable) {
    for (let i = 0; i < numberOfRows; ++i) {
        console.log("counterRowItem : " + counterRowItem);
        await addItem(modalDetailsItemsTable, 'view');
        autonumericItemRow(modalDetailsItemsTable);
    }
    return new Promise((resolve, reject) => resolve(true));
}

function disableInputsAndButtons(tableNode) {
    console.log('disable this shit');
    let nodesToDisable = tableNode.querySelectorAll(".input.fillable");
    // let nodesToDisable = tableNode.querySelectorAll(".input, .btn");

    for (let index = 0; index < nodesToDisable.length; index++) {
        nodesToDisable[index].disabled = true;
    }
}



async function fillInputsDetailsItems(itemsArray, modalDetailsItemsTable) {

    let numberOfRows = itemsArray.length;
    await addItemRowsLoop(numberOfRows, modalDetailsItemsTable);
    disableInputsAndButtons(modalDetailsItemsTable);
    let rowsToFill = modalDetailsItemsTable.querySelectorAll(".item-commande-row");

    for (let j = 0; j < numberOfRows; j++) {
        fillInputsDetailsItemRow(itemsArray[j], rowsToFill[j]);

    }
}

// function fillInputsDetailsItemRow(arrayData, rowNode) {
//     const idToKey = {
//         "row-uid": "uid",
//         "item-uid": "item_uid",
//         "item-name": "item_name",
//         "num-serie": "description_item",
//         "item-pu": "prix_unitaire",
//         "item-prix-total": "prix_total",
//         "item-quantity": "quantity"
//     }
//     let inputs = rowNode.querySelectorAll(".input");
//     for (let k = 0; k < inputs.length; k++) {
//         let input = inputs[k];
//         input.value = arrayData[idToKey[input.id]];
//     }
// }

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

function addItem(tableFactureBody, mode = "new") {
    if (!["view", "new"].includes(mode)) {
        throw new Error("mode must be view or new.");
    }
    return new Promise((resolve, reject) => {
        console.log("addding item");
        if (myCache["itemRow"]) {
            // check if cached 

            console.log("from cahce");
            counterRowItem++;
            let doc = new DOMParser().parseFromString(
                myCache["itemRow"],
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");
            console.log("trModel");
            console.log(trModel);
            if (mode === "view") {
                trModel.querySelector("#btn-del-item").disabled = true;
            }
            tableFactureBody.querySelector('tbody').append(
                generateRowItem(trModel, ["", "", "", "", "", ""])
            );
            resolve(true);

        } else {
            // fetch base
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
                    myCache["itemRow"] = doc.body.innerHTML;

                    let trModel = doc.querySelector("#row-001");
                    console.log("trModel");
                    console.log(trModel);

                    if (mode === "view") {
                        trModel.querySelector("#btn-del-item").disabled = true;
                    }

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

function fillInputsDetailsItemRow(arrayData, rowNode, mode = "view") {
    if (!["view", "new"].includes(mode)) {
        throw new Error("mode must be view or new.");
    }
    console.log("arrayData");
    console.log(arrayData);
    let inputs = rowNode.querySelectorAll(".input");
    rowNode.querySelector(".input#item-num-serie").disabled = !Boolean(parseInt(arrayData["identifiable"]));
    rowNode.querySelector(".input#item-pu").disabled = !Boolean(parseInt(arrayData["prix_variable"]));

    if (mode === "new") {
        rowNode.querySelector(".input#item-quantity").value = "";
        rowNode.querySelector(".input#item-quantity").disabled = false;

        if (parseInt(arrayData["identifiable"])) {
            rowNode.querySelector(".input#item-quantity").value = 1;
            rowNode.querySelector(".input#item-quantity").disabled = true;
        }

        if (parseInt(arrayData["stockable"])) {
            AutoNumeric.getAutoNumericElement(rowNode.querySelector(".input#item-quantity")).update({ maximumValue: arrayData["stock"] });
        }
    }


    for (let k = 0; k < inputs.length; k++) {
        let input = inputs[k];
        try {
            let objectKeyArray = DTO_FILL_INPUT_ITEM_ROW.find((entrie) => entrie.inputId === input.id).objectKey;
            objectKeyArray.some(function (value) {
                let val = arrayData[value];
                console.log(input.id + " - " + val);
                if (val !== undefined) {
                    if (NUMBER_INPUT_ITEM_ROW.includes(input.id)) {
                        setInputValue(input, AutoNumeric.format(parseFloat(val), defaultAutoNumericOptions));
                    } else {
                        setInputValue(input, val);
                    }
                    return true;
                }
                return false;
            });
        } catch (err) {
            console.log("564");
            continue;
        }

    }
}

function fillClientButton(objectData, BtnNode) {
    let client = formatCLientNameSearchResult(objectData);
    setInputValue(BtnNode, client);
}

function defaultButtons(modal) {
    const refObj = {
        "modal-details": DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_DETAILS,
        'modal-main-new': DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_NEW
    };
    let btns = modal.querySelectorAll(".btn");
    btns.forEach(myBtn => {
        myBtn.disabled = refObj[modal.id][myBtn.id];
    });
}

function cleanNewForm(modal, disable = false) {
    console.log("cleaning");
    let array1 = InputsDisabledByDefaultCommandeNewFormArray.concat(InputsDisabledByDefaultCommandeRowItemArray);

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
        setInputValue(input, myValue);
    });
}

async function DefaultModalCommandInputs(modal, min_row = 1) {
    //remove other item rows
    let itemRows = modal.querySelectorAll(".item-commande-row");
    removeItemRows(itemRows);
    if (min_row != 0) {
        await addItem(modal);
        autonumericItemRow(modal);
    };
    defaultButtons(modal);
    //clean an dput to deafult value
    cleanNewForm(modal, modal.id === "modal-details");

    AutoNumeric.getAutoNumericElement(modal.querySelector("#remise-montant")).update({ maximumValue: 0 });

}


function autonumericItemRow(tableFactureBody) {
    let currentRow = tableFactureBody.querySelector("#row-" + zeroLeftPadding(counterRowItem, 3, false));
    new AutoNumeric(currentRow.querySelector("#item-pu"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric(currentRow.querySelector("#item-quantity"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
}

function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
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
    try {
        discountedMontantInput.value = AutoNumeric.format(parseFloat(AutoNumeric.unformat(baseMontantInput.value, defaultAutoNumericOptions)) - parseFloat(AutoNumeric.unformat(montantDiscount.value, defaultAutoNumericOptions)), defaultAutoNumericOptions);
    } catch (error) {
        console.log("HERE ERROR");
        discountedMontantInput.value = AutoNumeric.format(0, defaultAutoNumericOptions)
    }
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

    AutoNumeric.getAutoNumericElement(remiseMontantInput).update({ maximumValue: AutoNumeric.unformat(montantTTCAvantRemiseInput.value, defaultAutoNumericOptions) });



    tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, 1);
    totalTTCDiscountedHandler(montantTTCAvantRemiseInput, montantTTCApresRemiseInput, remiseMontantInput);
    TVAHandler(montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput, 2);
}

document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const tableFacture = document.getElementById("modal-main-new").querySelector("#table-facture");
    tableFacture
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
    const modalCommandeNew = document.getElementById("modal-main-new");
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
    const btnSaveNew = modalCommandeNew.querySelector("#btn-save-new");
    const btnCancelNew = modalCommandeNew.querySelector("#btn-cancel-new");
    const btnAddItem = modalCommandeNew.querySelector("#btn-add-item");

    ////modal facture details
    const modalFactureDetails = document.getElementById("modal-details");
    const bsModalFactureDetails = new bootstrap.Modal(modalFactureDetails, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
    //const btnSaveNew=modalCommandeNew.querySelector("#btn-save-new");
    //const btnCancelNew=modalCommandeNew.querySelector("#btn-cancel-new");
    //const btnAddItem=modalCommandeNew.querySelector("#btn-add-item");

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
            DefaultModalCommandInputs(modalCommandeNew);
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
				Vos modifications vont être enregistrées pour plus tard. (pas une facture)<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {

            let checkingRequired = checkRequiredInputs(modalCommandeNew);
            if (!checkingRequired[0]) {
                console.log("required not fulfill1");
                let errorFlag = identifyInvalidType(checkingRequired, modalCommandeNew);
                bsModalConfirmation.hide();
                ToastShowClosured("failure", ERROR_FLAG_MESSAGE_OBJ[errorFlag])
                return;
            }

            let dataModalCommandeNew = grabCommandeDataForm(modalCommandeNew);
            console.log("dataModalCommandeNew");
            console.log(dataModalCommandeNew);
            let final_output;
            saveCommandeNew(dataModalCommandeNew).then((result) => {
                if (result[0]) {
                    // insert uid of newly created commande
                    dataModalCommandeNew["header"]["num-facture"] = result[1][0];
                    dataModalCommandeNew["header"]["state"] = 1;
                    // in facture client, we dont create row if it is not creating a facture.

                    bsModalCommandeNew.hide();
                    DefaultModalCommandInputs(modalCommandeNew);
                    console.log("yes saving called");
                    final_output = false;

                } else {
                    //TODO : show error

                    // TODO : dont forget to put me in the correct place. here is just for test
                    // identifyInvalidType(result[1], modalCommandeNew);
                    final_output = true;
                }
            })
            bsModalConfirmation.hide();
            console.log("flag hh");
            return final_output;
        },
        no: () => {
            bsModalConfirmation.hide();
        },
    }

    const validateCreationObj = {
        message:
            "<h2>Votre Commande va être sauvegarder et transformer en facture.</h2><br>\
				Aucune modification ne sera possible.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {
            // TODO : to abstract reauiredchecking
            let checkingRequired = checkRequiredInputs(modalCommandeNew);
            if (!checkingRequired[0]) {
                console.log("required not fulfill1");
                let errorFlag = identifyInvalidType(checkingRequired, modalCommandeNew);
                bsModalConfirmation.hide();
                ToastShowClosured("failure", ERROR_FLAG_MESSAGE_OBJ[errorFlag])
                return;
            }
            let dataModalCommandeNew = grabCommandeDataForm(modalCommandeNew);
            dataModalCommandeNew["header"]["state"] = 2;
            console.log("dataModalCommandeNew");
            console.log(dataModalCommandeNew);
            saveCommandeNew(dataModalCommandeNew).then((result) => {
                if (result[0]) {
                    // insert uid of newly created facture client
                    console.log("result va");
                    console.log(result);
                    dataModalCommandeNew["header"]["num-facture"] = result[1][0];
                    dataModalCommandeNew["header"]["state"] = 1;
                    // console.log(dataObj);
                    // TODO : cache html

                    fetch(
                        "/elements/facts_clt/liste_facts_clt_table_001_base.html"
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
                            DefaultModalCommandInputs(modalCommandeNew);
                            bsModalConfirmation.hide();
                            console.log("yes saving called");
                            return false;
                        });
                    bsModalCommandeNew.hide();

                } else {
                    //TODO : show error
                    return true;
                }
            });
            bsModalConfirmation.hide();
        },
        no: () => {
            bsModalConfirmation.hide();
        }
    }





    //FUNCTIONS

    async function showCommandeDetails(event) {
        // TODO : refactor
        console.log("called here");

        // caching data
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
                    try {

                        let btnModify = modalFactureDetails.querySelector('#btn-modify');
                        btnModify.disabled = false;
                        if (result[1]['header']["state"] == "2") {
                            btnModify.disabled = true;
                        }
                    } catch {

                    }

                    let inputsHeader = modalFactureDetails.querySelector("#commande-header")
                    fillInputsDetailsHeaders(result[1], inputsHeader);
                    fillInputsDetailsItems(result[1]["items"], modalFactureDetails.querySelector("#table-facture"), "view");
                } else {
                    throw new Error(result);
                }
            });
    }



    function enableInputs() { }

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

    function fillItemNameAndPrice(inputCodeNode, defaultQuantityMode = 1) {
        const defaultQuantity = 1;
        const inputName = inputCodeNode.parentNode.parentNode.querySelector("#item-name");
        const inputPU = inputCodeNode.parentNode.parentNode.querySelector("#item-pu");
        const inputQuantity = inputCodeNode.parentNode.parentNode.querySelector("#item-quantity");
        const inputTotalPrice = inputCodeNode.parentNode.parentNode.querySelector("#item-prix-total");
        let valName = inputCodeNode.value;
        inputName.value = getName(valName);
        let valPU = document.getElementById("item-list").querySelector("option[value='" + valName + "']").dataset.prix;
        inputPU.value = formatNumber(valPU);
        if (defaultQuantityMode) {
            inputQuantity.value = defaultQuantity;
        }
        inputTotalPrice.value = formatNumber(valPU * inputQuantity.value)
    }

    async function searchLive(term, datalistNode, mode) {
        // term: string if client or item or nom-commercial
        // term: array if num-serie
        console.log("term");
        console.log(term);
        try {
            term = term.trim();
        } catch (error) {

        }
        if (term) {
            let search = { "client": searchClient, "item": searchItem, "num-serie": searchNumSerie }

            let inputObj = {
                "client": { uid: term, noms: term, prenoms: term, "nom-commercial": term, "raison-sociale": term },
                "item": { code: term, name: term },
                "num-serie": { code: term[0], "num-serie": term[1] },
            };
            let result = await search[mode](inputObj[mode]);
            addDatalistElement(datalistNode, result, mode, term);
        } else {
            cleanDropdown(datalistNode);
        }
        return;
    }

    function addDatalistElement(datalistNode, arrayData, mode, term = "") {
        // datalistNode.innerHTML = "";
        cleanDropdown(datalistNode);
        if ((Array.isArray(arrayData)) && (arrayData.length || arrayData[0] != undefined)) {
            console.log("array is okadddata");
            console.log(arrayData);
            arrayData.forEach(element => {
                let option_ = document.createElement("option");
                // use keys from database
                if (mode == "item") {
                    addName(datalistNode, element.code + " - " + element.name, true, element);
                    return;
                } else if (mode == "client") {
                    let val = formatCLientNameSearchResult(element);
                    addName(datalistNode, val, true, element);
                    return;
                } else if (mode == "num-serie") {
                    addName(datalistNode, element.num_serie, true);
                    return;
                }
            });
        } else {
            console.log("empty arrayy");
            addName(datalistNode, "aucun résultat pour \"" + term + "\"", false);
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

    async function searchNumSerie(inputObj) {
        console.log("searching num-serie");
        let url = "/database/select/selection_num_serie.php";
        let response = await sendData(url, inputObj);

        console.log("error?");
        console.log(response);
        let myjson = JSON.parse(response);

        return myjson;
        // return await fillMainTable(myjson, tableBodyCategorie);

    }

    //EVENTLISTENER

    // today's date
    try {
        modalCommandeNew.querySelector('#date').value = TODAY;

    } catch (error) {
        console.log("dont know what happened");
    }

    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new") {
                bsModalCommandeNew.show();
                modalCommandeNew.querySelector("#btn-save-new").disabled = true;
                modalCommandeNew.querySelector("#btn-validate-new").disabled = true;

            } else if (event.target.id == "btn-main-filter") {
                console.log("filter me");
                bsModalFilter.show();
            } else if (event.target.id == "btn-remove-filter") {
                console.log("remove filter ");
                event.target.remove();

                resetFilter();
                filterFamille(
                    { actif: "1" },
                    tableBody
                );
                defaultFilterFlag = true;
            }
        })
    } catch (error) { }

    ////modalCommandeNew event handler

    try {
        modalCommandeNew.addEventListener('input', (event) => {
            console.log("event input");
            modificationWatcher = true;
            if (event.target.classList.contains("is-invalid")) {
                event.target.classList.remove("is-invalid");
            }


            // business logic start
            if (event.target.id == "search-item") {
                // item searching with btn dropdown
                console.log("searching item 23");
                let hint = event.target.value;
                // TODO : sanitize hint
                let itemDropdown = event.target.parentNode.parentNode.parentNode;
                console.log("hint");
                console.log(hint);
                cleanDropdown(itemDropdown);
                //// START - grabing data
                clearTimeout(typingTimer);
                if (!hint.trim()) {
                    cleanDropdown(itemDropdown);
                    return;
                }
                addName(itemDropdown, "Searching for \"" + event.target.value + "\"", false);
                typingTimer = setTimeout(() => { searchLive(hint, itemDropdown, "item") }, 1500);
                //// END - grabing data
                console.log("markman");

            } else if (event.target.id == "search-num-serie") {
                console.log("searching num-serie 23");
                let numSerieDropdown = event.target.parentNode.parentNode.parentNode;
                filterNumSerie(numSerieDropdown.querySelectorAll("li.result"), event.target.value);

            } else if (event.target.id == "search-client") {
                console.log("searching client 78");

                let hint = event.target.value;
                // TODO : sanitize hint
                let clientDropdown = event.target.parentNode.parentNode.parentNode;
                cleanDropdown(clientDropdown);
                //// START - grabing data
                clearTimeout(typingTimer);
                if (!hint.trim()) {
                    cleanDropdown(clientDropdown);
                    return;
                }
                addName(clientDropdown, "Searching for \"" + event.target.value + "\"", false);
                typingTimer = setTimeout(() => { searchLive(hint, clientDropdown, "client") }, 1500);
                //// END - grabing data

            } else if (["item-quantity", "item-pu"].includes(event.target.id)) {
                console.log("update qty or pu");
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);

                if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
                    modalCommandeNew.querySelector("#btn-save-new").disabled = false;
                    modalCommandeNew.querySelector("#btn-validate-new").disabled = false;
                } else {
                    modalCommandeNew.querySelector("#btn-save-new").disabled = true;
                    modalCommandeNew.querySelector("#btn-validate-new").disabled = true;
                }
            } else if (event.target.id == 'remise-taux') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 1);
            } else if (event.target.id == 'remise-montant') {

                console.log("remise montant!");
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 2);

            }
            totalTTCDiscountedHandler(montantTTCAvantRemiseInputNew, montantTTCApresRemiseInputNew, remiseMontantInputNew);
            TVAHandler(montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, 2);

        });
    } catch (error) {
    }

    try {
        modalCommandeNew.querySelector("#new-modal-body-heads").addEventListener('click', (event) => {
            if (event.target.classList.contains("dropdown-toggle")) {
                if (event.target.classList.contains("is-invalid")) {
                    event.target.classList.remove("is-invalid");
                    modificationWatcher = true;
                }
            }

            if (event.target.classList.contains("search-result")) {
                console.log("chossed client");
                console.log(event);
                fillClientButton(JSON.parse(event.target.dataset.infos), event.target.parentNode.parentNode.parentNode.querySelector(".dropdown-toggle"));

            } else if (event.target.id === "client") {
                event.target.parentNode.querySelector("#search-client").focus();
            }
        }, true)
    } catch (error) {

    }

    try {
        tableItemsFactureNew.addEventListener('click', (event) => {
            if (event.target.classList.contains("dropdown-toggle")) {
                if (event.target.classList.contains("is-invalid")) {
                    event.target.classList.remove("is-invalid");
                    modificationWatcher = true;
                }
            }

            if (event.target.classList.contains("search-result")) {
                console.log("chossed item");
                console.log(event);
                let trNOde = event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                let dropdownNode = event.target.parentNode.parentNode;
                if (dropdownNode.id == "item-dropdown") {
                    fillInputsDetailsItemRow(JSON.parse(event.target.dataset.infos), trNOde, "new");
                    if (JSON.parse(event.target.dataset.infos)["identifiable"] == "1") {

                        searchLive([JSON.parse(event.target.dataset.infos)["code"], ''], event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#num-serie-dropdown'), "num-serie");
                    }

                    trNOde.querySelector("#item-num-serie").textContent = "...";

                    updateItemTotalPrice(trNOde);
                    const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                    updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);

                    updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);

                    if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
                        modalCommandeNew.querySelector("#btn-save-new").disabled = false;
                        modalCommandeNew.querySelector("#btn-validate-new").disabled = false;
                    } else {
                        modalCommandeNew.querySelector("#btn-save-new").disabled = true;
                        modalCommandeNew.querySelector("#btn-validate-new").disabled = true;
                    }

                } else if (dropdownNode.id == "num-serie-dropdown") {
                    setInputValue(trNOde.querySelector("#item-num-serie"), event.target.textContent);

                    updateItemTotalPrice(trNOde);
                    const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                    updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                    updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);

                    if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
                        modalCommandeNew.querySelector("#btn-save-new").disabled = false;
                        modalCommandeNew.querySelector("#btn-validate-new").disabled = false;
                    } else {
                        modalCommandeNew.querySelector("#btn-save-new").disabled = true;
                        modalCommandeNew.querySelector("#btn-validate-new").disabled = true;
                    }
                }

            } else if (event.target.id === "item-uid") {
                event.target.parentNode.querySelector("#search-item").focus();
            } else if (event.target.id == "btn-add-item") {
                addItem(tableItemsFactureNew).
                    then(() => autonumericItemRow(tableItemsFactureNew)).
                    then(() => modificationWatcher = true);
            } else if (event.target.classList.contains("btn-del")) {
                removeItem(event.target, "target");
                modificationWatcher = true;
                console.log("remove");
                updateTotalPrice(montantHTAvantRemiseInputNew, modalCommandeNew.querySelectorAll("#item-prix-total"))
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);

                if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
                    modalCommandeNew.querySelector("#btn-save-new").disabled = false;
                    modalCommandeNew.querySelector("#btn-validate-new").disabled = false;
                } else {
                    modalCommandeNew.querySelector("#btn-save-new").disabled = true;
                    modalCommandeNew.querySelector("#btn-validate-new").disabled = true;
                }
            }
        }, true)
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

    try {
        modalFactureDetails.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel") {
                bsModalFactureDetails.hide()
                DefaultModalCommandInputs(modalFactureDetails, 0);
            }
        })
    } catch (error) {

    }

    try {
        tableBody.addEventListener("click", (event) => {
            if (event.target.classList.contains('btn-details')) {
                showCommandeDetails(event);
                bsModalFactureDetails.show()
            }
        })
    } catch (error) {

    }

    ////CALCUL
    // try {
    //     modalCommandeNew.addEventListener('input', (event) => {
    //         console.log("event input");
    //         console.log(event);
    //         modificationWatcher = true;
    //         // TODO : restrict event
    //         if ((event.target.id == "item-uid") && (event.key)) {

    //         } else if ((event.target.id == "item-uid") && (!event.key)) {
    //         } else if (event.target.id == "item-quantity") {
    //             updateItemTotalPrice(event.target.parentNode.parentNode)
    //             const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
    //             updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
    //             updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
    //         } else if (event.target.id == 'remise-taux') {
    //             tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 1);
    //         } else if (event.target.id == 'remise-montant') {
    //             tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 2);

    //         }
    //         totalTTCDiscountedHandler(montantTTCAvantRemiseInputNew, montantTTCApresRemiseInputNew, remiseMontantInputNew);
    //         TVAHandler(montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, 2);
    //     })

    // } catch (error) {

    // }


    // autonumeric Listener
    new AutoNumeric.multiple(".remise-taux", [defaultAutoNumericOptions, { minimumValue: 0, maximumValue: 100 }]);
    new AutoNumeric.multiple(".remise-montant", [defaultAutoNumericOptions, { minimumValue: 0, maximumValue: 0 }]);
    new AutoNumeric.multiple(".item-pu", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".item-quantity", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".totalHT-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".TVA-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalTTC-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalHT-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".TVA-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalTTC-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])


})