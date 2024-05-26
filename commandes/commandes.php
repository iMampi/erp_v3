<?php

use function Session\can_visit;
use function Session\is_logged;

require_once $_SERVER["DOCUMENT_ROOT"] . "/vendor/autoload.php";

session_start();

$cycle_item = "item";
$cycle_commande = "commande";
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
    <script src="/js/autoNumeric.min.js"></script>
    <script src="/js/luxon.min.js"></script>
    <script src="/js/helpers.js"></script>

    <script src="/js/fixed-header.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <script src="/js/server-communication.js"></script>
    <script src="/js/confirmation.js"></script>
    <script src="/js/toast.js"></script>
    <script src="/js/commande-main.js" defer></script>
    <link rel="stylesheet" href="/style/mampi.css">
    <title>commandes</title>

</head>

<body class="bg-g">
    <div id="main-container" class="container-fluid px-0">
        <div id="header-top" class=" bg-light-blue">
            <?php
            require_once __DIR__."/../utilities/login_utils.php";
            // require_once $_SERVER["DOCUMENT_ROOT"] . '/utilities/login_utils.php';
            $header = generate_logged_header($_SESSION['user']->name, "link-commandes");
            echo $header;
            ?>
            <div id="sub-header" class="container-fluid sticky-top py-2 bordered bg-light-blue
            ">
                <div class="px-5">
                    <?php
                    // if (!can_visit($cycle_item)) {
                    if (!can_visit($cycle_commande)) {
                        // TODO : IMPLEMENT ME CORRECTLY
                        // TODO : create a global variable for those message. maybe a constant to autoload
                        // ob_start();
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_cannot_visit.html';
                    } else {
                        require_once $_SERVER["DOCUMENT_ROOT"] . '/elements/sub_header_commandes.html';
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
            <!-- modal commandes new -->
            <div class="modal fade" id="modal-commande-new" tabindex="-1">
                <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close">
                </button>
                <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Nouvelle commande</h5>
                        </div>
                        <div class="modal-body">
                            <div id="new-modal-body-heads">
                                <?php
                                //TODO : make the header of factures in details readonly
                                // require __DIR__ . "/../../elements/warehouses/items/item_formulaire_base.html";
                                require __DIR__ . "/../modals_processors/commande_formulaire_body_new.php"
                                ?>
                            </div>
                            <!-- TODO : to elete. we gonna use only JS here -->
                            <div id="new-modal-body-table">
                                <?php
                                //TODO : change to require once.
                                require __DIR__ . "/../elements/commandes/commande_table_details_base.html";
                                ?>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <?php
                            require_once __DIR__ . "/../modals_processors/buttons_footer_new_commande.php";
                            ?>
                        </div>
                    </div>
                </div>


            </div>
            <!-- end modal commandes new -->

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
                <div class="modal-dialog modal-dialog-scrollable modal-xl modal-fullscreen-xl-down">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">détails commande</h5>
                        </div>
                        <div class="modal-body">

                            <!-- <div id="modal-body-heads"> -->
                            <?php
                            //TODO : make the header of factures in details readonly. 
                            //TODO : change to require once. 
                            require __DIR__ . "/../modals_processors/commande_formulaire_body_read_only.php"
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
                            require __DIR__ . "/../modals_processors/buttons_footer_view_commande.php"
                            ?>
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
        <datalist id="client-list">
            <?php
            // require_once __DIR__ . "/../database/select/all_clients_name_limit.php";

            // $domclient = new DOMDocument();
            // // //to be able to use new html5 tag with DOMDocument
            // libxml_use_internal_errors(true);

            // foreach ($all_active_clients_limit as $array) {
            //     $client_name = $array["prenoms"] . " " . $array["noms"] . " " . $array["nom_commercial"] . " / " . $array["raison_sociale"];
            //     $client_name = \trim($client_name);
            //     $option_ = $domclient->createElement("option");
            //     $option_->setAttribute("value", $client_name);
            //     $option_->appendChild(
            //         $domclient->createTextNode($array["uid"] . " - " . $client_name)
            //     );
            //     $domclient->appendChild($option_);
            // }
            // echo $domclient->saveHTML();
            ?>
        </datalist>
        <datalist id="item-list">
            <?php
            // require_once __DIR__ . "/../database/select/all_items_name_limit.php";

            // $domclient = new DOMDocument();
            // // //to be able to use new html5 tag with DOMDocument
            // libxml_use_internal_errors(true);

            // foreach ($all_items_name_limit as $array) {

            //     $option_ = $domclient->createElement("option");
            //     $option_->setAttribute("value", $array["name"]);
            //     $option_->appendChild(
            //         $domclient->createTextNode($array["code"] . " - " . $array["name"])
            //     );
            //     $domclient->appendChild($option_);
            // }
            // echo $domclient->saveHTML();
            ?>
        </datalist>
    </div>
</body>

</html>