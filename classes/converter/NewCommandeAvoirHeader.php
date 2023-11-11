<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeAvoirHeader extends NewCommandeHeader
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->negative_numbers();
    }

    public function negative_numbers()
    {
        $this->data_for_db["total_ht_avant_remise"] = $this->data_for_db["total_ht_avant_remise"] * -1;
        $this->data_for_db["total_ttc_avant_remise"] = $this->data_for_db["total_ht_avant_remise"] * -1;
        $this->data_for_db["total_ht_apres_remise"] =  $this->data_for_db["total_ht_avant_remise"] * -1;
        $this->data_for_db["total_ttc_apres_remise"] = $this->data_for_db["total_ht_avant_remise"] * -1;
    }
}
