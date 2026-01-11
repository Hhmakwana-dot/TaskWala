function validateEmployeeForm() {
  let isValid = true;

  // get values
  let name = document.getElementById("empName").value.trim();
  let email = document.getElementById("empEmail").value.trim();
  let pass = document.getElementById("empPass").value.trim();
  let role = document.getElementById("empRole").value;

  // clear errors
  document.getElementById("nameErr").innerHTML = "";
  document.getElementById("emailErr").innerHTML = "";
  document.getElementById("passErr").innerHTML = "";
  document.getElementById("roleErr").innerHTML = "";

  // name validation
  if (name === "") {
    document.getElementById("nameErr").innerHTML = "Employee name is required";
    isValid = false;
  }

  // email validation
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailErr").innerHTML = "Email is required";
    isValid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailErr").innerHTML = "Enter a valid email";
    isValid = false;
  }

  // password validation
  if (pass === "") {
    document.getElementById("passErr").innerHTML = "Password is required";
    isValid = false;
  } else if (pass.length < 6) {
    document.getElementById("passErr").innerHTML =
      "Password must be at least 6 characters";
    isValid = false;
  }

  // role validation
  if (role === "") {
    document.getElementById("roleErr").innerHTML = "Please select a role";
    isValid = false;
  }

  return isValid;
}
