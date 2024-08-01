<?php

require_once '../utils/headers.php';

require_once '../utils/error-reporting.php';

require_once '../utils/get-settings.php';

require_once '../utils/init-pdo.php';

$settings_a = getSettings();

$pdo_o = initPdo($settings_a);

switch($_SERVER['REQUEST_METHOD']) {

    case 'POST':

        require_once '../utils/get-payload.php';

        $payload_o = getPayload();

        $email_s = $payload_o->{'email'};

        $password_s = $payload_o->{'password'};

        $sql_s = 'SELECT * FROM hs4u2_member WHERE hs4u2_member.email = :email AND hs4u2_member.password = :password';

        $stmt_o = $pdo_o->prepare($sql_s);

        $stmt_o->execute([':email' => $email_s, ':password' => $password_s]);

        $members_a = $stmt_o->fetchAll();

        $response_o = new stdClass();

        if(count($members_a) === 1) {

            $response_o->{'data'} = $members_a[0];
        }

        $response_o->{'status'} = 'ok';

        http_response_code(200);

        echo json_encode($response_o, JSON_UNESCAPED_UNICODE);

        break;
}