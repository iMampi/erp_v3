<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>magasins</title>

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
            <div class="container-fluid position-relative py-2
            ">
                <div class="">
                    <div id="div-selection" class="row ">
                        <span class="col">nombres d'articles</span>
                        <span class="col">0</span>

                        <button type="button" class="col">exporter</button>


                    </div>
                    <button type="button" class="col btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-fam-detail">nouveau</button>
                    <button type="button" class="col btn btn-info" data-bs-toggle="modal" data-bs-target="#modal-fam-detail">valider</button>

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
        <!-- modal détails mvt interne -->
        <div class="modal fade" id="modal-detail" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <!-- <button type="button" class="btn-close position-absolute top-0 end-0" data-bs-dismiss="modal" aria-label="Close"></button> -->
            <!-- <div class="modal-dialog modal-dialog-scrollable modal-xl"> -->
            <div class="modal-dialog modal-dialog-scrollable modal-lg ">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">détails mouvement interne</h5>
                    </div>
                    <div class="modal-body">

                        <!-- <div id="modal-body-heads"> -->
                        <?php
                        //TODO : make the header of factures in details readonly. 
                        //TODO : change to require once. 
                        require __DIR__ . "/../../elements/warehouses/mvts_internes/mvt_interne_formulaire_base.html";
                        ?>
                        <!-- </div> -->
                        <!-- TODO : to elete. we gonna use only JS here -->
                        <!-- <div id="modal-body-table"> -->
                        <?php
                        //TODO : make the header of factures in details readonly. 
                        //TODO : change to require once. 
                        require __DIR__ . "/../../elements/warehouses/mvts_internes/mvt_interne_table_details_base.html";
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
        <!-- end modal détails interne -->
    </div>
</body>

</html>