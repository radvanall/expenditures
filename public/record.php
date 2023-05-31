<?php
include "../src/repository/RecordRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/RecordService.php";
include "../src/controller/controller.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
session_start();
 $repository=new RecordRepository('DatabaseConnection');
 $recordService=new RecordService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 CRUD_controller($recordService,$method, $getVars, $postVars);
} else echo json_encode(array("status"=>"you are not logged in!"));