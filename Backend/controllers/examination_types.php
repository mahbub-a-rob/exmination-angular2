<?php

use \Slim\Http\Request;
use \Slim\Http\Response;

class examination_types {

    private $service;
    private $member;
    private $response;

    public function __construct() {
        $this->member = helper::getAuthenticated();
        $this->service = new examination_types_model();
        $this->service->mem_id = (int) $this->member->mem_id;
        $this->response = new response_model();
    }

    public function get(Request $reqeust, Response $response) {
        return $response->withJson($this->service->findAll());
    }

    public function getSigle(Request $reqeust, Response $response, $args) {
        return $response->withJson($this->service->find(isset($args['id']) ? $args['id'] : 0));
    }

    public function postCreate(Request $reqeust, Response $response) {
        $model = helper::requestJson();
        if (!empty($model->types_name)) {
            $this->service->types_name = $model->types_name;
            $this->service->types_detail = $model->types_detail;
            if ($this->service->Insert()) {
                $this->response->code = 200;
                $this->response->message = "Success";
            } else {
                $this->response->code = 510;
                $this->response->message = "Insert error";
            }
        }
        return $response->withJson($this->response);
    }

    public function putUpdate(Request $reqeust, Response $response, $args) {
        $model = helper::requestJson(FALSE);
        if (!empty($model->types_name)) {
            $this->service->types_name = $model->types_name;
            $this->service->types_detail = $model->types_detail;
            $this->service->types_id = $args['id'];
            $this->service->types_updated = ':now()?';
            if ($this->service->Update()) {
                $this->response->code = 200;
                $this->response->message = 'Success.';
            } else {
                $this->response->code = 510;
                $this->response->message = 'Update error.';
            }
        }
        return $response->withJson($this->response);
    }

    public function deleteRemove(Request $reqeust, Response $response, $args) {
        if (!empty($args['id'])) {
            $this->service->types_id = $args['id'];
            if ($this->service->Delete()) {
                $this->response->code = 200;
                $this->response->message = "Success";
            } else {
                $this->response->code = 510;
                $this->response->message = "Delete error";
            }
        }
        return $response->withJson($this->response);
    }

}
