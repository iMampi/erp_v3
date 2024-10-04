<?php

namespace Database\Special;

use function Database\Special\check_available_stock;
use function Database\Special\check_identifiables;

require_once __DIR__ . "/../../../vendor/autoload.php";

class PrepareCommandeItems
{
    public array $identifiables_to_check = [];
    public array $stock_to_check = [];
    public array $row_items;

    public function __construct(array $array_of_items)
    {
        $this->row_items = $array_of_items;
        // $this->stock_to_check = [];
        // $this->identifiables_to_check = [];
    }

    public function prepare_stockables_and_identifiables()
    {
        foreach ($this->row_items as $array_values) {
            // stockable?
            if ($array_values[7] && $array_values[8]) {
                if ($array_values[2] == 0) {
                    continue;
                }
                // item alredy listed?
                if (!array_key_exists($array_values[1], $this->stock_to_check)) {
                    $this->stock_to_check[$array_values[1]] = 0;
                }
                // add to quantity
                $this->stock_to_check[$array_values[1]] += $array_values[2];
                // identifiable? 
                if ($array_values[6]) {

                    // item already listed?
                    if (!array_key_exists($array_values[1], $this->identifiables_to_check)) {
                        $this->identifiables_to_check[$array_values[1]] = [];
                    }
                    // num-serie already listed?
                    if (!in_array($array_values[4], $this->identifiables_to_check[$array_values[1]])) {
                        $this->identifiables_to_check[$array_values[1]][] = $array_values[4];
                        $test = check_identifiables($array_values[1], $array_values[4]);
                        if ($test[0] === false) {
                            print(json_encode($test));
                            return;
                        }
                    } else {
                        print(json_encode([false, [["num serie double//" . $array_values[4]]]]));
                        return;
                    }
                }
            }
        }
    }

    public function check_stocks()
    {
        foreach ($this->stock_to_check as $code => $quantity) {
            // TODO : insert directlu $teste in the if condition
            $teste = check_available_stock($code, $quantity);
            if ($teste[0] === \false) {
                print(json_encode($teste));
                return;
            }
        }
    }
}
