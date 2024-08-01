<?php

// require_once '../utils/headers.php';

// require_once '../utils/error-reporting.php';

// require_once '../utils/get-settings.php';

// require_once '../utils/init-pdo.php';

// $settings_a = getSettings();

// $pdo_o = initPdo($settings_a);

require 'get.php';

require '../utils/init.php';

switch ($_SERVER['REQUEST_METHOD']) {

    case 'GET':

        http_response_code(200);

        $response_o->{'data'} = get($pdo_o); 
        
        break;

    case 'POST':

        require_once '../utils/get-payload.php';

        $asArray_b = true;

        $payload_a = getPayload($asArray_b);

        $sql_s = "INSERT INTO hs4u2_member (firstname, gender, email, password) VALUES (:firstname, :gender, :email, :password)";

        $stmt_o = $pdo_o->prepare($sql_s);

        $stmt_o->execute($payload_a);

        $data_o = new stdClass();

        $data_o->id = $pdo_o->lastInsertId();

        $response_o->{'data'} = $data_o;

        break;

    case 'PUT': 

        http_response_code(200);

        require 'put.php';

        put($pdo_o);
        
        break;

    default:
}

$response_o->status = 'ok';

$response_s = json_encode($response_o, JSON_UNESCAPED_UNICODE);

echo $response_s;

function addWhereClause($filter_s, &$params_a, &$whereClauses_a) {

    if(!empty($_GET[$filter_s])) {

        $filterValue_s = $_GET[$filter_s];

        $isCommaSeparatedList_b = strpos($filterValue_s, ',') !== false;
        
        if($isCommaSeparatedList_b) {

            $whereClause_s = $filter_s . ' IN (:' . $filter_s . ')';

        } else {

            switch($filter_s) {

                case 'frombirthdate':

                    $columnName_s = 'birthdate';

                    $operator_s = '>=';

                    break;

                case 'tobirthdate':

                    $columnName_s = 'birthdate';

                    $operator_s = '<=';

                    break;

                default:

                    $columnName_s = $filter_s;

                    $operator_s = '=';
            }

            $whereClause_s = $columnName_s . ' ' . $operator_s . ' :' . $filter_s;
        }

        array_push($whereClauses_a, $whereClause_s);

        $params_a[$filter_s] = $filterValue_s;
    }
}

// function get() {

//     $result_o = new stdClass();

//     $result_o->{'result'} = 'ok';
    
//     $result_o->{'data'} = json_decode(file_get_contents('members.json'));
    
//     echo json_encode($result_o, JSON_UNESCAPED_UNICODE);
// }

function post() {
    
    $payload_s = file_get_contents('php://input');

    $member_o = json_decode($payload_s);

    $member_o->{'id'} = uuid();

    $members_ao = json_decode(file_get_contents('../members/members.json'));

    array_push($members_ao, $member_o);

    $members_s = json_encode($members_ao, JSON_UNESCAPED_UNICODE);

    file_put_contents('./members.json', $members_s);

    $response_o = new stdClass();

    $data_o = new stdClass();

    $response_o->{'status'} = 'ok';

    $response_o->{'data'} = $data_o;

    echo json_encode($response_o, JSON_UNESCAPED_UNICODE); 
}

function uuid($lenght = 10) {

    if (function_exists('random_bytes')) {

        $bytes = random_bytes(ceil($lenght / 2));

    } elseif (function_exists('openssl_random_pseudo_bytes')) {

        $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));

    } else {

        throw new Exception('no cryptographically secure random function available');
    }

    return substr(bin2hex($bytes), 0, $lenght);
}



