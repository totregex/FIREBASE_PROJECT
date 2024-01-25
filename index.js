import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://realtime-database-31e45-default-rtdb.asia-southeast1.firebasedatabase.app",
};
const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
const itemsDB=ref(database,"items")
const ul=document.getElementById("ul");
const input= document.getElementById("input");
const button = document.getElementById("button");

button.addEventListener("click",function() {
  if(input.value!==""){
    let item=input.value;
    push(itemsDB,item);
    console.log(`${input.value} added to Cart`)
    clear();
  }
})
const clearitems=()=>{
  ul.innerHTML="";
}

onValue(itemsDB,(snapshot)=>{
  if(!snapshot.exists()){
    ul.innerHTML="Cart is Empty"
  }
  else{
    clearitems();
    const items=Object.entries(snapshot.val());
    for(let item of items){
      append(item);
  }
  }
})

const append = (item) => {
  let id=item[0];
  let val=item[1];
  let newitem = document.createElement('li');
  newitem.textContent = val;
  ul.append(newitem);

  newitem.addEventListener('click', () => {
    let path = ref(database, `items/${id}`);
    remove(path);
    console.log(`${val} removed from cart`)
  });
}

const clear=()=>{
  input.value="";
}