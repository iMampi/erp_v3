<?php

// declare(strict_types=1);

namespace Converter;

class UpdateFournisseur extends NewClient
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();

        // FIXME : very bad practice.
        $input = $this->data_from_user;
        $this->data_for_db["active_fournisseur"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) != 0 ?  \intval($input["actif"]) : 0 : 0;
    }
}
