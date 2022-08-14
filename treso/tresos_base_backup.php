<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/vendor/twbs/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
    <link rel="stylesheet" href="/vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/style/mampi.css">
    <title>Acceuil</title>

</head>

<body>
    <div class="container">
        <nav id="header-top" class="sticky-top bg-light">
            <?php
            require_once __DIR__ . "/../elements/header.html";
            ?>
            <div class="container-fluid position-relative">
                <div class="">
                    <div id="div-selection" class="row ">
                        <span class="col">banque</span>
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
                <div class="accordion row" id="filter-container">
                    <div class="accordion-item">
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
            <div class="row">
                <div>
                    <table class="table bg-dark" id="table-000">
                        <thead class="myheader ">
                            <tr>
                                <td>titre 1</td>
                                <td>titre 2</td>
                                <td>titre 3</td>
                                <td>titre 4</td>
                            </tr>
                            <tr>
                                <td><input type="text"></td>
                                <td><input type="text"></td>
                                <td><input type="text"></td>

                            </tr>
                            <div id="backplate">

                            </div>
                        </thead>
                    </table>
                </div>
            </div>


        </nav>
        <!-- TABLEAU -->
        <div class="row ">
            <div class="table-responsive-md">
                <table class="table table-hover">
                    <tbody>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>
                        <tr>
                            <td>ligne 1</td>
                            <td>ligne 2</td>
                            <td>ligne 3</td>
                            <td>ligne 3</td>
                        </tr>


                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

</html>