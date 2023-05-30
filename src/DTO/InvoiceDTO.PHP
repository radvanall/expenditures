<?php
class InvoiceDTO implements JsonSerializable{
    private $id;
    private $date;
    private $user_id;
    private $total_sum;
    private $records=[];
    
    public function __construct($id=0,$date="",$user_id=0,$total_sum=0,$records=[]){
        $this->id=$id;
        $this->date=$date;
        $this->user_id=$user_id;
        $this->total_sum=$total_sum;
        $this->records=$records;
    }
    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getDate() {
        return $this->date;
    }

    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function setRecords($records) {
        $this->records = $records;
    }

    public function getRecords() {
        return $this->records;
    }
    public function setTotalSum($total_sum){
        $this->total_sum=$total_sum;
    }
    public function getTotalSum(){
        return $this->total_sum;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'date' => $this->date,
            'user_id' => $this->user_id,
            'total_sum'=> $this->total_sum,
            'records' => $this->records
        ];
    }

}