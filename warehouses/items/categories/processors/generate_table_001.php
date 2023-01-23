<?php
//TODO :delete me
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_categories_name.php";

$base = __DIR__ . "/../../../../elements/warehouses/items/categories/liste_categories_table_001_base.html";

$cycle_categorie = "categorie";
//create first DOM to handle base file
$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$tbody_ = $dom->getElementsByTagName("tbody")[0];
$tr_model = $dom->getElementById("row-001");
$tbody_->removeChild($tr_model);
$xpath = new DOMXPath($dom);

$row_counter = 1;
if (can_visit($cycle_categorie)) {

    foreach ($all_categories_name as $categorie) {
        $tr_ = $tr_model->cloneNode(true);

        $id_ = sprintf('%03d', $categorie["uid"]);
        $tr_->setAttribute("id", "row-" . $id_);

        if ($categorie["active"] == "0") {
            $tr_->setAttribute("class", $tr_->getAttribute("class") . " collapse-row");
        }

        $tbody_->appendChild($tr_);


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
        foreach ($nodes as $el_input) {
            $classes = $el_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("uid", $classes_array)) {
                $el_input->setAttribute("value", $categorie["uid"]);
            } elseif (in_array("name", $classes_array)) {
                $el_input->setAttribute("value", $categorie["name"]);
            } elseif (in_array("active", $classes_array)) {
                $el_input->setAttribute("value", $categorie["active"]);
            }
        }
    }
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
