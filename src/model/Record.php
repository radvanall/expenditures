<?php 
 class Record implements JsonSerializable{
    private $id;
    private $quantity;
    private $price;
    private $invoice_id;
    private $item_id;

    function __construct($id=0,$quantity=0,$price=0,$invoice_id=0,$item_id=0){
        $this->id=$id;
        $this->quantity=$quantity;
        $this->price=$price;
        $this->invoice_id=$invoice_id;
        $this->item_id=$item_id;
    }
   // Setter for id
public function setId($id) {
$this->id = $id;
}

// Getter for id
public function getId() {
    return $this->id;
}


// Setter for quantity
public function setQuantity($quantity) {
    $this->quantity = $quantity;
}

// Getter for quantity
public function getQuantity() {
    return $this->quantity;
}

// Setter for price
public function setPrice($price) {
    $this->price = $price;
}

// Getter for price
public function getPrice() {
    return $this->price;
}

// Setter for invoice_id
public function setInvoiceId($invoice_id) {
    $this->invoice_id = $invoice_id;
}

// Getter for invoice_id
public function getInvoiceId() {
    return $this->invoice_id;
}
public function setItemId($item_id){
    $this->item_id=$item_id;
}
public function getItemId(){
   return $this->item_id;
}
public function jsonSerialize() {
    return [
        'id' => $this->id,
        'quantity' => $this->quantity,
        'price' => $this->price,
        'invoice_id' => $this->invoice_id,
        'item_id' => $this->item_id
    ];
}
}

