<?php

namespace Converter;

class DeleteFournisseur extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
    function converter_for_db()
    {
        $this->data_for_db["uid"] = \intval($this->data_from_user["uid"]);
    }
}
