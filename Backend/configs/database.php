<?php

/**
 * Description of Database
 * version 1.0.3
 * @author Wanchaloem
 * copyright 2016
 */
class database {

    const host = '127.0.0.1';
    const username = 'root';
    const password = 'ttvone';
    const database_name = 'examination_db';
    const charset = 'utf8';

    private $connect;
    private $table;
    private $fields;
    private $statement;
    private $parameter;
    private $class;
    private $allow_value = [
        'now' => ':now()?'
    ];

    public function __construct() {
        $this->connect = static::Connect();
        $this->class = get_class($this);
        $this->table = $this->Table();
        $this->fields = $this->Fields();
        $this->statement = '';
        $this->parameter = [];
    }

    /**
     * ฟังชั่นชื่อตาราง สามารถ เขียนทับ ได้
     * @see ใช้ได้เฉพาะ class ที่ extends เท่านั้น
     * @return สตริง ถ้าจะใช้ฟังชั่นนี้ต้อง return ค่าออกมาเป็น String
     */
    protected function Table() {
        $this->table = strtolower(str_replace('Table', '', $this->class));
        return $this->table;
    }

    /**
     * ฟังชั่นเก็บ field ของตาราง 
     * key จะเป็นชื่อ คอลัมน์ 
     * value จะเป็น ชนิดข้อมูลเช่น number, string, pk เป็นต้น
     * @see ใช้ได้เฉพาะ class ที่ extends เท่านั้น
     * @return อาเรย์สตริง ถ้าจะใช้ฟังชั่นนี้ต้อง return ค่าออกมาเป็น Array of string
     * @example return ['filed_id' => 'pk', 'field_name' => 'string']
     */
    protected function Fields() {
        $reflection = new ReflectionClass($this->class);
        $fields = array();
        $properties = $reflection->getProperties(ReflectionProperty::IS_PUBLIC);
        $index = 0;
        foreach ($properties as $prop) {
            if ($prop->class === $this->class) {
                $name = $prop->name;
                $fields[$prop->name] = !empty($this->$name) ? trim($this->$name) : ($index === 0 ? 'pk' : 'string');
                $index ++;
            }
        }
        return $fields;
    }

    /**
     * ฟังชั่น Select ข้อมูล
     * @param $fields เป็นชนิด array กรณีที่ต้องการแสดง field ของตารางนั้นๆเท่านั้นไม่เอาทั้งหมด
     * @return object รีเทิร์นค่าข้อมุลออกมาเป็นออบเจ็คเพื่อเอามาเขียน code ต่อได้
     * @example $table->Select(['column_1','column_2'])->All()
     */
    public function Select($fields = []) {
        $table = $this->table;
        $db = Database::database_name;
        $statement = '';
        if ($this->check_table()) {
            $statement .= 'SELECT ';
            $statement .= (count($fields) > 0) ? implode(',', $fields) : $this->split_fields($this->fields, true);
            $statement .= ' FROM ';
            $statement .= $db . '.' . $table;
        }
        $this->statement = $statement;
        return $this;
    }

    /**
     * ฟังชั่น Where Sql ต่อจากคำสั่ง Select
     * @param type $statement คำสั่ง SQL เป็นชนิด String
     * @param type $params เป็นตัวแปล array parameter เอาไว้กัน SQL injection
     * @return object รีเทิร์นค่าข้อมุลออกมาเป็นออบเจ็คเพื่อเอามาเขียน code ต่อได้
     * @example $table->Select()->Where('field_id=?', [10])
     */
    public function Where($statement, $params = []) {
        $this->statement .= ' WHERE ' . $statement;
        $this->parameter = $params;
        return $this;
    }

    /**
     * ฟังชั่น Order ข้อมูล เรียงข้อมูล
     * @param type $field เป็นชนิด String
     * @param type $type เป็นชนิด String เป็นการเรียง แบบ ASC น้อยไปมาก, DESC มากไปน้อย
     * @return object รีเทิร์นค่าข้อมุลออกมาเป็นออบเจ็คเพื่อเอามาเขียน code ต่อได้
     * @example $table->Select()->Order('field_id', 'DESC')
     */
    public function Order($field, $type = 'ASC') {
        $this->statement .= ' ORDER BY ' . $field . ' ' . $type;
        return $this;
    }

    /**
     * ฟังชั่น Query ข้อมูลออกมาแค่แถวเดียว
     * @param ไม่มี
     * @return ข้อมูลของตารางนั้นๆ คำสั่งนี้จะเป็นคำสั่งสุดท้ายของการใช้ Select() || Where || Order
     * @example $table->Select()->Signle()
     */
    public function Single() {
        $single_data = null;
        if (!empty($this->statement)) {
            $statement = $this->Query($this->statement, $this->parameter);
            $single_data = $statement->fetchObject();
        } else {
            $single_data = $this->SelectSingle();
        }
        return $single_data;
    }

