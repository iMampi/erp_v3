<?php
//TODO :delete me
require __DIR__ . "/dummy.php";


$base = __DIR__ . "/../../elements/treso_table_001_row_base.html";

//create first DOM to handle base file
$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));

//create new DOM to receive new tr and to be exported (because table'tag can only exist in table)
$dom_temp_table = new DOMDocument();

//create temp new tbody to make the export easier
$table_ = $dom_temp_table->createElement("table");
$tbody_ = $dom_temp_table->createElement("tbody");
$table_->appendChild($tbody_);

//grap model
$tr_model = $dom->getElementById("row-001");

//we use Xpath to do Queryselector like in JS on the DOM
$xpath = new DOMXPath($dom_temp_table);

$row_counter = 1;

//TODO : temparary for test. to change
foreach ($dummy as $el) {
    $tr_ = $tr_model->cloneNode(true);

    $id_ = sprintf('%03d', $row_counter);
    $tr_->setAttribute("id", $id_);

    //import the newly created row to use it in xpath
    $importedNR = $dom_temp_table->importNode($tr_, true);


    $nodes = $xpath->query(".//*[contains(@class,'input')]", $importedNR);
    foreach ($nodes as $el_input) {
        $classes = $el_input->getAttribute('class');
        $classes_array = explode(" ", $classes);

        if (in_array("date", $classes_array)) {
            $el_input->setAttribute("value", $el[1]);
        } elseif (in_array("uid", $classes_array)) {
            $el_input->setAttribute("value", $el[0]);
        } elseif (in_array("affectation", $classes_array)) {
            $el_input->setAttribute("value", $el[2]);
        } elseif (in_array("ref", $classes_array)) {
            $el_input->setAttribute("value", $el[3]);
        } elseif (in_array("libelle", $classes_array)) {
            $el_input->setAttribute("value", $el[4]);
        } elseif (in_array("decaissement", $classes_array)) {
            $el_input->setAttribute("value", $el[5]);
        } elseif (in_array("encaissement", $classes_array)) {
            $el_input->setAttribute("value", $el[6]);
        }
    }

    //appending the newly created and imported filled row.
    $tbody_->appendChild($importedNR);
    $row_counter++;
}


echo $dom_temp_table->saveHTML($tbody_);
