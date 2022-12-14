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
    <title>factures fourniseur</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            $base = __DIR__ . "/../elements/header.html";
            $tag_id = "link-facts-frnsr";
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
                        <span class="col">nombres de clients</span>
                        <span class="col">0</span>

                    </div>
                    <div id="div-btns" class="row ">
                        <div class="col-auto me-auto">
                            <button type="button" class="col-auto btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-fam-detail">nouveau</button>
                            <button type="button" class="col-auto btn btn-info me-auto" data-bs-toggle="modal" data-bs-target="#modal-fam-detail">valider</button>
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
            <!-- modal d??tails facture -->
            <div class="modal fade" id="modal-fact-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly. 
                                //TODO : change to require once. 
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_table_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">X</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal d??tails facture -->
            <!-- modal creer fournisseur -->
            <div class="modal fade" id="modal-creer-frnsr" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">cr??ation fournisseur</h5>
                            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->


                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly. 
                                //TODO : change to require once. 
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_table_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-fact-detail">annuler</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end creer fournisseur -->
            <!-- modal creer item -->
            <div class="modal fade" id="modal-creer-item" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">cr??ation article</h5>
                            <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> -->


                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly. 
                                //TODO : change to require once. 
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_table_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-fact-detail">annuler</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end creer item -->
            <!-- modal cr??er affaire -->

            <div class="modal fade" id="modal-creer-affaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">cr??er affaire</h5>



                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                //TODO : change to require once.
                                // require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_affectation_affaire_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                // require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_affectation_affaire_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect-affaire">annuler</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end cr??er  affaire -->
            <!-- modal affectation affaire -->

            <div class="modal fade" id="modal-affect-affaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">affecter ?? une affaire</h5>



                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_affectation_affaire_header_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/facts_frnsr/facture_frnsr_affectation_affaire_details_base.html";
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
            <!-- end modal affectation affaire -->

        </div>
</body>

</html>