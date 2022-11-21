<?php 

namespace Converter;

class DeleteClient extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
}
