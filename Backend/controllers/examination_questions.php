<?php

use Slim\Http\Request;
use Slim\Http\Response;

class examination_questions {

    private $member;
    private $examinations;

    public function __construct() {
        $this->member = helper::getAuthenticated();
        $this->examinations = new examinations_model();
        $this->examinations->mem_id = $this->member->mem_id;
    }   

    public function get(Request $request, Response $response) {
        return $response->withJson([
            'examinations' => $this->examinations->find()
        ]);
    }

}
