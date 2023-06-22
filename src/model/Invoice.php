<?php
class Invoice implements JsonSerializable{
    private $id;
    private $user_id;
    private $date;

     public function __construct($id, $user_id, $date) {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->date = $date;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId() {
        return $this->id;
    }

    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }

    public function getUserId() {
        return $this->user_id;
    }

    public function setDate($date) {
        $this->date = $date;
    }

    public function getDate() {
        return $this->date;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'date' => $this->date
        ];
    }
}