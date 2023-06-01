<?php
class MoneyPerDay implements JsonSerializable{
    private $date;
    private $money;

    function __construct($date="",$money=0){
        $this->date=$date;
        $this->money=$money;
    }

   public function  setDate($date){
        $this->date=$date;
    }
   public function  getDate(){
        return $this->date;
    }
   public  function setMoney($money){
        $this->money=$money;
    }
   public  function getMoney(){
        return $this->money;
    }
    public function jsonSerialize(){
        return [
            "date"=>$this->date,
            "money"=>$this->money
        ];
    }

}