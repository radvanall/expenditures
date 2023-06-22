<?php
class TableInvoice implements JsonSerializable{
    private $id;
    private $date;
    private $quantity;
    private $nr_of_records;
    private $total_price;

    function __construct($id,$date,$quantity,$nr_of_records,$total_price){
        $this->id=$id;
        $this->date=$date;
        $this->quantity=$quantity;
        $this->nr_of_records=$nr_of_records;
        $this->total_price=$total_price;
    }

    function setId($id){
        $this->id=$id;
    }
    function getId(){
     return $this->id;
    }

    function setDate($date){
        $this->date=$date;
    }
    function getDate(){
        return $this->date;
    }

    function setQuantity($quantity){
        $this->quantity=$quantity;
    }
    function getQuantity(){
        return $this->quantity;
    }

    function getNrOfRecords(){
        return $this->nr_of_records;
    }
    function setNrOfRecords($nr_of_records){
     $this->nr_of_records=$nr_of_records;
    }

    function getTotalPrice(){
        return $this->total_price;
    }
    function setTotalPrice($total_price){
        $this->total_price=$total_price;
    }
    public function jsonSerialize(){
        return [
            "id"=>$this->id,
            "date"=>$this->date,
            "quantity"=>$this->quantity,
            "nr_of_records"=>$this->nr_of_records,
           "total_price"=>$this->total_price
        ];
     }

}