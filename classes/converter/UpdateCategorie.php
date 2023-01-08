<?php

// declare(strict_types=1);

namespace Converter;

class UpdateCategorie extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["uid"] = $input["uid"] ? intval($input["uid"]) : \null;
        $this->data_for_db["name"] = \intval($input["name"]);
        $this->data_for_db["active"] = \intval($input["actif"]);
    }
}
