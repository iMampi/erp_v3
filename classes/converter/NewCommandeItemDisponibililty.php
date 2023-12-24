<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeItemDisponibililty extends Converter
{
    public function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    private function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = $input[0];
        $this->data_for_db["item_uid"] = $input[1];
        $this->data_for_db["quantity"] = \floatval($input[2]);
        $this->data_for_db["prix_unitaire"] = \floatval($input[3]);
        $this->data_for_db["description_item"] = $input[5];
        $this->data_for_db["num_serie"] = $input[4];
        $this->data_for_db["commande_uid"] = \intval($input[6]);
        $this->data_for_db["prix_total"] = \number_format($this->data_for_db["quantity"] * $this->data_for_db["prix_unitaire"], 2, ".", "");
        $this->data_for_db["commande_initial_uid"] = \null;

        if (isset($input[7])) {
            $this->data_for_db["commande_initial_uid"] =
                \intval($input[7]) == 0 ? \null : \intval($input[7]);
        }

    }
}
