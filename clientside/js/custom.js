async function getDonors() {
    const res=fetch("http://localhost:3000/getdonors")
    const data=await (await res).json();
    str=``
    data.map((dt)=>{
        str+=`<div class="contents">
            <input type="text" name="name" id="name" placeholder="name" value=${dt.name}  class="ip">
            <input type="text" name="email" id="email" placeholder="email" value=${dt.email} class="ip">
            <input type="text" name="phone" id="phone" placeholder="phone" value=${dt.phone} class="ip">
            <input type="text" name="bgroup" id="bgroup" placeholder="Blood Group" value=${dt.bgroup} class="ip">
            <input type="text" name="gender" id="gender" placeholder="Gender" value=${dt.gender} class="ip">
        </div>
        <div class="bts">
            <button style="background-color: blue;" class="bt2">Edit</button>
            <button style="background-color: green;"class="bt2">Save</button>
            <button style="background-color: red;" class="bt2"  onclick=`handleDelete()${_id}`>Delete</button>
        </div>`
    })
    document.getElementById("inputs").innerHTML=str
    
}
getDonors()
async function handleDelete()