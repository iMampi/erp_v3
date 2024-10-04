<?php
//TODO :delete me
require __DIR__ . "/dummy.php";



$base = __DIR__ . "/../../elements/facts_frnsr/liste_facts_frnsr_table_001_base.html";

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
require_once __DIR__ . "/../../database/select/all_factures_fournisseur_header_limit.php";
foreach ($all_factures_fournisseur_header_limit as $el) {
    $tr_ = $tr_model->cloneNode(true);

    $id_ = sprintf('%03d', $row_counter);
    $tr_->setAttribute("id", $id_);
    $tbody_->appendChild($tr_);


    $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
    foreach ($nodes as $el_input) {
        $classes = $el_input->getAttribute('class');
        $classes_array = explode(" ", $classes);

        if (in_array("date", $classes_array)) {
            $el_input->setAttribute("value", $el["date"]);
        } elseif (in_array("num-facture", $classes_array)) {
            $el_input->setAttribute("value", $el["num_facture"]);
        } elseif (in_array("facture-uid", $classes_array)) {
            $el_input->setAttribute("value", $el["uid"]);
        } elseif (in_array("fournisseur", $classes_array)) {
            if (!trim($el['raison_sociale'])) {
                $el_input->setAttribute("value", $el['fournisseur_uid'] . " - " . $el['noms'] . " " . $el['prenoms']);
            } else {
                $el_input->setAttribute("value", $el['fournisseur_uid'] . " - " . $el['raison_sociale'] . " / " . $el['nom_commercial']);
            }
        } elseif (in_array("total", $classes_array)) {
            $el_input->setAttribute("value", $el["total_ttc_apres_remise"]);
        } elseif (in_array("detail", $classes_array)) {
            // $el_input->setAttribute("value", $el[6]);
        } elseif (in_array("nd", $classes_array)) {
            $option_ = $xpath->query(".//*[(@value='" . $el["state"] . "')]", $el_input);
            $option_[0]->setAttribute("selected", "true");
        }
        $row_counter += 1;
    }
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
