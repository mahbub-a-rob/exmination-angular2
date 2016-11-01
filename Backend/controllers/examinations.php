<?php

use \Slim\Http\Request;
use Slim\Http\Response;

class examinations {

    private $types;
    private $member;
    private $service;
    private $response;

    public function __construct() {
        // response
        $this->response = new response_model();
        // member
        $this->member = helper::getAuthenticated();
        $this->types = new examination_types_model();
        $this->types->mem_id = $this->member->mem_id;
        // exminations
        $this->service = new examinations_model();
        $this->service->mem_id = $this->member->mem_id;
        if (isset($_GET['types_id'])) {
            $this->service->types_id = $_GET['types_id'];
        }
    }

    public function get(Request $request, Response $response) {
        return $response->withJson([
                    'types' => $this->types->findAll(),
                    'examinations' => $this->service->findAll()
        ]);
    }

    public function postCreate(Request $request, Response $response) {
        $model = helper::requestJson();
        $modelState = !empty($model->types_id) && !empty($model->exam_choice) && !empty($model->exam_name);
        if ($modelState) {
            $this->service->exam_name = $model->exam_name;
            $this->service->exam_detail = $model->exam_detail;
            $this->service->exam_choice = $model->exam_choice;
            $this->service->types_id = $model->types_id;

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

    public function putUpdate(Request $request, Response $response, $args) {
        $model = helper::requestJson();
        $modelState = !empty($model->types_id) && !empty($model->exam_choice) && !empty($model->exam_name && !empty($args['id']));
        if ($modelState) {
            $this->service->exam_id = $args['id'];
            $this->service->exam_name = $model->exam_name;
            $this->service->exam_detail = $model->exam_detail;
            $this->service->exam_choice = $model->exam_choice;
            $this->service->types_id = $model->types_id;
            $this->service->exam_updated = ":now()?";

            if ($this->service->Update()) {
                $this->response->code = 200;
                $this->response->message = "Success";
            } else {
                $this->response->code = 510;
                $this->response->message = "Update error";
            }
        }
        return $response->withJson($this->response);
    }

    public function deleteRemove(Request $request, Response $response, $args) {
        $this->service->exam_id = $args['id'];
        if (!empty($this->service->exam_id)) {
            if ($this->service->Delete()) {
                $this->response->code = 200;
                $this->response->message = "Success";
            } else {
                $this->response->code = 510;
                $this->response->message = "Delete error";
            }
        }
        $response->withJson($this->response);
    }

}