    /**
     * ฟังชั่น Query ข้อมูลออกมาทั้งหมดของตารางนั้นๆ
     * @param ไม่มี
     * @return ข้อมูลของตารางนั้นๆ คำสั่งนี้จะเป็นคำสั่งสุดท้ายของการใช้ Select() || Where || Order
     * @example $table->Select()->All()
     */
    public function All() {
        $array = array();
        if (!empty($this->statement)) {
            $statement = $this->Query($this->statement, $this->parameter);
            while ($row = $statement->fetchObject()) {
                array_push($array, $row);
            }
        } else {
            $array = $this->SelectAll();
        }
        return $array;
    }

    /**
     * ฟังชั่น Query ข้อมูลออกมาทั้งหมดของตารางนั้นๆ
     * @param $field เป็นข้อมูลชนิด array เป็นเหมือนกับ sql in where 
     * @return ข้อมูลของตารางนั้นๆ คำสั่งนี้จะเป็นคำสั่งสำเร็จรูปเลยใช้แค่ตัวเดียวจบ
     * @example $table->SelectAll(['new_id' => 2]);
     */
    public function SelectAll($field = []) {
        $table = $this->table;
        $fields = $this->fields;
        $db = Database::database_name;
        $statement = '';
        if ($this->check_table()) {
            $statement .= 'SELECT ';
            $statement .= $this->split_fields($fields, true);
            $statement .= ' FROM ';
            $statement .= $db . '.' . $table;
            $parameter = [];
            if (count($field) === 1) {
                $column = array_keys($field)[0];
                $statement .= ' WHERE ' . $column . '=?';
                $parameter = [$field[$column]];
            }
            $query = $this->Query($statement, $parameter);
            $array = array();
            while ($row = $query->fetchObject()) {
                array_push($array, $row);
            }
        }
        return $array;
    }

    /**
     * ฟังชั่น Query ข้อมูลออกมาแค่แถวเดียวของตารางนั้นๆ
     * @param $field เป็นข้อมูลชนิด array เป็นเหมือนกับ sql in where 
     * @return ข้อมูลของตารางนั้นๆ ถ้าไม่มีจะคืนค่าเป็น NULL
     * @example $table->SelectSingle(['new_id' => 2]);
     */
    public function SelectSingle($field = []) {
        $table = $this->table;
        $fields = $this->fields;
        $db = Database::database_name;
        $statement = '';
        if ($this->check_table()) {
            $statement .= 'SELECT ';
            $statement .= $this->split_fields($fields, true);
            $statement .= ' FROM ';
            $statement .= $db . '.' . $table;

            $parameter = [];
            if (count($field) === 1) {
                $column = array_keys($field)[0];
                $statement .= ' WHERE ' . $column . '=?';
                $parameter = [$field[$column]];
            }

            $query = $this->Query($statement, $parameter);
            $result = $query->fetchObject();
            return $result ? $result : NULL;
        }
    }

    /**
     * ฟังชั่น Insert ข้อมุลให้กับ class ตารางนั้นๆ
     * @param ไม่มี ใช้ property ของ class เป็นตัวกำหนดข้อมูล
     * @return 0||object ถ้า insert สำเร็จจะคืนค่าเป็นข้อมูลที่ทำการ insert ล่าสุด ถ้าล้มเหลวจะคืนค่า 0
     * @example $table = new simpleTable(); $table->new_name = 'hello'; $table->Insert();
     */
    public function Insert() {

        $table = $this->table;
        $fields = $this->fields;
        $db = static::database_name;
        $statement = 'INSERT INTO ' . $db . '.' . $table . ' SET ';

        foreach ($fields as $f => $t) {
            $value = $this->$f;
            if (!empty($value) || is_numeric($value)) {
                switch (trim($value)) {
                    case $this->allow_value['now']:
                        $statement .= $f . '=now(),';
                        break;
                    default :
                        $statement .= $f . '=?,';
                        $value = $this->check_data_type($t, $value);
                        array_push($this->parameter, $value);
                        break;
                }
            }
        }

        $statement = rtrim($statement, ',');
        $execute = $this->Query($statement, $this->parameter);
        if ($execute) {
            return $this->SelectSingle([$this->search_pk() => $this->connect->lastInsertId()]);
        }
        return 0;
    }

