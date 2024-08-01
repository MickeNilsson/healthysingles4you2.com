<?php

require '../utils/init.php';

require 'mail.php';

//require '../get-payload.php';

//$payload_o = getPayload();

if(!empty($_GET['uuid'])) {

    $params_a = [
        'password' => $_GET['password'],
        'uuid'     => $_GET['uuid']
    ];

    $sql_s = 'UPDATE hs4u2_member SET password = :password WHERE uuid = :uuid';

    $stmt_o = $pdo_o->prepare($sql_s);

    $stmt_o->execute($params_a);

    $mailBody_s = '<p>Your password at <a href="https://healthysingles4you2.com/" target="_blank">healthysingles4you2.com</a> has now been updated.</p>'
                . '<p>Your new password is <span style="font-weight: bold;">' . $_GET['uuid'] . '</span>.';

} elseif(!empty($_GET['email'])) {

    $uuid_s = uniqid();

    $params_a = [
        'email' => $_GET['email'],
        'uuid'  => $uuid_s
    ];

    $sql_s = 'UPDATE hs4u2_member SET uuid = :uuid WHERE email = :email';

    $stmt_o = $pdo_o->prepare($sql_s);

    $stmt_o->execute($params_a);

    $mailBody_s = '<p>Hello, <br><br>Someone has requested to update your password at <a href="https://healthysingles4you2.com/" target="_blank">healthysingles4you2.com</a>.</p>'
                . '<p>If it is not you, you can disregard this e-mail, your password will then not be updated. If it is you that has requested your password to be updated '
                . 'please click <a href="https://healthysingles4you2.com/?uuid=' . $uuid_s . '">here</a>.</p>';

    send($_GET['email'], $mailBody_s);

    $data_o = new stdClass();

    $data_o->uuid = $uuid_s;

    $response_o->data = $data_o;
}

$response_o->status = 'ok';

$response_s = json_encode($response_o, JSON_UNESCAPED_UNICODE);

echo $response_s;