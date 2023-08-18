var counterRowItem = 1;
var modificationWatcher = false;

function generateRowAddItem(nodeModel, DataObj) {
    // console.log(DataObj);
    let newNode = nodeModel.cloneNode(true);
    newNode.id = "row-" + zeroLeftPadding(counterRowItem, 3, false);

    return newNode;
}
document.addEventListener("DOMContentLoaded", () => {
    //CACHING ELEMENTS
    const divBtns = document.getElementById("div-btns");
    const tableBody = document.getElementById("ze-tbody");
    const tableFacture = document.getElementById("modal-commande-new").querySelector("#table-facture");
    tableFacture
    ////modal new
    const modalCommandeNew = document.getElementById("modal-commande-new");
    const bsModalNew = new bootstrap.Modal(modalCommandeNew, {
        backdrop: "static",
        keyboard: false,
        focus: true,
    });
    const btnSaveNew = modalCommandeNew.querySelector("#btn-save-new");
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
    function addItem() {
        console.log("addding item");
        fetch("/elements/facts_clt/facture_clt_table_details_base.html")
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
                console.log("trModel");
                console.log(trModel);

                tableFacture.querySelector('tbody').append(
                    generateRowAddItem(trModel, ["", "", "", "", "", ""])
                );
                // bsModalNew.hide();
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

                bsModalNew.show();
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

    try {
        modalCommandeNew.addEventListener('click', (event) => {
            if (event.target.id == "btn-add-item") {
                counterRowItem++;
                addItem();
            }
            if (event.target.classList.contains("btn-del")) {
                removeItem(event.target);
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
            }
        });
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
})