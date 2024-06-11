function calculateTva(htinput, rate) {
    /**
     * 
     */
    return AutoNumeric.getNumber(htinput) * rate;
}

function calculateTTC(htinput, tvainput) {
    return AutoNumeric.getNumber(htinput) + AutoNumeric.getNumber(tvainput)
}

function calculateDiscountFromRemiseTaux(remisetauxinput, ttcavantremiseinput) {
    return (AutoNumeric.getNumber(remisetauxinput) / 100) * AutoNumeric.getNumber(ttcavantremiseinput)
}

function calculateDiscountFromRemiseMontant(remisemontantinput, ttcavantremiseinput) {
    return AutoNumeric.getNumber(remisemontantinput) / AutoNumeric.getNumber(ttcavantremiseinput);
}

function calculateItemRowTotalPrice(rowNode) {
    console.log("calc TotalPrice for a row");

    const price = AutoNumeric.getNumber(rowNode.querySelector("#item-pu"));
    const quantity = AutoNumeric.getNumber(rowNode.querySelector("#item-quantity"));

    return price * quantity;
}

function calculateTotalPriceHT(ItemTotalPriceListNode) {
    console.log("calc TotalPrice for all");
    const pricesRaw = [];
    ItemTotalPriceListNode.forEach(element => {
        pricesRaw.push(AutoNumeric.getNumber(element));
    });
    return pricesRaw.reduce((partialSum, a) => partialSum + formatedNumberToFloat(a), 0);
}


function updateDiscountFromRemiseTaux(remisetauxinput, remisemontantinput, ttcavantremiseinput) {
    let remiseMontant = calculateDiscountFromRemiseTaux(remisetauxinput, ttcavantremiseinput);
    remisemontantinput.value = AutoNumeric.format(remiseMontant, defaultAutoNumericOptions);
}

function updateDiscountFromRemiseMontant(remisetauxinput, remisemontantinput, ttcavantremiseinput) {
    let remiseTaux = calculateDiscountFromRemiseMontant(remisemontantinput, ttcavantremiseinput);
    // AutoNumeric.getAutoNumericElement(remisemontantinput).update({ maximumValue: AutoNumeric.getNumber(ttcavantremiseinput) })
    remisetauxinput.value = AutoNumeric.format(remiseTaux * 100, defaultAutoNumericOptions);
}


function updateItemRowTotalPrice(rowNode) {
    setInputValue(rowNode.querySelector("#item-prix-total"), AutoNumeric.format(
        calculateItemRowTotalPrice(rowNode),
        defaultAutoNumericOptions));

}


function updateTotalPriceHT(montantHTAvantRemiseInput, ItemTotalPriceListNode) {
    console.log("update TotalPrice for all");
    montantHTAvantRemiseInput.value = AutoNumeric.format(calculateTotalPriceHT(ItemTotalPriceListNode),
        defaultAutoNumericOptions);
    return;
}

function updateAllHeaderPrices(montantHTAvantRemiseInput, TVAAvantRemiseInput, montantTTCAvantRemiseInput, remiseTauxInput, remiseMontantInput, montantHTApresRemiseInput, TVAApresRemiseInput, montantTTCApresRemiseInput, tvaRate) {
    console.log("CACLLESD T");
    // AutoNumeric.getAutoNumericElement(remiseMontantInput).update({ maximumValue: AutoNumeric.getNumber(montantTTCAvantRemiseInput) });
    // normal case
    let tvaAvantRemise = calculateTva(montantHTAvantRemiseInput, tvaRate);

    TVAAvantRemiseInput.value = AutoNumeric.format(tvaAvantRemise,
        defaultAutoNumericOptions);

    montantTTCAvantRemiseInput.value = AutoNumeric.format(
        AutoNumeric.getNumber(montantHTAvantRemiseInput) + tvaAvantRemise,
        defaultAutoNumericOptions);

    // FIX ME
    // AutoNumeric.getAutoNumericElement(remiseMontantInput).update({ maximumValue: AutoNumeric.unformat(montantTTCAvantRemiseInput.value, defaultAutoNumericOptions) });


    let montantBruteTTCApresRemise = AutoNumeric.getNumber(montantTTCAvantRemiseInput) - AutoNumeric.getNumber(remiseMontantInput);
    let montantHTApresRemise = montantBruteTTCApresRemise / (1 + tvaRate);

    montantHTApresRemiseInput.value = AutoNumeric.format(montantHTApresRemise,
        defaultAutoNumericOptions
    )

    let TVAApresRemise = calculateTva(montantHTApresRemiseInput, tvaRate);

    TVAApresRemiseInput.value = AutoNumeric.format(TVAApresRemise, defaultAutoNumericOptions)

    montantTTCApresRemiseInput.value = AutoNumeric.format(montantHTApresRemise + TVAApresRemise, defaultAutoNumericOptions)






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


// calculate of an event
// update the rest