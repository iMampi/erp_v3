<?php

use function Session\can_visit;
use function Session\is_logged;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

$employee_clt = "employee";
is_logged();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/js/helpers.js"></script>
    <script src="/js/fixed-header.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <script src="/js/server-communication.js"></script>
    <script src="/js/confirmation.js"></script>
    <script src="/js/toast.js"></script>
    <script src="/js/employee-main.js"></script>
    <link rel="stylesheet" href="/style/mampi.css">
    <title>employés</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            // generate headers
            require_once $_SERVER["DOCUMENT_ROOT"] . '/utilities/login_utils.php';
            $header = generate_logged_header($_SESSION['user']->name, "link-emps");
            echo $header;
            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <?php
                    // can see or cannot see?
                    if (!can_visit("employee")) {
                        // TODO : IMPLEMENT ME CORRECTLY
                        // TODO : create a global variable for those message. maybe a constant to autoload
                        // ob_start();
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_cannot_visit.html';
                    } else {
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_employees.html';
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
                        require_once __DIR__ . '/processors/generate_table_001_base.php';
                        ?>

                    </div>
                </div>
            </div>
            <!-- end TABLEAU -->
            <!-- modal filter -->
            <div class="modal fade" id="modal-filter" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
                                // require __DIR__ . "/../elements/treso_affectation_affaire_header_base.html";
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
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">annuler</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal filter -->
            <!-- modal employee new -->
            <div class="modal fade" id="modal-employee-new" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">création nouvel employé</h5>
                        </div>
                        <div class="modal-body">
                            <div id="new-modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                require __DIR__ . "/../../elements/tiers/employees/employee_formulaire_base.html";
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="new-modal-body-table">
                                <?php
                                //TODO : change to require once.
                                // require __DIR__ . "/../elements/treso_affectation_affaire_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <?php
                            require_once __DIR__ . "/../../modals_processors/buttons_footer_new.php";
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal employee new -->
            <!-- modal détails facture -->
            <div class="modal fade" id="modal-emp-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
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
        <!-- TOAST  -->
        <div class="toast-container position-fixed top-0 end-0 p-3" id="toast-container">
        </div>
        <!-- end TOAST  -->
        <!-- confirmation  modal-->
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
    </div>
</body>

</html>