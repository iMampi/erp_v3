<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/fixed-header.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>affaires</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            $base = __DIR__ . "/../elements/header.html";
            $tag_id = "link-affaires";
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
            $link = $dom->getElementById($tag_id);
            $classes = $link->getAttribute("class");
            $classes .= " active";
            $link->setAttribute("class", $classes);
            echo utf8_decode($dom->saveHTML($dom->documentElement));
            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'affaires total</span>
                        <span class="col">0</span>

                    </div>
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'affaires en cours</span>
                        <span class="col">1</span>

                    </div>
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'affaires transformés</span>
                        <span class="col">2</span>

                    </div>
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'affaires annulés</span>
                        <span class="col">3</span>

                    </div>
                    <div id="div-selection" class="row ">
                        <div class="col-auto me-auto">
                            <button type="button" class="col-auto btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-aff-new">nouveau</button>

                        </div>
                        <div class="col-auto justify-content-end">
                            <button type="button" class="col-auto btn btn-info me-auto" data-bs-toggle="modal" data-bs-target="#modal-filter">filtrer</button>
                            <button type="button" class="col-auto btn btn-info ">exporter</button>
                        </div>

                    </div>
                </div>
            </div>
            <!-- </div> -->
            <!-- TABLEAU -->
            <!-- FIXME width resopnse, class of this table. prendre fact fnsr comme reeference -->
            <div id="table-container" class="row position-relative">
                <div class="px-0
            ">
                    <div class="
            ">
                        <?php
                        require_once __DIR__ . '/processors/generate_table_001.php';
                        ?>

                    </div>
                </div>
            </div>
            <!-- END TABLEAU -->

            <!-- modal filter -->
            <div class="modal fade" id="modal-filter" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Filtrer</h5>
                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/treso_affectation_affaire_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/treso_affectation_affaire_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">annuler</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal filter -->
            <!-- modal détails  -->
            <div class="modal fade" id="modal-details" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">détails affaire</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../elements/affaires/affaires_header_base.html";
                            ?>
                            <!-- </div> -->
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <!-- <div id="modal-body-table"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../elements/affaires/affaires_table_details_base.html";
                            ?>
                            <!-- </div> -->
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
            <!-- end modal détails -->
            <!-- modal see client's details -->
            <div class="modal fade" id="modal-clt-details" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">fiche client</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../elements/tiers/clients/client_formulaire_base.html";
                            ?>
                            <!-- </div> -->
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <!-- <div id="modal-body-table"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            // require __DIR__ . "/../elements/affaires/affaires_table_details_base.html";
                            ?>
                            <!-- </div> -->
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
            <!-- end modal see client's details -->
            <!-- modal new client -->
            <div class="modal fade" id="modal-clt-new" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">création nouveau client</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../elements/tiers/clients/client_formulaire_base.html";
                            ?>
                            <!-- </div> -->
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <!-- <div id="modal-body-table"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            // require __DIR__ . "/../elements/affaires/affaires_table_details_base.html";
                            ?>
                            <!-- </div> -->
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
            <!-- end modal new client -->
            <!-- modal new item -->
            <div class="modal fade" id="modal-item-new" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">création nouvel article</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../elements/tiers/clients/client_formulaire_base.html";
                            ?>
                            <!-- </div> -->
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <!-- <div id="modal-body-table"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            // require __DIR__ . "/../elements/affaires/affaires_table_details_base.html";
                            ?>
                            <!-- </div> -->
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
            <!-- end modal new item -->
        </div>

    </div>
</body>

</html>