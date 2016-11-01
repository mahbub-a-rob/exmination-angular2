<?php

class helper {

    public static function requestJson($process = true) {
        $array = [];
        $requestData = json_decode(file_get_contents('php://input'));
        if ($process) {
            foreach ($requestData as $key => $val) {
                $value = trim($val);
                if (is_numeric($val)) {
                    $value = $value * 1;
                } else if ($value == '') {
                    $value = NULL;
                }
                $array[$key] = $value;
            }
            return (object) $array;
        }
        return (object) $requestData;
    }

    public static function getAuthenticated() {
        $member = new members_model();
        $authenticated = $member->SelectSingle(['mem_token' => $_SERVER['HTTP_ACCEPT']]);
        if ($authenticated) {
            return $authenticated;
        }
        header('Content-Type: application/json');
        exit(json_encode(['code' => 100, 'message' => 'Token is invalid.']));
    }

}
