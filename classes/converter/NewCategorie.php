<?php

// declare(strict_types=1);

namespace Converter;

class NewCategorie extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = \array_key_exists("uid", $input) ? \intval($input["uid"]) != 0 ?  \intval($input["uid"]) : \null : \null;
        $this->data_for_db["name"] = \array_key_exists("name", $input) ? \trim($input["name"]) != "" ?  \trim($input["name"]) : \null : \null;
        $this->data_for_db["active"] = \array_key_exists("active", $input) ? \intval($input["active"]) != 0 ?  \intval($input["active"]) : 1 : 1;
    }
}
