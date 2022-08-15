<?php

$base = __DIR__ . "/../../elements/treso_table_000_base.html";
$dom = new DOMDocument();
//to be able to use new html5 tag with DOMDocument
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
// $tables = $dom->getElementById("table-000");
echo utf8_decode($dom->saveHTML($dom->documentElement));
