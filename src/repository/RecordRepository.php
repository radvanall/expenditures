<?php
include_once "Repository.php";
class RecordRepository extends Repository{
    public function findById($id,$table=null){
      return parent::findById($id,"record");
    }   
     public function findAll($user_id,$table=null){
        return parent::findAll($user_id,'record');
    }

    public function delete($id,$table=null){
        return parent::delete($id,'record');
    }
   public function insert($data){
   $this->connection=$this->db::connect();
    $sql="INSERT INTO  `record`(`quantity`, `price`,`invoice_id`,`item_id`) VALUES(:quantity,:price,:invoice_id,:item_id)";
    $stmt=$this->connection->prepare($sql);
    $stmt->bindValue(":quantity",htmlspecialchars(strip_tags($data->getQuantity())),PDO::PARAM_INT);
    $stmt->bindValue(":price",htmlspecialchars(strip_tags($data->getPrice())),PDO::PARAM_STR);
    $stmt->bindValue(":invoice_id",htmlspecialchars(strip_tags($data->getInvoiceId())),PDO::PARAM_INT);
    $stmt->bindValue(":item_id",htmlspecialchars(strip_tags($data->getItemId())),PDO::PARAM_INT);
    $response= $stmt->execute();
    return $response; 
   }
   public function update($data){
    $this->connection=$this->db::connect();
    $sql="UPDATE `record` SET`quantity`=:quantity,`price`=:price,`item_id`=:item_id WHERE id=:id ";
    $stmt=$this->connection->prepare($sql);
    $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->getId())),PDO::PARAM_INT);
    $stmt->bindValue(":quantity",htmlspecialchars(strip_tags($data->getQuantity())),PDO::PARAM_INT);
    $stmt->bindValue(":price",htmlspecialchars(strip_tags($data->getPrice())),PDO::PARAM_STR);
    $stmt->bindValue(":item_id",htmlspecialchars(strip_tags($data->getItemId())),PDO::PARAM_INT);
    $stmt->execute();
    $count = $stmt->rowCount();
    $this->db::disconnect();
    return $count;
   }

}