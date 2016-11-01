export const URL = {
    register: set('ลงทะเบียน'),
    login: set('เข้าสู่ระบบ'),
    dashboard: set('แดชบอร์ด'),
    examination: set('จัดการข้อสอบ'),
    examinations: set('ข้อสอบ'),
    examination_types: set('ชนิดข้อสอบ'),
    examination_questions: set('โจทย์ข้อสอบ'),
    create: set('เพิ่มข้อมูล'),
    update: set('แก้ไขข้อมูล')
};

function set(url) { return url + pre(); }
function pre() { return ''; }