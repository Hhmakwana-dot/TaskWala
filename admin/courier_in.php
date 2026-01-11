<?php
$number = $_POST['number'];
$from = $_POST['from'];
$receivedBy = $_POST['received_by'];
$status = $_POST['status'];
include("../db.php");
$query = "INSERT INTO courier_inward (courier_number,`from`,received_by,status)
VALUES ('$number','$from','$receivedBy','$status')";
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./courier_inward.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>