<?php

class response_model {

    public $code;
    public $message;
    public $response;

    public function __construct($code = 500, $message = "Model error.", $response = null) {
        $this->code = $code;
        $this->message = $message;
        $this->response = $response;
    }

}
