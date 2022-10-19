<?php
require_once __DIR__ . "/vendor/autoload.php";
require_once "./zone.php";

$fields = [
    "year",
    "month",
    "matricule",
    "noms",
    "prénoms",
    "début du contrat",
    "fin du contrat",
    "poste",
    "catégorie socio-professionelle",
    "salaire de base",
    "temps",
    "congés",
    "salaire prorata",
    "indemnités de congés",
    "avantages",
    "primes",
    "salaire brut",
    "salaire imposable",
    "cnaps",
    "smie"
];


$conversion = [
    "year" => $fdp->year,
    "month" => $fdp->month,
    "matricule" => $fdp->EmployeeBase->matricule,
    "noms" => $fdp->EmployeeBase->noms,
    "prénoms" => $fdp->EmployeeBase->prenoms,
    "début du contrat" => $fdp->EmployeeBase->debut,
    "fin du contrat" => $fdp->EmployeeBase->fin,
    "poste" => $fdp->EmployeeBase->poste,
    "catégorie socio-professionelle" => $fdp->EmployeeBase->csp,
    "salaire de base" => \number_format($fdp->sal_base, 2),
    "temps" => $fdp->temps - $fdp->conges_consommes,
    "congés" => $fdp->conges_consommes,
    "salaire prorata" => \number_format($fdp->sal_prorata, 2),
    "indemnités de congés" => \number_format($fdp->indemnites_conges,2),
    "avantages" => \number_format($fdp->avantages->montant_brut, 2),
    "primes" => \number_format($fdp->prime, 2),
    "salaire brut" => \number_format($fdp->sal_brut, 2),
    "salaire imposable" => \number_format($fdp->sal_imposable_avant_cot, 2),
    "cnaps" => \number_format($fdp->cot_cnaps, 2),
    "smie" => \number_format($fdp->cot_smie, 2)
];

$base = "./salaryfdp.html";

$dom = new DOMDocument();
libxml_use_internal_errors(true);
$dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
$table = $dom->createElement("table");
$thead = $dom->createElement("thead");
$tbody = $dom->createElement("tbody");
$tr0 = $dom->createElement("tr");

// fill headers
$thead->appendChild($tr0);
foreach ($fields as $value) {
    $td_ = $dom->createElement("td");
    $text_ = $dom->createTextNode($value);
    $td_->appendChild($text_);
    $tr0->appendChild($td_);
}

//fill tables data
$tr1 = $dom->createElement("tr");
$tbody->appendChild($tr1);
foreach ($fields as $value) {
    $td_ = $dom->createElement("td");
    $text_ = $dom->createTextNode($conversion[$value]);
    $td_->appendChild($text_);
    $tr1->appendChild($td_);
}


$tr0 = $dom->createElement("tr");

$table->appendChild($thead);
$table->appendChild($tbody);

$dom->appendChild($table);

echo utf8_decode($dom->saveHTML());
