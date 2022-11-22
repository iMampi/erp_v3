<?php

use function Session\can_visit;
use function Session\is_logged;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

$cycle_frnsr = "fournisseur";
is_logged();

?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/fixed-header.js"></script>
    <script src="/js/server-communication.js"></script>
    <script src="/js/toast.js"></script>

    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>liste fournisseurs</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            require_once $_SERVER["DOCUMENT_ROOT"] . '/utilities/login_utils.php';
            $header = generate_logged_header($_SESSION['user']->name, "link-frnsrs");
            echo $header;

            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <?php
                    if (!can_visit($cycle_frnsr)) {
                        // TODO : IMPLEMENT ME CORRECTLY
                        // TODO : create a global variable for those message. maybe a constant to autoload
                        echo "<div id='div-selection' class='row '>
                        <h1 class='text-center'>You cannot visit this page.</h1>
                        <div id='div-btns' class='row '>
                        
                        </div>
                        </div>
                        ";
                    } else {
                        $sub_header = <<<TXT
                        <div id="div-selection" class="row ">
                        <span class="col">nombres de fournisseurs</span>
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
                    TXT;
                        echo $sub_header;
                    }
                    ?>

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
            <!-- modal main new frnsr -->
            <div class="modal fade" id="modal-clt-new" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">créer nouveau client</h5>
                        </div>
                        <div class="modal-body">

                            <div id="new-client-modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                //TODO : change to require once.
                                require_once __DIR__ . "/../../modals_processors/clt_formulaire_body_new.php";
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancel-client-new">annuler</button>
                            <button type="button" class="btn btn-primary" id="save-client-new">Save</button>
                        </div>
                    </div>
                </div>


            </div>
            <!-- end modal main new frnsr -->
            <!-- modal détails frnsr -->
            <div class="modal fade" id="modal-frnsr-detail" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Fiche client</h5>
                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly. 
                                //TODO : change to require once. 
                                require __DIR__ . "/../../elements/tiers/fournisseurs/fournisseur_formulaire_base.html";
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
            <!-- end modal détails frnsr -->
        </div>
        <!-- TOAST  -->

        <div class="toast-container position-fixed top-0 end-0 p-3" id="toast-container"></div>
        <!-- end TOAST  -->


</body>

</html>