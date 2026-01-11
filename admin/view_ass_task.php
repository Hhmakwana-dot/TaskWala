<?php
include("./header.php");
?>
<main class="main-content" id="mainContent">
    <div class="card fullscreen">
        <h3>Task Entry</h3>
        <div class="card" style="margin-top:16px">
            <h4 class="mt-5">Allotted Tasks</h4>
            <div class="table-wrap">
                <?php
                $query = "SELECT * FROM tasks ";
                $result = mysqli_query($conn, $query);
                ?>
                <table id="empTable">
                    <thead>
                        <tr>
                            <th>Task</th>
                            <th>Priority</th>
                            <th>Due</th>
                            <th>Action</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($task = mysqli_fetch_assoc($result)) { ?>
                            <tr>
                                <td>
                                    <?php echo $task['title']; ?>
                                </td>
                                <td>
                                    <?php echo $task['priority']; ?>
                                </td>
                                <td>
                                    <?php echo $task['due_date']; ?>
                                </td>
                                <td>
                                    <a data-id="e_1767867125240" href="./task_delete.php?id=<?= $task['id']; ?>"
                                        class="delEmp btn ghost">Delete</a>
                                </td>
                                <td>
                                    <a data-id=" e_1767867125240" href="./assign_task.php?id=<?= $task['id']; ?>"
                                        class="delEmp btn ghost">Update</a>
                                </td>
                            </tr>
                        <?php } ?>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<script src="../js/task_in.js"></script>