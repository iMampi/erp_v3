<?php

use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/authorization_utils.php";

if (isset($_SESSION["user"])) {
    // FIXME : do the correct check
    if (can_create("employee")) {
        // FIXME : do the correct check

        // if (($_SESSION["user"]->authorizations->active == 1) && ($_SESSION["user"]->authorizations->client->create == 1)) {
        // TODO grab role of user
        $base = __DIR__ . "/../elements/tiers/employees/employee_formulaire_base.html";

        $dom = new DOMDocument();
        //to be able to use new html5 tag with DOMDocument
        libxml_use_internal_errors(true);
        $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new DOMXPath($dom);

        $inputs = $xpath->query(".//*[contains(@class,'input')]");

        // disable "uid" field 
        // TODO : optimize make a query instead
        foreach ($inputs as $input) {
            if ((strpos($input->getAttribute("class"), "matricule")) || (strpos($input->getAttribute("class"), "actif"))) {

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