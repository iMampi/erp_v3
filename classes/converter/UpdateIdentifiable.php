<?php

// declare(strict_types=1);

namespace Converter;

class UpdateIdentifiable extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db(): void
    {
        $input = $this->data_from_user;

        $this->data_for_db["code"] = \array_key_exists("code", $input) ? \trim($input["code"]) != "" ?  \trim($input["code"]) : \null : \null;

        $this->data_for_db["num_serie"] = \array_key_exists("num_serie", $input) ? \trim($input["num_serie"]) != "" ?  \trim($input["num_serie"]) : \null : \null;

        $this->data_for_db["actif"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) : \null;

        $this->data_for_db["magasin_uid"] = \array_key_exists("magasin-uid", $input) ? \intval($input["magasin-uid"]) : \null;

        $this->data_for_db["ref_in"] = \array_key_exists("ref_in", $input) ? \trim($input["ref_in"]) : \null;

        $this->data_for_db["ref_out"] = \array_key_exists("ref_out", $input) ? \trim($input["ref_out"]) : \null;
    }
}
