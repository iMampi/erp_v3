<?php
// TODO grab role of user
use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once __DIR__ . '/../database/select/all_categories_name_nolimit.php';


require_once __DIR__ . '/../database/select/all_familles_name_nolimit.php';


$base = __DIR__ . "/../elements/warehouses/items/item_formulaire_base.html";
if (isset($_SESSION["user"])) {
    if (can_create("item")) {

        $dom = new DOMDocument();
        //to be able to use new html5 tag with DOMDocument
        libxml_use_internal_errors(true);
        $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new DOMXPath($dom);

        $ul_famille = $xpath->query("//ul[@id='famille-dropdown']")[0];
        $ul_categorie = $xpath->query("//ul[@id='categorie-dropdown']")[0];



        foreach ($all_familles_name as $array) {
            $li_ = $dom->createElement("li");
            $li_->setAttribute("class", "result");
            $a_ = $dom->createElement("a");
            $a_->appendChild(
                $dom->createTextNode($array["uid"] . "//" . $array["name"])
            );
            $a_->setAttribute("class", "dropdown-item fst-italic search-result ");
            $a_->setAttribute("href", "#");
            $li_->appendChild($a_);
            $ul_famille->appendChild($li_);
        }
        foreach ($all_categories_name as $array) {
            $li_ = $dom->createElement("li");
            $li_->setAttribute("class", "result");
            $a_ = $dom->createElement("a");
            $a_->appendChild(
                $dom->createTextNode($array["uid"] . "//" . $array["name"])
            );
            $a_->setAttribute("class", "dropdown-item fst-italic search-result");
            $a_->setAttribute("href", "#");
            $li_->appendChild($a_);
            $ul_categorie->appendChild($li_);
        }
        // echo $domfamille->saveHTML();



        echo $dom->saveHTML($dom->documentElement);
    } else {
        echo "<h2> you are not allowed to do this</h2>";
    }
}

$domfamille = new DOMDocument();
// to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);


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
