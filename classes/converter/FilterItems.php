<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

use Database\Special\QueryFilterConditionsConstructor;

class FilterItems extends Converter
{
    static private  array $correspondances = [
        "code" => "code",
        "actif" => "active",
        "declarable" => "declarable",
        "name" => "name",
        "type" => "type_item",
        "family" => "family",
        "category" => "category",
        "measurement" => "unite_mesure_uid",
        "stockable" => "stockable",
        "identifiable" => "identifiable",
        "prix-vente" => "prix_vente",
        "pamp" => "prix_achat_mp",
        "note" => "note"
    ];
    static private  array $fields_types = [
        "code" => "string",
        "actif" => "int",
        "declarable" => "int",
        "name" => "string",
        "type" => "int",
        "family" => "string",
        "category" => "string",
        "measurement" => "int",
        "stockable" => "int",
        "identifiable" => "int",
        "prix-vente-min" => "float",
        "prix-vente-max" => "float",
        "pamp-min" => "float",
        "pamp-max" => "float",
        "note" => "string"

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
                    case 'code':
                    case 'name':
                    case 'family':
                    case 'category':
                    case 'note':
                        $column_name = self::$correspondances[$key];
                        $this->conditions .= " $column_name LIKE '%$value%'and";
                        break;

                    case 'actif':
                    case 'declarable':
                    case 'type':
                    case 'measurement':
                    case 'stockable':
                    case 'identifiable':

                        if ($value != "all") {
                            $column_name = self::$correspondances[$key];

                            $this->conditions .= " $column_name = $value and";
                        }

                        break;

                    case 'prix-vente-min':
                    case 'prix-vente-max':

                        if ($this->echeance_counter == 0) {
                            $mymin = $data['prix-vente-min'];
                            $mymax = $data['prix-vente-max'];
                            if ((\floatval($mymin) == 0) && (\floatval($mymax) == 0)) {
                                $this->conditions .= " prix_vente = 0 and";
                            } elseif ((\floatval($mymin) > 0) && (\floatval($mymax) > 0)) {
                                $this->conditions .= " prix_vente BETWEEN $mymin AND $mymax and";
                            } elseif ((\floatval($mymin) > 0) && (\floatval($mymax) == 0)) {
                                $this->conditions .= " prix_vente >= $mymin and";
                            } elseif ((\floatval($mymax) > 0) && (\floatval($mymin) == 0)) {
                                $this->conditions .= " prix_vente BETWEEN 0 AND $mymax and";
                            };
                            $this->echeance_counter += 1;
                        }
                        break;
                    case 'pamp-min':
                    case 'pamp-max':

                        if ($this->echeance_counter == 0) {
                            $mymin = $data['pamp-min'];
                            $mymax = $data['pamp-max'];
                            if ((\floatval($mymin) == 0) && (\floatval($mymax) == 0)) {
                                $this->conditions .= " prix_achat_mp = 0 and";
                            } elseif ((\floatval($mymin) > 0) && (\floatval($mymax) > 0)) {
                                $this->conditions .= " prix_achat_mp BETWEEN $mymin AND $mymax and";
                            } elseif ((\floatval($mymin) > 0) && (\floatval($mymax) == 0)) {
                                $this->conditions .= " prix_achat_mp >= $mymin and";
                            } elseif ((\floatval($mymax) > 0) && (\floatval($mymin) == 0)) {
                                $this->conditions .= " prix_achat_mp BETWEEN 0 AND $mymax and";
                            };
                            $this->echeance_counter += 1;
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
