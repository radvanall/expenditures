<?php
//include "../src/model/User.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
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
     $message=$userService->login($form_data);
     if(property_exists($message,'error')){
      http_response_code(400);
      header('Content-Type: application/json');
      echo json_encode($message);
   }else {
      http_response_code(200);
      echo json_encode($message);
   }
   
 }else  if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="create"){
   $form_data=$_POST["formData"];
   $input_data=json_decode(stripslashes($form_data));
     if($input_data===null){
          echo 'Error decoding JSON: ' . json_last_error_msg();
       }
     else 
     { $message=$userService->insert($input_data); 
      if(property_exists($message,'error')){
         http_response_code(400);
         header('Content-Type: application/json');
         echo json_encode($message);
      }else {
         http_response_code(200);
         echo json_encode($message);
      }
      }
}
 
 else if(isset($_SESSION["user_id"])){
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="logout"){
    session_unset();
    session_destroy();
    http_response_code(200);
header('Content-Type: application/json');
echo json_encode(array("success"=>"you logged out!"));
 }else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="getLoggedUser"){
   $message=$userService->findById($_SESSION["user_id"]);
   if(property_exists($message,'error')){
      http_response_code(400);
      header('Content-Type: application/json');
      echo json_encode($message);
   }else {
      $message->set_password_hash("classified data");
      http_response_code(200);
      echo json_encode($message);
   }
 }
 else
 CRUD_controller($userService,$method, $getVars, $postVars);

}else {  http_response_code(400);
header('Content-Type: application/json');
echo json_encode(array("error"=>"you are not logged in!"));}
