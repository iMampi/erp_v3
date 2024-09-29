var currentUser;
var tvaRate = { true: 0.20, false: 0 }
var modeFacture = "facture";
var defaultAutoNumericOptions =
{
    decimalCharacter: ",",
    digitGroupSeparator: " ",
    watchExternalChanges: true
}
// TODO :change to  defautl from db->company profil
var tvaFlag = true;

const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');

var typingTimer;
const ToastShowClosured = showMe();

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
    "num-facture",
    "nd",
    "fournisseur",
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
    "item-quantity",
    "item-prix-total"
]

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
    "num-facture": "num_facture",
    date: "date",
    note: "libelle",
    // payment: "payment",
    nd: "state",
    "tva-flag": "tva_flag",
    "tva-variable": "tva_variable",
    "fournisseur-uid": "fournisseur_uid",
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



const DefaultValuesCommandeNewFormObj = {
    "num-facture": "",
    "facture-uid": "",
    "user-uid": currentUser,
    fournisseur: "Choisissez un fournisseur",
    nd: "0",
    date: TODAY,
    "tva-flag": 1,
    "tva-variable": 0,
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
    "item-prix-total": ""
};

const InputsDisabledByDefaultCommandeRowItemArray = [
    "item-name",
    "item-pu",
    "item-prix-total",
    "item-num-serie"
]

var counterRowItem = 1;

var modificationWatcher = false;
var myCache = {};

// start FAILURE/invalid Handler
// TODO : to refactor. to combine with grab. now, looping 2 times. make it 1.

function checkRequiredInputs(modalNode) {
    let result = [true];
    let checkingHeaders = checkRequiredInputHeaders(modalNode.querySelector("#facture-header"));

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

function updateFormOnTvaVariable(eventTargetChecked,
    modalFacture
) {
    const remiseTauxInput = modalFacture.querySelector("#remise-taux");
    const remiseMontantInput = modalFacture.querySelector("#remise-montant");

    const montantHTAvantRemiseInput = modalFacture.querySelector("#totalHT-avant-remise");
    const TVAAvantRemiseInput = modalFacture.querySelector("#TVA-avant-remise");
    const montantTTCAvantRemiseInput = modalFacture.querySelector("#totalTTC-avant-remise");

    const montantHTApresRemiseInput = modalFacture.querySelector("#totalHT-apres-remise");
    const TVAApresRemiseInput = modalFacture.querySelector("#TVA-apres-remise");
    const montantTTCApresRemiseInput = modalFacture.querySelector("#totalTTC-apres-remise");


    TVAApresRemiseInput.disabled = !eventTargetChecked;
    remiseTauxInput.disabled = eventTargetChecked;
    setInputValue(remiseTauxInput, "");
    remiseMontantInput.disabled = eventTargetChecked;
    setInputValue(remiseMontantInput, "");

    if (!eventTargetChecked) {
        // if not variable

        // *start calculating
        // *the avant remise part
        // updateItemRowTotalPrice(event.target.parentNode.parentNode);
        updateTotalPriceHT(montantHTAvantRemiseInput, modalFacture.querySelectorAll(".item-prix-total"));
        setInputValue(TVAAvantRemiseInput, calculateTva(montantHTAvantRemiseInput, tvaRate[tvaFlag]));
        setInputValue(montantTTCAvantRemiseInput, calculateTTC(montantHTAvantRemiseInput, TVAAvantRemiseInput));

        // *update max for remiseMontantInput
        setInputValue(remiseMontantInput, 0)
        if (modeFacture === "avoir") {
            AutoNumeric.getAutoNumericElement(remiseMontantInput).update(
                {
                    maximumValue: 0,
                    minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput),
                })
        } else if (modeFacture === "facture") {
            AutoNumeric.getAutoNumericElement(remiseMontantInput).update(
                {
                    maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput),
                    minimumValue: 0,

                })
        }


        // *update the remise montant
        setInputValue(remiseMontantInput,
            calculateDiscountFromRemiseTaux(remiseTauxInput, montantTTCAvantRemiseInput));
        // *the apres remise
        setInputValue(montantHTApresRemiseInput,
            (AutoNumeric.getNumber(montantTTCAvantRemiseInput) -
                AutoNumeric.getNumber(remiseMontantInput))
            / (1 + tvaRate[tvaFlag])
        )
        setInputValue(TVAApresRemiseInput,
            AutoNumeric.getNumber(montantHTApresRemiseInput) * tvaRate[tvaFlag]
        )
        setInputValue(montantTTCApresRemiseInput, calculateTTC(montantHTApresRemiseInput, TVAApresRemiseInput));
    } else {
        // *start calculating
        // *the avant remise part
        // updateItemRowTotalPrice(event.target.parentNode.parentNode);
        updateTotalPriceHT(montantHTAvantRemiseInput, modalFacture.querySelectorAll(".item-prix-total"));
        setInputValue(TVAAvantRemiseInput, calculateTva(montantHTAvantRemiseInput, tvaRate[tvaFlag]));
        setInputValue(montantTTCAvantRemiseInput, calculateTTC(montantHTAvantRemiseInput, TVAAvantRemiseInput));

        // *update max for remiseMontantInput
        setInputValue(remiseMontantInput, 0)
        if (modeFacture === "avoir") {
            AutoNumeric.getAutoNumericElement(remiseMontantInput).update(
                {
                    maximumValue: 0,
                    minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput),
                })
        } else if (modeFacture === "facture") {
            AutoNumeric.getAutoNumericElement(remiseMontantInput).update(
                {
                    maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput),
                    minimumValue: 0,

                })
        }


        // *update the remise montant
        setInputValue(remiseMontantInput,
            calculateDiscountFromRemiseTaux(remiseTauxInput, montantTTCAvantRemiseInput));
        // *the apres remise
        setInputValue(montantHTApresRemiseInput,
            (AutoNumeric.getNumber(montantTTCAvantRemiseInput) -
                AutoNumeric.getNumber(remiseMontantInput))
            / (1 + tvaRate[tvaFlag])
        )
        setInputValue(TVAApresRemiseInput,
            AutoNumeric.getNumber(montantHTApresRemiseInput) * tvaRate[tvaFlag]
        )
        setInputValue(montantTTCApresRemiseInput, calculateTTC(montantHTApresRemiseInput, TVAApresRemiseInput));
    }

}

