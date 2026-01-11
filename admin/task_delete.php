<?php
include("../db.php");
$query = "delete from tasks where id=" . $_GET['id'];
$result = mysqli_query($conn, $query);
if ($result) {
    header("Location: ./view_task.php");
} else {
    echo "Error: " . mysqli_error($conn);
}
?>