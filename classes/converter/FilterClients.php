<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

use Database\Special\QueryFilterConditionsConstructor;

class FilterClients extends Converter
{
    static private  array $correspondances = [
        "uid" => "uid",
        "personnality" => "type_personnality_uid",
        "actif" => "active_client",
        "nom-commercial" => "nom_commercial",
        "raison-sociale" => "raison_sociale",
        "noms" => "noms",
        "prenoms" => "prenoms",
        "cin" => "cin",
        "cin-date" => "cin_date",
        "cin-lieu" => "cin_lieu",
        "naissance-date" => "naissance-date",
        "naissance-lieu" => "naissance-lieu",
        "evaluation" => "evaluation",
        "declarable" => "declarable",
        "adress" => "adress",
        "type-vente" => "type_vente",
        "nif" => "nif",
        "stat" => "stat",
        "rcs" => "rcs",
        "commisionable" => "commisionable",
        "note" => "note",
        "echeance-min" => "nb_jour_min",
        "echeance-max" => "nb_jour_max",
        "encours-min" => "encours_min",
        "encours-max" => "encours_max",
        "phone" => "phone1",
        "phone" => "phone2",
        "mail" => "mail1",
        "mail" => "mail2",
    ];
    static private  array $fields_types = [
        "uid" => "int",
        "personnality" => "int",
        "actif" => "int",
        "nom-commercial" => "string",
        "raison-sociale" => "string",
        "noms" => "string",
        "prenoms" => "string",
        "prenoms" => "string",
        "cin" => "string",
        "cin-date" => "string",
        "cin-lieu" => "string",
        "naissance-date" => "string",
        "naissance-lieu" => "string",
        "evaluation" => "int",
        "declarable" => "int",
        "adress" => "string",
        "type-vente" => "int",
        "encours" => "float",
        "nif" => "string",
        "stat" => "string",
        "rcs" => "string",
        "commisionable" => "int",
        "note" => "string",
        "echeance-min" => "int",
        "echeance-max" => "int",
        "encours-min" => "float",
        "encours-max" => "float",
        "phone" => "string",
        "phone" => "string",
        "mail" => "string",
        "mail" => "string",
    ];
    public string $conditions;

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
                    case 'uid':
                    case 'nom-commercial':
                    case 'raison-sociale':
                    case 'noms':
                    case 'prenoms':
                    case 'cin':
                    case 'cin-date':
                    case 'cin-lieu':
                    case 'naissance-date':
                    case 'naissance-lieu':
                    case 'adress':
                    case 'nif':
                    case 'stat':
                    case 'rcs':
                    case 'note':
                        $column_name = self::$correspondances[$key];
                        $this->conditions .= " $column_name LIKE '%$value%'and";
                        break;

                    case 'personnality':
                    case 'actif':
                    case 'type-vente':
                    case 'evaluation':
                    case 'declarable':
                    case 'commisionable':

                        if ($value != "all") {
                            $column_name = self::$correspondances[$key];

                            $this->conditions .= " $column_name = $value and";
                        }

                        break;
                    case 'phone':
                        $this->conditions .= " phone1 LIKE '%$value%' and";
                        $this->conditions .= " or phone2 LIKE '%$value%' and";
                        break;

                    case 'mail':
                        $this->conditions .= " mail1 LIKE '%$value%' and";
                        $this->conditions .= " or mail2 LIKE '%$value%' and";
                        break;

                    case 'echeance-min':
                    case 'echeance-max':
                        $mymin = $data['echeance-min'];
                        $mymax = $data['echeance-max'];
                        if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " echeance = 0 and";
                        } elseif ((\intval($mymin) >= 0) && (\intval($mymax) > 0)) {
                            $this->conditions .= " echeance BETWEEN $mymin AND $mymax and";
                        } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " echeance > $mymin and";
                        } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " echeance > $mymin and";
                        };
                        break;

                    case 'encours-min':
                    case 'encours-max':
                        $mymin = $data['encours-min'];
                        $mymax = $data['encours-max'];
                        if ((\intval($mymin) == 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " encours = 0 and";
                        } elseif ((\intval($mymin) >= 0) && (\intval($mymax) > 0)) {
                            $this->conditions .= " echeance BETWEEN $mymin AND $mymax and";
                        } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " echeance > $mymin and";
                        } elseif ((\intval($mymin) > 0) && (\intval($mymax) == 0)) {
                            $this->conditions .= " echeance > $mymin and";
                        };
                        break;
                }
                if ($key == $last_key) {
                    $this->conditions = \preg_replace('/\s*and\s*$/', "", $this->conditions);
                }
            }
        }
    }
}
