<?php

declare(strict_types=1);

namespace Converter;

class ItemStockChecker extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $this->data_for_db["code"] = $this->data_from_user["code"];
    }
}
