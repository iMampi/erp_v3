<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>magasin</title>

</head>

<body>
    <div id="main-container" class="container">
        <nav id="header-top" class="sticky-top bg-light-blue">
            <?php
            $base = __DIR__ . "/../../elements/header.html";
            $tag_id = "link-places";
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
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'articles</span>
                        <span class="col">0</span>

                        <button type="button" class="col">exporter</button>


                    </div>

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
        <!-- TABLEAU -->
        <!-- FIXME width resopnse, class of this table. prendre fact fnsr comme reeference -->
        <div class="row ">
            <div class="
            ">
                <table class="table table-hover" id="table-001">
                    <?php
                    require_once __DIR__ . '/processors/generate_table_001_base.php';
                    ?>

                </table>
            </div>
        </div>
        <!-- modal détails magasin -->
        <div class="modal fade" id="modal-place-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style>
            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
            <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
            <div class="modal-dialog modal-xl modal-dialog-scrollable ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Fiche magasin</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../../elements/warehouse/places/place_formulaire_base.html";
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
                        <button type="button" class="btn btn-danger">supprimer</button>
                        <button type="button" class="btn btn-info">statistique</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">X</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal détails magasin -->
    </div>
</body>

</html>