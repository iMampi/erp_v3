<?php

use function Session\can_visit;
use function Session\is_logged;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

$cycle_item = "item";
is_logged();

?>

<?php
// CACHING CATEGORIES AND FAMILIES
require __DIR__ . '/../../database/select/all_categories_name_nolimit.php';

require __DIR__ . '/../../database/select/all_familles_name_nolimit.php';
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
    <script src="/js/item-main.js"></script>
    <link rel="stylesheet" href="/style/mampi.css">
    <title>articles</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            require_once $_SERVER["DOCUMENT_ROOT"] . '/utilities/login_utils.php';
            $header = generate_logged_header($_SESSION['user']->name, "link-items");
            echo $header;
            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <?php
                    if (!can_visit($cycle_item)) {
                        // TODO : IMPLEMENT ME CORRECTLY
                        // TODO : create a global variable for those message. maybe a constant to autoload
                        // ob_start();
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_cannot_visit.html';
                    } else {
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_items.html';
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
                                // require_once __DIR__ . "/../../modals_processors/item_filter_body_basic.php";
                                require_once __DIR__ . "/../../elements/warehouses/items/item_filter_basic.html";
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
                            <button type="button" class="btn btn-secondary" id="btn-reset-filter">paramètre par défaut</button>
                            <button type="button" class="btn btn-secondary" id="btn-cancel-filter">annuler</button>
                            <button type="button" class="btn btn-primary" id="btn-apply-filter">appliquer</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal filter -->
            <!-- modal item new -->
            <div class="modal fade" id="modal-item-new" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">

                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">création nouvelle famille</h5>
                        </div>
                        <div class="modal-body">

                            <div id="new-modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                // require __DIR__ . "/../../elements/warehouses/items/item_formulaire_base.html";
                                require __DIR__ . "/../../modals_processors/item_formulaire_body_new.php"
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
            <!-- end modal item new -->
            <!-- modal détails article -->
            <div class="modal fade" id="modal-item-details" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button>
                <div class="modal-dialog modal-dialog-scrollable modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Fiche article</h5>
                        </div>
                        <div class="modal-body">

                            <div id="modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly. 
                                //TODO : change to require once. 
                                // require __DIR__ . "/../../elements/warehouses/items/item_formulaire_base.html";
                                require __DIR__ . '/../../modals_processors/item_formulaire_body_read_only.php'
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="modal-body-table">
                                <?php
                                //TODO : change to require once.

                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <?php
                            require __DIR__ . "/../../modals_processors/btns_footer_v1.php"
                            ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end modal détails artible -->
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
        <!-- datalists  -->
        <datalist id="famille-list">
            <?php
            $domfamille = new DOMDocument();
            // //to be able to use new html5 tag with DOMDocument
            libxml_use_internal_errors(true);

            foreach ($all_familles_name as $array) {
                $option_ = $domfamille->createElement("option");
                $option_->setAttribute("value", $array["name"]);
                $option_->appendChild(
                    $domfamille->createTextNode($array["uid"] . " - " . $array["name"])
                );
                $domfamille->appendChild($option_);
            }
            echo $domfamille->saveHTML();
            ?>
        </datalist>
        <datalist id="category-list">
            <?php
            $domcategory = new DOMDocument();
            // //to be able to use new html5 tag with DOMDocument
            libxml_use_internal_errors(true);

            foreach ($all_categories_name as $array) {
                $option_ = $domcategory->createElement("option");
                $option_->setAttribute("value", $array["name"]);
                $option_->appendChild(
                    $domcategory->createTextNode($array["uid"] . " - " . $array["name"])
                );
                $domcategory->appendChild($option_);
            }
            echo $domcategory->saveHTML();
            ?>
        </datalist>
        <!-- end of datalists  -->

    </div>
</body>

</html>