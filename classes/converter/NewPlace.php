<?php

// declare(strict_types=1);

namespace Converter;

class NewPlace extends Converter
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

        $this->data_for_db["name"] = \array_key_exists("name", $input) ? \trim($input["name"]) != "" ?  \trim($input["name"]) : \null : \null;

        $this->data_for_db["adresse"] = \array_key_exists("name", $input) ? \trim($input["adress"]) != "" ?  \trim($input["adress"]) : \null : \null;

        $this->data_for_db["phone"] = \array_key_exists("name", $input) ? \trim($input["phone"]) != "" ?  \trim($input["phone"]) : \null : \null;

        $this->data_for_db["note"] = \array_key_exists("name", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;

        $this->data_for_db["active"] = \array_key_exists("actif", $input) ? \intval($input["actif"]) != 0 ?  \intval($input["actif"]) : 0 : 0;

        $this->data_for_db["user_uid"] = \array_key_exists("user_uid", $input) ? \intval($input["user_uid"]) != 0 ?  \intval($input["user_uid"]) : \null : \null;
    }
}
