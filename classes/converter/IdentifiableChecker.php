<?php

declare(strict_types=1);

namespace Converter;

class IdentifiableChecker extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $this->data_for_db["item_code"] = $this->data_from_user["code"];
        $this->data_for_db["num_serie"] = $this->data_from_user["num-serie"];
    }
}
