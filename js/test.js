const DTO_FILL_INPUT_ITEM_ROW = [
    { inputId: "row-uid", objectKey: ["uid"] },
    { inputId: "item-uid", objectKey: ["code", "item_uid"] },
    { inputId: "item-name", objectKey: ["name", "item_name"] },
    { inputId: "item-libelle", objectKey: ["description_item", "libelle"] },
    { inputId: "initial-quantity", objectKey: ["quantity"] },
    { inputId: "item-num-serie", objectKey: ["num_serie"] },
    { inputId: "item-pu", objectKey: ["prix_unitaire", "prix_vente"] },
    { inputId: "item-prix-total", objectKey: ["prix_total"] },
    { inputId: "stockable", objectKey: ["stockable"] },
    { inputId: "identifiable", objectKey: ["identifiable"] },
    { inputId: "item-quantity", objectKey: ["quantity"] },
    { inputId: "prix-variable", objectKey: ["prix-variable"] }
];


function inputNameToKey(inputName, ObjectData, DTO) {
    let objectKeyArray = DTO.find((entrie) => entrie.inputId === inputName).objectKey;

    if (objectKeyArray.length == 1) {
        return objectKeyArray[0];
    } else {
        let result;
        objectKeyArray.forEach((KeyArray) => {
            if (KeyArray in ObjectData) {
                result = KeyArray
            }
        });
        return result;
    }
}

arraydata = {
    "uid": 23,
    "item_name": "bite",
    "code": 5213,
}

console.log("test");
console.log(inputNameToKey("item-name", arraydata, DTO_FILL_INPUT_ITEM_ROW));