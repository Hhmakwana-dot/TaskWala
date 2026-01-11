<?php
include("../db.php");
$id = $_GET['id'];
$query = "DELETE FROM tasks WHERE id=$id";
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: dashboard.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>