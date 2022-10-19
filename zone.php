<?php

use Base\DataObjByDate;
use Conge\CongesMonthly;
use Cotisation\SmieData;
use Cotisation\CnapsData;
use Salary\CalculateSalaryMonthly;
use Employee\EmployeeBase;
use Cotisation\SmieCotisation;
use Cotisation\CnapsCotisation;

require_once __DIR__ . "/vendor/autoload.php";



// $test = ["2022-01-01" => 200000, "2022-05-01" => 250000, "2023-01-01" => 217000];

$val1 = "2022-03-01";
$val2 = "2022-06-01";

$cnaps_data = [
    "2021-05-01" => [0.01, 0.13, 1800000],
    "2022-05-01" => [0.01, 0.13, 2000000],
    "2020-03-01" => [0.01, 0.13, 1500000],
];
$ostie_data = [
    "2021-05-01" => [0.01, 0.05, 1800000],
    "2022-05-01" => [0.01, 0.05, 2000000],
    "2020-03-01" => [0.01, 0.05, 1500000],
];
$my_sal_base = 2500000;
$data = new CnapsData($cnaps_data);
$data2 = new SmieData($ostie_data);
$test = new CnapsCotisation(2021, 2, $my_sal_base, $data);
$test2 = new SmieCotisation(2021, 2, $my_sal_base, $data2);
// var_dump($test);
echo "<br>";
echo "<br>";

$avantages_data = [
    "maison" => ["logement", 1500000], //500k
    "telephone1" => ["telephone", 200000], //30k
    "telephone2" => ["telephone", 15000], //2.25k
    "assurance maladie" => ["autre", 2000000] //2000k
];
$rakoto = new EmployeeBase(
    "026",
    "RAKOTO",
    "Jean",
    "2022-01-01",
    "DAF",
    "4A",
    $my_sal_base,
    "",
    "OSTIE",
    "3",
    "1",
    $avantages_data
);
$conges_data = new CongesMonthly(2022, 3, $my_sal_base, 2);

// var_dump($rakoto);

$fdp = new CalculateSalaryMonthly(2022, 3, $rakoto, 30, 0, 0, $conges_data, $data, $data2);

// var_dump($rakoto);
// echo "<br>";
// echo "<br>";
var_dump($fdp);
echo "<br>";
echo "<br>";
echo $fdp->sal_base;

// $keys = array_keys($test);
// $timed_keys = [];
// foreach ($keys as $key) {
//     $x = DateTime::createFromFormat("Y-m-d", $key);
//     $timed_keys[] = $x;
// }

// var_dump($timed_keys);
// echo $timed_keys[1]->format("d/m/Y");

// $res = gettype($val1);
// echo $res == "string";

// echo "<br>";
// echo "<br>";
// $a1 = DateTime::createFromFormat("Y-m-d", $val1);
// $a2 = DateTime::createFromFormat("Y-m-d", $val2);
// echo "<br>";

// var_dump($a2 <= $a1);
// echo "<br>";
// echo "<br>";
// $exp = new DataObjByDate($test);
// var_dump($exp);
// echo "<br>";
// echo "<br>";
// echo $exp->get_data("2022-10-06");
// echo "<br>";
// echo "<br>";
// $mydate= new DateTime();
//     $mydate->setTimestamp (\mktime(0,0,0,7,1,2020));
// var_dump($mydate);
// $x = DateTime::createFromFormat("Y-m-d", $val1);
// $y = DateTime::createFromFormat("Y-m-d", $val2);
// var_dump($x);
// echo "<br>";
// echo $x->format("d/m/Y");
// echo "<br>";
// var_dump($y);
