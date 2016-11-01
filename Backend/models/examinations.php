<?php

class examinations_model extends database {

    public $exam_id;
    public $exam_name;
    public $exam_detail;
    public $exam_choice;
    public $exam_created;
    public $exam_updated;
    public $types_id;
    public $mem_id;

    public function Table() {
        return "examinations";
    }

    public function findAll() {
        return $this->Select([
                    'exam_id',
                    'exam_name',
                    'exam_detail',
                    'exam_choice',
                    'exam_created',
                    'exam_updated',
                    'exam_updated'
                ])->Where('mem_id=? and types_id=?', [$this->mem_id, $this->types_id])->Order('exam_updated', 'DESC')->All();
    }

}
