<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

// use Database\Special\QueryFilterConditionsConstructor;

class SelectionClients extends Converter
{
    static private  array $correspondances = [
        "uid" => "uid",
        "actif" => "active",
        "noms" => "noms",
        "prenoms" => "prenoms",
        "nom-commercial" => "nom_commercial",
        "raison-sociale" => "raison_sociale",
    ];
    static private  array $fields_types = [
        "uid" => "int",
        "actif" => "int",
        "noms" => "string",
        "prenoms" => "string",
        "nom-commercial" => "string",
        "raison-sociale" => "string",
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
            $this->conditions = " where (";

            $last_key = \array_key_last($data);

            foreach ($data as $key => $value) {

                switch ($key) {
                    case 'uid':
                    case 'nom-commercial':
                    case 'raison-sociale':
                    case 'noms':
                    case 'prenoms':
                        $column_name = self::$correspondances[$key];
                        $this->conditions .= " $column_name LIKE '%$value%' or";
                        break;
                }
                if ($key == $last_key) {

                    $this->conditions = \preg_replace('/\s*or\s*$/', "", $this->conditions);
                    $this->conditions = \preg_replace('/\s*where\s*$/', "", $this->conditions);
                    $this->conditions .= " ) and active_client='1';";
                }
            }
        }
    }
}