function formatFloatsForDatabase(inputObj) {
    //TODO : to put in helpers.js
    const keysWithNumbers = ["remise-montant", "remise-taux", "totalHT-apres-remise", "totalHT-avant-remise", "totalTTC-apres-remise", "totalTTC-avant-remise"];
    let headersKeys = Object.keys(inputObj["header"])
    headersKeys.forEach(key => {
        if (keysWithNumbers.includes(key)) {
            inputObj["header"][key] = AutoNumeric.unformat(inputObj["header"][key], defaultAutoNumericOptions);
        }
    });
    inputObj["items"].forEach(row_array => {
        row_array[2] = AutoNumeric.unformat(row_array[2], defaultAutoNumericOptions);
        row_array[2] = AutoNumeric.unformat(row_array[2], defaultAutoNumericOptions);
        row_array[3] = AutoNumeric.unformat(row_array[3], defaultAutoNumericOptions);
    });
    return inputObj
}

async function saveFactureNew(inputObj) {
    console.log("saving  comande");
    formatFloatsForDatabase(inputObj);
    // console.log("data");
    // console.log(data);
    let url = "/database/save/new_facture_fournisseur.php";

    let response = await sendData(url, inputObj);

    console.log("error?");
    console.log(response);
    let result = await responseHandlerSaveFactureNew(response);
    console.log("result xx");
    console.log(result);
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
    console.log("fgrai");
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);
    return newNode;
}

