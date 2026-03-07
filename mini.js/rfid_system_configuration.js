function saveConfig(){

document.getElementById("successMsg").style.display="block";

setTimeout(()=>{
document.getElementById("successMsg").style.display="none";
},3000)

}

function openModal(){
document.getElementById("resetModal").style.display="flex";
}

function closeModal(){
document.getElementById("resetModal").style.display="none";
}

function resetConfig(){

document.querySelectorAll("input").forEach(input=>{
if(input.type==="text" || input.type==="password" || input.type==="number"){
input.value=""
}

if(input.type==="checkbox"){
input.checked=false
}
})

closeModal()

}

function toggleTheme(){
document.body.classList.toggle("dark-mode")
}