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
    function countRows($user_id,$date,$firstDate,$lastDate,$maxPrice,$minPrice){
        $this->connection=$this->db::connect();
        // $sql="SELECT COUNT(*) AS row_count FROM ( SELECT i.id FROM invoice i INNER JOIN record r ON i.id = r.invoice_id WHERE i.user_id = :id GROUP BY i.id ) AS subquery;";
        $dateFlag=false;
        $firstDateFlag=false;
        $lastDateFlag=false;
        $minPriceFlag=false;
        $maxPriceFlag=false;
        $sql="SELECT COUNT(*) AS row_count FROM ( SELECT i.id,i.date,SUM(r.price*r.quantity) as total_price  FROM invoice i INNER JOIN record r ON i.id = r.invoice_id WHERE i.user_id = :id" ;
        // and i.date > "2023-04-01" and i.date <"2023-04-17" GROUP BY i.id ) as s2";
        if($date!='0'){
           $dateFlag=true;
           $sql .=" and i.date=:date";
       }else if($firstDate!='0'){
           $firstDateFlag=true;
           $sql .=" and i.date>:first_date";
           $where=true;
       }
       if($lastDate!='0'){
           $lastDateFlag=true;
               $sql .=" and i.date <:last_date";
     
       }
         $sql .=" GROUP BY i.id "; 
       if($minPrice!='0'){
           $minPriceFlag=true;
            $sql .=" HAVING total_price >:min_price";
       }
       if($maxPrice!='0'){
           $maxPriceFlag=true;
           if($minPriceFlag){
            $sql .=" and total_price <:max_price";   
           }else{
            $sql .=" HAVING total_price <:max_price";  
           }
                 
       }
       $sql .=") as s2";

        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        if($dateFlag){
            $stmt->bindValue(":date",htmlspecialchars(strip_tags($date)),PDO::PARAM_STR);
        }
     
        if($firstDateFlag){
            $stmt->bindValue(":first_date",htmlspecialchars(strip_tags($firstDate)),PDO::PARAM_STR);
        }
     
        if($lastDateFlag){
              $stmt->bindValue(":last_date",htmlspecialchars(strip_tags($lastDate)),PDO::PARAM_STR);
        }
      
        if($minPriceFlag){
              $stmt->bindValue(":min_price",htmlspecialchars(strip_tags($minPrice)),PDO::PARAM_INT); 
        }
     
        if($maxPriceFlag){
                $stmt->bindValue(":max_price",htmlspecialchars(strip_tags($maxPrice)),PDO::PARAM_INT);
        }
         $stmt->execute();
        $response= $stmt->fetch();
        $this->db::disconnect();
        return $response;

    }
    function max_price($user_id){
        $this->connection=$this->db::connect();
        $sql="SELECT MAX(prices.total_price) as max_price FROM (SELECT SUM(r.price*r.quantity) as total_price FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=:id GROUP BY i.id) AS prices";
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

    public function  findAllInvoiceTable($user_id,$firstRow,$offset,$date,$firstDate,$lastDate,$maxPrice,$minPrice){
        $this->connection=$this->db::connect();
        // $sql = "SELECT i.id as id,i.date as 'date', COUNT(r.id) as nr_of_records,SUM(r.quantity) as quantity,  SUM(r.price*r.quantity) as total_price,user_id FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=:id GROUP BY i.id LIMIT :firstRow, :offset;";
        // echo json_encode(array($date,$firstDate,$lastDate,$maxPrice,$minPrice));
        $where=false;
        $dateFlag=false;
        $firstDateFlag=false;
        $lastDateFlag=false;
        $minPriceFlag=false;
        $maxPriceFlag=false;
        $sql="SELECT * FROM (SELECT i.id as id,i.date as 'date', COUNT(r.id) as nr_of_records,SUM(r.quantity) as quantity, SUM(r.price*r.quantity) as total_price,user_id FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=:id GROUP BY i.id ) as s2";
        if($date!='0'){
            //  echo $date;
            $dateFlag=true;
            $sql .=" WHERE s2.date=:date";
            $where=true;
        }else if($firstDate!='0'){
            $firstDateFlag=true;
            $sql .=" WHERE s2.date>:first_date";
            $where=true;
        }
        if($lastDate!='0'){
            $lastDateFlag=true;
            if($where){
                $sql .=" and s2.date <:last_date";
            }else{
                $sql .=" WHERE s2.date <:last_date";
                $where=true;
            }
        }
        if($minPrice!='0'){
            $minPriceFlag=true;
            if($where){
                $sql .=" and s2.total_price >:min_price";
            }else{
                $sql .=" WHERE s2.total_price >:min_price";
                $where=true; 
            }
        }
        if($maxPrice!='0'){
            $maxPriceFlag=true;
            if($where){
                $sql .=" and s2.total_price <:max_price";
            }else{
                $sql .=" WHERE s2.total_price <:max_price";
                $where=true; 
            }
        }
        $sql .=" LIMIT :firstRow, :offset";

        // SELECT * FROM (SELECT i.id as id,i.date as 'date', COUNT(r.id) as nr_of_records,SUM(r.quantity) as quantity, SUM(r.price*r.quantity) as total_price,user_id FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=1 GROUP BY i.id) as s2 WHERE s2.date BETWEEN "2023-04-01" and "2023-04-17";
        //  echo $sql;
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        $stmt->bindValue(":firstRow",htmlspecialchars(strip_tags($firstRow)),PDO::PARAM_INT);
        $stmt->bindValue(":offset",htmlspecialchars(strip_tags($offset)),PDO::PARAM_INT);
        if($dateFlag){
            $stmt->bindValue(":date",htmlspecialchars(strip_tags($date)),PDO::PARAM_STR);
        }
     
        if($firstDateFlag){
            $stmt->bindValue(":first_date",htmlspecialchars(strip_tags($firstDate)),PDO::PARAM_STR);
        }
     
        if($lastDateFlag){
              $stmt->bindValue(":last_date",htmlspecialchars(strip_tags($lastDate)),PDO::PARAM_STR);
        }
      
        if($minPriceFlag){
              $stmt->bindValue(":min_price",htmlspecialchars(strip_tags($minPrice)),PDO::PARAM_INT); 
        }
     
        if($maxPriceFlag){
                $stmt->bindValue(":max_price",htmlspecialchars(strip_tags($maxPrice)),PDO::PARAM_INT);
        }
       
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
        $sql="SELECT i.id as invoice_id,i.user_id, i.date,r.id as record_id,im.id as item_id,im.item_name,im.unit,im.category_id,c.category_name,r.quantity,r.price, r.price*r.quantity as total_price FROM invoice i left join record r on i.id=r.invoice_id left join item im on im.id=r.item_id left join category c on c.id=im.category_id where i.user_id=:user_id and i.id=:invoice_id;";
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
    public function getMoneyPerDay($user_id, $firstDate){
        $this->connection=$this->db::connect();
        $sql="SELECT i.date, SUM(r.quantity*r.price) as money FROM `invoice` i inner join record r on i.id=r.invoice_id WHERE i.user_id=:id and i.date>:firstDate group by i.date";
        $stmt=$this->connection->prepare($sql);
        $stmt->bindValue(":id",htmlspecialchars(strip_tags($user_id)),PDO::PARAM_INT);
        $stmt->bindValue(":firstDate",htmlspecialchars(strip_tags($firstDate)),PDO::PARAM_STR);
        $stmt->execute();
        $result=array();
        while($row=$stmt->fetch()){
            array_push($result,$row);
        };
        $this->db::disconnect();
        return $result;
    }
     
}
