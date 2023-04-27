<?php
class Invoice implements JsonSerializable{
    private $id;
    private $user_id;
    private $date;

     // Constructor
     public function __construct($id, $user_id, $date) {
        $this->id = $id;
        $this->user_id = $user_id;
        $this->date = $date;
    }

    // Setter for id
    public function setId($id) {
        $this->id = $id;
    }

    // Getter for id
    public function getId() {
        return $this->id;
    }

    // Setter for user_id
    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }

    // Getter for user_id
    public function getUserId() {
        return $this->user_id;
    }

    // Setter for date
    public function setDate($date) {
        $this->date = $date;
    }

    // Getter for date
    public function getDate() {
        return $this->date;
    }

    // Implement the jsonSerialize() method from JsonSerializable interface
    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'date' => $this->date
        ];
    }
}