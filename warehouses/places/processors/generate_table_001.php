<?php
//TODO :delete me
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_places_name_limit.php";

$cycle_places = "magasin";


$base = __DIR__ . "/../../../elements/warehouses/places/liste_places_table_001_base.html";

//create first DOM to handle base file
$dom = new DOMDocument("1.0", "utf-8");
//to be able to use new html5 tag with DOMDocument
// libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$tbody_ = $dom->getElementsByTagName("tbody")[0];
$tr_model = $dom->getElementById("row-001");
$tbody_->removeChild($tr_model);
$xpath = new DOMXPath($dom);

// $row_counter = 1;

// var_dump($all_places_name_limit);
if (can_visit($cycle_places)) {

    foreach ($all_places_name_limit as $el) {
        $tr_ = $tr_model->cloneNode(true);

        // $id_ = "row-" . sprintf('%03d', $row_counter);
        // $tr_->setAttribute("id", $id_);
        $tbody_->appendChild($tr_);


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
        foreach ($nodes as $el_input) {

            $id_ = "row-" . sprintf('%03d', $el["uid"]);
            $tr_->setAttribute("id", $id_);


            $classes = $el_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("date", $classes_array)) {
                $el_input->setAttribute("value", $el[1]);
            } elseif (in_array("uid", $classes_array)) {
                $el_input->setAttribute("value", $el["uid"]);
            } elseif (in_array("name", $classes_array)) {
                $el_input->setAttribute("value", $el["name"]);
            } elseif (in_array("adress", $classes_array)) {
                $el_input->setAttribute("value", $el["adresse"]);
            } elseif (in_array("phone", $classes_array)) {
                $el_input->setAttribute("value", $el['phone']);
            }
        }
    }
}
// echo utf8_encode($dom->saveHTML($dom->documentElement));
$stoper = $dom->saveHTML($dom->documentElement);
echo $stoper;
