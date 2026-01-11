// TaskWala HTML v2.2 - main.js (final polished)
(function () {
  const LS_SESSION = "TaskWala_session_v2";
  const KEYS = {
    tasks: "TaskWala_tasks",
    allot: "TaskWala_task_allotment",
    dev: "TaskWala_task_development",
    cin: "TaskWala_courier_inward",
    cout: "TaskWala_courier_outward",
    notes: "TaskWala_notes",
    docs: "TaskWala_client_docs",
    cheques: "TaskWala_cheques",
    visitors: "TaskWala_visitors",
    leaves: "TaskWala_leaves",
    employees: "TaskWala_employee_master",
    settings: "TaskWala_settings",
  };
  // load or init data container
  const db = {};
  Object.values(KEYS).forEach(
    (k) => (db[k] = JSON.parse(localStorage.getItem(k) || "[]"))
  );

  // splash -> show login or app based on session
  const splashEl = document.getElementById("splash");
  const splashTitle = document.getElementById("splashTitle");
  setTimeout(() => {
    splashTitle.style.opacity = 1;
    splashTitle.style.transform = "scale(1)";
  }, 300);
  setTimeout(() => {
    splashEl.style.opacity = 0;
    splashEl.style.transition = "opacity .5s";
    setTimeout(() => {
      splashEl.style.display = "none";
      boot();
    }, 500);
  }, 1400);

  function saveKey(key) {
    localStorage.setItem(key, JSON.stringify(db[key]));
  }
  function saveAll() {
    Object.keys(KEYS).forEach((k) => saveKey(KEYS[k]));
  }

  function boot() {
    const session = JSON.parse(localStorage.getItem(LS_SESSION) || "null");
    if (session && session.loggedIn) {
      showApp(session.username);
    } else {
      showLogin();
    }
  }

  // LOGIN
  function showLogin() {
    document.getElementById("loginPage").classList.remove("hidden");
    document.getElementById("app").classList.add("hidden");
    document.getElementById("loginUser").focus();
    document.getElementById("btnLogin").onclick = () => {
      const u = document.getElementById("loginUser").value.trim();
      const p = document.getElementById("loginPass").value;
      if (u === "admin" && p === "123") {
        localStorage.setItem(
          LS_SESSION,
          JSON.stringify({ loggedIn: true, username: u })
        );
        document.getElementById("loginPage").classList.add("hidden");
        showApp(u);
      } else {
        alert("Invalid credentials");
      }
    };
    document.getElementById("btnLoginCancel").onclick = () => {
      document.getElementById("loginUser").value = "";
      document.getElementById("loginPass").value = "";
    };
  }

  function showApp(username) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    document.getElementById("signedInfo").textContent = username + " (Admin)";
    document.getElementById("logoutBtn").classList.remove("hidden");
    // menu wiring
    document.querySelectorAll(".menu-btn").forEach((b) =>
      b.addEventListener("click", () => {
        document
          .querySelectorAll(".menu-btn")
          .forEach((x) => x.classList.remove("active"));
        b.classList.add("active");
        loadPage(b.dataset.page);
      })
    );
    document.getElementById("logoutBtn").onclick = () => {
      localStorage.removeItem(LS_SESSION);
      location.reload();
    };
    loadPage("dashboard");
    initialRender();
  }

  // templates
  const templates = {
    dashboard: `<div class="card"><h2>Dashboard</h2><p class="muted small">Overview</p></div><div class="stat-grid" id="statsGrid"></div><div class="card"><h4>Task Status</h4><canvas id="taskChart" width="700" height="200"></canvas></div><div class="card"><h4>Recent Activity</h4><div id="recentList"></div></div>`,
    // other templates - only key ones inline for brevity; all pages included
    task: `<div class="card fullscreen"><h3>Task Entry</h3><div class="form-row"><label>Title</label><input id="taskTitle" placeholder="Enter task title"/></div><div class="form-row"><label>Client</label><input id="taskClient" placeholder="Client name"/></div><div class="form-row"><label>Priority</label><select id="taskPriority"><option>Low</option><option selected>Medium</option><option>High</option></select></div><div class="form-row"><label>Status</label><select id="taskStatus"><option selected>Pending</option><option>In Progress</option><option>Completed</option></select></div><div class="form-actions"><button id="addTaskBtn" class="btn">Save Task</button><button id="clearTaskBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="taskSearch" placeholder="Search tasks..." /><button id="exportTasksCSV" class="btn-secondary">Export CSV</button><button id="exportTasksPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="tasksTable"><thead><tr><th>Title</th><th>Client</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    taskAllot: `<div class="card fullscreen"><h3>Task Allotment</h3><div class="form-row"><label>Task</label><select id="allotTask"></select></div><div class="form-row"><label>Assign To</label><input id="allotUser" placeholder="Enter user name"/></div><div class="form-row"><label>Due Date</label><input id="allotDue" type="date"/></div><div class="form-actions"><button id="addAllotBtn" class="btn">Save Allotment</button><button id="clearAllotBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="allotSearch" placeholder="Search allotments..." /><button id="exportAllotCSV" class="btn-secondary">Export CSV</button><button id="exportAllotPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="allotTable"><thead><tr><th>Task</th><th>Assigned To</th><th>Due</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    taskDev: `<div class="card fullscreen"><h3>Task Development</h3><div class="form-row"><label>Task</label><select id="devTask"></select></div><div class="form-row"><label>Notes / Progress</label><textarea id="devNotes" rows="4" placeholder="Describe progress"></textarea></div><div class="form-actions"><button id="addDevBtn" class="btn">Save Development</button><button id="clearDevBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="devSearch" placeholder="Search development..." /><button id="exportDevCSV" class="btn-secondary">Export CSV</button><button id="exportDevPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="devTable"><thead><tr><th>Task</th><th>Notes</th><th>Date</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    courierIn: `<div class="card fullscreen"><h3>Courier Inward Entry</h3><div class="form-row"><label>Courier No</label><input id="cinNo" placeholder="Courier number"/></div><div class="form-row"><label>From</label><input id="cinFrom" placeholder="From"/></div><div class="form-row"><label>Received By</label><input id="cinTo" placeholder="Received at office"/></div><div class="form-row"><label>Remarks</label><textarea id="cinNote" rows="3"></textarea></div><div class="form-actions"><button id="addCinBtn" class="btn">Save Inward</button><button id="clearCinBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="cinSearch" placeholder="Search inward..." /><button id="exportCinCSV" class="btn-secondary">Export CSV</button><button id="exportCinPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="cinTable"><thead><tr><th>No</th><th>From</th><th>To</th><th>Remarks</th><th>Date</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    courierOut: `<div class="card fullscreen"><h3>Courier Outward Entry</h3><div class="form-row"><label>Courier No</label><input id="coutNo" placeholder="Courier number"/></div><div class="form-row"><label>To</label><input id="coutTo" placeholder="Recipient"/></div><div class="form-row"><label>Sent By</label><input id="coutFrom" placeholder="Sent by"/></div><div class="form-row"><label>Remarks</label><textarea id="coutNote" rows="3"></textarea></div><div class="form-actions"><button id="addCoutBtn" class="btn">Save Outward</button><button id="clearCoutBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="coutSearch" placeholder="Search outward..." /><button id="exportCoutCSV" class="btn-secondary">Export CSV</button><button id="exportCoutPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="coutTable"><thead><tr><th>No</th><th>To</th><th>From</th><th>Remarks</th><th>Date</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    notes: `<div class="card fullscreen"><h3>Notes Entry</h3><div class="form-row"><label>Title</label><input id="noteTitle" placeholder="Note title"/></div><div class="form-row"><label>Body</label><textarea id="noteBody" rows="4" placeholder="Note content"></textarea></div><div class="form-actions"><button id="addNoteBtn" class="btn">Save Note</button><button id="clearNoteBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="noteSearch" placeholder="Search notes..." /><button id="exportNotesCSV" class="btn-secondary">Export CSV</button><button id="exportNotesPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="notesTable"><thead><tr><th>Title</th><th>Body</th><th>Date</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    clientDocs: `<div class="card fullscreen"><h3>Client Documents</h3><div class="form-row"><label>Client</label><input id="docClient" placeholder="Client"/></div><div class="form-row"><label>Document Type</label><input id="docType" placeholder="Type"/></div><div class="form-row"><label>Remarks</label><input id="docRemarks" placeholder="Remarks"/></div><div class="form-row"><label>File (mock)</label><input id="docFile" type="file"/></div><div class="form-actions"><button id="addDocBtn" class="btn">Save Document</button><button id="clearDocBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="docSearch" placeholder="Search documents..." /><button id="exportDocsCSV" class="btn-secondary">Export CSV</button><button id="exportDocsPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="docsTable"><thead><tr><th>Client</th><th>Type</th><th>File</th><th>Date</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    cheques: `<div class="card fullscreen"><h3>Cheque Payments</h3><div class="form-row"><label>Cheque No</label><input id="chequeNo" placeholder="Cheque No"/></div><div class="form-row"><label>Client</label><input id="chequeClient" placeholder="Client"/></div><div class="form-row"><label>Bank</label><input id="chequeBank" placeholder="Bank"/></div><div class="form-row"><label>Amount</label><input id="chequeAmount" type="number" placeholder="Amount"/></div><div class="form-row"><label>Date</label><input id="chequeDate" type="date"/></div><div class="form-row"><label>Status</label><select id="chequeStatus"><option>Pending</option><option>Cleared</option><option>Bounced</option></select></div><div class="form-actions"><button id="addChequeBtn" class="btn">Save Cheque</button><button id="clearChequeBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="chequeSearch" placeholder="Search cheques..." /><button id="exportChequesCSV" class="btn-secondary">Export CSV</button><button id="exportChequesPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="chequesTable"><thead><tr><th>No</th><th>Client</th><th>Bank</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    visitors: `<div class="card fullscreen"><h3>Visitor Entry</h3><div class="form-row"><label>Name</label><input id="visitorName" placeholder="Name"/></div><div class="form-row"><label>Purpose</label><input id="visitorPurpose" placeholder="Purpose"/></div><div class="form-row"><label>Meet To</label><input id="visitorMeet" placeholder="Meet To"/></div><div class="form-row"><label>Date & Time</label><input id="visitorDateTime" type="datetime-local"/></div><div class="form-actions"><button id="addVisitorBtn" class="btn">Save Visitor</button><button id="clearVisitorBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="visitorSearch" placeholder="Search visitors..." /><button id="exportVisitorsCSV" class="btn-secondary">Export CSV</button><button id="exportVisitorsPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="visitorsTable"><thead><tr><th>Name</th><th>Purpose</th><th>Meet To</th><th>DateTime</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    leaves: `<div class="card fullscreen"><h3>Employee Leaves</h3><div class="form-row"><label>Employee</label><input id="leaveEmp" placeholder="Employee Name"/></div><div class="form-row"><label>From</label><input id="leaveFrom" type="date"/></div><div class="form-row"><label>To</label><input id="leaveTo" type="date"/></div><div class="form-row"><label>Reason</label><input id="leaveReason" placeholder="Reason"/></div><div class="form-row"><label>Status</label><select id="leaveStatus"><option>Pending</option><option>Approved</option><option>Rejected</option></select></div><div class="form-actions"><button id="addLeaveBtn" class="btn">Save Leave</button><button id="clearLeaveBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="leaveSearch" placeholder="Search leaves..." /><button id="exportLeavesCSV" class="btn-secondary">Export CSV</button><button id="exportLeavesPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="leavesTable"><thead><tr><th>Employee</th><th>From</th><th>To</th><th>Reason</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    employees: `<div class="card fullscreen"><h3>Employee Master</h3><div class="form-row"><label>Employee Name</label><input id="empName" placeholder="Name"/></div><div class="form-row"><label>Designation</label><input id="empDesg" placeholder="Designation"/></div><div class="form-row"><label>Department</label><input id="empDept" placeholder="Department"/></div><div class="form-row"><label>Contact No</label><input id="empContact" placeholder="Contact"/></div><div class="form-row"><label>Email ID</label><input id="empEmail" placeholder="Email"/></div><div class="form-row"><label>Joining Date</label><input id="empJoin" type="date"/></div><div class="form-row"><label>Status</label><select id="empStatus"><option>Active</option><option>Inactive</option></select></div><div class="form-actions"><button id="addEmpBtn" class="btn">Save Employee</button><button id="clearEmpBtn" class="btn-secondary">Clear</button></div><div class="card" style="margin-top:16px"><div class="search-row"><input id="empSearch" placeholder="Search employees..." /><button id="exportEmpCSV" class="btn-secondary">Export CSV</button><button id="exportEmpPDF" class="btn-secondary">Export PDF</button></div><div class="table-wrap"><table id="empTable"><thead><tr><th>Name</th><th>Designation</th><th>Dept</th><th>Contact</th><th>Email</th><th>Join</th><th>Status</th><th>Action</th></tr></thead><tbody></tbody></table></div></div></div>`,
    settings: `<div class="card fullscreen"><h3>Settings</h3><div class="form-row"><label>Name</label><input id="profileName" placeholder="Name"/></div><div class="form-row"><label>Email</label><input id="profileEmail" placeholder="Email"/></div><div class="form-row"><label>Role</label><select id="profileRole"><option>Staff</option><option>Admin</option></select></div><div class="form-actions"><button id="saveSettingsBtn" class="btn">Save Settings</button><button id="resetSettingsBtn" class="btn-secondary">Reset</button></div><div class="card" style="margin-top:16px"><h4>Preview</h4><div id="settingsPreview" class="card">No changes yet</div></div></div>`,
    about: `<div class="card fullscreen"><h3>About TaskWala</h3><div class="card"><div style="display:flex;gap:12px;align-items:center"><div class="logo-circle" style="width:56px;height:56px;font-size:28px">T</div><div><strong>TaskWala</strong> v2.2 (Final)</div><div class="small muted">Local demo build for CA offices</div></div></div></div>`,
  };

  // navigation loader
  function loadPage(page) {
    const main = document.getElementById("mainContent");
    main.innerHTML =
      templates[page] || '<div class="card">Page not found</div>';
    // wire page-specific functions
    if (page === "dashboard") renderDashboard();
    if (page === "task") {
      wireTasks();
      renderTasks();
    }
    if (page === "taskAllot") {
      populateAllotTasks();
      wireAllot();
      renderAllot();
    }
    if (page === "taskDev") {
      populateDevTasks();
      wireDev();
      renderDev();
    }
    if (page === "courierIn") {
      wireCin();
      renderCin();
    }
    if (page === "courierOut") {
      wireCout();
      renderCout();
    }
    if (page === "notes") {
      wireNotes();
      renderNotes();
    }
    if (page === "clientDocs") {
      wireDocs();
      renderDocs();
    }
    if (page === "cheques") {
      wireCheques();
      renderCheques();
    }
    if (page === "visitors") {
      wireVisitors();
      renderVisitors();
    }
    if (page === "leaves") {
      wireLeaves();
      renderLeaves();
    }
    if (page === "employees") {
      wireEmp();
      renderEmp();
    }
    if (page === "settings") {
      wireSettings();
      renderSettings();
    }
  }

  // dashboard render
  function renderDashboard() {
    const grid = document.getElementById("statsGrid");
    grid.innerHTML = "";
    const counts = {
      pending: db[KEYS.tasks].filter((t) => t.status === "Pending").length,
      inProgress: db[KEYS.tasks].filter((t) => t.status === "In Progress")
        .length,
      completed: db[KEYS.tasks].filter((t) => t.status === "Completed").length,
      docs: db[KEYS.docs].length,
      chequesPending: db[KEYS.cheques].filter((c) => c.status === "Pending")
        .length,
      visitorsToday: db[KEYS.visitors].filter(
        (v) =>
          new Date(v.datetime || v.createdAt).toDateString() ===
          new Date().toDateString()
      ).length,
    };
    const items = [
      { label: "Pending Tasks", value: counts.pending },
      { label: "In Progress", value: counts.inProgress },
      { label: "Completed", value: counts.completed },
      { label: "Client Docs", value: counts.docs },
      { label: "Cheques Pending", value: counts.chequesPending },
      { label: "Visitors Today", value: counts.visitorsToday },
    ];
    items.forEach((it) => {
      const d = document.createElement("div");
      d.className = "stat card";
      d.innerHTML = `<div><div class="label">${
        it.label
      }</div><div class="num">${Number(
        it.value
      ).toLocaleString()}</div></div><div style="font-size:20px;color:var(--sky)">T</div>`;
      grid.appendChild(d);
    });
    // simple chart
    const canvas = document.getElementById("taskChart");
    const ctx = canvas.getContext("2d");
    const vals = [counts.pending, counts.inProgress, counts.completed];
    const colors = ["#FB923C", "#60A5FA", "#34D399"];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const max = Math.max(1, ...vals);
    const barW = 120;
    const gap = 40;
    const startX = 40;
    for (let i = 0; i < vals.length; i++) {
      const h = (vals[i] / max) * (canvas.height - 40);
      ctx.fillStyle = colors[i];
      ctx.fillRect(startX + i * (barW + gap), canvas.height - 20 - h, barW, h);
      ctx.fillStyle = "#0f172a";
      ctx.fillText(
        ["Pending", "In Progress", "Completed"][i],
        startX + i * (barW + gap),
        canvas.height - 2
      );
    }
    // recent
    const recent = document.getElementById("recentList");
    recent.innerHTML = "";
    db[KEYS.tasks].slice(0, 6).forEach((t) => {
      const el = document.createElement("div");
      el.style.padding = "8px";
      el.style.borderBottom = "1px solid #f1f5f9";
      el.innerHTML = `<div style="font-weight:600">${
        t.title
      } <span style="font-size:12px;color:var(--muted)">â€¢ ${
        t.client || "-"
      }</span></div><div style="font-size:12px;color:var(--muted)">Status: ${
        t.status
      }</div>`;
      recent.appendChild(el);
    });
  }

  // ===== Tasks =====
  function wireTasks() {
    document.getElementById("addTaskBtn").onclick = () => {
      const title = document.getElementById("taskTitle").value.trim();
      const client = document.getElementById("taskClient").value.trim();
      const priority = document.getElementById("taskPriority").value;
      const status = document.getElementById("taskStatus").value;
      if (!title) return alert("Enter title");
      db[KEYS.tasks].unshift({
        id: "t_" + Date.now(),
        title,
        client,
        priority,
        status,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.tasks);
      renderTasks();
      renderDashboard();
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskClient").value = "";
      populateAllotTasks();
      populateDevTasks();
    };
    document.getElementById("clearTaskBtn").onclick = () => {
      document.getElementById("taskTitle").value = "";
      document.getElementById("taskClient").value = "";
    };
    document
      .getElementById("taskSearch")
      .addEventListener("input", function () {
        renderTasks(this.value);
      });
    document.getElementById("exportTasksCSV").onclick = () =>
      exportCSV(
        "tasks.csv",
        ["Title", "Client", "Status"],
        db[KEYS.tasks].map((t) => [t.title, t.client, t.status])
      );
    document.getElementById("exportTasksPDF").onclick = () =>
      exportPDF(
        "Task List",
        ["Title", "Client", "Status"],
        db[KEYS.tasks].map((t) => [t.title, t.client, t.status])
      );
  }
  function renderTasks(filter = "") {
    const tbody = document.querySelector("#tasksTable tbody");
    tbody.innerHTML = "";
    db[KEYS.tasks]
      .filter(
        (t) =>
          !filter ||
          (t.title + " " + t.client + " " + t.status)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((t) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${t.title}</td><td>${t.client}</td><td>${t.status}</td><td><button data-id="${t.id}" class="delTask btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delTask").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete task?")) {
            db[KEYS.tasks] = db[KEYS.tasks].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.tasks);
            renderTasks();
            renderDashboard();
            populateAllotTasks();
            populateDevTasks();
          }
        })
    );
  }

  // ===== Task Allotment =====
  function wireAllot() {
    document.getElementById("addAllotBtn").onclick = () => {
      const taskId = document.getElementById("allotTask").value;
      const user = document.getElementById("allotUser").value.trim();
      const due = document.getElementById("allotDue").value;
      if (!taskId || !user) return alert("Select task and enter user");
      const task = db[KEYS.tasks].find((t) => t.id === taskId);
      db[KEYS.allot].unshift({
        id: "a_" + Date.now(),
        taskId,
        taskTitle: task ? task.title : "Unknown",
        assignedTo: user,
        due,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.allot);
      renderAllot();
      renderDashboard();
    };
    document.getElementById("clearAllotBtn").onclick = () => {
      document.getElementById("allotUser").value = "";
      document.getElementById("allotDue").value = "";
    };
    document
      .getElementById("allotSearch")
      .addEventListener("input", function () {
        renderAllot(this.value);
      });
    document.getElementById("exportAllotCSV").onclick = () =>
      exportCSV(
        "allotments.csv",
        ["Task", "AssignedTo", "Due"],
        db[KEYS.allot].map((a) => [a.taskTitle, a.assignedTo, a.due])
      );
    document.getElementById("exportAllotPDF").onclick = () =>
      exportPDF(
        "Task Allotments",
        ["Task", "Assigned To", "Due"],
        db[KEYS.allot].map((a) => [a.taskTitle, a.assignedTo, a.due])
      );
  }
  function populateAllotTasks() {
    const sel = document.getElementById("allotTask");
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Select Task --</option>';
    db[KEYS.tasks].forEach(
      (t) => (sel.innerHTML += `<option value=\"${t.id}\">${t.title}</option>`)
    );
  }
  function renderAllot(filter = "") {
    const tbody = document.querySelector("#allotTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.allot]
      .filter(
        (a) =>
          !filter ||
          (a.taskTitle + " " + a.assignedTo)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((a) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${a.taskTitle}</td><td>${a.assignedTo}</td><td>${a.due}</td><td><button data-id=\"${a.id}\" class=\"delAllot btn ghost\">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delAllot").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete allotment?")) {
            db[KEYS.allot] = db[KEYS.allot].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.allot);
            renderAllot();
            renderDashboard();
          }
        })
    );
  }

  // ===== Task Development =====
  function wireDev() {
    document.getElementById("addDevBtn").onclick = () => {
      const taskId = document.getElementById("devTask").value;
      const notes = document.getElementById("devNotes").value.trim();
      if (!taskId || !notes) return alert("Select task and enter notes");
      const task = db[KEYS.tasks].find((t) => t.id === taskId);
      db[KEYS.dev].unshift({
        id: "d_" + Date.now(),
        taskId,
        taskTitle: task ? task.title : "Unknown",
        notes,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.dev);
      renderDev();
      renderDashboard();
    };
    document.getElementById("clearDevBtn").onclick = () => {
      document.getElementById("devNotes").value = "";
    };
    document.getElementById("devSearch").addEventListener("input", function () {
      renderDev(this.value);
    });
    document.getElementById("exportDevCSV").onclick = () =>
      exportCSV(
        "development.csv",
        ["Task", "Notes", "Date"],
        db[KEYS.dev].map((d) => [
          d.taskTitle,
          d.notes,
          new Date(d.createdAt).toLocaleString(),
        ])
      );
    document.getElementById("exportDevPDF").onclick = () =>
      exportPDF(
        "Task Development",
        ["Task", "Notes", "Date"],
        db[KEYS.dev].map((d) => [
          d.taskTitle,
          d.notes,
          new Date(d.createdAt).toLocaleString(),
        ])
      );
  }
  function populateDevTasks() {
    const sel = document.getElementById("devTask");
    if (!sel) return;
    sel.innerHTML = '<option value="">-- Select Task --</option>';
    db[KEYS.tasks].forEach(
      (t) => (sel.innerHTML += `<option value=\"${t.id}\">${t.title}</option>`)
    );
  }
  function renderDev(filter = "") {
    const tbody = document.querySelector("#devTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.dev]
      .filter(
        (d) =>
          !filter ||
          (d.taskTitle + " " + d.notes)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((d) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${d.taskTitle}</td><td>${
          d.notes
        }</td><td>${new Date(
          d.createdAt
        ).toLocaleString()}</td><td><button data-id=\"${
          d.id
        }\" class=\"delDev btn ghost\">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delDev").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete?")) {
            db[KEYS.dev] = db[KEYS.dev].filter((x) => x.id !== this.dataset.id);
            saveKey(KEYS.dev);
            renderDev();
            renderDashboard();
          }
        })
    );
  }

  // ===== Courier In =====
  function wireCin() {
    document.getElementById("addCinBtn").onclick = () => {
      const no = document.getElementById("cinNo").value.trim();
      const from = document.getElementById("cinFrom").value.trim();
      const to = document.getElementById("cinTo").value.trim();
      const note = document.getElementById("cinNote").value.trim();
      if (!no) return alert("Enter courier no");
      db[KEYS.cin].unshift({
        id: "ci_" + Date.now(),
        no,
        from,
        to,
        note,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.cin);
      renderCin();
      renderDashboard();
      document.getElementById("cinNo").value = "";
      document.getElementById("cinFrom").value = "";
      document.getElementById("cinTo").value = "";
      document.getElementById("cinNote").value = "";
    };
    document.getElementById("clearCinBtn").onclick = () => {
      document.getElementById("cinNo").value = "";
      document.getElementById("cinFrom").value = "";
      document.getElementById("cinTo").value = "";
      document.getElementById("cinNote").value = "";
    };
    document.getElementById("cinSearch").addEventListener("input", function () {
      renderCin(this.value);
    });
    document.getElementById("exportCinCSV").onclick = () =>
      exportCSV(
        "courier_in.csv",
        ["No", "From", "To", "Remarks", "Date"],
        db[KEYS.cin].map((c) => [
          c.no,
          c.from,
          c.to,
          c.note,
          new Date(c.createdAt).toLocaleString(),
        ])
      );
    document.getElementById("exportCinPDF").onclick = () =>
      exportPDF(
        "Courier Inward",
        ["No", "From", "To", "Remarks", "Date"],
        db[KEYS.cin].map((c) => [
          c.no,
          c.from,
          c.to,
          c.note,
          new Date(c.createdAt).toLocaleString(),
        ])
      );
  }
  function renderCin(filter = "") {
    const tbody = document.querySelector("#cinTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.cin]
      .filter(
        (c) =>
          !filter ||
          (c.no + " " + c.from + " " + c.to + " " + c.note)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((c) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.no}</td><td>${c.from}</td><td>${c.to}</td><td>${
          c.note
        }</td><td>${new Date(
          c.createdAt
        ).toLocaleString()}</td><td><button data-id="${
          c.id
        }" class="delCin btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delCin").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete?")) {
            db[KEYS.cin] = db[KEYS.cin].filter((x) => x.id !== this.dataset.id);
            saveKey(KEYS.cin);
            renderCin();
            renderDashboard();
          }
        })
    );
  }

  // ===== Courier Out =====
  function wireCout() {
    document.getElementById("addCoutBtn").onclick = () => {
      const no = document.getElementById("coutNo").value.trim();
      const to = document.getElementById("coutTo").value.trim();
      const from = document.getElementById("coutFrom").value.trim();
      const note = document.getElementById("coutNote").value.trim();
      if (!no) return alert("Enter courier no");
      db[KEYS.cout].unshift({
        id: "co_" + Date.now(),
        no,
        to,
        from,
        note,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.cout);
      renderCout();
      renderDashboard();
      document.getElementById("coutNo").value = "";
      document.getElementById("coutTo").value = "";
      document.getElementById("coutFrom").value = "";
      document.getElementById("coutNote").value = "";
    };
    document.getElementById("clearCoutBtn").onclick = () => {
      document.getElementById("coutNo").value = "";
      document.getElementById("coutTo").value = "";
      document.getElementById("coutFrom").value = "";
      document.getElementById("coutNote").value = "";
    };
    document
      .getElementById("coutSearch")
      .addEventListener("input", function () {
        renderCout(this.value);
      });
    document.getElementById("exportCoutCSV").onclick = () =>
      exportCSV(
        "courier_out.csv",
        ["No", "To", "From", "Remarks", "Date"],
        db[KEYS.cout].map((c) => [
          c.no,
          c.to,
          c.from,
          c.note,
          new Date(c.createdAt).toLocaleString(),
        ])
      );
    document.getElementById("exportCoutPDF").onclick = () =>
      exportPDF(
        "Courier Outward",
        ["No", "To", "From", "Remarks", "Date"],
        db[KEYS.cout].map((c) => [
          c.no,
          c.to,
          c.from,
          c.note,
          new Date(c.createdAt).toLocaleString(),
        ])
      );
  }
  function renderCout(filter = "") {
    const tbody = document.querySelector("#coutTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.cout]
      .filter(
        (c) =>
          !filter ||
          (c.no + " " + c.to + " " + c.from + " " + c.note)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((c) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.no}</td><td>${c.to}</td><td>${c.from}</td><td>${
          c.note
        }</td><td>${new Date(
          c.createdAt
        ).toLocaleString()}</td><td><button data-id="${
          c.id
        }" class="delCout btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delCout").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete?")) {
            db[KEYS.cout] = db[KEYS.cout].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.cout);
            renderCout();
            renderDashboard();
          }
        })
    );
  }

  // ===== Notes =====
  function wireNotes() {
    document.getElementById("addNoteBtn").onclick = () => {
      const title = document.getElementById("noteTitle").value.trim();
      const body = document.getElementById("noteBody").value.trim();
      if (!title) return alert("Enter title");
      db[KEYS.notes].unshift({
        id: "n_" + Date.now(),
        title,
        body,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.notes);
      renderNotes();
      renderDashboard();
      document.getElementById("noteTitle").value = "";
      document.getElementById("noteBody").value = "";
    };
    document.getElementById("clearNoteBtn").onclick = () => {
      document.getElementById("noteTitle").value = "";
      document.getElementById("noteBody").value = "";
    };
    document
      .getElementById("noteSearch")
      .addEventListener("input", function () {
        renderNotes(this.value);
      });
    document.getElementById("exportNotesCSV").onclick = () =>
      exportCSV(
        "notes.csv",
        ["Title", "Body", "Date"],
        db[KEYS.notes].map((n) => [
          n.title,
          n.body,
          new Date(n.createdAt).toLocaleString(),
        ])
      );
    document.getElementById("exportNotesPDF").onclick = () =>
      exportPDF(
        "Notes",
        ["Title", "Body", "Date"],
        db[KEYS.notes].map((n) => [
          n.title,
          n.body,
          new Date(n.createdAt).toLocaleString(),
        ])
      );
  }
  function renderNotes(filter = "") {
    const tbody = document.querySelector("#notesTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.notes]
      .filter(
        (n) =>
          !filter ||
          (n.title + " " + n.body).toLowerCase().includes(filter.toLowerCase())
      )
      .forEach((n) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${n.title}</td><td>${n.body}</td><td>${new Date(
          n.createdAt
        ).toLocaleString()}</td><td><button data-id="${
          n.id
        }" class="delNote btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delNote").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete note?")) {
            db[KEYS.notes] = db[KEYS.notes].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.notes);
            renderNotes();
            renderDashboard();
          }
        })
    );
  }

  // ===== Client Docs, Cheques, Visitors, Leaves reuse pattern =====
  function wireDocs() {
    document.getElementById("addDocBtn").onclick = () => {
      const client = document.getElementById("docClient").value.trim();
      const type = document.getElementById("docType").value.trim();
      const remarks = document.getElementById("docRemarks").value.trim();
      const file = document.getElementById("docFile");
      const fname = file.files[0] ? file.files[0].name : "";
      if (!client) return alert("Enter client");
      db[KEYS.docs].unshift({
        id: "d_" + Date.now(),
        client,
        docType: type,
        remarks,
        fileName: fname,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.docs);
      renderDocs();
      renderDashboard();
      document.getElementById("docClient").value = "";
      document.getElementById("docType").value = "";
      document.getElementById("docRemarks").value = "";
      document.getElementById("docFile").value = "";
    };
    document.getElementById("clearDocBtn").onclick = () => {
      document.getElementById("docClient").value = "";
      document.getElementById("docType").value = "";
      document.getElementById("docRemarks").value = "";
      document.getElementById("docFile").value = "";
    };
    document
      .getElementById("docSearch")
      ?.addEventListener("input", function () {
        renderDocs(this.value);
      });
    document.getElementById("exportDocsCSV")?.addEventListener("click", () =>
      exportCSV(
        "client_docs.csv",
        ["Client", "Type", "File", "Date"],
        db[KEYS.docs].map((d) => [
          d.client,
          d.docType,
          d.fileName,
          new Date(d.createdAt).toLocaleString(),
        ])
      )
    );
    document.getElementById("exportDocsPDF")?.addEventListener("click", () =>
      exportPDF(
        "Client Documents",
        ["Client", "Type", "File", "Date"],
        db[KEYS.docs].map((d) => [
          d.client,
          d.docType,
          d.fileName,
          new Date(d.createdAt).toLocaleString(),
        ])
      )
    );
  }
  function renderDocs(filter = "") {
    const tbody = document.querySelector("#docsTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.docs]
      .filter(
        (d) =>
          !filter ||
          (d.client + " " + d.docType + " " + d.fileName)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((d) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${d.client}</td><td>${d.docType}</td><td>${
          d.fileName || "-"
        }</td><td>${new Date(
          d.createdAt
        ).toLocaleString()}</td><td><button data-id="${
          d.id
        }" class="delDoc btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delDoc").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete doc?")) {
            db[KEYS.docs] = db[KEYS.docs].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.docs);
            renderDocs();
            renderDashboard();
          }
        })
    );
  }

  function wireCheques() {
    document.getElementById("addChequeBtn").onclick = () => {
      const no = document.getElementById("chequeNo").value.trim();
      const client = document.getElementById("chequeClient").value.trim();
      const bank = document.getElementById("chequeBank").value.trim();
      const amount = document.getElementById("chequeAmount").value;
      const date = document.getElementById("chequeDate").value;
      const status = document.getElementById("chequeStatus").value;
      if (!no) return alert("enter cheque no");
      db[KEYS.cheques].unshift({
        id: "ch_" + Date.now(),
        chequeNo: no,
        client,
        bank,
        amount,
        date,
        status,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.cheques);
      renderCheques();
      renderDashboard();
    };
    document.getElementById("clearChequeBtn").onclick = () => {
      document.getElementById("chequeNo").value = "";
      document.getElementById("chequeClient").value = "";
      document.getElementById("chequeBank").value = "";
      document.getElementById("chequeAmount").value = "";
      document.getElementById("chequeDate").value = "";
    };
    document
      .getElementById("chequeSearch")
      ?.addEventListener("input", function () {
        renderCheques(this.value);
      });
    document.getElementById("exportChequesCSV")?.addEventListener("click", () =>
      exportCSV(
        "cheques.csv",
        ["No", "Client", "Bank", "Amount", "Date", "Status"],
        db[KEYS.cheques].map((c) => [
          c.chequeNo,
          c.client,
          c.bank,
          c.amount,
          c.date,
          c.status,
        ])
      )
    );
    document.getElementById("exportChequesPDF")?.addEventListener("click", () =>
      exportPDF(
        "Cheques",
        ["No", "Client", "Bank", "Amount", "Date", "Status"],
        db[KEYS.cheques].map((c) => [
          c.chequeNo,
          c.client,
          c.bank,
          c.amount,
          c.date,
          c.status,
        ])
      )
    );
  }
  function renderCheques(filter = "") {
    const tbody = document.querySelector("#chequesTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.cheques]
      .filter(
        (c) =>
          !filter ||
          (c.chequeNo + " " + c.client + " " + c.bank)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((c) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.chequeNo}</td><td>${c.client}</td><td>${c.bank}</td><td>${c.amount}</td><td>${c.date}</td><td>${c.status}</td><td><button data-id="${c.id}" class="delCheque btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delCheque").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete cheque?")) {
            db[KEYS.cheques] = db[KEYS.cheques].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.cheques);
            renderCheques();
            renderDashboard();
          }
        })
    );
  }

  function wireVisitors() {
    document.getElementById("addVisitorBtn").onclick = () => {
      const name = document.getElementById("visitorName").value.trim();
      const purpose = document.getElementById("visitorPurpose").value.trim();
      const meetTo = document.getElementById("visitorMeet").value.trim();
      const dt = document.getElementById("visitorDateTime").value;
      if (!name) return alert("enter name");
      db[KEYS.visitors].unshift({
        id: "v_" + Date.now(),
        name,
        purpose,
        meetTo,
        datetime: dt,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.visitors);
      renderVisitors();
      renderDashboard();
    };
    document.getElementById("clearVisitorBtn").onclick = () => {
      document.getElementById("visitorName").value = "";
      document.getElementById("visitorPurpose").value = "";
      document.getElementById("visitorMeet").value = "";
      document.getElementById("visitorDateTime").value = "";
    };
    document
      .getElementById("visitorSearch")
      ?.addEventListener("input", function () {
        renderVisitors(this.value);
      });
    document
      .getElementById("exportVisitorsCSV")
      ?.addEventListener("click", () =>
        exportCSV(
          "visitors.csv",
          ["Name", "Purpose", "Meet To", "DateTime"],
          db[KEYS.visitors].map((v) => [
            v.name,
            v.purpose,
            v.meetTo,
            v.datetime || new Date(v.createdAt).toLocaleString(),
          ])
        )
      );
    document
      .getElementById("exportVisitorsPDF")
      ?.addEventListener("click", () =>
        exportPDF(
          "Visitors",
          ["Name", "Purpose", "Meet To", "DateTime"],
          db[KEYS.visitors].map((v) => [
            v.name,
            v.purpose,
            v.meetTo,
            v.datetime || new Date(v.createdAt).toLocaleString(),
          ])
        )
      );
  }
  function renderVisitors(filter = "") {
    const tbody = document.querySelector("#visitorsTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.visitors]
      .filter(
        (v) =>
          !filter ||
          (v.name + " " + v.purpose + " " + v.meetTo)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((v) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${v.name}</td><td>${v.purpose}</td><td>${
          v.meetTo
        }</td><td>${
          v.datetime || new Date(v.createdAt).toLocaleString()
        }</td><td><button data-id="${
          v.id
        }" class="delVisitor btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delVisitor").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete visitor?")) {
            db[KEYS.visitors] = db[KEYS.visitors].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.visitors);
            renderVisitors();
            renderDashboard();
          }
        })
    );
  }

  function wireLeaves() {
    document.getElementById("addLeaveBtn").onclick = () => {
      const emp = document.getElementById("leaveEmp").value.trim();
      const from = document.getElementById("leaveFrom").value;
      const to = document.getElementById("leaveTo").value;
      const reason = document.getElementById("leaveReason").value.trim();
      const status = document.getElementById("leaveStatus").value;
      if (!emp) return alert("enter employee");
      db[KEYS.leaves].unshift({
        id: "l_" + Date.now(),
        employee: emp,
        from,
        to,
        reason,
        status,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.leaves);
      renderLeaves();
      renderDashboard();
    };
    document.getElementById("clearLeaveBtn").onclick = () => {
      document.getElementById("leaveEmp").value = "";
      document.getElementById("leaveFrom").value = "";
      document.getElementById("leaveTo").value = "";
      document.getElementById("leaveReason").value = "";
    };
    document
      .getElementById("leaveSearch")
      ?.addEventListener("input", function () {
        renderLeaves(this.value);
      });
    document.getElementById("exportLeavesCSV")?.addEventListener("click", () =>
      exportCSV(
        "leaves.csv",
        ["Employee", "From", "To", "Reason", "Status"],
        db[KEYS.leaves].map((l) => [
          l.employee,
          l.from,
          l.to,
          l.reason,
          l.status,
        ])
      )
    );
    document.getElementById("exportLeavesPDF")?.addEventListener("click", () =>
      exportPDF(
        "Leaves",
        ["Employee", "From", "To", "Reason", "Status"],
        db[KEYS.leaves].map((l) => [
          l.employee,
          l.from,
          l.to,
          l.reason,
          l.status,
        ])
      )
    );
  }
  function renderLeaves(filter = "") {
    const tbody = document.querySelector("#leavesTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.leaves]
      .filter(
        (l) =>
          !filter ||
          (l.employee + " " + l.reason)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((l) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${l.employee}</td><td>${l.from}</td><td>${l.to}</td><td>${l.reason}</td><td>${l.status}</td><td><button data-id="${l.id}" class="delLeave btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delLeave").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete leave?")) {
            db[KEYS.leaves] = db[KEYS.leaves].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.leaves);
            renderLeaves();
            renderDashboard();
          }
        })
    );
  }

  // ===== Employees (master) =====
  function wireEmp() {
    document.getElementById("addEmpBtn").onclick = () => {
      const name = document.getElementById("empName").value.trim();
      const desg = document.getElementById("empDesg").value.trim();
      const dept = document.getElementById("empDept").value.trim();
      const contact = document.getElementById("empContact").value.trim();
      const email = document.getElementById("empEmail").value.trim();
      const join = document.getElementById("empJoin").value;
      const status = document.getElementById("empStatus").value;
      if (!name) return alert("Enter employee name");
      db[KEYS.employees].unshift({
        id: "e_" + Date.now(),
        name,
        desg,
        dept,
        contact,
        email,
        join,
        status,
        createdAt: new Date().toISOString(),
      });
      saveKey(KEYS.employees);
      renderEmp();
      renderDashboard();
      document.getElementById("empName").value = "";
      document.getElementById("empDesg").value = "";
      document.getElementById("empDept").value = "";
      document.getElementById("empContact").value = "";
      document.getElementById("empEmail").value = "";
      document.getElementById("empJoin").value = "";
    };
    document.getElementById("clearEmpBtn").onclick = () => {
      document.getElementById("empName").value = "";
      document.getElementById("empDesg").value = "";
      document.getElementById("empDept").value = "";
      document.getElementById("empContact").value = "";
      document.getElementById("empEmail").value = "";
      document.getElementById("empJoin").value = "";
    };
    document
      .getElementById("empSearch")
      ?.addEventListener("input", function () {
        renderEmp(this.value);
      });
    document.getElementById("exportEmpCSV")?.addEventListener("click", () =>
      exportCSV(
        "employees.csv",
        ["Name", "Designation", "Dept", "Contact", "Email", "Join", "Status"],
        db[KEYS.employees].map((e) => [
          e.name,
          e.desg,
          e.dept,
          e.contact,
          e.email,
          e.join,
          e.status,
        ])
      )
    );
    document.getElementById("exportEmpPDF")?.addEventListener("click", () =>
      exportPDF(
        "Employees",
        ["Name", "Designation", "Dept", "Contact", "Email", "Join", "Status"],
        db[KEYS.employees].map((e) => [
          e.name,
          e.desg,
          e.dept,
          e.contact,
          e.email,
          e.join,
          e.status,
        ])
      )
    );
  }
  function renderEmp(filter = "") {
    const tbody = document.querySelector("#empTable tbody");
    if (!tbody) return;
    tbody.innerHTML = "";
    db[KEYS.employees]
      .filter(
        (e) =>
          !filter ||
          (e.name + " " + e.desg + " " + e.dept + " " + e.contact)
            .toLowerCase()
            .includes(filter.toLowerCase())
      )
      .forEach((e) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${e.name}</td><td>${e.desg}</td><td>${e.dept}</td><td>${e.contact}</td><td>${e.email}</td><td>${e.join}</td><td>${e.status}</td><td><button data-id="${e.id}" class="delEmp btn ghost">Delete</button></td>`;
        tbody.appendChild(tr);
      });
    document.querySelectorAll(".delEmp").forEach(
      (b) =>
        (b.onclick = function () {
          if (confirm("Delete employee?")) {
            db[KEYS.employees] = db[KEYS.employees].filter(
              (x) => x.id !== this.dataset.id
            );
            saveKey(KEYS.employees);
            renderEmp();
            renderDashboard();
          }
        })
    );
  }

  // ===== Exports =====
  function exportCSV(fname, headers, rows) {
    const arr = [headers].concat(rows);
    const csv = arr
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, fname);
  }
  function exportPDF(title, headers, rows) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.setTextColor(10, 35, 80);
    doc.text("TaskWala - " + title, 14, 20);
    doc.setFontSize(10);
    doc.text(new Date().toLocaleString(), 14, 28);
    if (doc.autoTable) {
      doc.autoTable({
        head: [headers],
        body: rows,
        startY: 36,
        theme: "grid",
        headStyles: { fillColor: [14, 165, 233] },
      });
    } else {
      /* fallback simple text */ rows.forEach((r, i) =>
        doc.text(14, 36 + i * 8, r.join(" | "))
      );
    }
    doc.setFontSize(9);
    doc.text(
      "Report generated by TaskWala",
      14,
      doc.internal.pageSize.getHeight() - 10
    );
    doc.save((title.replace(/\s+/g, "_") || "report") + ".pdf");
  }

  // initialRender
  function initialRender() {
    renderDashboard();
    renderTasks();
    renderAllot();
    renderDev();
    renderCin();
    renderCout();
    renderNotes();
    renderDocs();
    renderCheques();
    renderVisitors();
    renderLeaves();
    renderEmp();
  }
  window.initialRender = initialRender;
})();
