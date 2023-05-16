<?php
include_once "Repository.php";
class InvoiceRepository extends Repository{
    private function insertQuery($data){
        $sql="INSERT INTO `invoice`(`user_id`, `date`)  VALUES(:user_id,:date)";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->getUserId())),PDO::PARAM_INT);
        $stmt->bindValue(":date",htmlspecialchars(strip_tags($data->getDate())),PDO::PARAM_STR);
        return $stmt;
    }
    public function findAll($user_id,$table=null){
        return parent::findAll($user_id,'invoice');
    }
    public function findById($id,$table=null){
        return parent::findById($id,"invoice");
      } 
        
    public function delete($id,$table=null){
        return parent::delete($id,'invoice');
    }

    public function insert($data){
       $this->connection=$this->db::connect();
        $stmt=$this->insertQuery($data);
       
        // $sql="INSERT INTO `invoice`(`user_id`, `date`)  VALUES(:user_id,:date)";
        // $stmt=$this->connection->prepare($sql);
        // $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->getUserId())),PDO::PARAM_INT);
        // $stmt->bindValue(":date",htmlspecialchars(strip_tags($data->getDate())),PDO::PARAM_STR);
        $response= $stmt->execute();
        // echo $this->connection->lastInsertId();
       // $this->db::disconnect();
        return $response;
    }
    public function update($data){
        $this->connection=$this->db::connect();
        $sql="UPDATE `invoice` SET `user_id`=:user_id,`date`=:date WHERE `id`=:id";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($data->getUserId())),PDO::PARAM_INT);
        $stmt->bindValue(":date",htmlspecialchars(strip_tags($data->getDate())),PDO::PARAM_STR);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($data->getId())),PDO::PARAM_INT);
        $stmt->execute();
        $count = $stmt->rowCount();
        $this->db::disconnect();
        return $count;
    }

    public function insertRecords($invoice,$records){
        $this->connection=$this->db::connect();
        $sql="INSERT INTO `invoice`(`user_id`, `date`)  VALUES(:user_id,:date)";
        $this->connection->beginTransaction();
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($invoice->getUserId())),PDO::PARAM_INT);
        $stmt->bindValue(":date",htmlspecialchars(strip_tags($invoice->getDate())),PDO::PARAM_STR);
        $response= $stmt->execute();
        $invoice_id = $pdo->lastInsertId();
        $this->db::disconnect();
        return $response;
    }

}
