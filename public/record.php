<?php
include "../src/repository/RecordRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/RecordService.php";
include "../src/controller/controller.php";
session_start();
 $repository=new RecordRepository('DatabaseConnection');
 $categoryService=new RecordService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 CRUD_controller($categoryService,$method, $getVars, $postVars);
} else echo json_encode(array("status"=>"you are not logged in!"));