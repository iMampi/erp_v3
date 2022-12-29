<?php

use function Session\can_create;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

require_once $_SERVER["DOCUMENT_ROOT"] . "/utilities/authorization_utils.php";

if (isset($_SESSION["user"])) {
    // FIXME : do the correct check
    if (can_create("fournisseur")) {
        // FIXME : do the correct check

        // if (($_SESSION["user"]->authorizations->active == 1) && ($_SESSION["user"]->authorizations->client->create == 1)) {
        // TODO grab role of user
        $base = __DIR__ . "/../elements/tiers/fournisseurs/fournisseur_formulaire_base.html";

        $dom = new DOMDocument();
        //to be able to use new html5 tag with DOMDocument
        libxml_use_internal_errors(true);
        $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
        $xpath = new DOMXPath($dom);

        $inputs = $xpath->query(".//*[contains(@class,'input')]");

        // load  human client  fields as default
        // $modulable_div = $dom->getElementById("div-modulable");
        $ref_row = $dom->getElementById("ref-row");

        $human_html = $_SERVER["DOCUMENT_ROOT"] . "/elements/tiers/fournisseurs/human.html";

        $dom_modulable = new DOMDocument();
        libxml_use_internal_errors(true);
        $dom_modulable->loadHTMLFile(mb_convert_encoding($human_html, 'HTML-ENTITIES', 'UTF-8'));

        $new_node = $dom->importNode($dom_modulable->documentElement, true);
        $ref_row->parentNode->insertBefore($new_node, $ref_row->nextElementSibling);
        // $modulable_div->appendChild($new_node);

        // disable "uid" field 
        // TODO : optimize make a query instead
        foreach ($inputs as $input) {
            if ($input->getAttribute("id") == "uid") {
                $input->setAttribute("disabled", "");
            }
        }
        echo utf8_decode($dom->saveHTML($dom->documentElement));
    } else {
        echo "<h2> you are not allowed to do this</h2>";
    }
}
