<?php
include("../db.php");
$query = "delete from users where id=" . $_GET['id'];
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./employee_master.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>