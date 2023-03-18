<?php
// TODO grab role of user
$base = __DIR__ . "/../elements/warehouses/items/item_filter_advanced.html";

$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$xpath = new DOMXPath($dom);

// $inputs = $xpath->query(".//*[contains(@class,'input')]");

// foreach ($inputs as $input) {
//     $input->setAttribute("disabled", '');
// }



$datalists = $xpath->query(".//datalist");
foreach ($datalists as $datalist) {
    if ($datalist->getAttribute("id") == "famille-list") {
        foreach ($all_familles_name as $array) {
            $option_ = $dom->createElement("option");
            $option_->setAttribute("value", $array["name"]);
            $option_->appendChild(
                $dom->createTextNode($array["uid"] . " - " . $array["name"])
            );
            $datalist->appendChild($option_);
        }
    };
    if ($datalist->getAttribute("id") == "category-list") {
        foreach ($all_categories_name as $array) {
            $option_ = $dom->createElement("option");
            $option_->setAttribute("value", $array["name"]);
            $option_->appendChild(
                $dom->createTextNode($array["uid"] . " - " . $array["name"])
            );
            $datalist->appendChild($option_);
        }
    }
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
