<?php

function get($pdo_o) {

    $fields_a = [];

    $params_a = [];

    $where_a = [];

    foreach($_GET as $queryParam_s => $value_s) {

        if(!empty($value_s)) {

            switch($queryParam_s) {

                case 'fields':

                    $fields_a = explode(',', $value_s);

                    $fields_a = array_unique($fields_a);

                    $fields_a = array_intersect($fields_a, [
                        'agefromseek',
                        'agetoseek',
                        'alcohol',
                        'birthdate',
                        'children',
                        'city',
                        'country',
                        'countryseek',
                        'email',
                        'eyecolor',
                        'firstname',
                        'gender',
                        'genderseek',
                        'haircolor',
                        'height',
                        'lastname',
                        'maindescription',
                        'marital',
                        'phone',
                        'physique',
                        'partnerpreferences',
                        'profession',
                        'smoke',
                        'wantchildren',
                        'weight'
                    ]);

                    break;

                case 'agefromseek':
                case 'agetoseek':
                case 'alcohol':
                case 'children':
                case 'city':
                case 'country':
                case 'countryseek':
                case 'email':
                case 'eyecolor':
                case 'firstname':
                case 'frombirthdate':
                case 'gender':
                case 'genderseek':
                case 'haircolor':
                case 'height':
                case 'id':
                case 'lastname':
                case 'maindescription':
                case 'marital':
                case 'phone':
                case 'physique':
                case 'partnerpreferences':
                case 'profession':
                case 'smoke':
                case 'tobirthdate':
                case 'wantchildren':
                case 'weight':

                    array_push($where_a, $queryParam_s . ' = :' . $queryParam_s);

                    $params_a[$queryParam_s] = $value_s;

                    break;

                default: // This filter doesn't exist
            }
        }
    }

    array_push($fields_a, 'id');

    $sql_s = 'SELECT ' . implode(',', $fields_a) . ' FROM hs4u2_member';

    if(count($where_a) > 0) {

        $sql_s .= ' WHERE ' . implode(' AND ', $where_a);
    }

    //echo $sql_s; print_r($params_a); exit;

    $stmt_o = $pdo_o->prepare($sql_s);

    $stmt_o->execute($params_a);

    $data_a = array();

    while($row_o = $stmt_o->fetch()) {

        array_push($data_a, $row_o);
    }

    return $data_a;
}