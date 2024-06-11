var currentUser;
var tvaRate = { true: 0.20, false: 0 }
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
        AutoNumeric.getAutoNumericElement(remiseMontantInput).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput) })


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
        AutoNumeric.getAutoNumericElement(remiseMontantInput).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput) })


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
        //! not needed it achat cycle
        // if (parseInt(arrayData["stockable"])) {
        //     AutoNumeric.getAutoNumericElement(rowNode.querySelector(".input#item-quantity")).update({ maximumValue: arrayData["stock"] });
        // }
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
            fetch("/elements/facts_frnsr/facture_frnsr_table_details_base.html")
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



// function addItem() {
//     console.log("addding item");
//     fetch("/elements/facts_frnsr/facture_frnsr_table_details_base.html")
//         .then((response) => {
//             let tt = response.text();
//             return tt;
//         })
//         .then((txt) => {
//             // TODO : abstract this process
//             let doc = new DOMParser().parseFromString(
//                 txt,
//                 "text/html"
//             );
//             let trModel = doc.querySelector("#row-001");

//             console.log(tableFacture.querySelector('tbody'));
//             tableFacture.querySelector('tbody').append(
//                 generateRowAddItem(trModel, ["", "", "", "", "", ""])
//             );
//             // bsModalFactureNew.hide();
//             // _cleanNewForm();
//             // console.log("yes saving called");
//             return true;
//         });
// }

function autonumericItemRow(tableFactureBody) {
    let currentRow = tableFactureBody.querySelector("#row-" + zeroLeftPadding(counterRowItem, 3, false));
    new AutoNumeric(currentRow.querySelector("#item-pu"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric(currentRow.querySelector("#item-quantity"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
    new AutoNumeric(currentRow.querySelector("#item-prix-total"), [defaultAutoNumericOptions, { minimumValue: 0 }]);
}

function generateRowItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}


document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const tableFacture = document.getElementById("modal-facture-new").querySelector('#table-facture');

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

    //FUNCTIONS

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
                    updateItemRowTotalPrice(event.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                    updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                    setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                    setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                    // *update max for remiseMontantInputNew
                    AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


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


                    if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
                        modalFactureNew.querySelector("#btn-save-new").disabled = false;
                    } else {
                        modalFactureNew.querySelector("#btn-save-new").disabled = true;
                    }

                } else if (dropdownNode.id == "num-serie-dropdown") {
                    console.log("numserie dropdo called");
                    setInputValue(trNOde.querySelector("#item-num-serie"), event.target.textContent);



                    if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
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
                AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


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


                if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
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
            modificationWatcher = true;
            if (event.target.classList.contains("is-invalid")) {
                event.target.classList.remove("is-invalid");
            }


            // normal case
            // business logic start
            // TODO a deplacer dans une autre section peutetre? un eventlistener pour le liste factreu?

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

            } else if (event.target.id == "search-fournisseur") {
                // WORKING ON IT
                console.log("searching fournisseur 78");

                let hint = event.target.value;
                // TODO : sanitize hint
                let fournisseurDropdown = event.target.parentNode.parentNode.parentNode;
                cleanDropdown(fournisseurDropdown);
                //// START - grabing data
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
                updateItemRowTotalPrice(event.target.parentNode.parentNode);
                updateTotalPriceHT(montantHTAvantRemiseInputNew, modalFactureNew.querySelectorAll(".item-prix-total"));
                setInputValue(TVAAvantRemiseInputNew, calculateTva(montantHTAvantRemiseInputNew, tvaRate[tvaFlag]));
                setInputValue(montantTTCAvantRemiseInputNew, calculateTTC(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew));

                // *update max for remiseMontantInputNew
                AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


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



                if (AutoNumeric.getNumber(montantTTCApresRemiseInputNew) > 0) {
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
                AutoNumeric.getAutoNumericElement(remiseMontantInputNew).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInputNew) })


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
                bsModalFactureDetails.hide();
            }
            if (event.target.id == "btn-modify") {
                enableInputs();
            }

        })

    } catch (error) {

    }

    try {
        tableBody.addEventListener("click", (event) => {
            if (event.target.classList.contains('btn-details')) {
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