<!DOCTYPE html>
<html>
    <head>
        <!--<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>-->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Exo:wght@900&display=swap" rel="stylesheet">
        <!--<script scc="https://www.google.com/jsapi"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> -->
        <title>HydroHeat</title>
        <link rel="stylesheet" href="menuStyle.css">
            
    </head>
        <body>

            <a href="/" target="_blank">
             
                <div id="menu">
                    <div id="menu-items">
                        <a href="" class="menu-item"><span id="main-name">Hydro</span><span id="main-name-heat">Heat</span></a>
                        <a href="controls.html" class="menu-item">Controls</a>
                        <a href="" class="menu-item">About</a>
                        <a href="funhovering.html" class="menu-item">Gallery</a>
                        <a href="https://github.com/JJTB100/HydroHeat" class="menu-item">Code</a>
                    </div>
                    <div id="menu-background-image"></div>
                    <div id="menu-background-pattern"></div>
                
                </div>
            <?php

            $file = fopen($_SERVER['DOCUMENT_ROOT']."/temps.txt", "w") or die ($_SERVER['DOCUMENT_ROOT']."/temps.txt");
            fwrite($file, $_POST);
            fwrite($file, "testing testing 123");
            fclose($file);
            ?>
        </body>
        <script async defer src="menuScript.js"></script>
</html>
