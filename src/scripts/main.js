document.getElementById("addExpenseBtn").addEventListener("click", addExpense);

let amounts = {};

function addExpense(){
  let itemToAdd = getItemToAdd();
  if(!validateIfCanAddRow(itemToAdd)){
    return;
  }
  addRowToTable(itemToAdd);
  clearInput();
}

function getItemToAdd(){
  return {
    description : document.getElementById("description").value,
    amount : document.getElementById("amount").value,
    date : document.getElementById("date").value
  }
}

function addRowToTable(itemToAdd){  
  let table = document.getElementById("table");
  let row = table.insertRow(-1);
  let descriptionCell = row.insertCell(-1);
  let dateCell = row.insertCell(-1);
  let amountCell = row.insertCell(-1);
  let deleteCell = row.insertCell(-1);
  descriptionCell.innerHTML = itemToAdd.description;
  amountCell.innerHTML = itemToAdd.amount;
  amountCell.classList.add("amountCell");
  dateCell.innerHTML = itemToAdd.date;
  dateCell.classList.add("dateCell");
  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteCell.appendChild(deleteButton);
  deleteButton.onclick = function(){
    let row = deleteButton.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotal(itemToAdd.date, 0 - Number(itemToAdd.amount));
  }
  updateTotal(itemToAdd.date, itemToAdd.amount);
}

function validateIfCanAddRow(itemToAdd){
  if(itemToAdd == undefined){
    return false;
  }

  if(itemToAdd.description != '' && itemToAdd.amount != '' && itemToAdd.date != ''){
    return true;
  }

  return false;
}

function clearInput(){
  document.getElementById("description").value = '';
  document.getElementById("amount").value = '';
  document.getElementById("date").value = new Date().toISOString().slice(0, 10);
}

function updateTotal(date, amount){
  if(amounts.hasOwnProperty(date)){
    let newAmount = amounts[date] + Number(amount);
    amounts[date] = newAmount;
    if(newAmount == 0){
      let row = document.getElementById("row" + date);
      row.parentNode.removeChild(row);
      delete amounts[date];
    } else {
      let amountCell = document.getElementById("amountCell" + date);
      amountCell.innerHTML = newAmount;
    }

  } else {
    amounts[date] = Number(amount);
    let table = document.getElementById("summaryTable");
    let row = table.insertRow(-1);
    row.id = "row" + date;
    let dateCell = row.insertCell(-1);
    let amountCell = row.insertCell(-1);
    amountCell.id = "amountCell" + date;
    dateCell.innerHTML = date;
    amountCell.innerHTML = amount;
  }
}

