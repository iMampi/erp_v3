<?php
//TODO :delete me
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

// require __DIR__ . "/dummy.php";
require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_clients_name.php";

$cycle_clt = "client";

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
    foreach ($all_clients as $client) {
        $tr_ = $tr_model->cloneNode(true);

        $id_ = sprintf('%03d', $row_counter);
        $tr_->setAttribute("id", $id_);
        $tbody_->appendChild($tr_);


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
        foreach ($nodes as $client_input) {
            $classes = $client_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("date", $classes_array)) {
                //     $client_input->setAttribute("value", $client[1]);
            } elseif (in_array("uid", $classes_array)) {
                $client_input->setAttribute("value", $client["uid"]);
            } elseif (in_array("clt-name", $classes_array)) {
                if ($client["raison_sociale"]) {
                    $name_value = $client["nom_commercial"] . " / " . $client["raison_sociale"];
                } else {
                    $name_value = $client["noms"] . " " . $client["prenoms"];
                }
                $client_input->setAttribute("value", $name_value);
                // } elseif (in_array("num", $classes_array)) {
                //     $client_input->setAttribute("value", $client[3]);
                // } elseif (in_array("affaire", $classes_array)) {
                //     $client_input->setAttribute("value", $client[4]);
                // } elseif (in_array("total", $classes_array)) {
                //     $client_input->setAttribute("value", $client[5]);
                // } elseif (in_array("detail", $classes_array)) {
                //     // $client_input->setAttribute("value", $client[6]);
                // } elseif (in_array("nd", $classes_array)) {
                //     $option_ = $xpath->query(".//*[(@value='" . $client[6] . "')]", $client_input);
                //     $option_[0]->setAttribute("selected", "true");
            }
        }
    }
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
    $td_->setAttribute('colspan', "4");
    // $td_->setAttribute('rowspan', "2");
    $td_->setAttribute('class', "px-5 text-center");
    $td_2->setAttribute('colspan', "4");
    $td_2->setAttribute('class', "px-5 text-center");
    $tr_->appendChild($td_);
    $tr_2->appendChild($td_2);
    $tbody_->appendChild($tr_);
    $tbody_->appendChild($tr_2);
}
echo utf8_decode($dom->saveHTML($dom->documentElement));
// echo utf8_decode($dom->saveHTML());
