function validateTaskForm() {
  let isValid = true;

  // get values
  let title = document.getElementById("title").value.trim();
  let desc = document.getElementById("description").value.trim();
  let priority = document.getElementById("priority").value;
  let status = document.getElementById("status").value;

  // clear errors
  document.getElementById("titleErr").innerHTML = "";
  document.getElementById("descErr").innerHTML = "";
  document.getElementById("priorityErr").innerHTML = "";
  document.getElementById("statusErr").innerHTML = "";

  // title validation
  if (title === "") {
    document.getElementById("titleErr").innerHTML = "Task title is required";
    isValid = false;
  } else if (title.length < 3) {
    document.getElementById("titleErr").innerHTML =
      "Title must be at least 3 characters";
    isValid = false;
  }

  // description validation
  if (desc === "") {
    document.getElementById("descErr").innerHTML = "Description is required";
    isValid = false;
  } else if (desc.length < 5) {
    document.getElementById("descErr").innerHTML =
      "Description must be at least 5 characters";
    isValid = false;
  }

  // priority validation
  if (priority === "") {
    document.getElementById("priorityErr").innerHTML = "Please select priority";
    isValid = false;
  }

  // status validation
  if (status === "") {
    document.getElementById("statusErr").innerHTML = "Please select status";
    isValid = false;
  }

  return isValid;
}
