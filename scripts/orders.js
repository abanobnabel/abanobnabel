const CName = document.getElementById("cname");
const Email = document.getElementById("email");
const PNumber = document.getElementById("pnumber");
const Address = document.getElementById("address");
const ODetails = document.getElementById("orderdetails");

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
      name: CName.value,
      email: Email.value,
      pnumber: PNumber.value,
      address: Address.value,
      details: ODetails.value,
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
  } else {
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
  CName.value = product.name;
  Email.value = product.email;
  PNumber.value = product.pnumber;
  Address.value = product.address;
  ODetails.value = product.details;
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
  const tableBody = document.getElementById("orderstable");
  tableBody.innerHTML = PContainer.map(
    (product, i) => `
        <tr>
          <td>${i}</td>
          <td>${product.name}</td>
          <td>${product.email}</td>
          <td>${product.pnumber}</td>
          <td>${product.address}</td>
          <td>${product.details}</td>
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
  return [PName, Email, PNumber, Address, ODetails].every(
    (input) => input.value.trim() !== ""
  );
}

function SearchProducts(searchItem) {
  const tableBody = document.getElementById("orderstable");
  const filteredProducts = PContainer.filter(
    (product) =>
      product.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      product.pnumber.toLowerCase().includes(searchItem.toLowerCase())
  );
  tableBody.innerHTML = filteredProducts
    .map(
      (product, i) => `
        <tr>
          <td>${i}</td>
          <td>${product.name}</td>
          <td>${product.email}</td>
          <td>${product.pnumber}</td>
          <td>${product.address}</td>
          <td>${product.details}</td>
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
