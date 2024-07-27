<?php

// declare(strict_types=1);

namespace Converter;

class NewFactureFournisseurHeader extends Converter
{
    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        $input = $this->data_from_user;
        $this->data_for_db["facture_uid"] = \array_key_exists("facture-uid", $input) ? \intval($input["facture-uid"]) != 0 ?  \intval($input["facture-uid"]) : \null : \null;

        // set default value as company tva default from db
        $this->data_for_db["tva_flag"] = \array_key_exists("tva-flag", $input) ? \intval($input["tva-flag"]) != 0 ?  \intval($input["tva-flag"]) : 0 : 0;

        $this->data_for_db["user_uid"] = \array_key_exists("user-uid", $input) ? \intval($input["user-uid"]) != 0 ?  \intval($input["user-uid"]) : \null : \null;

        $this->data_for_db["num_facture"] = \array_key_exists("num-facture", $input) ? \trim($input["num-facture"]) != "" ?  \trim($input["num-facture"]) : \null : \null;

        $fournisseur = \array_key_exists("fournisseur", $input) ? \trim($input["fournisseur"]) != "" ?  \trim($input["fournisseur"]) : \null : \null;
        //extract fournisseur_uid from fournisseur;
        if (
            \preg_match("/^\d+(?=\s|-)/", $fournisseur, $re_result)
        ) {
            $this->data_for_db["fournisseur_uid"] = \intval($re_result[0]);
        } else {
            $this->data_for_db["fournisseur_uid"] = \null;
        }


        $this->data_for_db["libelle"] = \array_key_exists("note", $input) ? \trim($input["note"]) != "" ?  \trim($input["note"]) : \null : \null;

        $this->data_for_db["date"] = \array_key_exists("date", $input) ? \trim($input["date"]) != "" ?  \trim($input["date"]) : \null : \null;

        $this->data_for_db["magasin_uid"] = \array_key_exists("magasin", $input) ? \intval($input["magasin"]) != "" ?  \intval($input["magasin"]) : \null : \null;

        // nd or not
        $this->data_for_db["state"] = \array_key_exists("state", $input) ? \intval($input["nd"]) != "" ?  \intval($input["nd"]) : 0 : 0;

        $this->data_for_db["remise_taux"] = \array_key_exists("remise-taux", $input) ? \floatval($input["remise-taux"]) != "" ?  \floatval($input["remise-taux"]) : 0 : 0;

        $this->data_for_db["remise_montant"] = \array_key_exists("remise-montant", $input) ? \floatval($input["remise-montant"]) != "" ?  \floatval($input["remise-montant"]) : 0 : 0;

        $this->data_for_db["total_ht_avant_remise"] = \array_key_exists("totalHT-avant-remise", $input) ? \floatval($input["totalHT-avant-remise"]) != "" ?  \floatval($input["totalHT-avant-remise"]) : 0 : 0;

        $this->data_for_db["total_ttc_avant_remise"] = \array_key_exists("totalTTC-avant-remise", $input) ? \floatval($input["totalTTC-avant-remise"]) != "" ?  \floatval($input["totalTTC-avant-remise"]) : 0 : 0;

        $this->data_for_db["total_ht_apres_remise"] = \array_key_exists("totalHT-apres-remise", $input) ? \floatval($input["totalHT-apres-remise"]) != "" ?  \floatval($input["totalHT-apres-remise"]) : 0 : 0;

        $this->data_for_db["total_ttc_apres_remise"] = \array_key_exists("totalTTC-apres-remise", $input) ? \floatval($input["totalTTC-apres-remise"]) != "" ?  \floatval($input["totalTTC-apres-remise"]) : 0 : 0;

        $this->data_for_db["tva_apres_remise"] = \array_key_exists("tva-apres-remise", $input) ? \floatval($input["tva-apres-remise"]) != "" ?  \floatval($input["tva-apres-remise"]) : 0 : 0;
    }
}
