<?php

use function Session\can_visit;
use function Session\is_logged;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

$cycle_item = "item";
$cycle_commande = "commande";
$cycle_facture_client = "facture_client";
is_logged();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/luxon.min.js"></script>
    <script src="/js/helpers.js"></script>

    <script src="/js/fixed-header.js" defer></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <script src="/js/server-communication.js"></script>

    <script src="/js/confirmation.js" defer></script>
    <script src="/js/toast.js" defer></script>
    <script src="/js/avoir-clt-main.js" defer></script>
    <?php
    echo "<script> const currentUser =\"" . $_SESSION["user"]->uid . "//" . $_SESSION["user"]->name . "\";</script>;" ?>
    <link rel="stylesheet" href="/style/mampi.css">
    <title>avoir client</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            require_once $_SERVER["DOCUMENT_ROOT"] . '/utilities/login_utils.php';
            $header = generate_logged_header($_SESSION['user']->name, "link-avoirs-clt");
            echo $header;
            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <?php
                    // if (!can_visit($cycle_item)) {
                    if (!can_visit("avoir_client")) {
                        // TODO : IMPLEMENT ME CORRECTLY
                        // TODO : create a global variable for those message. maybe a constant to autoload
                        // ob_start();
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_cannot_visit.html';
                    } else {
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_avoirs_clt.html';
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_div_btns.html';
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
            <!-- END TABLEAU -->
            <!-- modal choose type new avoir-->
            <div class="modal fade" id="modal-choose-new" tabindex="-1">

                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">nouvel avoir</h5>
                        </div>
                        <div class="modal-body">

                            <div id="new-modal-body-heads ">
                                <div class="col-auto mb-3 d-flex  justify-content-center align-items-center gap-3">
                                    <button type="button" id="btn-avoir-facture" class="btn btn-primary">à partir d'une facture</button>
                                    <button type="button" id="btn-avoir-no-base" class="btn btn-primary">sans base</button>
                                </div>

                                <!-- TODO : to delete. we gonna use only JS here -->
                                <div id="new-modal-body-table">

                                </div>
                            </div>
                            <div class="modal-footer d-flex flex-row justify-content-start">
                                <button type="button" id="btn-cancel" class="btn btn-secondary">X</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal choose type new avoir-->
            <!-- modal avoir new -->
            <div class="modal fade bg-confirmation" id="modal-avoir-new-based" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xxl-down">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">nouvel avoir</h5>
                        </div>
                        <div class="modal-body">

                            <div id="new-modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                require __DIR__ . "/../modals_processors/avoir_formulaire_body_new.php";
                                ?>
                            </div>
                            <!-- TODO : to delete. we gonna use only JS here -->
                            <div id="new-modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../modals_processors/avoir_formulaire_body_table_read_only.php";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <?php
                            require_once __DIR__ . "/../modals_processors/buttons_footer_new_avoir.php";
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal avoir new -->
            <!-- modal détails  -->
            <div class="modal fade" id="modal-details" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
                <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
                <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xxl-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">détails affaire</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../modals_processors/facture_client_formulaire_body_read_only.php"
                            ?>
                            <!-- </div> -->
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <!-- <div id="modal-body-table"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../modals_processors/commande_formulaire_body_table_read_only.php";
                            ?>
                            <!-- </div> -->
                        </div>
                        <div class="modal-footer">
                            <?php
                            require __DIR__ . "/../modals_processors/buttons_footer_view_facture_client.php"
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal détails -->
        </div>
        <!-- TOAST  -->
        <div class="toast-container position-fixed top-0 end-0 p-3" id="toast-container">
        </div>
        <!-- end TOAST  -->
        <!-- modal confirmation -->
        <div class="modal fade bg-confirmation" tabindex="-1" id="modal-confirmation">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-sm ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Etes-vous sûr?</h5>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer d-flex justify-content-end">
                        <button type="button" class="col-auto btn  btn-success" id="btn-confirmation-yes">confirmer</button>
                        <button type="button" class="col-auto btn btn-danger" id="btn-confirmation-no">annuler</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- endconfirmation  modal-->
        <datalist id="client-list">

        </datalist>
        <datalist id="item-list">

        </datalist>
        <datalist id="facture-list">

        </datalist>
    </div>
</body>

</html>