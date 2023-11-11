<?php

// declare(strict_types=1);

namespace Converter;

class NewAvoirClient extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
    //TODO : to refactor the arrary to associative array zhen construct
    public function converter_for_db()
    {
        $this->data_for_db["commande_uid"] = \intval($this->data_from_user[0]);

        //extract user_uid from commercial;
        $commercial = $this->data_from_user[1] ? \trim($this->data_from_user[1]) != "" ?  \trim($this->data_from_user[1]) : \null : \null;
        if (
            \preg_match("/^\d+(?=\/\/)/", $commercial, $re_result)
        ) {
            $this->data_for_db["user_uid"] = \intval($re_result[0]);
        } else {
            $this->data_for_db["user_uid"] = \null;
        }

        $this->data_for_db["type"] = \intval($this->data_from_user[2]);
        $this->data_for_db["facture_client_uid"] = \intval($this->data_from_user[3]) == 0 ? \null : \intval($this->data_from_user[3]);
    }
}
