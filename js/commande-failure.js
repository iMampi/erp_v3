function outOfStock(item_code, modal) {
    let tbody = modal.querySelector("#table-facture > tbody");
    let btnTarget = tbody.querySelector("button[contains(.,\"" + item_code + "\")]");
    btnTarget.parentNode.parentNode.parentNode.parentNode.querySelector("#item-quantity");
}