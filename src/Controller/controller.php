<?php
function CRUD_controller($service,$method, $getVars, $postVars){
if($method=="GET" && isset($getVars["id"])&& $getVars["id"]=="all"){
    $result=$service->findAll();
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($result);
}
else if($method=="GET" && isset($getVars["id"]) && $getVars["id"]!=="all" && isset($getVars["request"])&& $getVars["request"]=="find"){
  $result=$service->findById($getVars["id"]);
  if(property_exists($result,'error')){
      http_response_code(400);
      echo json_encode($result);
  }else
   echo json_encode($result);
 } else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="insert"){
   $form_data=$_POST["formData"];
   $input_data=json_decode(stripslashes($form_data));
     if($input_data===null){
          echo 'Error decoding JSON: ' . json_last_error_msg();
       }
     else 
     { $message=$service->insert($input_data); 
       echo json_encode($message);}
}  else if($method=="POST" && isset($postVars["request"]) && $postVars["request"]=="update"){
  $form_data=$postVars["formData"];
  $input_data=json_decode(stripslashes($form_data));
  if($input_data===null){
     echo 'Error decoding JSON: ' . json_last_error_msg();
  }
  else 
  { $message=$service->update($input_data); echo json_encode($message);}

}  else if($method=="GET" && isset($getVars["request"]) && $getVars["request"]=="delete" && isset($getVars["id"])){
  $message=$service->delete($getVars["id"]);
  if(property_exists($message,'error')){
      http_response_code(400);
      echo json_encode($message);
  }else
  echo json_encode($message);
}
else echo "no data";
}