<?php

require './vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: Authenticated");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE");
// set route
$route = new \Slim\App();

$route->get('/', function () {
    require './dist/index.html';
});

// route for members
$route->get('/members', "members:get");
$route->post('/members', "members:postCreate");
$route->put('/members/{id}', "members:putUpdate");
$route->delete('/members/{id}', "members:deleteRemove");
$route->post('/members/login', "members:postLogin");
$route->get('/members/{token}', "members:getSingle");

// route for examination types
$route->get('/examination_types', 'examination_types:get');
$route->get('/examination_types/{id}', 'examination_types:getSigle');
$route->post('/examination_types', 'examination_types:postCreate');
$route->put('/examination_types/{id}', 'examination_types:putUpdate');
$route->delete('/examination_types/{id}', 'examination_types:deleteRemove');

// router for examinations
$route->get('/examinations', 'examinations:get');
$route->post('/examinations', 'examinations:postCreate');
$route->put('/examinations/{id}', 'examinations:putUpdate');
$route->delete('/examinations/{id}', 'examinations:deleteRemove');

// router for examination questions
$route->get('/examination_questions', 'examination_questions:get');

// Run application
$route->run();
