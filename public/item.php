<?php
include "../src/repository/ItemRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/ItemService.php";
include "../src/controller/controller.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
session_start();
 $repository=new ItemRepository('DatabaseConnection');
 $itemService=new ItemService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 CRUD_controller($itemService,$method, $getVars, $postVars);
 } else echo json_encode(array("message"=>"you are not logged in!","status"=>false));