<?php
include("./header.php");
?>
<main class="main-content" id="mainContent">
    <div class="card fullscreen">
        <h3>Courier Inward Entry</h3>

        <form action="./courier_in.php" method="post" onsubmit="return validateCourierForm()">

            <div class="form-row">
                <label>Courier No</label>
                <input id="cinNo" name="number" placeholder="Courier number">
                <small class="error" id="noErr"></small>
            </div>

            <div class="form-row">
                <label>From</label>
                <input id="cinFrom" name="from" placeholder="From">
                <small class="error" id="fromErr"></small>
            </div>

            <div class="form-row">
                <label>Received By</label>
                <input id="cinTo" name="received_by" placeholder="Received at office">
                <small class="error" id="toErr"></small>
            </div>

            <div class="form-row">
                <label>Status</label>
                <select id="cinStatus" name="status">
                    <option value="">Select status</option>
                    <option value="Received">Received</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Delivered">Delivered</option>
                </select>
                <small class="error" id="statusErr"></small>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn">Save Inward</button>
                <button type="reset" class="btn-secondary">Clear</button>
            </div>

        </form>

        <div class="card" style="margin-top:16px">
            <h4 class="mt-5">Courier Inward List</h4>
            <div class="table-wrap">
                <table id="cinTable">
                    <?php
                    $query = "SELECT * FROM courier_inward ";
                    $result = mysqli_query($conn, $query);

                    ?>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Remarks</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php while ($cin = mysqli_fetch_assoc($result)) { ?>
                            <tr>
                                <td>
                                    <?php echo $cin['courier_number']; ?>
                                </td>
                                <td>
                                    <?php echo $cin['from']; ?>
                                </td>
                                <td>
                                    <?php echo $cin['received_by']; ?>
                                </td>
                                <td>
                                    <?php echo $cin['status']; ?>
                                </td>
                                <td>
                                    <?php echo $cin['date']; ?>
                                </td>
                                <td><a data-id="ci_" href="./courier_delete.php?id<?php echo $cin['id']; ?>"
                                        class="delCin btn ghost">Delete</a></td>
                            </tr>
                        <?php } ?>

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</main>
<script src="../js/courier_inward.js"></script>