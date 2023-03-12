var counterRowItem=1;
function generateRowAddItem(nodeModel, DataObj) {
	// console.log(DataObj);
    console.log("fgrai");
	let newNode = nodeModel.cloneNode(true);
	newNode.id = "row-"+zeroLeftPadding(counterRowItem, 3, false);
	return newNode;
}
document.addEventListener("DOMContentLoaded",()=>{
    //CACHING ELEMENTS
    const divBtns=document.getElementById("div-btns");
    const tableBody=document.getElementById("ze-tbody");
    const tableFacture=document.getElementById("modal-facture-new").querySelector('#table-facture');
    ////modal new
    const modalNew=document.getElementById("modal-facture-new");
    const bsModalNew = new bootstrap.Modal(modalNew, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    const btnSaveNew=modalNew.querySelector("#btn-save-new");
    const btnCancelNew=modalNew.querySelector("#btn-cancel-new");
    const btnAddItem=modalNew.querySelector("#btn-add-item");

    ////modal facture details
    const modalFactureDetails=document.getElementById("modal-facture-details");
    const bsModalFactureDetails = new bootstrap.Modal(modalFactureDetails, {
		backdrop: "static",
		keyboard: false,
		focus: true,
	});
    // const btnSaveNew=modalNew.querySelector("#btn-save-new");
    // const btnCancelNew=modalNew.querySelector("#btn-cancel-new");
    // const btnAddItem=modalNew.querySelector("#btn-add-item");

//FUNCTIONS
function addItem(){
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

function enableInputs(){}


//EVENTLISTENER
try{
    divBtns.addEventListener('click',(event)=>{
        if(event.target.id=="btn-main-new"){
            bsModalNew.show();
        }else if(event.target.id=="btn-main-filter"){
            console.log("filter me");
        bsModalFilter.show();
    }else if(event.target.id=="btn-remove-filter"){
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
} catch (error) {}

try {
    modalNew.addEventListener('click',(event)=>{
        console.log(event.target);
        if(event.target.id=="btn-add-item"){
            console.log("clieckd add item");
            counterRowItem++;
            addItem();
        }
        if(event.target.classList.contains("btn-del")){
            removeItem(event.target);
        }
        if(event.target.id=="btn-cancel"){
            bsModalNew.hide();
        }

        })
    
} catch (error) {
    
}
try {
    modalFactureDetails.addEventListener('click',(event)=>{
        if(event.target.id=="btn-cancel"){
            bsModalFactureDetails.hide();
        }
        if(event.target.id=="btn-modify"){
            enableInputs();
        }

        })
    
} catch (error) {
    
}

try {
    tableBody.addEventListener("click",(event)=>{
        if(event.target.classList.contains('btn-details')){
            bsModalFactureDetails.show()
        }
    })
} catch (error) {
    
}
})