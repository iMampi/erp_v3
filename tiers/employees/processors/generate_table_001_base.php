<?php

use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_employees_name.php";

$cycle_emp = "employee";

$base = __DIR__ . "/../../../elements/tiers/employees/liste_emps_table_001_base.html";

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



///////////////////////////
if (can_visit($cycle_emp)) {
    foreach ($all_emps as $employee) {
        $tr_ = $tr_model->cloneNode(true);

        $id_ = "row-" . sprintf('%03d', $employee["uid"]);
        $tr_->setAttribute("id", $id_);

        $tbody_->appendChild($tr_);
        // $row_counter++;


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);

        foreach ($nodes as $employee_input) {
            $classes = $employee_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("debut", $classes_array)) {
                $employee_input->setAttribute("value", $employee["debut"]);
            } elseif (in_array("matricule", $classes_array)) {
                $employee_input->setAttribute("value", $employee["matricule"]);
            } elseif (in_array("noms", $classes_array)) {
                $employee_input->setAttribute("value", $employee["noms"]);
            } elseif (in_array("prenoms", $classes_array)) {
                $employee_input->setAttribute("value", $employee["prenoms"]);
            } elseif (in_array("poste", $classes_array)) {
                $employee_input->setAttribute("value", $employee["poste"]);
            } elseif (in_array("poste", $classes_array)) {
                $employee_input->setAttribute("value", $employee["poste"]);
                // if ($client["raison_sociale"]) {
                //     $name_value = $client["nom_commercial"] . " / " . $client["raison_sociale"];
                // } else {
                //     $name_value = $client["noms"] . " " . $client["prenoms"];
                // }
                // $employee_input->setAttribute("value", $name_value);
                // } elseif (in_array("num", $classes_array)) {
                //     $employee_input->setAttribute("value", $client[3]);
                // } elseif (in_array("affaire", $classes_array)) {
                //     $employee_input->setAttribute("value", $client[4]);
                // } elseif (in_array("total", $classes_array)) {
                //     $employee_input->setAttribute("value", $client[5]);
                // } elseif (in_array("detail", $classes_array)) {
                //     // $employee_input->setAttribute("value", $client[6]);
                // } elseif (in_array("nd", $classes_array)) {
                //     $option_ = $xpath->query(".//*[(@value='" . $client[6] . "')]", $employee_input);
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
///////////////////////////

// foreach ($dummy as $el) {
//     $tr_ = $tr_model->cloneNode(true);

//     $id_ = sprintf('%03d', $row_counter);
//     $tr_->setAttribute("id", $id_);
//     $tbody_->appendChild($tr_);


//     $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);
//     foreach ($nodes as $el_input) {
//         $classes = $el_input->getAttribute('class');
//         $classes_array = explode(" ", $classes);

//         if (in_array("date", $classes_array)) {
//             $el_input->setAttribute("value", $el[1]);
//         } elseif (in_array("uid", $classes_array)) {
//             $el_input->setAttribute("value", $el[0]);
//         } elseif (in_array("frnsr", $classes_array)) {
//             $el_input->setAttribute("value", $el[2]);
//         } elseif (in_array("num", $classes_array)) {
//             $el_input->setAttribute("value", $el[3]);
//         } elseif (in_array("affaire", $classes_array)) {
//             $el_input->setAttribute("value", $el[4]);
//         } elseif (in_array("total", $classes_array)) {
//             $el_input->setAttribute("value", $el[5]);
//         } elseif (in_array("detail", $classes_array)) {
//             // $el_input->setAttribute("value", $el[6]);
//         } elseif (in_array("nd", $classes_array)) {
//             $option_ = $xpath->query(".//*[(@value='" . $el[6] . "')]", $el_input);
//             $option_[0]->setAttribute("selected", "true");
//         }
//     }
// }
echo utf8_decode($dom->saveHTML($dom->documentElement));
