<?php
//TODO :delete me
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require __DIR__ . "/dummy.php";
// require __DIR__ . "/../../../el";

$cycle_clt = "client";

$visitable = can_visit($cycle_clt);
$base = __DIR__ . "/../../../elements/tiers/clients/liste_clts_table_001_base.html";

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

// if (can_visit($cycle_clt)) {
if (can_visit($cycle_clt)) {
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
} else {
    $tr_ = $tr_model->cloneNode();

    $td_ = $dom->createElement("td");
    $txt_ = $dom->createTextNode("Nothing for you to see here");
    $td_->appendChild($txt_);
    // TODO : set colspan's number dynamically;
    $td_->setAttribute('colspan', "4");
    $td_->setAttribute('class', "px-5 text-center");
    $tr_->appendChild($td_);
    $tbody_->appendChild($tr_);
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
// echo utf8_decode($dom->saveHTML());