    /**
     * ฟังชั่น Update ข้อมุลให้กับ class ตารางนั้นๆ
     * @param ไม่มี ใช้ property ของ class เป็นตัวกำหนดข้อมูล
     * @return 0||object ถ้า Update สำเร็จจะคืนค่าเป็นข้อมูลที่ทำการ Update ตัวนั้น ถ้าล้มเหลวจะคืนค่า 0
     * @example $table = new simpleTable(); $table->new_name = 'hello'; $table->new_id = 2; $table->Update();
     */
    public function Update() {
        $table = $this->table;
        $fields = $this->fields;
        $db = static::database_name;
        $statement = 'UPDATE ' . $db . '.' . $table . ' SET ';
        $pk = $this->search_pk();
        foreach ($fields as $f => $t) {
            $value = $this->$f;
            if (($value !== NULL || is_numeric($value)) && $f != $pk) {
                switch (trim($value)) {
                    case $this->allow_value['now']:
                        $statement .= $f . '=now(),';
                        break;
                    default :
                        $statement .= $f . '=?,';
                        $value = $this->check_data_type($t, $value);
                        array_push($this->parameter, $value);
                        break;
                }
            }
        }
        $statement = rtrim($statement, ',');
        if (!empty($this->$pk)) {
            $statement .= ' WHERE ' . $pk . '=?';
            array_push($this->parameter, $this->$pk);
        }
        if ($this->Query($statement, $this->parameter)) {
            return !empty($this->$pk) ? $this->SelectSingle([$pk => $this->$pk]) : 1;
        }

        return 0;
    }

    /**
     * ฟังชั่น Delete ข้อมุลออกจากตารางนั้นๆ
     * @param ไม่มี ใช้ property ของ class เป็นตัวกำหนดข้อมูล
     * @return number ถ้า Delete สำเร็จจะคืนค่าเป็นจำนวนแถวที่ลบได้
     * @example $table = new simpleTable(); $table->new_id = 2; $table->Delete();
     */
    public function Delete() {
        $table = $this->table;
        $db = static::database_name;
        $fields = $this->fields;
        $statement = 'DELETE FROM ' . $db . '.' . $table;
        $this->parameter['key'] = array();
        $this->parameter['value'] = array();
        foreach ($fields as $f => $v) {
            $value = $this->$f;
            if (!empty($value) || is_numeric($value)) {
                $value = $this->check_data_type($v, $value);
                array_push($this->parameter['key'], $f);
                array_push($this->parameter['value'], $value);
            }
        }
        if (count($this->parameter['key']) !== 0 && count($this->parameter['key']) === count($this->parameter['value'])) {
            $statement .= ' WHERE ';
            if (count($this->parameter['key']) === 1) {
                $statement .= $this->parameter['key'][0] . '=?';
            } else {
                $statement .= $this->parameter['key'][0] . '=?';
                for ($index = 1; $index < count($this->parameter['key']); $index++) {
                    $statement .= ' AND ' . $this->parameter['key'][$index] . '=?';
                }
            }
        }
        $execute = $this->Query($statement, $this->parameter['value']);
        return $execute->rowCount();
    }

    /* - Static Function ################################################################### - */

    /**
     * ฟังชั่น Connect Database กรณีต้องการเขียน code sql เองก็ใช้ static function นี้
     * @param ไม่มี
     * @return Object คืนค่าข้อมูลเป็น class ของ PDO
     * @example Database::Connect()->query('select * from table')->fetchAll();
     */
    public static function Connect() {
        try {
            $dsn = sprintf('mysql:host=%s; dbname=%s; charset=%s', static::host, static::database_name, static::charset);
            return new PDO($dsn, static::username, static::password);
        } catch (PDOException $ex) {
            exit($ex->getMessage());
        }
    }

    /* - Private Function ################################################################### - */

    private function Query($statement, $params = []) {
        $query = $this->connect->prepare($statement);
        $execute = $query->execute($params);
        if ($execute) {
            return $query;
        } else {
            header('Content-Type: application/json; charset=utf-8');
            exit(json_encode(['code' => 700, 'message' => $query->errorInfo()[2]]));
        }
    }

    private function check_table() {
        $fields = $this->fields;
        return (!empty($this->table) && is_array($fields) && count($fields) > 0);
    }

    private function check_data_type($type, $value) {
        $return_value = NULL;
        switch (strtolower($type)) {
            case 'pk':
                $return_value = $value;
            case 'string':
                $return_value = $value;
                break;
            case 'number':
                $return_value = (double) $value;
                break;
            case 'datetime':
                break;
        }
        return $return_value;
    }

    private function split_fields($fields = [], $toString = false) {
        $array = [];
        $table = $this->table;
        if (!empty($table)) {
            foreach ($fields as $f => $v) {
                $field = $table . '.' . $f;
                array_push($array, $field);
            }
        }
        return $toString ? implode(',', $array) : $array;
    }

    private function search_pk() {
        $pk = null;
        foreach ($this->fields as $key => $value) {
            if ($value === 'pk') {
                $pk = $key;
                break;
            }
        }
        return $pk;
    }

}
