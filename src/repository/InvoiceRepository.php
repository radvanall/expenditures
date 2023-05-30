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
    function countRows($user_id){
        $this->connection=$this->db::connect();
        $sql="SELECT COUNT(*) AS row_count FROM ( SELECT i.id FROM invoice i INNER JOIN record r ON i.id = r.invoice_id WHERE i.user_id = :id GROUP BY i.id ) AS subquery;";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
         $stmt->execute();
        $response= $stmt->fetch();
        $this->db::disconnect();
        return $response;

    }
    public function insert($data){
       $this->connection=$this->db::connect();
        $stmt=$this->insertQuery($data);
        $response= $stmt->execute();
        return $response;
    }

    public function  findAllInvoiceTable($user_id,$firstRow,$offset){
        $this->connection=$this->db::connect();
        $sql = "SELECT i.id as id,i.date as 'date', COUNT(r.id) as nr_of_records,SUM(r.quantity) as quantity,  SUM(r.price*r.quantity) as total_price,user_id FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=:id GROUP BY i.id LIMIT :firstRow, :offset;";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        $stmt->bindValue(":firstRow",htmlspecialchars(strip_tags($firstRow)),PDO::PARAM_INT);
        $stmt->bindValue(":offset",htmlspecialchars(strip_tags($offset)),PDO::PARAM_INT);
        $stmt->execute();
        $data=array();
        while($row=$stmt->fetch()){
            array_push($data,$row);
        }
        $this->db::disconnect();
        return $data;
        
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

    public function getFullInvoice($user_id,$invoice_id){
        $this->connection=$this->db::connect();
        $sql="SELECT i.id as invoice_id,i.user_id, i.date,r.id as record_id,im.id as item_id,im.item_name,im.unit,im.category_id,c.category_name,r.quantity,r.price, r.price*r.quantity as total_price FROM invoice i inner join record r on i.id=r.invoice_id inner join item im on im.id=r.item_id inner join category c on c.id=im.category_id where i.user_id=:user_id and i.id=:invoice_id;";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":user_id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        $stmt->bindValue(":invoice_id",htmlspecialchars(strip_tags($invoice_id)),PDO::PARAM_INT);
        $stmt->execute();
        $result=array();
        while($row=$stmt->fetch()){
            array_push($result,$row);
        }
        $this->db::disconnect();
        return $result;
    }
     
}
