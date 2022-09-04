<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>Tréso</title>

</head>

<body>
    <div id="main-container" class="container">
        <nav id="header-top" class="sticky-top bg-light-blue">
            <?php
            $base = __DIR__ . "/../elements/header.html";
            $tag_id = "link-tresos";
            $dom = new DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTMLFile(mb_convert_encoding($base, 'HTML-ENTITIES', 'UTF-8'));
            $link = $dom->getElementById($tag_id);
            $classes = $link->getAttribute("class");
            $classes .= " active";
            $link->setAttribute("class", $classes);
            echo utf8_decode($dom->saveHTML($dom->documentElement));
            ?>
            <div id="header-body" class="container-fluid position-relative my-3">
                <div class="">
                    <div id="div-selection" class="row ">
                        <span class="col">trésorerie</span>
                        <select name="bank" id="bank" class="col">
                        </select>

                        <span class="col">mois</span>
                        <select name="mois" id="mois" class="col">
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
                        <span class="col">solde début du mois</span><span class="col">0,00</span>
                    </div>
                    <div class="row">
                        <span class="col">total décaissement</span><span class="col">0,00</span>
                    </div>
                    <div class="row">
                        <span class="col">total encaissement</span><span class="col">1 000,00</span>
                    </div>
                    <div class="row">
                        <span class="col">solde fin du mois</span><span class="col">1 000,00</span>
                    </div>
                    <div class="row">
                        <span class="col">rapprochement</span><input type="text" class="col"><span class="col">etat rapprochement</span>
                    </div>
                </div>
                <button type="button" class="col btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-filter">filter</button>

            </div>
            <div class="row">
                <div id="table-here">
                    <?php
                    require_once __DIR__ . '/processors/generate_table_000.php';
                    ?>

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
                    require_once __DIR__ . "/processors/generate_table_001_rows.php";
                    ?>

                </table>
            </div>
        </div>
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
        <!-- modal affectation -->

        <div class="modal fade" id="modal-affect" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">affecter à une facture/document</h5>
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
        <!-- end modal affectation -->
        <!-- modal creer new type affect -->
        <div class="modal fade" id="modal-creer-type-affect" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau type d'affectation</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            require __DIR__ . "/../elements/others/affect_base.html";
                            ?>
                        </div>
                        <!-- TODO : to elete. we gonna use only JS here -->
                        <div id="modal-body-table">
                            <?php
                            //TODO : change to require once.
                            // require __DIR__ . "/../elements/treso_affectation_affaire_details_base.html";
                            ?>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal creer new type affect-->
        <!-- modal creer new tiers -->
        <!-- TODO : formulaire en fonction du tiers sélectionner -->
        <div class="modal fade" id="modal-creer-tiers-affect" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau tiers</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr

                            require __DIR__ . "/../elements/tiers/fournisseurs/fournisseur_formulaire_base.html";                            ?>
                        </div>
                        <!-- TODO : to elete. we gonna use only JS here -->
                        <div id="modal-body-table">
                            <?php
                            //TODO : change to require once.
                            // require __DIR__ . "/../elements/treso_affectation_affaire_details_base.html";
                            ?>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal creer new tiers-->
        <!-- modal creer new doc -->
        <!-- TODO : formulaire en fonction du tiers sélectionner -->
        <div class="modal fade" id="modal-creer-doc" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau document</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- TODO : change annule bs-target according to which btn opened modal  -->
        <!-- end modal creer new doc-->
        <!-- modal creer new article -->
        <div class="modal fade" id="modal-creer-item" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau document</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal creer new article-->
        <!-- modal affect affaire -->
        <div class="modal fade" id="modal-creer-affaire" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau document</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal affect affaire-->
        <!-- modal creer categorie item -->
        <div class="modal fade" id="modal-creer-cat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau document</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- end modal creer categorie item-->
        <!-- modal creer categorie item -->
        <div class="modal fade" id="modal-creer-cat" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

            <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">

            </button>
            <div class="modal-dialog modal-dialog-scrollable modal-lg">

                <div class="modal-content">

                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">créer un nouveau document</h5>
                    </div>
                    <div class="modal-body">

                        <div id="modal-body-heads">
                            <?php
                            //TODO : make the header of factures in details readonly
                            //TODO : change to require once.
                            // if founisseur then this, if client then that, if social, then another one
                            // for the purpose of development, we gonna use only factures frnsr
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
                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modal-affect">annuler</button>
                        <button type="button" class="btn btn-primary">Save</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- modal creer categorie item -->
    </div>
</body>

</html>