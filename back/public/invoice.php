<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Credentials: true");
include_once "../src/sendResponse.php";
include "../src/repository/InvoiceRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/InvoiceService.php";
include "../src/repository/CategoryRepository.php";
include "../src/repository/ItemRepository.php";
include "../src/repository/RecordRepository.php";
include "../src/controller/controller.php";
session_start();
 $itemRepository=new ItemRepository('DatabaseConnection');
 $recordRepository=new RecordRepository('DatabaseConnection');
 $categoryRepository=new CategoryRepository('DatabaseConnection');
 $repository=new InvoiceRepository('DatabaseConnection');
 $invoiceService=new InvoiceService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="insert_full"){
    $formData = $_POST['formData']; 
    $arrayData = json_decode($formData,true);
    $records=$arrayData["records"];
    $date =$arrayData["date"]; 
    $user_id=$_SESSION["user_id"];

  $result=$invoiceService->insertRecords($records,$date,$user_id,$recordRepository,$categoryRepository,$itemRepository);
  sendResponse($result);
 }else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="get_table_invoice"){
   $user_id=$_SESSION["user_id"];
   $firstRow=$getVars["firstRow"];
   $offset=$getVars["offset"];
   $date=$getVars["date"];
   $firstDate=$getVars["first_date"];
   $lastDate=$getVars["last_date"];
   $maxPrice=$getVars["max_price"];
   $minPrice=$getVars["min_price"];
   $result=$invoiceService->findAllInvoiceTable($user_id,$firstRow,$offset,$date,$firstDate,$lastDate, $maxPrice,$minPrice);
   sendResponse($result);
 }
 else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="get_full_invoice"){
  $user_id=$_SESSION["user_id"];
  $invoice_id=$getVars["invoice_id"];
  $result=$invoiceService->getFullInvoice($user_id,$invoice_id);
  sendResponse($result);

 } else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="money_per_date"){
  $user_id=$_SESSION["user_id"];
  $first_date=$getVars["first_date"];

  $result=$invoiceService->getMoneyPerDay($user_id,$first_date);
  sendResponse($result);

 }
 else
 CRUD_controller($invoiceService,$method, $getVars, $postVars);
} else {  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(array("error"=>"you are not logged in!","status"=>false));}