<?php

// declare(strict_types=1);

namespace Converter;

class NewCommandeHeader extends Converter
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

        $commercial = \array_key_exists("commercial", $input) ? \trim($input["commercial"]) != "" ?  \trim($input["commercial"]) : \null : \null;
        //extract client_uid from commercial;

        if (
            \preg_match("/^\d+(?=\/\/)/", $commercial, $re_result)
        ) {
            $this->data_for_db["user_uid"] = \intval($re_result[0]);
        } else {
            $this->data_for_db["user_uid"] = \null;
        }

        $client = \array_key_exists("client", $input) ? \trim($input["client"]) != "" ?  \trim($input["client"]) : \null : \null;
        //extract client_uid from client;
        if (
            \preg_match("/^\d+(?=\s|-)/", $client, $re_result)
        ) {
            $this->data_for_db["client_uid"] = \intval($re_result[0]);
        } else {
            $this->data_for_db["client_uid"] = \null;
        }


        $this->data_for_db["libelle"] = \array_key_exists("note", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;

        $this->data_for_db["date"] = \array_key_exists("date", $input) ? \trim($input["date"]) != "" ?  \trim($input["date"]) : \null : \null;

        $this->data_for_db["magasin_uid"] = \array_key_exists("magasin", $input) ? \intval($input["magasin"]) != "" ?  \intval($input["magasin"]) : \null : \null;

        $this->data_for_db["state"] = \array_key_exists("state", $input) ? \intval($input["state"]) != "" ?  \intval($input["state"]) : 1 : 1;

        $this->data_for_db["type"] = \array_key_exists("type", $input) ? \intval($input["type"]) != "" ?  \intval($input["type"]) : 1 : 1;

        $this->data_for_db["remise_taux"] = \array_key_exists("remise-taux", $input) ? \floatval($input["remise-taux"]) != "" ?  \floatval($input["remise-taux"]) : 0 : 0;

        $this->data_for_db["remise_montant"] = \array_key_exists("remise-montant", $input) ? \floatval($input["remise-montant"]) != "" ?  \floatval($input["remise-montant"]) : 0 : 0;

        $this->data_for_db["total_ht_avant_remise"] = \array_key_exists("totalHT-avant-remise", $input) ? \floatval($input["totalHT-avant-remise"]) != "" ?  \floatval($input["totalHT-avant-remise"]) : 0 : 0;

        $this->data_for_db["total_ttc_avant_remise"] = \array_key_exists("totalTTC-avant-remise", $input) ? \floatval($input["totalTTC-avant-remise"]) != "" ?  \floatval($input["totalTTC-avant-remise"]) : 0 : 0;

        $this->data_for_db["total_ht_apres_remise"] = \array_key_exists("totalHT-apres-remise", $input) ? \floatval($input["totalHT-apres-remise"]) != "" ?  \floatval($input["totalHT-apres-remise"]) : 0 : 0;

        $this->data_for_db["total_ttc_apres_remise"] = \array_key_exists("totalTTC-apres-remise", $input) ? \floatval($input["totalTTC-apres-remise"]) != "" ?  \floatval($input["totalTTC-apres-remise"]) : 0 : 0;

        // $this->data_for_db["tva"] = \array_key_exists("TVA-avant-remise", $input) ? \floatval($input["TVA-avant-remise"]) != "" ?  \floatval($input["TVA-avant-remise"]) : 0 : 0;

    }
}