function formatFournisseurNameSearchResult(objectData) {
    let val = objectData.uid + " - ";
    if ("fournisseur_uid" in objectData) {
        val = objectData.fournisseur_uid + " - ";
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
        "modal-facture-details": DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_DETAILS,
        'modal-facture-new': DEFAULT_BUTTONS_DISABLED_STATE_COMMANDE_NEW
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
    console.log("deafulting inputs");
    //remove other item rows
    let itemRows = modal.querySelectorAll(".item-commande-row");
    removeItemRows(itemRows);
    if (min_row != 0) {
        await addItem(modal);
        autonumericItemRow(modal);
    };
    defaultButtons(modal);
    //clean an dput to deafult value
    cleanNewForm(modal, modal.id === "modal-facture-details");

    AutoNumeric.getAutoNumericElement(modal.querySelector("#remise-montant")).update({ maximumValue: 0 });

}


function fillFournisseurButton(objectData, BtnNode) {
    // TODO: too much responsability here.
    let client = formatFournisseurNameSearchResult(objectData);
    setInputValue(BtnNode, client);
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


function addName(listNode, value, selectable, myJSON = {}) {
    console.log("addname");
    let newLi = document.createElement("li");
    newLi.classList.add("result");
    if (selectable) {
        let newA = document.createElement("a");
        newA.textContent = typeof value == "string" ? value : formatFournisseurNameSearchResult(value);
        newA.classList.add("dropdown-item", "fst-italic", "search-result");
        newA.setAttribute("href", "#");
        if (myJSON) {
            newA.dataset.infos = JSON.stringify(myJSON);
        }

        newLi.appendChild(newA);
    } else {
        newLi.textContent = typeof value == "string" ? value : formatFournisseurNameSearchResult(value);
        newLi.classList.add("fst-italic", "px-2",);
    }

    listNode.appendChild(newLi);
}

function grabCommandeDataForm(modal) {
    let data = { header: {}, items: [] };
    const headersName = ["user-uid", "num-facture", "facture-uid", "nd", "fournisseur", "date", "note", "magasin", "totalHT-avant-remise", "totalTTC-avant-remise", "remise-taux", "remise-montant", "totalHT-apres-remise", "totalTTC-apres-remise", "tva-flag", "tva-variable"];
    //grab only essential headers data
    //grab only essential item data
    // TODO : refactor me
    let headerInputs;
    let tableBodyRows;
    if (modal.id === "modal-facture-details") {
        headerInputs = modal.querySelector("#commande-header").querySelectorAll(".input");
        tableBodyRows = modal.querySelector("#table-facture").querySelector('tbody').querySelectorAll("tr");
    } else {
        headerInputs = modal.querySelector("#new-modal-body-heads").querySelectorAll(".input");
        tableBodyRows = modal.querySelector("#new-modal-body-table").querySelector('tbody').querySelectorAll("tr");
    }

    headerInputs.forEach(input => {
        try {
            if (headersName.includes(input.id)) {
                data["header"][input.id] = getInputValue(input);
            }
        } catch (error) {
            console.log("ehrror : " + error);
        }
    });
    data["header"]["mode"] = modeFacture;

    // console.log(tableBodyRows);
    tableBodyRows.forEach(row => {
        // console.log(row);
        let rowID = row.querySelector("#row-uid").value;
        let itemID = getInputValue(row.querySelector("#item-uid"));
        let quantity = row.querySelector("#item-quantity").value;
        let prixUnitaire = row.querySelector("#item-pu").value;
        let numSerie = row.querySelector("#item-num-serie").value;
        let libelle = row.querySelector("#item-libelle").value;
        let identifiable = row.querySelector("#identifiable").value;
        let stockable = row.querySelector("#stockable").value;
        let sortieStock = getInputValue(row.querySelector("#sortie-stock"));



        data["items"].push([rowID, itemID, quantity, prixUnitaire, numSerie, libelle, identifiable, stockable, sortieStock]);
    });
    return data;
}

async function responseHandlerSaveFactureNew(response) {
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

async function responseHandlerSelectOneFacture(response) {
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
        if (element.id === "fournisseur") {
            fillFournisseurButton(valueObj, element);
        }
        else if (element.id === "commercial") {
            element.value = valueObj["user_uid"] + "//" + valueObj["user_name"];
        } else if (["tva-flag", "tva-variable"].includes(element.id)) {
            element.checked = valueObj[DTO_FILL_INPUT_HEADERS[element.id]];

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
    }
}

function fillInputsDetailsItemRow(arrayData, rowNode, mode = "view") {
    if (!["view", "new"].includes(mode)) {
        throw new Error("mode must be view or new.");
    }
    console.log("arrayData");
    console.log(arrayData);
    let inputs = rowNode.querySelectorAll(".input");

    // rowNode.querySelector(".input#item-num-serie").disabled = !Boolean(parseInt(arrayData["identifiable"]));
    // rowNode.querySelector(".input#item-pu").disabled = !Boolean(parseInt(arrayData["prix_variable"]));

    if (mode === "new") {
        rowNode.querySelector(".input#item-num-serie").disabled = !Boolean(parseInt(arrayData["identifiable"]));
        rowNode.querySelector(".input#item-pu").disabled = false;
        rowNode.querySelector(".input#item-quantity").value = "";
        rowNode.querySelector(".input#item-quantity").disabled = false;

        if (parseInt(arrayData["identifiable"])) {
            rowNode.querySelector(".input#item-quantity").value = 1;
            rowNode.querySelector(".input#item-quantity").disabled = true;
        }


    }


    for (let k = 0; k < inputs.length; k++) {
        let input = inputs[k];
        try {
            let objectKeyArray = DTO_FILL_INPUT_ITEM_ROW.find((entrie) => entrie.inputId === input.id).objectKey;
            objectKeyArray.some(function (value) {
                let val = arrayData[value];
                // console.log(input.id + " - " + val);
                if (val !== undefined) {
                    if (mode === "new") {
                        if (!NUMBER_INPUT_ITEM_ROW.includes(input.id)) {
                            setInputValue(input, val);
                            return true;
                        }
                        return false;
                    }

                    if (NUMBER_INPUT_ITEM_ROW.includes(input.id)) {
                        // TODO : delete me. not needed anymore since autonumeric handles it now
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

function disableInputsAndButtons(tableNode) {
    console.log('disable this shit');
    let nodesToDisable = tableNode.querySelectorAll(".input.fillable");
    // let nodesToDisable = tableNode.querySelectorAll(".input, .btn");

    for (let index = 0; index < nodesToDisable.length; index++) {
        nodesToDisable[index].disabled = true;
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

async function fillInputsDetailsItems(itemsArray, modalDetailsItemsTable) {

    let numberOfRows = itemsArray.length;
    await addItemRowsLoop(numberOfRows, modalDetailsItemsTable);
    disableInputsAndButtons(modalDetailsItemsTable);
    let rowsToFill = modalDetailsItemsTable.querySelectorAll(".item-commande-row");

    for (let j = 0; j < numberOfRows; j++) {
        fillInputsDetailsItemRow(itemsArray[j], rowsToFill[j]);

    }
}

function addItem(tableFactureBody, mode = "new") {
    if (!["view", "new"].includes(mode)) {
        throw new Error("mode must be view or new.");
    }
    console.log("add roww");
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


            if (modeFacture === "facture") {
                trModel.querySelector(".td-sortie-stock").classList.add("d-none");
            } else if (modeFacture === "avoir") {
                trModel.querySelector(".td-sortie-stock").classList.remove("d-none");


            }

            if (mode === "view") {
                trModel.querySelector("#btn-del-item").disabled = true;
                trModel.querySelector("#item-pu").disabled = true;
            }
            tableFactureBody.querySelector('tbody').append(
                generateRowItem(trModel, ["", "", "", "", "", ""])
            );
            resolve(true);

        } else {
            // fetch base
            fetch("/elements/facts_frnsr/facture_frnsr_table_details_base.html")
                .then((response) =>
                    response.text()
                )
                .then((txt) => {
                    // TODO : abstract this process
                    console.log("from fetch");
                    console.log(txt);
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

                    if (modeFacture === "facture") {
                        trModel.querySelector(".td-sortie-stock").classList.add("d-none");
                    } else if (modeFacture === "avoir") {
                        trModel.querySelector(".td-sortie-stock").classList.remove("d-none");

                    }

                    if (mode === "view") {
                        trModel.querySelector("#btn-del-item").disabled = true;
                        trModel.querySelector("#item-pu").disabled = true;

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



function autonumericItemRow(tableFactureBody) {
    let currentRow = tableFactureBody.querySelector("#row-" + zeroLeftPadding(counterRowItem, 3, false));
    new AutoNumeric(currentRow.querySelector("#item-pu"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric(currentRow.querySelector("#item-quantity"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric(currentRow.querySelector("#item-prix-total"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    if (modeFacture === "avoir") {
        AutoNumeric.getAutoNumericElement(currentRow.querySelector("#item-prix-total")).update({ minimumValue: -999999999999 })
    } else if (modeFacture === "facture") {
        AutoNumeric.getAutoNumericElement(currentRow.querySelector("#item-prix-total")).update({ minimumValue: 0 })
    }
}

function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}

function switchMode(myMode, modalFacture) {
    let table = modalFacture.querySelector("#table-facture");
    if (!["avoir", "facture"].includes(myMode)) {
        throw new Error("myMode must be avoir or facture.");
    }

    modeFacture = myMode;

    // hide sortie-stock
    table.querySelectorAll(".td-sortie-stock").forEach(td => {
        if (myMode == "avoir") {
            td.classList.remove("d-none");
            console.log("show me me");
        } else {
            td.classList.add("d-none");
            console.log("hide me");
        }
    });

    table.querySelectorAll("tr .input").forEach(element => {
        console.log("here here here");

        if (element.id === "item-prix-total") {
            let _initialValue = AutoNumeric.getNumber(element);
            setInputValue(element, 0);
            if (myMode === "avoir") {
                AutoNumeric.getAutoNumericElement(element).update({ minimumValue: -999999999999 })
            } else {
                AutoNumeric.getAutoNumericElement(element).update({ minimumValue: 0 })
            }

            setInputValue(element, _initialValue * -1);
            console.log("neg this");

        } else if (element.id === "sortie-stock") {
            element.checked = true;
            console.log("check this for me");
        }
    })

    setInputValue(modalFacture.querySelector("#totalHT-avant-remise"), 0);
    setInputValue(modalFacture.querySelector("#TVA-avant-remise"), 0);
    setInputValue(modalFacture.querySelector("#totalTTC-avant-remise"), 0);
    setInputValue(modalFacture.querySelector("#totalHT-apres-remise"), 0);
    setInputValue(modalFacture.querySelector("#remise-montant"), 0);
    setInputValue(modalFacture.querySelector("#TVA-apres-remise"), 0);
    setInputValue(modalFacture.querySelector("#totalHT-avant-remise"), 0);
    setInputValue(modalFacture.querySelector("#totalTTC-apres-remise"), 0);

    if (myMode === "avoir") {
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalHT-avant-remise")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#TVA-avant-remise")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalTTC-avant-remise")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#remise-montant")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalHT-apres-remise")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#TVA-apres-remise")).update({ minimumValue: -999999999999 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalTTC-apres-remise")).update({ minimumValue: -999999999999 });

    } else {
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalHT-avant-remise")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#TVA-avant-remise")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalTTC-avant-remise")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#remise-montant")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalHT-apres-remise")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#TVA-apres-remise")).update({ minimumValue: 0 });
        AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#totalTTC-apres-remise")).update({ minimumValue: 0 });
    }


    // *start calculating
    // *the avant remise part
    // updateItemRowTotalPrice(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
    updateTotalPriceHT(modalFacture.querySelector("#totalHT-avant-remise"), modalFacture.querySelectorAll(".item-prix-total"));
    setInputValue(modalFacture.querySelector("#TVA-avant-remise"),
        calculateTva(modalFacture.querySelector("#totalHT-avant-remise"), tvaRate[tvaFlag]));
    setInputValue(
        modalFacture.querySelector("#totalTTC-avant-remise"),
        calculateTTC(modalFacture.querySelector("#totalHT-avant-remise"),
            modalFacture.querySelector("#TVA-avant-remise")));

    // *update max for remiseMontantInputNew
    // AutoNumeric.getAutoNumericElement(modalFacture.querySelector("#remise-montant")).update({ maximumValue: AutoNumeric.getNumber(modalFacture.querySelector("#totalTTC-avant-remise")) })


    // *update the remise montant
    setInputValue(modalFacture.querySelector("#remise-montant"),
        calculateDiscountFromRemiseTaux(modalFacture.querySelector("#remise-taux"),
            modalFacture.querySelector("#totalTTC-avant-remise")));

    // *the apres remise
    setInputValue(modalFacture.querySelector("#totalHT-apres-remise"),
        (AutoNumeric.getNumber(modalFacture.querySelector("#totalTTC-avant-remise")) -
            AutoNumeric.getNumber(modalFacture.querySelector("#remise-montant")))
        / (1 + tvaRate[tvaFlag])
    )
    setInputValue(modalFacture.querySelector("#TVA-apres-remise"),
        AutoNumeric.getNumber(modalFacture.querySelector("#totalHT-apres-remise")) * tvaRate[tvaFlag]
    )
    setInputValue(modalFacture.querySelector("#totalTTC-apres-remise"), calculateTTC(modalFacture.querySelector("#totalHT-apres-remise"), modalFacture.querySelector("#TVA-apres-remise")));
}


document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const tableFacture = document.getElementById("modal-facture-new").querySelector('#new-modal-body-table');

    //modal confirmation
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

    //#modal new
    const modalFactureNew = document.getElementById("modal-facture-new");
    const bsModalFactureNew = new bootstrap.Modal(modalFactureNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

    const tableItemsFactureNew = modalFactureNew.querySelector("#table-facture");
    const remiseTauxInputNew = modalFactureNew.querySelector("#remise-taux");
    const remiseMontantInputNew = modalFactureNew.querySelector("#remise-montant");
    const montantHTAvantRemiseInputNew = modalFactureNew.querySelector("#totalHT-avant-remise");
    const montantHTApresRemiseInputNew = modalFactureNew.querySelector("#totalHT-apres-remise");
    const TVAAvantRemiseInputNew = modalFactureNew.querySelector("#TVA-avant-remise");
    const TVAApresRemiseInputNew = modalFactureNew.querySelector("#TVA-apres-remise");
    const montantTTCAvantRemiseInputNew = modalFactureNew.querySelector("#totalTTC-avant-remise");
    const montantTTCApresRemiseInputNew = modalFactureNew.querySelector("#totalTTC-apres-remise");
    const tvaFlagCheckboxNew = modalFactureNew.querySelector("#tva-flag");
    const tvaVariableCheckboxNew = modalFactureNew.querySelector("#tva-variable");


    const btnSaveNew = modalFactureNew.querySelector("#btn-save-new");
    const btnCancelNew = modalFactureNew.querySelector("#btn-cancel-new");
    const btnAddItem = modalFactureNew.querySelector("#btn-add-item");

    ////modal facture details
    const modalFactureDetails = document.getElementById("modal-facture-details");
    const bsModalFactureDetails = new bootstrap.Modal(modalFactureDetails, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });

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
            bsModalFactureNew.hide();
            DefaultModalCommandInputs(modalFactureNew);
            bsModalConfirmation.hide();
            modificationWatcher = false;
        },
        no: () => {
            bsModalConfirmation.hide();
        },
    };

    const saveCreationObj = {
        message:
            "<h2>La facture fournisseur va être sauvegardé et transformer en facture.</h2><br>\
				Aucune modification ne sera possible.<br>\
				Êtes vous sûr de vouloir sauvegarder vos modifications?",
        yes: () => {
            // TODO : to abstract reauiredchecking
            let checkingRequired = checkRequiredInputs(modalFactureNew);
            if (!checkingRequired[0]) {
                console.log("required not fulfill1");
                let errorFlag = identifyInvalidType(checkingRequired, modalFactureNew);
                bsModalConfirmation.hide();
                ToastShowClosured("failure", ERROR_FLAG_MESSAGE_OBJ[errorFlag])
                return;
            }
            let dataModalNew = grabCommandeDataForm(modalFactureNew);
            console.log("dataModalNew");
            console.log(dataModalNew);
            saveFactureNew(dataModalNew).then((result) => {
                if (result[0]) {
                    // insert uid of newly created facture client
                    console.log("result va");
                    console.log(result);
                    dataModalNew["header"]["num-facture"] = result[1][0];
                    dataModalNew["header"]["state"] = 1;
                    // console.log(dataObj);
                    // TODO : cache html

                    fetch(
                        "/elements/facts_frnsr/facture_frnsr_table_details_base.html"
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
                                generateRowTable(trModel, dataModalNew["header"])
                            );
                            bsModalFactureNew.hide();
                            DefaultModalCommandInputs(modalFactureNew);
                            bsModalConfirmation.hide();
                            console.log("yes saving called");
                            return false;
                        });
                    bsModalFactureNew.hide();

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



    async function showFactureDetails(event) {
        // TODO : refactor
        console.log("called here");

        // caching data
        let parent = event.target.parentNode.parentNode;
        // console.log("parent");
        // console.log(parent);
        let myuid = parent.querySelector(".input.facture-uid").value;
        // console.log("myuid tr");
        // console.log(myuid);
        // console.log("num-fact tr");
        // console.log(parent.querySelector(".input.num-fact").value);

        sendData("/database/select/one_facture_fournisseur_details.php", {
            "facture-uid": myuid
        })
            .then((resp) => {
                console.log("shwodetail :");
                console.log(resp);
                return responseHandlerSelectOneFacture(resp);
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

                    let inputsHeader = modalFactureDetails.querySelector("#modal-body-heads")
                    fillInputsDetailsHeaders(result[1], inputsHeader);
                    fillInputsDetailsItems(result[1]["items"], modalFactureDetails.querySelector("#table-facture"), "view");
                } else {
                    throw new Error(result);
                }
            });
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
                } else if (["client", "fournisseur"].includes(mode)) {
                    let val = formatFournisseurNameSearchResult(element);
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

    async function searchFournisseur(inputObj) {
        console.log("searching fournisseur");
        let url = "/database/select/selection_fournisseurs.php";
        let response = await sendData(url, inputObj);

        console.log("error?");
        console.log(response);
        let myjson = JSON.parse(response);
        console.log(myjson);

        return myjson;
        // return await fillMainTable(myjson, tableBodyCategorie);

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
            let search = { "client": searchClient, "item": searchItem, "num-serie": searchNumSerie, "fournisseur": searchFournisseur }

            let inputObj = {
                "client": { uid: term, noms: term, prenoms: term, "nom-commercial": term, "raison-sociale": term },
                "fournisseur": { uid: term, noms: term, prenoms: term, "nom-commercial": term, "raison-sociale": term },
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




    function removeItem(target) {
        console.log("remove me");
        let rowId = target.parentNode.parentNode.remove();

    }

    function enableInputs() { }


    //EVENTLISTENER
    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new") {
                bsModalFactureNew.show();
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

    // TODO TO REWRITE per part of the modal
    // try {
    //     modalFactureNew.addEventListener('click', (event) => {
    //         console.log(event.target);
    //         if (event.target.id == "btn-add-item") {
    //             console.log("clieckd add item");
    //             counterRowItem++;
    //             addItem();
    //         }
    //         if (event.target.classList.contains("btn-del")) {
    //             removeItem(event.target);
    //         }
    //         if (event.target.id == "btn-cancel") {
    //             bsModalFactureNew.hide();
    //         }

    //     })

    // } catch (error) {

    // }

    try {
        modalFactureNew.querySelector("#new-modal-body-heads").addEventListener('click', (event) => {
            if (event.target.classList.contains("dropdown-toggle")) {
                if (event.target.classList.contains("is-invalid")) {
                    event.target.classList.remove("is-invalid");
                    modificationWatcher = true;
                }
            }

            if (event.target.classList.contains("search-result")) {
                console.log("chossed founisseur");
                console.log(event);
                fillFournisseurButton(JSON.parse(event.target.dataset.infos), event.target.parentNode.parentNode.parentNode.querySelector(".dropdown-toggle"));

            } else if (event.target.id === "fournisseur") {
                event.target.parentNode.querySelector("#search-fournisseur").focus();
            }
        }, true);
    } catch (error) {

    }


    try {
        modalFactureNew.querySelector("#modal-footer-new")
            .addEventListener('click', (event) => {
                if (event.target.id === "btn-cancel-new") {
                    console.log("cancel cliekede");
                    if (modificationWatcher) {
                        openModalConfirmation(
                            confirmationObj,
                            cancelCreationObj
                        );
                    } else {
                        bsModalFactureNew.hide();
                        defaultButtons(modalFactureNew)
                    }
                } else if (event.target.id === "btn-save-new") {
                    console.log("saving cliekede");

                    if (modificationWatcher) {
                        openModalConfirmation(
                            confirmationObj,
                            saveCreationObj
                        );
                    } else {
                        bsModalFactureNew.hide();
                    }

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
                    console.log("item are here called");
                    fillInputsDetailsItemRow(JSON.parse(event.target.dataset.infos), trNOde, "new");
                    //! no need to autofill num - serie for cycle achat
                    // if (JSON.parse(event.target.dataset.infos)["identifiable"] == "1") {
                    //     searchLive([JSON.parse(event.target.dataset.infos)["code"], ''], event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('#num-serie-dropdown'), "num-serie");
                    // }
                    // trNOde.querySelector("#item-num-serie").textContent = "...";

                    // *start calculating
                    // *the avant remise part
                    let positive = true;
                    if (modeFacture === "avoir") {
                        positive = false;
                        AutoNumeric.getAutoNumericElement(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#item-prix-total")).update({ minimumValue: -999999999999 })
                    } else if (modeFacture === "avoir") {
                        AutoNumeric.getAutoNumericElement(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector("#item-prix-total")).update({ minimumValue: 0 })
                    }
                    updateItemRowTotalPrice(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, positive);
                    updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                    setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                    setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                    // *update max for remiseMontantInputNew
                    setInputValue(remiseMontantInputNew, 0)
                    if (modeFacture === "avoir") {
                        AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                            {
                                maximumValue: 0,
                                minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                            })
                    } else if (modeFacture === "facture") {
                        AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                            {
                                maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                                minimumValue: 0,

                            })
                    }


                    // *update the remise montant
                    setInputValue(remiseMontantInputNew,
                        calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));

                    // *the apres remise
                    setInputValue(montantHTApresRemiseInputNew,
                        (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                            AutoNumeric.getNumber(remiseMontantInputNew))
                        / (1 + tvaRate[tvaFlag])
                    )
                    setInputValue(TVAApresRemiseInputNew,
                        AutoNumeric.getNumber(montantHTApresRemiseInputNew) * tvaRate[tvaFlag]
                    )
                    setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));

                    // TODO : deal with the fact that when mode is avoir, the total ttc will be negeative
                    let testTotal = {
                        "facture": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0),
                        "avoir": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) < 0)
                    };
                    if (testTotal[modeFacture]) {
                        modalFactureNew.querySelector("#btn-save-new").disabled = false;
                    } else {
                        modalFactureNew.querySelector("#btn-save-new").disabled = true;
                    }

                } else if (dropdownNode.id == "num-serie-dropdown") {
                    console.log("numserie dropdo called");
                    setInputValue(trNOde.querySelector("#item-num-serie"), event.target.textContent);



                    let testTotal = {
                        "facture": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0),
                        "avoir": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) < 0)
                    };
                    if (testTotal[modeFacture]) {
                        modalFactureNew.querySelector("#btn-save-new").disabled = false;
                        modalFactureNew.querySelector("#btn-validate-new").disabled = false;
                    } else {
                        modalFactureNew.querySelector("#btn-save-new").disabled = true;
                        modalFactureNew.querySelector("#btn-validate-new").disabled = true;
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

                // *start calculating
                // *the avant remise part
                // updateItemRowTotalPrice(event.target.parentNode.parentNode);
                updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                // *update max for remiseMontantInputNew
                setInputValue(remiseMontantInputNew, 0)
                if (modeFacture === "avoir") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: 0,
                            minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                        })
                } else if (modeFacture === "facture") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                            minimumValue: 0,

                        })
                }


                // *update the remise montant
                setInputValue(remiseMontantInputNew,
                    calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));

                // *the apres remise
                setInputValue(montantHTApresRemiseInputNew,
                    (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                        AutoNumeric.getNumber(remiseMontantInputNew))
                    / (1 + tvaRate[tvaFlag])
                )
                setInputValue(TVAApresRemiseInputNew,
                    AutoNumeric.getNumber(montantHTApresRemiseInputNew) * tvaRate[tvaFlag]
                )
                setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));


                let testTotal = {
                    "facture": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0),
                    "avoir": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) < 0)
                };
                if (testTotal[modeFacture]) {
                    modalFactureNew.querySelector("#btn-save-new").disabled = false;
                    // modalFactureNew.querySelector("#btn-validate-new").disabled = false;
                } else {
                    modalFactureNew.querySelector("#btn-save-new").disabled = true;
                    // modalFactureNew.querySelector("#btn-validate-new").disabled = true;
                }
            }
        }, true)
    } catch (error) {

    }

    try {
        modalFactureNew.addEventListener('input', (event) => {
            console.log("event input");
            console.log(event);
            modificationWatcher = true;
            if (event.target.classList.contains("is-invalid")) {
                event.target.classList.remove("is-invalid");
            }


            // normal case
            // business logic start
            // TODO a deplacer dans une autre section peutetre? un eventlistener pour le liste factreu?

            if (["mode-facture", "mode-avoir"].includes(event.target.id)) {

                console.log("switch facture-avoir");
                console.log(event.target.value);
                switchMode(event.target.value, modalFactureNew);

            } else if (event.target.id == "search-item") {
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

            } else if (event.target.id == "search-fournisseur") {
                // WORKING ON IT
                console.log("searching fournisseur 78");

                let hint = event.target.value;
                // TODO : sanitize hint
                let fournisseurDropdown = event.target.parentNode.parentNode.parentNode;
                cleanDropdown(fournisseurDropdown);
                //* START - grabing data
                clearTimeout(typingTimer);
                if (!hint.trim()) {
                    cleanDropdown(fournisseurDropdown);
                    return;
                }
                addName(fournisseurDropdown, "Searching for \"" + event.target.value + "\"", false);
                typingTimer = setTimeout(() => { searchLive(hint, fournisseurDropdown, "fournisseur") }, 1500);
                // END - grabing data

            } else if (["item-quantity", "item-pu"].includes(event.target.id)) {
                console.log("update qty or pu");
                // *cache remise montant and reset it
                let cacheMontantRemise = AutoNumeric.getNumber(remiseMontantInputNew);
                setInputValue(remiseMontantInputNew, 0);

                // *start calculating
                // *the avant remise part
                let positive = true;
                if (modeFacture === "avoir") {
                    positive = false;
                    AutoNumeric.getAutoNumericElement(event.target.parentNode.parentNode.querySelector("#item-prix-total")).update({ minimumValue: -999999999999 })

                } else if (modeFacture === "facture") {
                    AutoNumeric.getAutoNumericElement(event.target.parentNode.parentNode.querySelector("#item-prix-total")).update({ minimumValue: 0 })

                }
                updateItemRowTotalPrice(event.target.parentNode.parentNode, positive);
                updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                // *update max for remiseMontantInputNew
                setInputValue(remiseMontantInputNew, 0)
                if (modeFacture === "avoir") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: 0,
                            minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                        })
                } else if (modeFacture === "facture") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                            minimumValue: 0,

                        })
                }


                // *update the remise montant
                setInputValue(remiseMontantInputNew,
                    calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));

                // *the apres remise
                setInputValue(montantHTApresRemiseInputNew,
                    (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                        AutoNumeric.getNumber(remiseMontantInputNew))
                    / (1 + tvaRate[tvaFlag])
                )
                setInputValue(TVAApresRemiseInputNew,
                    AutoNumeric.getNumber(montantHTApresRemiseInputNew) * tvaRate[tvaFlag]
                )
                setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));



                let testTotal = {
                    "facture": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0),
                    "avoir": (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) < 0)
                };
                if (testTotal[modeFacture]) {
                    modalFactureNew.querySelector("#btn-save-new").disabled = false;
                } else {
                    modalFactureNew.querySelector("#btn-save-new").disabled = true;
                }

            } else if (event.target.id == 'remise-taux') {
                console.log("remise taux!");
                updateDiscountFromRemiseTaux(remiseTauxInputNew, remiseMontantInputNew, montantTTCAvantRemiseInputNew);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, tvaRate[tvaFlag]);

            } else if (event.target.id == 'remise-montant') {

                console.log("remise montant!");
                updateDiscountFromRemiseMontant(remiseTauxInputNew, remiseMontantInputNew, montantTTCAvantRemiseInputNew);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, tvaRate[tvaFlag]);


            } else if (event.target.id == 'tva-flag') {
                console.log("tva flag here");
                tvaFlag = event.target.checked;
                tvaVariableCheckboxNew.disabled = !event.target.checked;
                if (!event.target.checked) {
                    tvaVariableCheckboxNew.checked = event.target.checked;
                    TVAApresRemiseInputNew.disabled = !event.target.checked;
                    remiseTauxInputNew.disabled = event.target.checked;
                    remiseMontantInputNew.disabled = event.target.checked;

                }
                // *start calculating
                // *the avant remise part
                // updateItemRowTotalPrice(event.target.parentNode.parentNode);
                updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                // *update max for remiseMontantInputNew
                setInputValue(remiseMontantInputNew, 0)
                if (modeFacture === "avoir") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: 0,
                            minimumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                        })
                } else if (modeFacture === "facture") {
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update(
                        {
                            maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew),
                            minimumValue: 0,

                        })
                }



                // *update the remise montant
                setInputValue(remiseMontantInputNew,
                    calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));

                // *the apres remise
                setInputValue(montantHTApresRemiseInputNew,
                    (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                        AutoNumeric.getNumber(remiseMontantInputNew))
                    / (1 + tvaRate[tvaFlag])
                )
                setInputValue(TVAApresRemiseInputNew,
                    AutoNumeric.getNumber(montantHTApresRemiseInputNew) * tvaRate[tvaFlag]
                )
                setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));

            } else if (event.target.id == 'tva-variable') {

                updateFormOnTvaVariable(event.target.checked, modalFactureNew);
                // TVAApresRemiseInputNew.disabled = !event.target.checked;
                // remiseTauxInputNew.disabled = event.target.checked;
                // setInputValue(remiseTauxInputNew, "");
                // remiseMontantInputNew.disabled = event.target.checked;
                // setInputValue(remiseMontantInputNew, "");

                // if (!event.target.checked) {
                //     // if not variable

                //     // *start calculating
                //     // *the avant remise part
                //     // updateItemRowTotalPrice(event.target.parentNode.parentNode);
                //     updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                //     setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                //     setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                //     // *update max for remiseMontantInputNew
                //     AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


                //     // *update the remise montant
                //     setInputValue(remiseMontantInputNew,
                //         calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));
                //     // *the apres remise
                //     setInputValue(montantHTApresRemiseInputNew,
                //         (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                //             AutoNumeric.getNumber(remiseMontantInputNew))
                //         / (1 + tvaRate[tvaFlag])
                //     )
                //     setInputValue(TVAApresRemiseInputNew,
                //         AutoNumeric.getNumber(montantHTAvantRemiseInputNew) * tvaRate[tvaFlag]
                //     )
                //     setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));
                // } else {
                //     // *start calculating
                //     // *the avant remise part
                //     // updateItemRowTotalPrice(event.target.parentNode.parentNode);
                //     updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                //     setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                //     setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                //     // *update max for remiseMontantInputNew
                //     AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


                //     // *update the remise montant
                //     setInputValue(remiseMontantInputNew,
                //         calculateDiscountFromRemiseTaux(remiseTauxInputNew, montantTTCAvantRemiseInputNew));
                //     // *the apres remise
                //     setInputValue(montantHTApresRemiseInputNew,
                //         (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                //             AutoNumeric.getNumber(remiseMontantInputNew))
                //         / (1 + tvaRate[tvaFlag])
                //     )
                //     setInputValue(TVAApresRemiseInputNew,
                //         AutoNumeric.getNumber(montantHTAvantRemiseInputNew) * tvaRate[tvaFlag]
                //     )
                //     setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));
                // }


            } else if (event.target.id == 'TVA-apres-remise') {


                // *the apres remise
                // setInputValue(montantHTApresRemiseInputNew,
                //     (AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) -
                //         AutoNumeric.getNumber(remiseMontantInputNew))
                //     / (1 + tvaRate[tvaFlag])
                // )
                // setInputValue(TVAApresRemiseInputNew,
                //     AutoNumeric.getNumber(montantHTAvantRemiseInputNew) * tvaRate[tvaFlag]
                // )
                setInputValue(montantTTCApresRemiseInputNew, calculateTTC(montantHTApresRemiseInputNew, TVAApresRemiseInputNew));

            }

            if (['remise-montant', "remise-taux"].includes(event.target.id)) {
            } else if (['TVA-apres-remise'].includes(event.target.id)) {

            } else {
            }

        });
    } catch (error) {
    }

    try {
        modalFactureDetails.addEventListener('click', (event) => {
            if (event.target.id == "btn-cancel") {
                console.log("canceling details");
                bsModalFactureDetails.hide();
                DefaultModalCommandInputs(modalFactureDetails, 0);
            }
            if (event.target.id == "btn-modify") {
                enableInputs();
            }

        })

    } catch (error) {
        console.log("bb error");
        console.log(error);
    }

    try {
        tableBody.addEventListener("click", (event) => {
            if (event.target.classList.contains('btn-details')) {
                showFactureDetails(event);
                bsModalFactureDetails.show()
            }
        })
    } catch (error) {

    }

    // autonumeric Listener
    new AutoNumeric.multiple(".remise-taux", [defaultAutoNumericOptions, { minimumValue: 0, maximumValue: 100 }]);
    // new AutoNumeric.multiple(".remise-montant", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".remise-montant", [defaultAutoNumericOptions, { minimumValue: 0, maximumValue: 0 }]);
    new AutoNumeric.multiple(".item-pu", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".item-quantity", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".item-prix-total", [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric.multiple(".totalHT-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".TVA-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalTTC-avant-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalHT-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".TVA-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])
    new AutoNumeric.multiple(".totalTTC-apres-remise", [defaultAutoNumericOptions, { minimumValue: 0 }])




})