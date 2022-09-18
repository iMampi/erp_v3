<?php
require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/authorization_utils.php";
$cycle = "client";
if (isset($_SESSION["user"])) {
    echo "you are loggd in <br>";
    if (authorized($_SESSION["user"]->authorizations, $cycle, "create")) {
        // if (($_SESSION["user"]->authorizations->active == 1) && ($_SESSION["user"]->authorizations->client->create == 1)) {
        // TODO grab role of user
        $base = __DIR__ . "/../elements/tiers/clients/client_formulaire_base.html";

        $dom = new DOMDocument();
        //to be able to use new html5 tag with DOMDocument
        libxml_use_internal_errors(true);
        $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new DOMXPath($dom);

        $inputs = $xpath->query(".//*[contains(@class,'input')]");

        foreach ($inputs as $input) {
            if (strpos($input->getAttribute("class"), "uid")) {

                $input->setAttribute("disabled", '');
            }
        }
        echo utf8_decode($dom->saveHTML($dom->documentElement));
    } else {
        echo "<h2> you are not allowed to do this</h2>";
    }
}
// // TODO grab role of user
// $base = __DIR__ . "/../elements/tiers/clients/client_formulaire_base.html";

// $dom = new DOMDocument();
// //to be able to use new html5 tag with DOMDocument
// libxml_use_internal_errors(true);
// $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
// $xpath = new DOMXPath($dom);

// $inputs = $xpath->query(".//*[contains(@class,'input')]");

// foreach ($inputs as $input) {
//     if (strpos($input->getAttribute("class"), "uid")) {

//         $input->setAttribute("disabled", '');
//     }
// }
// echo utf8_decode($dom->saveHTML($dom->documentElement));