<?php
function sendResponse($result){
    if(property_exists($result,'error')){
        http_response_code(400);
        echo json_encode($result);
    }else{
      http_response_code(200);
      echo json_encode($result);    
   }
   exit();
}