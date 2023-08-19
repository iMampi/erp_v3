const TODAY = luxon.DateTime.now().toFormat('yyyy-MM-dd');

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
    "item-uid": "",
    "item-name": "",
    "num-serie": "",
    "item-pu": "",
    "item-quantity": "",
    "item-prix-total": ""
};

const InputsDisabledByDefaultCommandeRowItemArray = [
    "item-name",
    "item-pu",
    "item-prix-total"
]

var currentUser;

var counterRowItem = 1;
var typingTimer;

var modificationWatcher = false;
const ToastShowClosured = showMe();
var defaultFilterFlag = true;
var listDOM = {};

function generateRowAddItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);
    return newNode;
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
    const tableFacture = document.getElementById("modal-commande-new").querySelector("#table-facture");
    tableFacture
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
    currentUser = modalCommandeNew.querySelector("#commercial").value; const btnSaveNew = modalCommandeNew.querySelector("#btn-save-new");
    const btnCancelNew = modalCommandeNew.querySelector("#btn-cancel-new");
    const btnAddItem = modalCommandeNew.querySelector("#btn-add-item");

    ////modal facture details
    // const modalFactureDetails = document.getElementById("modal-facture-details");
    // const bsModalFactureDetails = new bootstrap.Modal(modalFactureDetails, {
    //     backdrop: "static",
    //     keyboard: false,
    //     focus: true,
    // });
    // const btnSaveNew=modalCommandeNew.querySelector("#btn-save-new");
    // const btnCancelNew=modalCommandeNew.querySelector("#btn-cancel-new");
    // const btnAddItem=modalCommandeNew.querySelector("#btn-add-item");

    //FUNCTIONS




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

    //EVENTLISTENER
    try {
        divBtns.addEventListener('click', (event) => {
            if (event.target.id == "btn-main-new") {

                bsModalCommandeNew.show();
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
                console.log("item selected 26");
                let val = event.target.value;
                console.log(getName(val));
                if (event.target.parentNode.parentNode.querySelector("#item-quantity").value > 0) {
                    fillItemNameAndPrice(event.target, 0);
                } else {
                    fillItemNameAndPrice(event.target, 1);
                }
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
        console.log("err 011 " + error);
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

    ////CALCUL
    try {
        modalCommandeNew.addEventListener('input', (event) => {
            console.log("event input");
            console.log(event);
            modificationWatcher = true;
            // TODO : restrict event
            if ((event.target.id == "item-uid") && (event.key)) {

            } else if ((event.target.id == "item-uid") && (!event.key)) {
            } else if (event.target.id == "item-quantity") {
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs = modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInputNew, itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInputNew, TVAAvantRemiseInputNew, montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew);
            } else if (event.target.id == 'remise-taux') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 1);
            } else if (event.target.id == 'remise-montant') {
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInputNew, remiseTauxInputNew, remiseMontantInputNew, 2);

            }
            totalTTCDiscountedHandler(montantTTCAvantRemiseInputNew, montantTTCApresRemiseInputNew, remiseMontantInputNew);
            TVAHandler(montantHTApresRemiseInputNew, TVAApresRemiseInputNew, montantTTCApresRemiseInputNew, 2);
        })

    } catch (error) {

    }
})