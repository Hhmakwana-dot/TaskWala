function validateCourierForm() {
  let valid = true;

  // clear old errors
  document.querySelectorAll(".error").forEach((e) => (e.innerHTML = ""));

  let number = document.getElementById("cinNo").value.trim();
  let from = document.getElementById("cinFrom").value.trim();
  let receivedBy = document.getElementById("cinTo").value.trim();
  let status = document.getElementById("cinStatus").value;

  if (number === "" || number.length < 3) {
    document.getElementById("noErr").innerHTML =
      "Courier number required (min 3 chars)";
    valid = false;
  }

  if (from === "") {
    document.getElementById("fromErr").innerHTML = "From field is required";
    valid = false;
  }

  if (receivedBy === "") {
    document.getElementById("toErr").innerHTML = "Received by is required";
    valid = false;
  }

  if (status === "") {
    document.getElementById("statusErr").innerHTML = "Please select status";
    valid = false;
  }

  return valid;
}
