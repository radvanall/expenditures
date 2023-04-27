<?php
//include "../src/model/User.php";
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
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="login"){
    // echo $postVars['request'];
     $form_data=$postVars["formData"];
     $form_data=json_decode($form_data);
     $result=$userService->login($form_data);
    echo json_encode($result);
    // session_start();
   //  echo $_SESSION['user_id'];
    //  var_dump($form_data);
 }else if(isset($_SESSION["user_id"])){
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="loggout"){
    session_unset();
    session_destroy();
 }
 else
 CRUD_controller($userService,$method, $getVars, $postVars);
}else echo json_encode(array("message"=>"you are not logged in!","status"=>false));

// if($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["id"])&& $_GET["id"]=="all"){
//       $users=$userService->findAll();
//       header('Content-Type: application/json; charset=utf-8');
//       echo json_encode($users);
// }else
// if($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["id"]) && $_GET["id"]!=="all" && isset($_GET["request"])&& $_GET["request"]=="find"){
//     $user=$userService->findById($_GET["id"]);
//     if(property_exists($user,'error')){
//         http_response_code(400);
//         echo json_encode($user);
//     }else
//     echo json_encode($user);
// }  else if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["request"]) && $_POST["request"]=="new_user"){

//          $form_data=$_POST["formData"];
//         // var_dump($form_data);
//          //echo $test;
//         //   var_dump($test);
//          $user=json_decode(stripslashes($form_data));
//          if($user===null){
//             echo 'Error decoding JSON: ' . json_last_error_msg();
//          }
//          else 
//          { $message=$userService->insert($user); echo json_encode($message);}

// }  else if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["request"]) && $_POST["request"]=="update"){
//     $form_data=$_POST["formData"];
//     $user=json_decode(stripslashes($form_data));
//     if($user===null){
//        echo 'Error decoding JSON: ' . json_last_error_msg();
//     }
//     else 
//     { $message=$userService->update($user); echo json_encode($message);}
//    // echo $_POST["request"];
// }  else if($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["request"]) && $_GET["request"]=="delete" && isset($_GET["id"])){
//    // echo $_GET["request"];
//     //echo $_GET["id"]==0;
//     $message=$userService->delete($_GET["id"]);
//     if(property_exists($message,'error')){
//         http_response_code(400);
//         echo json_encode($message);
//     }else
//     echo json_encode($message);
// }
          
// else echo "no users";