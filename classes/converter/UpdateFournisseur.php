<?php

// declare(strict_types=1);

namespace Converter;

class UpdateFournisseur extends NewClient
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
}
