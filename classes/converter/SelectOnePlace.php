<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

class SelectOnePlace extends Converter
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
    }
}
