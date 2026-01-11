<?php
include("./header.php");

?>
<main class="main-content" id="mainContent">
    <div class="card fullscreen">
        <h3>Task Allotment</h3>
        <form action="./assign_in.php" method="post">
            <div class="form-row">
                <?php
                $query = "SELECT * FROM tasks where id=" . $_GET['id'];
                $result = mysqli_query($conn, $query);
                $task = mysqli_fetch_assoc($result);
                ?>
                <label>Task</label>
                <p><?php echo $task['title']; ?></p>
                <label>Description</label>
                <p><?php echo $task['description']; ?></p>
            </div>
            <div class="form-row">
                <?php
                $query = "SELECT * FROM users WHERE role='employee'";
                $result = mysqli_query($conn, $query);
                ?>
                <label>Assigned To</label><select id="allotUser" name="assigned_to">
                    <option value="">-- Select users --</option>
                    <?php while ($task = mysqli_fetch_assoc($result)) { ?>
                        <option value="<?php echo $task['id']; ?>">
                            <?php echo $task['name']; ?>
                        </option>
                    <?php } ?>
                </select>
            </div>
            <input type="hidden" name="taskId" value="<?php echo $_GET['id']; ?>">
            <div class="form-row"><label>Due Date</label><input id="allotDue" name="due_date" type="date"></div>
            <div class="form-row"><label>Status</label><select id="taskStatus" name="status">
                    <option selected="">Pending</option>
                    <option>In-Progress</option>
                    <option>Completed</option>
                </select></div>
            <div class="form-actions"><button id="addAllotBtn" class="btn">Save Allotment</button><button
                    id="clearAllotBtn" class="btn-secondary">Clear</button></div>

        </form>
    </div>
</main>