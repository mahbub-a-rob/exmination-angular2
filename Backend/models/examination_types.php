<?php

class examination_types_model extends database {

    public $types_id;
    public $types_name;
    public $types_detail;
    public $types_created;
    public $types_updated;
    public $mem_id;
    private $columns = [
        'types_id',
        'types_name',
        'types_detail',
        'types_created',
        'types_updated',
    ];

    public function Table() {
        return "examination_types";
    }

    public function findAll($colums = []) {
        return $this->Select(empty($colums) ? $this->columns : $colums)
                        ->Where("mem_id=?", [$this->mem_id])
                        ->Order('types_updated', 'DESC')
                        ->All();
    }

    public function find($types_id) {
        return $this->Select($this->columns)
                        ->Where('mem_id=? and types_id=?', [$this->mem_id, $types_id])
                        ->Single();
    }

}
