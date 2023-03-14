<?php
//TODO :delete me
use function Session\can_visit;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/database/select/all_items_name.php";

$cycle_item = "item";


$base = __DIR__ . "/../../../elements/warehouses/items/liste_items_table_001_base.html";


$TYPE_ITEM = ["0" => "service", "1" => 'bien'];
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

if (can_visit($cycle_item)) {
    foreach ($all_name as $item) {
        // echo "itesm";
        // var_dump($item);
        $tr_ = $tr_model->cloneNode(true);


        //using uid here
        // $id_ = "row-" . sprintf('%03d', $item["uid"]);
        //but for item we prefer using code
        $id_ = "row-" . $item["code"];
        $tr_->setAttribute("id", $id_);

        $tbody_->appendChild($tr_);


        $nodes = $xpath->query(".//*[contains(@class,'input')]", $tr_);

        foreach ($nodes as $item_input) {
            $classes = $item_input->getAttribute('class');
            $classes_array = explode(" ", $classes);

            if (in_array("date", $classes_array)) {
                //     $client_input->setAttribute("value", $client[1]);
            } elseif (in_array("code", $classes_array)) {
                $item_input->setAttribute("value", $item["code"]);
            } elseif (in_array("name", $classes_array)) {
                $item_input->setAttribute("value", $item["name"]);
            } elseif (in_array("type", $classes_array)) {
                $item_input->setAttribute("value", $TYPE_ITEM[$item["type_item"]]);
            } elseif (in_array("category", $classes_array)) {
                $item_input->setAttribute("value", $all_categories_name[\intval($item["category_uid"]) - 1]["name"]);
            } elseif (in_array("famille", $classes_array)) {
                $item_input->setAttribute("value", $all_familles_name[\intval($item["family_uid"]) - 1]["name"]);
            } elseif (in_array("prix-vente", $classes_array)) {
                $item_input->setAttribute("value", $item["prix_vente"]);
            } elseif (in_array("pamp", $classes_array)) {
                $item_input->setAttribute("value", $item["prix_achat_mp"]);
            } elseif (in_array("declarable", $classes_array)) {
                $item_input->setAttribute("value", $item["declarable"]);
                ////////////////////////////////
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
            }
        }
    }
} else {
    // TODO : fix the classs in the base
    // $tr_ = $tr_model->cloneNode(true);
    // $tr_2 = $tr_model->cloneNode(true);
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
