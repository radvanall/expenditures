<?php
include_once "Repository.php";
class RecordRepository extends Repository{
 
    // public function findAll($table=null){
    //     $this->connection=$this->db::connect();
    //     $sql="SELECT r.id,r.product_name,r.quantity,r.price,r.category_id,r.invoice_id,c.category_name FROM record r inner join category c on r.category_id=c.id";
    //     $stmt=$this->connection->prepare($sql);
    //     $stmt->execute();
    //     $data=array();
    //     while($row=$stmt->fetch()){
    //         array_push($data,$row);
    //     }
    //     $this->db::disconnect();
    //     return $data;
    // }
    // public function findById($id,$table=null) {
    //     $this->connection=$this->db::connect();
    //     $sql="SELECT r.id,r.product_name,r.quantity,r.price,r.category_id,r.invoice_id,c.category_name FROM record r inner join category c on r.category_id=c.id WHERE r.id=?";
    //     $stmt = $this->connection->prepare($sql);
    //     $stmt->execute([$id]);
    //     $data = $stmt->fetch();
    //     $this->db::disconnect();
    //     return $data;
    // }
    public function findById($id,$table=null){
      return parent::findById($id,"record");
    }   
     public function findAll($table=null){
        return parent::findAll('record');
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
   // $this->db::disconnect();
    return $response; 
   }
   public function update($data){
    $this->connection=$this->db::connect();
    $sql="UPDATE `record` SET`quantity`=:quantity,`price`=:price,`invoice_id`=:invoice_id ,`item_id`=:item_id WHERE id=:id ";
    $stmt=$this->connection->prepare($sql);
    $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->getId())),PDO::PARAM_INT);
    $stmt->bindValue(":quantity",htmlspecialchars(strip_tags($data->getQuantity())),PDO::PARAM_INT);
    $stmt->bindValue(":price",htmlspecialchars(strip_tags($data->getPrice())),PDO::PARAM_STR);
    $stmt->bindValue(":item_id",htmlspecialchars(strip_tags($data->getItemId())),PDO::PARAM_INT);
    $stmt->bindValue(":invoice_id",htmlspecialchars(strip_tags($data->getInvoiceId())),PDO::PARAM_INT);
  
    $stmt->execute();
    $count = $stmt->rowCount();
    $this->db::disconnect();
    return $count;
   }

}