import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref,push,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
const firebaseConfig = {
    databaseURL: "https://realtime-database-31e45-default-rtdb.asia-southeast1.firebasedatabase.app",
    // projectId: "realtime-database-31e45",
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase(app)
const itemsDB=ref(database,"items")
const ul=document.getElementById("ul");
const input= document.getElementById("input");
const button = document.getElementById("button");

button.addEventListener("click",function() {
    let item=input.value;
    push(itemsDB,item);
    console.log(`${input.value} added to database`)
    clear();

})
const clearitems=()=>{
  ul.innerHTML="";
}
onValue(itemsDB,(snapshot)=>{
  const items=Object.values(snapshot.val());
  clearitems();
  for(let item of items){
    append(item);
  }
})

const append=(item)=>{
  ul.innerHTML+=`<li>${item}</li>`;
}
const clear=()=>{
  input.value="";
}