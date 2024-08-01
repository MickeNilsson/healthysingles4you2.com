<?php

require_once '../utils/headers.php';

require_once '../utils/error-reporting.php';

if(isset($_GET['a'])) {

    $param = $_GET['a'];

    print_r($param);
}