<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeItem extends Converter
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
        // calqué sur commande-main.js grabCommandeDataForm()
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = $input[0];
        $this->data_for_db["item_uid"] = $input[1];
        $this->data_for_db["quantity"] = \floatval($input[2]);
        $this->data_for_db["prix_unitaire"] = \floatval($input[3]);
        $this->data_for_db["description_item"] = $input[5];
        $this->data_for_db["num_serie"] = $input[4];
        $this->data_for_db["identifiable"] = \intval($input[6]);
        $this->data_for_db["stockable"] = \intval($input[7]);
        $this->data_for_db["commande_uid"] = \intval($input[8]);
        $this->data_for_db["prix_total"] = \number_format($this->data_for_db["quantity"] * $this->data_for_db["prix_unitaire"], 2, ".", "");
        $this->data_for_db["commande_initial_uid"] = \null;

        if (isset($input[9])) {
            $this->data_for_db["commande_initial_uid"] =
                \intval($input[9]) == 0 ? \null : \intval($input[9]);
        }
    }
}
