<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>factures fournisseur</title>

</head>

<body>
    <div id="main-container" class="container px-0
    ">
        <nav id="header-top" class="sticky-top bg-light-blue w-100
        ">
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
            <div class="container-fluid position-relative">
                <div class="">
                    <div id="div-selection" class="row ">
                        <span class="col">mois</span>
                        <select name="mois" id="mois" class="col  ">
                            <option value="all">Toute l'année</option>
                            <option value="1">Janvier</option>
                            <option value="2">Février</option>
                            <option value="3">mars</option>
                            <option value="4">avril</option>
                            <option value="5">mai</option>
                            <option value="6">juin</option>
                            <option value="7">juillet</option>
                            <option value="8">août</option>
                            <option value="9">septembre</option>
                            <option value="10">octobre</option>
                            <option value="11">novembre</option>
                            <option value="12">décembre</option>
                        </select>
                        <button type="button" class="col">exporter</button>
                    </div>
                    <div class="row">
                        <span class="col">nombre factures</span><span class="col">0,00</span>
                    </div>
                    <div class="row">
                        <span class="col">total factures</span><span class="col">0,00</span>
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

        <!-- table -->
        <div class="row">
            <div id="table-here">
                <?php
                require_once __DIR__ . '/processors/generate_table_001.php';
                ?>
            </div>
        </div>
        <!-- Modal -->
        <!-- modal détails facture -->
        <div class="modal fade" id="modal-fact-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-dialog modal-dialog-scrollable">
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
        <!-- end modal détails facture -->
        <!-- modal creer fournisseur -->
        <div class="modal fade" id="modal-creer-frnsr" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">création fournisseur</h5>
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
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">création article</h5>
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
        <!-- modal créer affaire -->

        <div class="modal fade" id="modal-creer-affaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable ">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer affaire</h5>



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
        <!-- end créer  affaire -->
        <!-- modal affectation affaire -->

        <div class="modal fade" id="modal-affect-affaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable ">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">affecter à une affaire</h5>



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