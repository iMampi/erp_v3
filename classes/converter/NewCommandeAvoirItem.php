<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeAvoirItem extends NewCommandeItem
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->negative_numbers();
    }

    public function negative_numbers()
    {
        $this->data_for_db["quantity"] = $this->data_for_db["quantity"] * -1;
        $this->data_for_db["prix_total"] = $this->data_for_db["prix_total"] * -1;
    }
}
