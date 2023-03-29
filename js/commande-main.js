var counterRowItem=1;
var typingTimer;  




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
    const itemDataList=document.getElementById("item-list");


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

    async function searchPrice(inputObj) {
        console.log("searching PRICE");
		let url = "/database/select/get_price.php";
		let response = await sendData(url, inputObj);
	
		console.log("error?");
		console.log(response);
		let myjson = JSON.parse(response);
	
        return myjson;
		// return await fillMainTable(myjson, tableBodyCategorie);
	
	}

    function getName(code){
        return document.querySelector("option[value='"+code+"']").getAttribute("label");
    }

    function fillItemName(inputCodeNode) {
        let inputTarget =inputCodeNode.parentNode.parentNode.querySelector("#item-name");
        let val=inputCodeNode.value;
        inputTarget.value=getName(val);
    }

    async function searchLive(term,datalistNode) {
        let inputObj={code:term,name:term};
        let result = await searchItem(inputObj);
        addDatalistElement(datalistNode,result);
    }

    function addDatalistElement(datalistNode,arrayData) {
        datalistNode.innerHTML="";
        arrayData.forEach(element => {
            let option_=document.createElement("option");
            option_.value=element.code;
            option_.label=element.name;
            datalistNode.append(option_);
        });
        document.createElement("option")
        
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

    // today's date
    try {
        modalCommandeNew.querySelector('#date').value=luxon.DateTime.now().toFormat('yyyy-MM-dd');

    } catch (error) {
        console.log("dont know what happened");
    }

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
        modalCommandeNew.addEventListener('keyup',(event)=>{
            console.log("event");
            console.log(event);
            if ((event.target.id=="item-id")&&(event.key)){
                console.log("searching man");
                itemDataList.innerHTML="";
                clearTimeout(typingTimer);
                let term =event.target.value.trim();
                if(term){
                                    // TODO : sanitize here
                itemDataList.innerHTML="<option value='Searching for \""+event.target.value.trim()+"\"'></option>";
                    typingTimer = setTimeout(()=>{searchLive(term,itemDataList)}, 1500);
                }
            }else if((event.target.id=="item-id")&&(!event.key)){
                console.log("item selected");
                let val=event.target.value;
                console.log(getName(val));
                fillItemName(event.target);
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