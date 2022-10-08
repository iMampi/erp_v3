<?php
require_once __DIR__ . "/vendor/autoload.php";
session_start();

?>

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
    <title>Acceuil</title>

</head>

<body class="">

    <?php
    // TODO : make it so it is a dashboard that appeares here. when doing it, put verification of logged at start of file
    if ((isset($_SESSION["logged"])) && ($_SESSION["logged"] == "logged")) {
        // $output = file_get_contents(__DIR__ . "/elements/header.html");
        require_once __DIR__ . '/utilities/login_utils.php';
        $output = generate_logged_header($_SESSION['user']->name);
    } else {

        $output = "
    <div class='d-flex flex-column min-vh-100 justify-content-center align-items-center'>
        <form action='\g_processes\login.php' method='POST'>
            <div>
                <div class='mb-3'>
                    <label for='exampleInputEmail1' class='form-label'>Login</label>
                    <input type='text' class='form-control' id='exampleInputEmail1' aria-describedby='emailHelp' name='login'>
                </div>
                <div class=' mb-3'>
                    <label for='exampleInputPassword1' class='form-label'>Password</label>
                    <input type='password' class='form-control' id='exampleInputPassword1' name='password'>
                </div>
                <button type='submit' class='btn btn-primary' name='signin'>Submit</button>
            </div>

        </form>
    </div>";
    }

    echo $output;
    ?>

    <!-- <div id="div-login" class="d-flex align-items-center justify-content-center">

        <form action=" #" method="POST">
            <div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Login</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1">
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>

        </form>
    </div> -->


</body>

</html>