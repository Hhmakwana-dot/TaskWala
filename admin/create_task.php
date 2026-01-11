<?php
include("./header.php");
?>
<main class="main-content" id="mainContent">
    <div class="card fullscreen">
        <h3>Task Entry</h3>
        <form action="task_insert.php" method="post" onsubmit="return validateTaskForm()">

            <div class="form-row">
                <label>Title</label>
                <input type="text" name="title" id="title" placeholder="Enter task title">
                <small class="error" id="titleErr"></small>
            </div>

            <div class="form-row">
                <label>Description</label>
                <input type="text" name="description" id="description" placeholder="Description">
                <small class="error" id="descErr"></small>
            </div>

            <div class="form-row">
                <label>Priority</label>
                <select name="priority" id="priority">
                    <option value="">Select priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <small class="error" id="priorityErr"></small>
            </div>

            <div class="form-row">
                <label>Status</label>
                <select name="status" id="status">
                    <option value="">Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <small class="error" id="statusErr"></small>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn">Save Task</button>
                <button type="reset" class="btn-secondary">Clear</button>
            </div>

        </form>
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
                                    <a data-id="e_1767867125240" href="./assign_task.php?id=<?= $task['id']; ?>"
                                        class="upEmp btn ghost">Update</a>
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