<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

class SelectOneEmployee extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {

        $this->data_for_db["matricule"] = \array_key_exists("matricule", $this->data_from_user) ? \intval($this->data_from_user["matricule"]) != 0 ?  \intval($this->data_from_user["matricule"]) : \null : \null;
    }
}
