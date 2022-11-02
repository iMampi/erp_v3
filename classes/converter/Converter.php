<?php


namespace Converter;

abstract class Converter
{
    public array $data_from_user;
    public array $data_from_db;
    public array $data_for_db;

    public function __construct(array $data_from_user)
    {
        $this->data_from_user = $data_from_user;
    }

    abstract public function converter_for_db();
}
