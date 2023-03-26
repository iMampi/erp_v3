var counterRowItem=1;
function generateRowAddItem(nodeModel, DataObj) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(counterRowItem, 3, false);
	
	return newNode;
}

function tauxAndMontantDiscountInputHandler(baseMontantInput,tauxInput,montantInput,mode){
    let baseMontant=formatedNumberToFloat(baseMontantInput.value);
    if (mode==1){
        montantInput.value=baseMontant*formatedNumberToFloat( tauxInput.value)/100||0;
    } else if (mode==2){


        tauxInput.value= formatedNumberToFloat( montantInput.value)/formatedNumberToFloat( baseMontant)*100||0;
    }
}

function totalTTCDiscountedHandler(baseMontantInput,discountedMontantInput,montantDiscount){
    discountedMontantInput.value=formatNumber(formatedNumberToFloat(baseMontantInput.value)-formatedNumberToFloat(montantDiscount.value))
}

function TVAHandler(discountedMontantInput,TVAInput,TotalTTCInput,mode) {
    // Handles TVA and total update
    // NOTE : mode = 1: ht to ttc;mode = 2: ttc to ht;
    if (mode==1){

        let TVA=formatedNumberToFloat(discountedMontantInput.value)*0.20;
        TVAInput.value=formatNumber( TVA);
        TotalTTCInput.value=formatNumber(formatedNumberToFloat(discountedMontantInput.value)+TVA);
    }else if (mode==2){
        let HT=formatedNumberToFloat(TotalTTCInput.value)/1.2;
        discountedMontantInput.value=formatNumber( HT);
        TVAInput.value=formatNumber( formatedNumberToFloat(TotalTTCInput.value)-HT);

    }else{

    }
}

document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    const tableFacture=document.getElementById("modal-commande-new").querySelector("#table-facture");

    ////modal new
    const modalCommandeNew=document.getElementById("modal-commande-new");
    const bsModalCommandeNew = new bootstrap.Modal(modalCommandeNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const remiseTauxInput=modalCommandeNew.querySelector("#remise-taux");
    const remiseMontantInput=modalCommandeNew.querySelector("#remise-montant");
    const montantHTAvantRemiseInput=modalCommandeNew.querySelector("#totalHT-avant-remise");
    const montantHTApresRemiseInput=modalCommandeNew.querySelector("#totalHT-apres-remise");
    const TVAAvantRemiseInput=modalCommandeNew.querySelector("#TVA-avant-remise");
    const TVAApresRemiseInput=modalCommandeNew.querySelector("#TVA-apres-remise");
    const montantTTCAvantRemiseInput=modalCommandeNew.querySelector("#totalTTC-avant-remise");
    const montantTTCApresRemiseInput=modalCommandeNew.querySelector("#totalTTC-apres-remise");

    //FUNCTION
    function addItem(){
        console.log("addding item");
        fetch("/elements/commandes/commande_table_details_base.html")
        .then((response) => {
            let tt = response.text();
            return tt;
        })
        .then((txt) => {
            // TODO : abstract this process
            // TODO : add caching
            let doc = new DOMParser().parseFromString(
                txt,
                "text/html"
            );
            let trModel = doc.querySelector("#row-001");
            console.log("trModel");
            console.log(trModel);
    
            tableFacture.querySelector('tbody').append(
                generateRowAddItem(trModel, ["","","","","",""])
            );
            // bsModalNew.hide();
            // _cleanNewForm();
            // console.log("yes saving called");
            return true;
        });}

    function removeItem(target) {
        console.log("remove me");
        let rowId=target.parentNode.parentNode.remove();
        
    }

    //EVENTHANDLER
    try {
        divBtns.addEventListener('click',(event)=>{
            if(event.target.id=="btn-main-new")
            bsModalCommandeNew.show();
        })
    } catch (error) {
        
    }

    try {
        modalCommandeNew.addEventListener('click',(event)=>{
            if(event.target.id=="btn-cancel-new"){

                bsModalCommandeNew.hide();
            }else if(event.target.id=="btn-add-item"){
                counterRowItem++;
                addItem();
            }else if(event.target.classList.contains("btn-del")){
                removeItem(event.target);
            }
        })
    } catch (error) {
        
    }

    try {
        modalCommandeNew.addEventListener('input',(event)=>{
            // TODO : restrict event
            if (event.target.id=='remise-taux'){
               tauxAndMontantDiscountInputHandler(montantHTAvantRemiseInput,remiseTauxInput,remiseMontantInput,1);
            }else if(event.target.id=='remise-montant'){
                tauxAndMontantDiscountInputHandler(montantHTAvantRemiseInput,remiseTauxInput,remiseMontantInput,2);

            }
            TVAHandler(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,1);
            totalTTCDiscountedHandler(montantTTCAvantRemiseInput,montantTTCApresRemiseInput,remiseMontantInput);
            TVAHandler(montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput,2);
        })

    } catch (error) {
        
    }


})