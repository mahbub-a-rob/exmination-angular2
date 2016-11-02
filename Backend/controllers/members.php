<?php

use Slim\Http\Response;
use Slim\Http\Request;

class members {

    private $members = null;

    public function __construct() {
        $this->members = new members_model();
    }

    public function get(Request $req, Response $res) {
        return $res->withJson($this->members->Select(['mem_email', 'mem_status', 'mem_updated', 'mem_created'])->All());
    }

    public function getSingle(Request $req, Response $res, $args) {
        return $res->withJson($this->members->Select(['mem_email', 'mem_status', 'mem_updated', 'mem_created'])
                              ->Where('mem_token=?', [$args['token']])
                              ->Single());
    }

    public function postLogin(Request $req, Response $res) {
        # Method POST
        $model = helper::requestJson();
        $member = $this->members->SelectSingle(['mem_email' => $model->mem_email]);
        if ($member != NULL) {
            if (password_verify($model->mem_password, $member->mem_password)) {
                $member = $this->updateUUID($member->mem_id);
                return $res->withJson(['code' => 200, 'response' => $member->mem_token]);
            }
            return $res->withJson(['code' => 510, 'message' => 'email or password invalid']);
        }
        return $res->withJson(['code' => 500, 'message' => 'model error']);
    }

    public function postCreate(Request $req, Response $res) {
        $model = helper::requestJson();
        $this->members->mem_email = $model->mem_email;
        $this->members->mem_password = password_hash($model->mem_password, PASSWORD_DEFAULT);
        $insert = $this->members->Insert();
        if (!empty($insert)) {
            $this->members = $this->updateUUID($insert->mem_id);
            return $res->withJson(['code' => 200, 'response' => $this->members->mem_token]);
        }
        return $res->withJson(['code' => 500, 'message' => 'Create Fails']);
    }

    public function putUpdate(Request $req, Response $res, $args) {
        return $res->withJson([
            'code' => 200,
            'message' => 'update member controller',
            'args' => $args,
            'json' => json_decode(file_get_contents('php://input'))
        ]);
    }

    public function deleteRemove(Request $req, Response $res, $args) {
        return $res->withJson([
            'code' => 200,
            'message' => 'delete member controller',
            'args' => $args
        ]);
    }

    private function updateUUID($mem_id) {
        $database = database::Connect();
        $query = $database->prepare("update members set mem_token=password((select uuid())) where mem_id=?");
        if ($query->execute([$mem_id])) {
            return $this->members->SelectSingle(['mem_id' => $mem_id]);
        }
        return NULL;
    }

}
