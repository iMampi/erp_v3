<?php
// TODO grab role of user
use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

$base = __DIR__ . "/../elements/warehouses/items/item_formulaire_base.html";
if (isset($_SESSION["user"])) {
    if (can_create("item")) {

        $dom = new DOMDocument();
        //to be able to use new html5 tag with DOMDocument
        libxml_use_internal_errors(true);
        $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new DOMXPath($dom);
        echo utf8_decode($dom->saveHTML($dom->documentElement));
    } else {
        echo "<h2> you are not allowed to do this</h2>";
    }
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
