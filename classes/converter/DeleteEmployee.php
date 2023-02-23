<?php

namespace Converter;

class DeleteEmployee extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
    function converter_for_db()
    {
        $this->data_for_db["matricule"] = \array_key_exists("matricule", $this->data_from_user) ? (\intval($this->data_from_user["matricule"]) != 0 ?  \intval($this->data_from_user["matricule"]) : \null) : \null;
    }
}
