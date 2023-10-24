<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

use Database\Special\QueryFilterConditionsConstructor;

class FilterFactures extends Converter
{
    static private  array $correspondances = [
        "num-facture" => "num_facture",
        "commande-uid" => "commande_uid",
        "date" => "datetime",
        "commercial" => "user_uid",
        "payment" => "payment",
        "magasin" => "magasin_uid",
        "note" => "note",
        "state" => "state",
        "client" => "client_uid",
        "remise-taux" => "remise_taux",
        "remise-montant" => "remise_montant",
        "totalTTC-apres-remise" => "total_ttc_apres_remise"
    ];

    static private  array $fields_types = [
        "num-facture" => "int",
        "commande-uid" => "int",
        "date" => "string",
        "commercial" => "int",
        "payment" => "int",
        "magasin" => "int",
        "note" => "string",
        "state" => "int",
        "client" => "int",
        "remise-taux" => "float",
        "remise-montant" => "float",
        "totalTTC-apres-remise" => "float"

    ];
    public string $conditions;
    public int $echeance_counter = 0;
    public int $encours_counter = 0;
    public int $type_vente_counter = 0;


    function __construct(array $data)
    {
        parent::__construct($data);
        $this->converter_for_db();
    }

    public function converter_for_db()
    {
        foreach ($this->data_from_user as $key => $value) {
            $this->data_for_db[self::$correspondances[$key]] = self::type_conversion($key, $value);
        }
        $this->generate_conditions();
        $this->conditions = $this->conditions . ";";
    }
    static function type_conversion($field, $value)
    {
        if (self::$fields_types[$field] == "int") {
            return intval($value);
        } else if (self::$fields_types[$field] == "float") {
            return floatval($value);
        } else if (self::$fields_types[$field] == "string") {
            return strval($value);
        } else {
            throw new \Exception("unknown type.");
        }
    }
    public function generate_conditions()
    {
        $data = $this->data_from_user;

        if (\count($data) > 0) {
            $this->conditions = " where ";

            $last_key = \array_key_last($data);

            foreach ($data as $key => $value) {

                switch ($key) {
                    case 'num-facture':
                    case 'commande-uid':
                    case 'commercial':
                    case 'payment':
                    case 'magasin':
                    case 'note':
                    case 'state':
                    case 'client':
                        $column_name = self::$correspondances[$key];
                        $this->conditions .= " $column_name LIKE '%$value%'and";
                        break;

                    case 'remise-taux-min':
                    case 'remise-taux-max':
                        if ($this->encours_counter == 0) {
                            $mymin = $data['remise-taux-min'];
                            $mymax = $data['remise-taux-max'];
                            if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " remise_taux = 0 and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) > 0)) {
                                $this->conditions .= " remise_taux BETWEEN $mymin AND $mymax and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " remise_taux >= $mymin and";
                            } elseif ((\intval($mymax) > 0) && (\intval($mymin) == 0)) {
                                $this->conditions .= " remise_taux BETWEEN 1 AND $mymax and";
                            };
                            $this->encours_counter += 1;
                        }
                        break;

                    case 'remise-montant-min':
                    case 'remise-montant-max':
                        if ($this->encours_counter == 0) {
                            $mymin = $data['remise-montant-min'];
                            $mymax = $data['remise-montant-max'];
                            if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " total_ttc_apres_remise = 0 and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) > 0)) {
                                $this->conditions .= " total_ttc_apres_remise BETWEEN $mymin AND $mymax and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " total_ttc_apres_remise >= $mymin and";
                            } elseif ((\intval($mymax) > 0) && (\intval($mymin) == 0)) {
                                $this->conditions .= " total_ttc_apres_remise BETWEEN 1 AND $mymax and";
                            };
                            $this->encours_counter += 1;
                        }
                        break;

                    case 'totalTTC-apres-remise-min':
                    case 'totalTTC-apres-remise-max':
                        if ($this->encours_counter == 0) {
                            $mymin = $data['totalTTC-apres-remise-min'];
                            $mymax = $data['totalTTC-apres-remise-max'];
                            if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " remise_montant = 0 and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) > 0)) {
                                $this->conditions .= " remise_montant BETWEEN $mymin AND $mymax and";
                            } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                                $this->conditions .= " remise_montant >= $mymin and";
                            } elseif ((\intval($mymax) > 0) && (\intval($mymin) == 0)) {
                                $this->conditions .= " remise_montant BETWEEN 1 AND $mymax and";
                            };
                            $this->encours_counter += 1;
                        }
                        break;
                }
                if ($key == $last_key) {
                    $this->conditions = \preg_replace('/\s*and\s*$/', "", $this->conditions);
                    $this->conditions = \preg_replace('/\s*where\s*$/', "", $this->conditions);
                }
            }
        }
    }
}
