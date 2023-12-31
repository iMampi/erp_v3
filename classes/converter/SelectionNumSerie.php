<?php
// FIXME : c'est redondant avec newclient. on peut amméliorer
// declare(strict_types=1);

namespace Converter;

use Database\Special\QueryFilterConditionsConstructor;

class SelectionNumSerie extends Converter
{
    //code is item_code
    static private  array $correspondances = [
        "code" => "item_code",
        "num-serie" => "num_serie"
    ];

    static private  array $fields_types = [
        "code" => "string",
        "num-serie" => "string"
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
                    case 'code':
                    case 'num-serie':
                        $column_name = self::$correspondances[$key];
                        $this->conditions .= " $column_name LIKE '%$value%' and";
                        break;
                }
                if ($key == $last_key) {
                    $this->conditions = \preg_replace('/\s*and\s*$/', "", $this->conditions);
                    $this->conditions = \preg_replace('/\s*where\s*$/', "", $this->conditions);
                    $this->conditions .= " and actif='1'";
                }
            }
        }
    }
}
