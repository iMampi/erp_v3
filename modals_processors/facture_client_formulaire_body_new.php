<?php
// TODO grab role of user
// TODO : authorization
$base = __DIR__ . "/../elements/facts_clt/facture_client_commande_header_base.html";

$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);

$commercial_input = $xpath->query(".//input[@id='commercial']");
$val = $_SESSION["user"]->name;
$commercial_input[0]->setAttribute("value", $_SESSION["user"]->uid . "//" . $val);

require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_places_name_nolimit.php";
$magasin_select = $xpath->query(".//select[@id='magasin']")[0];
foreach ($all_places_name_nolimit as $values) {
    $option_ = $dom->createElement("option");
    $option_->setAttribute("value", $values["uid"]);
    $option_->appendChild($dom->createTextNode($values["uid"] . "//" . $values["name"]));
    $magasin_select->appendChild($option_);
}

// $inputs = $xpath->query(".//*[contains(@class,'input')]");

// foreach ($inputs as $input) {
//     $input->setAttribute("disabled", '');
// }

// we test something
// $datalists = $xpath->query(".//datalist");
// foreach ($datalists as $datalist) {
//     if ($datalist->getAttribute("id") == "famille-list") {
//         foreach ($all_familles_name as $array) {
//             $option_ = $dom->createElement("option");
//             $option_->setAttribute("value", $array["name"]);
//             $option_->appendChild(
//                 $dom->createTextNode($array["uid"] . " - " . $array["name"])
//             );
//             $datalist->appendChild($option_);
//         }
//     };
//     if ($datalist->getAttribute("id") == "category-list") {
//         foreach ($all_categories_name as $array) {
//             $option_ = $dom->createElement("option");
//             $option_->setAttribute("value", $array["name"]);
//             $option_->appendChild(
//                 $dom->createTextNode($array["uid"] . " - " . $array["name"])
//             );
//             $datalist->appendChild($option_);
//         }
//     }
// }

// echo utf8_decode($dom->saveHTML($dom->documentElement));
echo $dom->saveHTML($dom->documentElement->childNodes[1]);
