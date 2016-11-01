<?php

class members_model extends database {

    public $mem_id;
    public $mem_email;
    public $mem_password;
    public $mem_role;
    public $mem_status;
    public $mem_updated;
    public $mem_created;
    public $mem_social_id;
    public $mem_token;

    public function Table() {
        return "members";
    }

}
