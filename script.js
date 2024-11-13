function EmailCheck() {
  const login = document.getElementById("dash").value;
  const authorizedEmails = [
    "Moataz.mahmoud090@gmail.com",
    "moataz.mahmoud090@gmail.com",
  ];

  if (authorizedEmails.includes(login)) {
    window.location.assign("dashboard.html");
  } else {
    alert("سعداء باهتمامكم بالجودة وبتواصلكم معنا 😃😍");
    window.location.assign("contactus.html");
  }
}

const PName = document.getElementById("pname");
const Email = document.getElementById("email");
const _date = document.getElementById("datetime");
const select = document.getElementById("select1");
const message = document.getElementById("message");

let PContainer = localStorage.getItem("productData")
  ? JSON.parse(localStorage.getItem("productData"))
  : [];
let btnStatus = "Create";
let ProId;

DisplayData();

document.getElementById("btnAddUpdate").addEventListener("click", AddProduct);

function AddProduct() {
  if (CheckInput()) {
    const product = {
      name: PName.value,
      email: Email.value,
      date: _date.value,
      Select: select.value,
      message: message.value,
    };

    if (btnStatus === "Create") {
      PContainer.push(product);
    } else {
      PContainer[ProId] = product;
      btnStatus = "Create";
      document.getElementById("btnAddUpdate").textContent = "Book Now";
    }
    localStorage.setItem("productData", JSON.stringify(PContainer));
    ClearData();
    DisplayData();
  } else
  {
    alert("You Must Fill All Data");
  }
}

function DeleteProduct(index) {
  if (confirm("هل انت متأكد انك تريد الحذف")) {
    PContainer.splice(index, 1);
    localStorage.setItem("productData", JSON.stringify(PContainer));
    DisplayData();
  } else {
    alert("تم إلغاء عملية الحذف");
  }
}

function EditProduct(index) {
  const product = PContainer[index];
  PName.value = product.name;
  Email.value = product.email;
  _date.value = product.date;
  select.value = product.Select;
  message.value = product.message;
  btnStatus = "Edit";
  ProId = index;
  document.getElementById("btnAddUpdate").textContent = "Update";
}

function ClearData() {
  PName.value = "";
  Email.value = "";
  _date.value = "";
  select.value = "";
  message.value = "";
}

function DisplayData() {
  const tableBody = document.getElementById("tablebody");
  tableBody.innerHTML = PContainer.map(
    (product, i) => `
      <tr>
        <td>${i}</td>
        <td>${product.name}</td>
        <td>${product.email}</td>
        <td>${product.date}</td>
        <td>${product.Select}</td>
        <td>${product.message}</td>
        <td>
          <button class="btn btn-outline-warning" onclick="EditProduct(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-outline-danger" onclick="DeleteProduct(${i})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `
  ).join("");
}

function CheckInput() {
  return [PName, Email, _date, select, message].every(
    (input) => input.value.trim() !== ""
  );
}

function SearchProducts(searchItem) {
  const tableBody = document.getElementById("tablebody");
  const filteredProducts = PContainer.filter(
    (product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.date.toLowerCase().includes(searchItem.toLowerCase())
  );
  tableBody.innerHTML = filteredProducts
    .map(
      (product, i) => `
      <tr>
        <td>${i}</td>
        <td>${product.name}</td>
        <td>${product.email}</td>
        <td>${product.date}</td>
        <td>${product.Select}</td>
        <td>${product.message}</td>
        <td>
          <button class="btn btn-outline-warning" onclick="EditProduct(${i})">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </td>
        <td>
          <button class="btn btn-outline-danger" onclick="DeleteProduct(${i})">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `
    )
    .join("");
}
