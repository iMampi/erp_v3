<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>liste employés</title>

</head>

<body>
    <div id="main-container" class="container px-0
    ">
        <nav id="header-top" class="sticky-top bg-light-blue w-100
        ">
        <?php
            $base = __DIR__ . "/../../elements/header.html";
            $tag_id = "link-emps";
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
            $link = $dom->getElementById($tag_id);
            $classes = $link->getAttribute("class");
            $classes .= " active";
            $link->setAttribute("class", $classes);
            echo utf8_decode($dom->saveHTML($dom->documentElement));
            ?>
            <div class="container-fluid position-relative">
                <div class="">

                </div>
                <div class="accordion row" id="filter-container">
                    <div class="accordion-item px-0">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                Filtres
                            </button>
                        </h2>
                        <div id="collapseOne" class="accordion-collapse collapse " aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                Insert filter fields here
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <!-- table -->
        <div class="row">
            <div id="table-here">
                <?php
                require_once __DIR__ . '/processors/generate_table_001.php';
                ?>
            </div>
        </div>
        <!-- modal détails facture -->
        <div class="modal fade" id="modal-emp-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Fiche client</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../../elements/tiers/employees/employee_formulaire_base.html";
                            ?>
                        </div>
                        <!-- TODO : to elete. we gonna use only JS here -->
                        <div id="modal-body-table">
                            <?php
                            //TODO : change to require once.
                            // require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_table_details_base.html";
                            ?>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info">Statistique</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">X</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal détails facture -->
    </div>
</body>

</html>