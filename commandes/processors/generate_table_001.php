<?php
//TODO :delete me
// require __DIR__ . "/dummy.php";
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";


$cycle_commande = "commande";
// require __DIR__ . "/../../elements/affaires/liste_affaires_table_001_base.html";
$base = __DIR__ . "/../../elements/commandes/liste_commandes_table_001_base.html";

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

if (can_visit($cycle_commande)) {
    require_once __DIR__ . "/../../database/select/all_commandes_header_limit.php";
    foreach ($all_commandes_header_limit as $el) {
        // var_dump($el);
        // break;
        $tr_ = $tr_model->cloneNode(true);

        $tr_->setAttribute("id", "row-" . $el["uid"]);
        $tbody_->appendChild($tr_);


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
        // $options=$xpath->query(".//slect[contains(@class,'state')>option]", $tr_)
        foreach ($nodes as $el_input) {
            // TODO : refactor. since we use all inputs have id
            $classes = $el_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("date", $classes_array)) {
                $el_input->setAttribute("value", $el["date"]);
            } elseif (in_array("uid", $classes_array)) {
                $el_input->setAttribute("value", $el["uid"]);
            } elseif (in_array("totalTTC", $classes_array)) {
                $el_input->setAttribute("value", number_format($el["total_ttc_apres_remise"],2,","," "));
            } elseif (in_array("state", $classes_array)) {
                // $el_input->setAttribute("value", $el["state"]);
                $option = $xpath->query(".//option[@value='" . $el["state"] . "']", $el_input);
                $option[0]->setAttribute("selected", true);
            } elseif (in_array("client", $classes_array)) {

                if (!trim($el['raison_sociale'])) {
                    $el_input->setAttribute("value", $el['client_uid'] . " - " . $el['noms'] . " " . $el['prenoms']);
                } else {
                    $el_input->setAttribute("value", $el['client_uid'] . " - " . $el['raison_sociale'] . " / " . $el['nom_commercial']);
                }
            }
        }
    }
    // echo utf8_decode($dom->saveHTML($dom->documentElement));
} else {
    $tr_ = $tr_model->cloneNode();
    $tr_2 = $tr_model->cloneNode();

    $td_ = $dom->createElement("td");
    $td_2 = $dom->createElement("td");
    $txt_ = $dom->createTextNode("Nothing for you to see here.");
    $txt_2 = $dom->createTextNode("Contact your administrator to change that.");
    $td_->appendChild($txt_);
    $td_2->appendChild($txt_2);
    // TODO : set colspan's number dynamically;
    $td_->setAttribute('colspan', "6");
    // $td_->setAttribute('rowspan', "2");
    $td_->setAttribute('class', "px-5 text-center");
    $td_2->setAttribute('colspan', "6");
    $td_2->setAttribute('class', "px-5 text-center");
    $tr_->appendChild($td_);
    $tr_2->appendChild($td_2);
    $tbody_->appendChild($tr_);
    $tbody_->appendChild($tr_2);
}
echo $dom->saveHTML($dom->documentElement);
