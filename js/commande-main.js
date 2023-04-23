var counterRowItem=1;
var typingTimer;  



async function saveCommande(inputObj) {
    console.log("saving  comande");
    let url = "/database/save/new_commande.php";
    let response = await sendData(url, inputObj);

    console.log("error?");
    console.log(response);
    let myjson = JSON.parse(response);

    return myjson;
    // return await fillMainTable(myjson, tableBodyCategorie);

}

function generateRowAddItem(nodeModel, DataObj) {
	// console.log(DataObj);
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(counterRowItem, 3, false);
	
	return newNode;
}


//SAVING COMMANDE NEW
function grabCommandeDataForm(modal) {
    let data={header:{},items:[]};
    const headersName=["commercial","client","date","note","remise-taux","remise-montant","magasin","totalHT-avant-remise","TVA-avant-remise","totalTTC-avant-remise"];
    //grab only essential headers data
    let headerInputs=modal.querySelector("#new-modal-body-heads").querySelectorAll(".input");
    headerInputs.forEach(input => {
        try {
            if (headersName.includes( input.id)){
                data["header"][input.id]=input.value
            }
        } catch (error) {
            console.log("ehrror : "+error);
        }
    });


    //grab only essential item data
    let tableBodyRows=modal.querySelector("#new-modal-body-table").querySelector('tbody').querySelectorAll("tr");
    // console.log(tableBodyRows);
    tableBodyRows.forEach(row => {
        // console.log(row);
        let itemID=row.querySelector("#item-id").value;
        let quantity=row.querySelector("#item-quantity").value;
        let prixUnitaire=row.querySelector("#item-pu").value;
        let numSerie=row.querySelector("#num-serie").value;
        data["items"].push([itemID,quantity,prixUnitaire,numSerie]);
    });
    return data;
}

//PRICE MANIPULATION
function updateTotalPrice(baseMontantInput,priceListNode){
    console.log("updateTotalPrice");
    const pricesRaw=[];
    priceListNode.forEach(element => {
        pricesRaw.push(formatedNumberToFloat(element.value));
    });
    return baseMontantInput.value= formatNumber( pricesRaw.reduce((partialSum,a)=> partialSum+formatedNumberToFloat(a),0));
}

function updateItemTotalPrice(rowNode) {
    const price = rowNode.querySelector("#item-pu").value;
    const quantity = rowNode.querySelector("#item-quantity").value;
    rowNode.querySelector("#item-prix-total").value = formatNumber(formatedNumberToFloat(price)*formatedNumberToFloat(quantity));
}

function tauxAndMontantDiscountInputHandler(baseMontantInput,tauxInput,montantInput,mode){
    let baseMontant=formatedNumberToFloat(baseMontantInput.value);
    if (mode==1){
        montantInput.value=(baseMontant*formatedNumberToFloat( tauxInput.value)/100||0).toFixed(2);
    } else if (mode==2){


        tauxInput.value= (formatedNumberToFloat( montantInput.value)/formatedNumberToFloat( baseMontant)*100||0).toFixed(2);
    }
}

function totalTTCDiscountedHandler(baseMontantInput,discountedMontantInput,montantDiscount){
    console.log("totalTTCDiscountedHandler");
    discountedMontantInput.value=formatNumber(formatedNumberToFloat(baseMontantInput.value)-formatedNumberToFloat(montantDiscount.value))
}

function TVAHandler(discountedMontantInput,TVAInput,TotalTTCInput,mode) {
    // Handles TVA and total update
    // NOTE : mode = 1: ht to ttc;mode = 2: ttc to ht;
    console.log("TVAHandler");
    if (mode==1){

        let TVA=formatedNumberToFloat(discountedMontantInput.value)*0.20;
        TVAInput.value=formatNumber( TVA||0);
        TotalTTCInput.value=formatNumber(formatedNumberToFloat(discountedMontantInput.value)+TVA);
    }else if (mode==2){
        let HT=formatedNumberToFloat(TotalTTCInput.value)/1.2;
        discountedMontantInput.value=formatNumber( HT);
        TVAInput.value=formatNumber( formatedNumberToFloat(TotalTTCInput.value)-HT);

    }else{

    }
}

function updateAllHeaderPrices(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput) {
    
    TVAHandler(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,1);
    tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,1)
    totalTTCDiscountedHandler(montantTTCAvantRemiseInput,montantTTCApresRemiseInput,remiseMontantInput);
    TVAHandler(montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput,2);
}


