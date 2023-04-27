<?php
include "../src/repository/CategoryRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/CategoryService.php";
include "../src/controller/controller.php";
session_start();
 $repository=new CategoryRepository('DatabaseConnection');
 $categoryService=new CategoryService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 CRUD_controller($categoryService,$method, $getVars, $postVars);
 } else echo json_encode(array("message"=>"you are not logged in!","status"=>false));
// if($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["id"]) && $_GET["id"]=="all"){
//     $categories= $categoryService->findAll();
//     header('Content-Type: application/json; charset=utf-8');
//     echo json_encode($categories);
// } elseif($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["id"]) && isset($_GET["request"])&& $_GET["request"]=="find"){
//     $categories= $categoryService->findById($_GET["id"]);
//     if(property_exists($categories,'error')){
//         http_response_code(400);
//         echo json_encode($categories);
//     }else
//     echo json_encode($categories);
// } else if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["request"]) && $_POST["request"]=="insert"){

//     $form_data=$_POST["formData"];
//     $category=json_decode(stripslashes($form_data));
//     if($category===null){
//        echo 'Error decoding JSON: ' . json_last_error_msg();
//     }
//     else 
//     { $message=$categoryService->insert($category); echo json_encode($message);}

// }  else if($_SERVER["REQUEST_METHOD"]=="POST" && isset($_POST["request"]) && $_POST["request"]=="update"){
//     $form_data=$_POST["formData"];
//     $category=json_decode(stripslashes($form_data));
//     if($category===null){
//        echo 'Error decoding JSON: ' . json_last_error_msg();
//     }
//     else 
//     { $message=$categoryService->update($category); echo json_encode($message);}
// } else if($_SERVER["REQUEST_METHOD"]=="GET" && isset($_GET["request"]) && $_GET["request"]=="delete" && isset($_GET["id"])){
//     // echo $_GET["request"];
//      //echo $_GET["id"]==0;
//      $message=$categoryService->delete($_GET["id"]);
//      if(property_exists($message,'error')){
//          http_response_code(400);
//          echo json_encode($message);
//      }else
//      echo json_encode($message);
//  }


// else  echo "no categories";