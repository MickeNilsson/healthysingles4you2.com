<?php

// Error message activation //////

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set request headers //////

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: DELETE, GET, OPTIONS, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

switch($_SERVER['REQUEST_METHOD']) {

    case 'DELETE': delete(); break;

    case 'GET': get(); break;
    
    case 'POST': post(); break;
}

function delete() {

    $memberId_s = $_GET['id'];

    if(file_exists($memberId_s . '.png')) {
    
        unlink($memberId_s . '.png');
    }
    
    if(file_exists($memberId_s . '.jpg')) {
    
        unlink($memberId_s . '.jpg');
    }

    $response_o = new stdClass();

    $response_o->{'status'} = 'ok';

    echo json_encode($response_o, JSON_UNESCAPED_UNICODE);
}

function get() {

    $memberId_s = $_GET['id'];

    if(file_exists($memberId_s . '.png')) {
    
        $fileExtension_s = 'png';
    }
    
    if(file_exists($memberId_s . '.jpg')) {
    
        $fileExtension_s = 'jpg';
    }

    if(isset($fileExtension_s)) {

        $image = file_get_contents($memberId_s . '.' . $fileExtension_s);
    }

    if(!isset($image)) {

        $image = file_get_contents($_GET['gender'] . '.jpg');

        $fileExtension_s = 'jpg';
    }
    
    header('Content-Type: image/' . $fileExtension_s);

    echo $image;
}

function post() {

    header('Content-Type: application/json; charset=utf-8');

    if(file_exists(strtok($_POST['fileName'], '.') . '.png')) {
    
        unlink(strtok($_POST['fileName'], '.') . '.png');
    }
    
    if(file_exists(strtok($_POST['fileName'], '.') . '.jpg')) {
    
        unlink(strtok($_POST['fileName'], '.') . '.jpg');
    }
    
    $fileWasSavedSuccessfully_b = move_uploaded_file($_FILES['image']['tmp_name'], $_POST['fileName']);
    
    $response_o = new stdClass();
    
    $response_o->{'status'} = 'ok';
    
    echo json_encode($response_o, JSON_UNESCAPED_UNICODE);
}

