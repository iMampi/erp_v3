<?php

// declare(strict_types=1);

namespace Converter;

class NewFactureClient extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }
    //TODO : to refactor the arrary to associative array zhen construct
    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["commande_uid"] = \intval($input[0]);

        // $this->data_for_db["payment"] = 0;

        $commercial = $input[1] ? \trim($input[1]) != "" ?  \trim($input[1]) : \null : \null;
        //extract client_uid from commercial;

        if (
            \preg_match("/^\d+(?=\/\/)/", $commercial, $re_result)
        ) {
            $this->data_for_db["user_uid"] = \intval($re_result[0]);
        } else {
            $this->data_for_db["user_uid"] = \null;
        }
    }
}
