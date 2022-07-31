import { coursework_backend, canisterId, idlFactory } from "../../declarations/coursework_backend";

const PlugWallet = window.ic?.plug;
const whitelist = [canisterId];
const host = document.location.origin;
let backendActor = false;
let id = 0;


const onUpdateCallback = () => {
  
}

document.querySelector("#connect").addEventListener("click", async (e) => {

  const publicKey = await PlugWallet?.requestConnect({
    whitelist,
    host,
    onUpdateCallback
  });

  backendActor = await PlugWallet.createActor({
    canisterId: canisterId,
    interfaceFactory: idlFactory
  });

  var accountList = await backendActor.readAccount();
  console.log(accountList)
  for(let i = 0; i < accountList.length; i++) {
    const account = accountList[i][1];
    const accountId = accountList[i][0];
    var sex = "Female"
    if(account.sex){
      sex = "Male"
    } 
    console.log(account);
    document.querySelector("table").innerHTML += "<tr><td>"  + account.name + "</td><td>" + account.age + "</td><td>" + account.phone + "</td><td>" + sex + '</td><td> <input type="button" value="update" id="update'+accountId+'"> <input type="button" value="delete" id="delete'+accountId+'"> </td></tr>'
  }
  
  return false;
});


document.querySelector("#register").addEventListener("submit", async (e) => {
  e.preventDefault();

  let firstName = document.getElementById("firstNameCreate").value;
  let lastName = document.getElementById("lastNameCreate").value;
  let age = document.getElementById("birthCreate").value;
  let phone = document.getElementById("phoneCreate").value;
  let address = document.getElementById("addressCreate").value;
  let sex = document.getElementById("maleCreate").checked;
  let name =  firstName + ' ' + lastName
  console.log(backendActor)
  const register = backendActor?.createAccount({
    age,
    name,
    address,
    sex,
    phone,
  })
})

document.querySelector("#update").addEventListener("submit", async (e) => {
  e.preventDefault();

  let firstName = document.getElementById("firstNameUpdate").value;
  let lastName = document.getElementById("lastNameUpdate").value;
  let age = document.getElementById("birthUpdate").value;
  let phone = document.getElementById("phoneUpdate").value;
  let address = document.getElementById("addressUpdate").value;
  let sex = document.getElementById("maleUpdate").checked;
  let name =  firstName + ' ' + lastName
  console.log(backendActor)
  const register = backendActor?.createAccount({
    age,
    name,
    address,
    sex,
    phone,
  })
})
