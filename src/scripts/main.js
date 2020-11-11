document.getElementById("addExpenseBtn").addEventListener("click", addExpense);

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
  descriptionCell.innerHTML = itemToAdd.description;
  amountCell.innerHTML = itemToAdd.amount;
  dateCell.innerHTML = itemToAdd.date;
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
  document.getElementById("description").value = ''
  document.getElementById("amount").value = ''
  document.getElementById("date").value = new Date().toISOString().slice(0, 10)
}