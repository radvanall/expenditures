<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
include_once "../src/sendResponse.php";
include "../src/repository/UserRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/UserService.php";
include "../src/controller/controller.php";
session_start();
 $repository=new UserRepository('DatabaseConnection');
 $userService=new UserService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="login" && isset($_SESSION["user_id"])){
   http_response_code(400);
   header('Content-Type: application/json');
   echo json_encode(array("error"=>"you are already logged in!"));
 }
 else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="login" ){
     $form_data=$postVars["formData"];
     $form_data=json_decode($form_data);
     $result=$userService->login($form_data);
     sendResponse($result);
   
 }else  if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="create"){
   $form_data=$_POST["formData"];
   $input_data=json_decode(stripslashes($form_data));
     if($input_data===null){
          echo 'Error decoding JSON: ' . json_last_error_msg();
       }
     else 
     { $result=$userService->insert($input_data); 
      sendResponse($result);
      }
}
 
 else if(isset($_SESSION["user_id"])){
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="logout"){
    session_unset();
    session_destroy();
    http_response_code(200);
header('Content-Type: application/json');
echo json_encode(array("success"=>"loggedOut"));
 }else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="getLoggedUser"){
   $result=$userService->findById($_SESSION["user_id"]);
   sendResponse($result);

 }else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="delete_user"){
   $form_data=$postVars["formData"];
   $data = json_decode($form_data, true);
   $password = $data['password'];
   $message=$userService->delete_user($_SESSION["user_id"],$password);
   if(property_exists($message,'error')){
      http_response_code(400);
      header('Content-Type: application/json');
      echo json_encode($message);
   }else {
      http_response_code(200);
      echo json_encode($message);
      session_unset();
      session_destroy();
   }
 }else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="set_avatar"){

   $result=$userService->setAvatar($_SESSION["user_id"],$_FILES["formData"]);
     sendResponse($result);
 }
 else
 CRUD_controller($userService,$method, $getVars, $postVars);

}else {  http_response_code(400);
header('Content-Type: application/json');
echo json_encode(array("error"=>"notLogged","status"=>false));}
