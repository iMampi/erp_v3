<?php
//TODO :delete me
require __DIR__ . "/dummy.php";
// require __DIR__ . "/../../../el";



$base = __DIR__ . "/../../../elements/warehouse/items/liste_items_table_001_base.html";

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

foreach ($dummy as $el) {
    $tr_ = $tr_model->cloneNode(true);

    $id_ = sprintf('%03d', $row_counter);
    $tr_->setAttribute("id", $id_);
    $tbody_->appendChild($tr_);


    $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
    foreach ($nodes as $el_input) {
        $classes = $el_input->getAttribute('class');
        $classes_array = explode(" ", $classes);

        if (in_array("date", $classes_array)) {
            $el_input->setAttribute("value", $el[1]);
        } elseif (in_array("uid", $classes_array)) {
            $el_input->setAttribute("value", $el[0]);
        } elseif (in_array("frnsr", $classes_array)) {
            $el_input->setAttribute("value", $el[2]);
        } elseif (in_array("num", $classes_array)) {
            $el_input->setAttribute("value", $el[3]);
        } elseif (in_array("affaire", $classes_array)) {
            $el_input->setAttribute("value", $el[4]);
        } elseif (in_array("total", $classes_array)) {
            $el_input->setAttribute("value", $el[5]);
        } elseif (in_array("detail", $classes_array)) {
            // $el_input->setAttribute("value", $el[6]);
        } elseif (in_array("nd", $classes_array)) {
            $option_ = $xpath->query(".//*[(@value='" . $el[6] . "')]", $el_input);
            $option_[0]->setAttribute("selected", "true");
        }
    }
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
