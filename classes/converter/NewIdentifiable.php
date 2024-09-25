<?php

declare(strict_types=1);

namespace Converter;

class NewIdentifiable extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;

        $this->data_for_db["item_code"] = \array_key_exists("item-code", $input) ? \trim($input["item-code"]) != "" ?  \trim($input["item-code"]) : \null : \null;

        $this->data_for_db["num_serie"] = \array_key_exists("num-serie", $input) ? \trim($input["num-serie"]) != "" ?  \trim($input["num-serie"]) : \null : \null;

        $this->data_for_db["actif"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) : \null;

        $this->data_for_db["magasin_uid"] = \array_key_exists("magasin-uid", $input) ? \intval($input["magasin-uid"]) : \null;

        $this->data_for_db["ref_in"] = \array_key_exists("ref_in", $input) ? \intval($input["ref_in"]) : \null;

        $this->data_for_db["ref_out"] = \null;
    }
}
