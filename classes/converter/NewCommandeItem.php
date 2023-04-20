<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeItem extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["item_uid"] = $data[0];
        $this->data_for_db["quantity"] = \floatval($data[1]);
        $this->data_for_db["prix_unitaire"] = \floatval($data[2]);
        $this->data_for_db["description_item"] = $data[3];
        $this->data_for_db["commande_uid"] = \intval($data[4]);
        $this->data_for_db["prix_total"] = \number_format($this->data_for_db["quantity"] * $this->data_for_db["prix_unitaire"], 2);
    }
}
