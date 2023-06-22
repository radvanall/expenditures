<?php
include "../src/repository/CategoryRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/CategoryService.php";
include "../src/controller/controller.php";
include_once "../src/sendResponse.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
session_start();
 $repository=new CategoryRepository('DatabaseConnection');
 $categoryService=new CategoryService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
    if($method=="GET" && isset($getVars["request"]) && $getVars['request']=="get_category_table"){
        $result=$categoryService->getCategoryTable($_SESSION["user_id"]);
        sendResponse($result);
    }else
 CRUD_controller($categoryService,$method, $getVars, $postVars);
 } else {  http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(array("error"=>"you are not logged in!","status"=>false));}
