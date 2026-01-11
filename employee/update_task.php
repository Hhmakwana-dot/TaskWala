<?php include './header.php'; ?>
<div class="container" style="max-width: 1000px;
max-height: 500px
    margin: 50px auto;
    padding: 0 20px;">
    <main class="main-content" id="mainContent">
        <div class="card fullscreen" style="min-height: 0!important; margin-top: 100px;">
            <h3 class="mb-5 mt-3">Task Update</h3>
            <form action="./update_task_in.php" method="post">
                <input type="hidden" name="id" id="taskId" value="<?php echo $_GET['id']; ?>">
                <textarea name="comment" class="form-control textarea mb-3" placeholder="Comment"></textarea>
                <div class="form-row mb-3"><label>Status</label><select name="status" id="taskStatus">
                        <option value="Pending" selected="">Pending</option>
                        <option value="In-Progress">In-Progress</option>
                        <option value="Completed">Completed</option>
                    </select></div>
                <div class="form-row"><label>Task File</label><input type="file" id="taskfile"></div>
                <div class="form-actions mt-5">
                    <button id="addTaskBtn" class="btn">Save Task</button>
                    <button id="clearTaskBtn" class="btn-secondary">Clear</button>
                </div>
            </form>
        </div>
    </main>
</div>