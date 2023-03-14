<?php

namespace Converter;

class DeleteItem extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
    function converter_for_db()
    {
        $input = $this->data_from_user;

        $this->data_for_db["code"] = \array_key_exists("code", $input) ? \trim($input["code"]) != "" ?  \trim($input["code"]) : \null : \null;
    }
}
