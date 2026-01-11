document.getElementById("docSearch").addEventListener("keyup", function () {
  let value = this.value.toLowerCase();
  let rows = document.querySelectorAll("#empTable tbody tr");

  rows.forEach((row) => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(value) ? "" : "none";
  });
});
