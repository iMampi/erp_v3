var counterRowItem = 1;

function setInputValue(node, value) {
    if (node.tagName == "BUTTON") {
        node.textContent = value;
    }
    return node.value = value;
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

function fillCFournisseurButton(objectData, BtnNode) {
    // TODO: too much responsability here.
    let client = formatFournisseurNameSearchResult(objectData);
    setInputValue(BtnNode, client);
}


document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const tableFacture = document.getElementById("modal-facture-new").querySelector('#table-facture');
    ////modal new
    const modalFactureNew = document.getElementById("modal-facture-new");
    const bsModalFactureNew = new bootstrap.Modal(modalFactureNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
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
    // const btnSaveNew=modalFactureNew.querySelector("#btn-save-new");
    // const btnCancelNew=modalFactureNew.querySelector("#btn-cancel-new");
    // const btnAddItem=modalFactureNew.querySelector("#btn-add-item");

    //FUNCTIONS
    function addItem() {
        console.log("addding item");
        fetch("/elements/facts_frnsr/facture_frnsr_table_details_base.html")
            .then((response) => {
                let tt = response.text();
                return tt;
            })
            .then((txt) => {
                // TODO : abstract this process
                let doc = new DOMParser().parseFromString(
                    txt,
                    "text/html"
                );
                let trModel = doc.querySelector("#row-001");

                console.log(tableFacture.querySelector('tbody'));
                tableFacture.querySelector('tbody').append(
                    generateRowAddItem(trModel, ["", "", "", "", "", ""])
                );
                // bsModalFactureNew.hide();
                // _cleanNewForm();
                // console.log("yes saving called");
                return true;
            });
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
                fillCFournisseurButton(JSON.parse(event.target.dataset.infos), event.target.parentNode.parentNode.parentNode.querySelector(".dropdown-toggle"));

            } else if (event.target.id === "fournisseur") {
                event.target.parentNode.querySelector("#search-fournisseur").focus();
            }
        }, true)
    } catch (error) {

    }

    try {
        modalCommandeNew.addEventListener('input', (event) => {
            console.log("event input");
            modificationWatcher = true;
            if (event.target.classList.contains("is-invalid")) {
                event.target.classList.remove("is-invalid");
            }


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
                typingTimer = setTimeout(() => { searchLive(hint, fournisseurDropdown, "client") }, 1500);
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
})