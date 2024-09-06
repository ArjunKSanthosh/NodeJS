let arr=[]
async function getDonors() {
    const res=fetch("http://localhost:3000/getdonors")
    const data=await (await res).json();
    str=``
    data.map((dt)=>{
        str+=`<div class="contents">
            <input type="text" name="name" disabled="true" id="name-${dt._id}" placeholder="name" value=${dt.name}  class="ip">
            <input type="text" name="email" disabled="true" id="email-${dt._id}" placeholder="email" value=${dt.email} class="ip">
            <input type="text" name="phone" disabled="true" id="phone-${dt._id}" placeholder="phone" value=${dt.phone} class="ip">
            <input type="text" name="bgroup" disabled="true" id="bgroup-${dt._id}" placeholder="Blood Group" value=${dt.bgroup} class="ip">
            <input type="text" name="gender" disabled="true" id="gender-${dt._id}" placeholder="Gender" value=${dt.gender} class="ip">
        </div>
        <div class="bts">
            <button style="background-color: blue;" class="bt2"  onclick="handleEdit('${dt._id}')">Edit</button>
            <button style="background-color: green;"class="bt2" onclick="handleSave('${dt._id}')">Save</button>
            <button style="background-color: red;" class="bt2" onclick="handleDelete('${dt._id}')">Delete</button>
        </div>`
        arr.push(dt);
    })
    document.getElementById("inputs").innerHTML=str
    
}
getDonors()

async function handleEdit(id) {
    console.log("hai");
    
    let name=document.getElementById(`name-${id}`);
    name.disabled=false;
    let email=document.getElementById(`email-${id}`);
    email.disabled=false;
    let phone=document.getElementById(`phone-${id}`);
    phone.disabled=false;
    let bgroup=document.getElementById(`bgroup-${id}`);
    bgroup.disabled=false;
    let gender=document.getElementById(`gender-${id}`);
    gender.disabled=false;
    
}
async function handleSave(id){
    let name=document.getElementById(`name-${id}`).value;
    let email=document.getElementById(`email-${id}`).value;
    let phone=document.getElementById(`phone-${id}`).value;
    let bgroup=document.getElementById(`bgroup-${id}`).value;
    let gender=document.getElementById(`gender-${id}`).value;
    console.log(name,email,phone,bgroup,gender);
    let data={id,name,email,phone,bgroup,gender}
    console.log(data);
    const jsonData=JSON.stringify(data);
    const res=await fetch("http://localhost:3000/update",{
        "method":"put",
        "Content-Type":"text/json",
        "body":jsonData
    });
    console.log(res);
    const result=await res.text();
    console.log(result);
    if(result=="success"){
        alert("Updated Succesfully");
        getDonors();
    }
    else{
        alert("Not updated");
    }
}


async function handleDelete(id){
    console.log("hhh");
    
    const res=await fetch("http://localhost:3000/delete",{
        method:"DELETE",
        headers:{"Content-Type":"text/plain"},
        "body":id
    })
    console.log(res);
    const data=await res.text()
    if(data=="success"){
        alert("succesfully deleted");
        getDonors()
    }
    else{
        alert("Deletion Failed")
    }
    
}

document.getElementById("filter").addEventListener('keyup',(e)=>{
    str=``;
    arr.filter((i)=>i.name.toLowerCase().includes(e.target.value.toLowerCase())).map((donor)=>{
        str+=`
        <div class="contents">
            <input type="text" name="name" disabled="true" id="name-${donor._id}" placeholder="name" value=${donor.name}  class="ip">
            <input type="text" name="email" disabled="true" id="email-${donor._id}" placeholder="email" value=${donor.email} class="ip">
            <input type="text" name="phone" disabled="true" id="phone-${donor._id}" placeholder="phone" value=${donor.phone} class="ip">
            <input type="text" name="bgroup" disabled="true" id="bgroup-${donor._id}" placeholder="Blood Group" value=${donor.bgroup} class="ip">
            <input type="text" name="gender" disabled="true" id="gender-${donor._id}" placeholder="Gender" value=${donor.gender} class="ip">
        </div>
        <div class="bts">
            <button style="background-color: blue;" class="bt2"  onclick="handleEdit('${donor._id}')">Edit</button>
            <button style="background-color: green;"class="bt2" onclick="handleSave('${donor._id}')">Save</button>
            <button style="background-color: red;" class="bt2" onclick="handleDelete('${donor._id}')">Delete</button>
        </div>`
        
    })
    document.getElementById("inputs").innerHTML=str;
})