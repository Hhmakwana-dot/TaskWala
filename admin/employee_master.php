<?php
include("./header.php");
?>
<main class="main-content" id="mainContent">
    <div class="card fullscreen">

        <h3>Employee Master</h3>
        <form action="./employee_in.php" method="post" onsubmit="return validateEmployeeForm()">

            <div class="form-row">
                <label>Employee Name</label>
                <input type="text" id="empName" name="name" placeholder="Name">
                <small class="error" id="nameErr"></small>
            </div>

            <div class="form-row">
                <label>Email ID</label>
                <input type="text" id="empEmail" name="email" placeholder="Email">
                <small class="error" id="emailErr"></small>
            </div>

            <div class="form-row">
                <label>Password</label>
                <input type="password" id="empPass" name="password" placeholder="Password">
                <small class="error" id="passErr"></small>
            </div>

            <div class="form-row">
                <label>Role</label>
                <select id="empRole" name="role">
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Employee">Employee</option>
                </select>
                <small class="error" id="roleErr"></small>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn">Save Employee</button>
                <button type="reset" class="btn-secondary">Clear</button>
            </div>

        </form>

        <div class="card" style="margin-top:16px">
            <h4>Employee List</h4>
            <div class="table-wrap">
                <?php
                $query = "SELECT * FROM users";
                $result = mysqli_query($conn, $query);

                ?>
                <table id="empTable">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($emp = mysqli_fetch_assoc($result)) { ?>
                            <tr>
                                <td>
                                    <?php echo $emp['name']; ?>
                                </td>
                                <td>
                                    <?php echo $emp['email']; ?>
                                </td>
                                <td>
                                    <?php echo $emp['role']; ?>
                                </td>
                                <td>
                                    <?php echo $emp['created_at']; ?>
                                </td>
                                <td>
                                    <a href="./employee_delete.php" data-id="e_1767867125240"
                                        class="delEmp btn ghost">Delete</a>
                                </td>
                            </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<script src="../js/employee_in.js"></script>