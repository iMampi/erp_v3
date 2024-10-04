<?php

// declare(strict_types=1);

namespace Converter;

class NewFactureFournisseurItem extends NewCommandeItem
{
    function __construct(array $data)
    {
        parent::__construct($data);
        // $data=[
        //     uid,
        //     item-uid,
        //     quantity,
        //     prix-unitaire,
        //     num-serie,
        //     description-item,
        //     identifiable,
        //     stockable,
        //     commande-uid,
        //     (commande-initial-uid)
        // ]
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        parent::converter_for_db();
        // calqué sur commande-main.js grabCommandeDataForm()\
        $input = $this->data_from_user;

        unset($this->data_from_user["commande_initial_uid"]);
        unset($this->data_from_user["commande_uid"]);

        $this->data_for_db["sortie_stock"] = $input[8];

        $this->data_for_db["facture_uid"] = $input[9];

        if (isset($input[10]) && $input[10] == "avoir") {
            $this->data_for_db["prix_total"] = $this->data_for_db["prix_total"] * -1;
        }
    }
}
