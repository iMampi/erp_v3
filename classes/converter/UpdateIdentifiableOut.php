<?php

// declare(strict_types=1);

namespace Converter;

class UpdateIdentifiableOut extends UpdateIdentifiable
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db(): void
    {
        parent::converter_for_db();
        $input = $this->data_from_user;


        $this->data_for_db["actif"] = 0;

        $this->data_for_db["ref_out"] = \array_key_exists("ref_out", $input) ? \trim($input["ref_out"]) : \null;
    }
}
