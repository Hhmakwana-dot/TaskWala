<?php
$query = "DELETE FROM courier_inward WHERE id=" . $_POST['id'];
include("../db.php");
$result = mysqli_query($conn, $query);
if ($result) {
    echo "Success";
} else {
    echo "Error: " . mysqli_error($conn);
}
?>