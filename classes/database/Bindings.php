<?php

// declare(strict_types=1);
//TODO : DRY, there are case where the binding is the same
namespace Database;

use Converter\Converter;

class Bindings
{
    public Converter $converter;
    public array $binding;
    // static public array $save_new_client;

    function __construct(Converter $converter)
    {
        $this->converter = $converter;
        $this->generate();
    }
    function generate()
    {
        $arr = $this->converter->data_for_db;
        // $this->converter->data_for_db;
        if ($this->converter::class == "Converter\NewClient") {
            $this->binding = [
                'issssssssissssssssssiidiiii',
                $this->converter->data_for_db["type_personnality_uid"],
                $arr["adress"],
                $arr["nif"],
                $arr["stat"],
                $arr["rcs"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["active_client"],
                $arr["note"],
                $arr["nom_commercial"],
                $arr["raison_sociale"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["sexe"],
                $arr["type_vente"],
                $arr["encours"],
                $arr["nb_jour"],
                $arr["evaluation"],
                $arr["declarable"],
                $arr["commissionable"]
            ];
        } else if ($this->converter::class == "Converter\NewFournisseur") {
            $this->binding = [
                'issssssssissssssssssidiii',
                $this->converter->data_for_db["type_personnality_uid"],
                $arr["adress"],
                $arr["nif"],
                $arr["stat"],
                $arr["rcs"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["active_fournisseur"],
                $arr["note"],
                $arr["nom_commercial"],
                $arr["raison_sociale"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["sexe"],
                $arr["encours"],
                $arr["nb_jour"],
                $arr["evaluation"],
                $arr["declarable"]
            ];
        } else if ($this->converter::class == "Converter\NewCategorie") {
            $this->binding = [
                'si',
                $arr["name"],
                $arr["active"],
            ];
        } else if ($this->converter::class == "Converter\NewFamille") {
            $this->binding = [
                'si',
                $arr["name"],
                $arr["active"],
            ];
        } else if ($this->converter::class == "Converter\NewItem") {
            $this->binding = [
                'issiiiiddiiiis',
                $arr["uid"],
                $arr["code"],
                $arr["name"],
                $arr["type_item"],
                $arr["declarable"],
                $arr["category_uid"],
                $arr["family_uid"],
                $arr["prix_vente"],
                $arr["prix_achat_mp"],
                $arr["stockable"],
                $arr["identifiable"],
                $arr["unite_mesure_uid"],
                $arr["active"],
                $arr["note"]
            ];
        } else if ($this->converter::class == "Converter\NewPlace") {
            $this->binding = [
                'sssisi',
                $arr["name"],
                $arr["adresse"],
                $arr["phone"],
                $arr["active"],
                $arr["note"],
                $arr["user_uid"],

            ];
        } else if ($this->converter::class == "Converter\NewCommandeHeader") {
            $this->binding = [
                'issiidddddi',
                $arr["client"],
                $arr["date"],
                $arr["note"],
                $arr["state"],
                $arr["user_uid"],
                $arr["taux_remise"],
                $arr["montant_remise"],
                $arr["total_ht"],
                $arr["tva"],
                $arr["total_ttc"],
                $arr["magasin_uid"]
            ];
        } else if ($this->converter::class == "Converter\NewCommandeItem") {
            $this->binding = [
                'issiidddddi',
                $arr["client"],
                $arr["date"],
                $arr["note"],
                $arr["state"],
                $arr["user_uid"],
                $arr["taux_remise"],
                $arr["montant_remise"],
                $arr["total_ht"],
                $arr["tva"],
                $arr["total_ttc"],
                $arr["magasin_uid"]
            ];
        } else if ($this->converter::class == "Converter\NewEmployee") {
            $this->binding = [
                'iisssssssiisisssssssissssidiiiiiissii',
                $arr["uid"],
                \null,
                $arr["adress"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["phonepro"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["mailpro"],
                $arr["active_employee"],
                $arr["active_employee"],
                $arr["note"],
                $arr["evaluation"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["sexe"],
                $arr["debut"],
                $arr["fin"],
                $arr["poste"],
                $arr["categorie"],
                $arr["principal_magasin_uid"],
                $arr["sal_base"],
                $arr["sal_variable"],
                $arr["smie_uid"],
                $arr["matrimonial"],
                $arr["nb_enfants"],
                $arr["reduc_irsa"],
                $arr["heures_supp"],
                $arr["cnaps_num"],
                $arr["smie_num"],
                $arr["alloc_fam"],
                $arr["avantages"]
            ];
        } elseif ($this->converter::class == "Converter\UpdateClient") {
            $this->binding = [
                'iissssssssissssssssssidiiii',
                $arr["uid"],
                $arr["type_personnality_uid"],
                $arr["adress"],
                $arr["nif"],
                $arr["stat"],
                $arr["rcs"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["active_client"],
                $arr["note"],
                $arr["nom_commercial"],
                $arr["raison_sociale"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["type_vente"],
                $arr["encours"],
                $arr["nb_jour"],
                $arr["evaluation"],
                $arr["declarable"],
                $arr["commissionable"]
            ];
        } elseif ($this->converter::class == "Converter\UpdateFournisseur") {
            $this->binding = [
                'iissssssssissssssssssdiii',
                $arr["uid"],
                $arr["type_personnality_uid"],
                $arr["adress"],
                $arr["nif"],
                $arr["stat"],
                $arr["rcs"],
                $arr["phone1"],
                $arr["phone2"],
                $arr["mail1"],
                $arr["mail2"],
                $arr["active_fournisseur"],
                $arr["note"],
                $arr["nom_commercial"],
                $arr["raison_sociale"],
                $arr["noms"],
                $arr["prenoms"],
                $arr["cin"],
                $arr["cin_date"],
                $arr["cin_lieu"],
                $arr["naissance_date"],
                $arr["naissance_lieu"],
                $arr["encours"],
                $arr["nb_jour"],
                $arr["evaluation"],
                $arr["declarable"]
            ];
        } elseif ($this->converter::class == "Converter\UpdateCategorie") {
            $this->binding = [
                'sii',
                $arr["name"],
                $arr["active"],
                $arr["uid"]
            ];
        } elseif ($this->converter::class == "Converter\UpdateFamille") {
            $this->binding = [
                'sii',
                $arr["name"],
                $arr["active"],
                $arr["uid"]
            ];
        } elseif ($this->converter::class == "Converter\UpdatePlace") {
            $this->binding = [
                'ssssii',
                $arr["name"],
                $arr["adresse"],
                $arr["phone"],
                $arr["note"],
                $arr["active"],
                $arr["uid"]
            ];
        } elseif ($this->converter::class == "Converter\UpdateItem") {
            $this->binding = [
                'siissiiiiddss',
                $arr["name"],
                $arr["type_item"],
                $arr["active"],
                $arr["famille"],
                $arr["category"],
                $arr["unite_mesure_uid"],
                $arr["stockable"],
                $arr["identifiable"],
                $arr["declarable"],
                $arr["prix_vente"],
                $arr["prix_achat_mp"],
                $arr["note"],
                $arr["code"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneClient") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneEmployee") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["matricule"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneFournisseur") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneCategorie") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneFamille") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOnePlace") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\SelectOneItem") {
            $this->binding = [
                's',
                $this->converter->data_for_db["code"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteClient") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteFournisseur") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteCategorie") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteFamille") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["uid"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteEmployee") {
            $this->binding = [
                'i',
                $this->converter->data_for_db["matricule"]
            ];
        } elseif ($this->converter::class == "Converter\DeleteItem") {
            $this->binding = [
                's',
                $this->converter->data_for_db["code"]
            ];
        } else {
            echo "NOT VALID";
        }
    }
}
