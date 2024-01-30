<?php

// declare(strict_types=1);

namespace Converter;

class UpdateStock extends Converter
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

        $this->data_for_db["quantity"] = \array_key_exists("quantity", $input) ? \floatval($input["quantity"]) != 0 ?  \floatval($input["quantity"]) : \null : \null;


    }
}