document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    const tableFacture=document.getElementById("modal-commande-new").querySelector("#table-facture");
    const itemDataList=document.getElementById("item-list");
    const clientDataList=document.getElementById("client-list");


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

    function getName(code){
        return document.querySelector("option[value='"+code+"']").getAttribute("label");
    }

    function fillItemNameAndPrice(inputCodeNode) {
        const defaultQuantity=1;
        const inputName =inputCodeNode.parentNode.parentNode.querySelector("#item-name");
        const inputPU =inputCodeNode.parentNode.parentNode.querySelector("#item-pu");
        const inputQuantity =inputCodeNode.parentNode.parentNode.querySelector("#item-quantity");
        const inputTotalPrice =inputCodeNode.parentNode.parentNode.querySelector("#item-prix-total");
        let valName=inputCodeNode.value;
        inputName.value=getName(valName);
        let valPU=document.getElementById("item-list").querySelector("option[value='"+valName+"']").dataset.prix;
        inputPU.value=formatNumber(valPU);
        inputQuantity.value=defaultQuantity;
        inputTotalPrice.value=formatNumber(valPU*defaultQuantity)
        
    }

    async function searchLive(term,datalistNode,mode) {
        let search={"client":searchClient,"item":searchItem}

        let inputObj={"client":{uid:term,noms:term,prenoms:term,"nom-commercial":term,"raison-sociale":term},
            "item":{code:term,name:term}
        };
        let result = await search[mode](inputObj[mode]);
        // let result = await searchItem(inputObj);
        addDatalistElement(datalistNode,result,mode,term);
    }

    function addDatalistElement(datalistNode,arrayData,mode,term="") {
        datalistNode.innerHTML="";
        if ((Array.isArray(arrayData))&&(arrayData.length ||arrayData[0]!=undefined)){
            console.log("array is ok");
            arrayData.forEach(element => {
                let option_=document.createElement("option");
                if (mode=="item"){
                    option_.value=element.code;
                    option_.label=element.name;
                    option_.dataset.prix=element.prix_vente;
                }else if(mode=="client"){
                    let val=element.uid+" - ";
                    if (element.noms==""){
                        console.log("client company");

                        val+=(element["raison_sociale"]||"")+" / "+(element["nom_commercial"]||"");
                    }else if (element["raison_sociale"]==""){
                        console.log("client humain");
                        val+=element.noms+" "+element.prenoms;
                    }
                    option_.value=val;
                    option_.label=val;
                }
                datalistNode.append(option_);
            });
        }else{
            console.log("empty arrayy");
            let option_=document.createElement("option");
            option_.value="Néant";
            option_.label="aucun résultat pour \""+term+"\"";
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
                console.log("remove");
                updateTotalPrice(montantHTAvantRemiseInput,modalCommandeNew.querySelectorAll("#item-prix-total"))
                updateAllHeaderPrices(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput);
            }else if(event.target.id=="btn-save-new"){
                let dataModalCommandeNew=grabCommandeDataForm(modalCommandeNew);
                console.log(dataModalCommandeNew);
                saveCommande(dataModalCommandeNew);
            }
        })
    } catch (error) {
        
    }

    ////modalCommandeNew event handler
    try {
        modalCommandeNew.addEventListener('keyup',(event)=>{
            console.log("event keyup");
            console.log(event);
            if ((event.target.id=="item-id")&&(event.key)){
                console.log("searching item");
                itemDataList.innerHTML="";
                clearTimeout(typingTimer);
                let term =event.target.value.trim();
                if(term){
                                    // TODO : sanitize here
                itemDataList.innerHTML="<option value='Searching for \""+event.target.value.trim()+"\"'></option>";
                    typingTimer = setTimeout(()=>{searchLive(term,itemDataList,"item")}, 1500);
                }
            }else if ((event.target.id=="client")&&(event.key)){
                    console.log("searching client");
                    clientDataList.innerHTML="";
                    clearTimeout(typingTimer);
                    let term =event.target.value.trim();
                    if(term){
                        // TODO : sanitize here
                        clientDataList.innerHTML="<option value='Searching for \""+event.target.value.trim()+"\"'></option>";
                        typingTimer = setTimeout(()=>{searchLive(term,clientDataList,"client")}, 1500);
                    }
            }else if((event.target.id=="item-id")&&(!event.key)){
                console.log("item selected");
                let val=event.target.value;
                console.log(getName(val));
                fillItemNameAndPrice(event.target);
                const itemTotalPriceInputs=modalCommandeNew.querySelectorAll(".item-prix-total");
                console.log("itemTotalPriceInputs");
                console.log(itemTotalPriceInputs);
                updateTotalPrice(montantHTAvantRemiseInput,itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput);
            }else if((event.target.id=="client")&&(!event.key)){
                console.log("client selected");
            }else if (event.target.id=="item-quantity"){
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs=modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInput,itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput);


            }
        })

    } catch (error) {
        
    }
    try {
        modalCommandeNew.addEventListener('input',(event)=>{
            console.log("event input");
            console.log(event);
            if ((event.target.id=="item-id")&&(event.key)){

            }else if((event.target.id=="item-id")&&(!event.key)){
            }else if (event.target.id=="item-quantity"){
                updateItemTotalPrice(event.target.parentNode.parentNode)
                const itemTotalPriceInputs=modalCommandeNew.querySelectorAll("#item-prix-total");
                updateTotalPrice(montantHTAvantRemiseInput,itemTotalPriceInputs);
                updateAllHeaderPrices(montantHTAvantRemiseInput,TVAAvantRemiseInput,montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput);

            }
        })

    } catch (error) {
        
    }

    try {
        modalCommandeNew.addEventListener('input',(event)=>{
            // TODO : restrict event
            if (event.target.id=='remise-taux'){
               tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,1);
            }else if(event.target.id=='remise-montant'){
                tauxAndMontantDiscountInputHandler(montantTTCAvantRemiseInput,remiseTauxInput,remiseMontantInput,2);

            }
            totalTTCDiscountedHandler(montantTTCAvantRemiseInput,montantTTCApresRemiseInput,remiseMontantInput);
            TVAHandler(montantHTApresRemiseInput,TVAApresRemiseInput,montantTTCApresRemiseInput,2);
        })

    } catch (error) {
        
    }


})