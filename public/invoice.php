<?php
include "../src/repository/InvoiceRepository.php";
include "../src/DatabaseConnection.php";
include "../src/service/InvoiceService.php";
include "../src/repository/CategoryRepository.php";
// include "../src/service/CategoryService.php";
// include "../src/service/RecordService.php";
include "../src/repository/RecordRepository.php";
include "../src/controller/controller.php";
session_start();
 $recordRepository=new RecordRepository('DatabaseConnection');
//  $recordService=new RecordService($recordRepository);
 $categoryRepository=new CategoryRepository('DatabaseConnection');
//  $categoryService=new CategoryService($categoryRepository);
 $repository=new InvoiceRepository('DatabaseConnection');
 $invoiceService=new InvoiceService($repository);
 $method = $_SERVER['REQUEST_METHOD']; 
 $getVars = $_GET; 
 $postVars = $_POST; 
 if(isset($_SESSION["user_id"])){
 if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="insert_full"){
    $formData = $_POST['formData'];
    $data = $_POST['data'];    
    $arrayData = json_decode($formData,true);
    $invoice=json_decode($data);
     $records=$arrayData["records"];
    // var_dump($arrayData["records"]);
   
    // echo $_POST['date'];
    // echo $_POST['user_id'];
  $result=$invoiceService->insertRecords($records,$invoice,$recordRepository,$categoryRepository);
   if(property_exists($result,'error')){
    http_response_code(400);
    echo json_encode($result);
}else
 echo json_encode($result);
    
    // foreach ($records as $item) {
    //  echo $item["product_name"];
    // }
 }else
 CRUD_controller($invoiceService,$method, $getVars, $postVars);
} else echo json_encode(array("status"=>"you are not logged in!"));