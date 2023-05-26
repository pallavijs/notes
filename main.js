const title = document.getElementById('title')
const titleError = document.getElementById('title-error')
const clearAllStorage = document.getElementById('clear')
const desc= document.getElementById('desc')
const descError= document.getElementById('desc-error')
const dateElement = document.getElementById('date')
const addBtn = document.getElementById('submit-btn')

const container  = document.getElementById('container');


// Global Array
let notesArray= JSON.parse(localStorage.getItem('takeNotes')) || []
// to toogle between edited vs new card add
let isEdited = false;

let helper = {
    id:-1,
    index:-1
}





// submit handler
addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(validation()){
    
    addNotes();
    
    }
    
    })
    



    // validation of input
function validation(){
    let isValidate = false
    
    // validation
    if(title.value.length<3){
        titleError.innerText="Title length is too short"
        
        setTimeout(()=>{
        
        titleError.innerText =''
        title.value =''
        
        },1000)
        
        }
        if(desc.value.length <5){
            descError.innerText="Description length is too short (enter more than 5 character )"
           
        setTimeout(()=>{
            descError.innerText =''
            desc.value =''  
            },1000)
        
        }
    
        if(desc.value.length>5 && title.value.length>3){
            isValidate = true
        }
    
    
        return isValidate
    }




    // add notes logic

function addNotes(){

    if(!isEdited){
    
        const dataObject = {
            id : notesArray.length > 0 ? notesArray.length+1 : 1,
            title:title.value,
            desc : desc.value,
            date:dateElement.value
        }
        
        
        
        
        notesArray.push(dataObject)
        localStorage.setItem("takeNotes",JSON.stringify(notesArray))
        
    
    } 
    else{
    // destructure
        const {id,index} = helper;
    
        const dataObject = {
            id : id,
            title:title.value,
            desc : desc.value,
            date:dateElement.value
        }
    
    
    notesArray.splice(index,1,dataObject);
    
    localStorage.setItem("takeNotes",JSON.stringify(notesArray))
    
    showNotes()
    
    
    }
    
    showNotes()
    
    clearInput()
    
    }
    




    // show function
function showNotes(){

  
    container.innerHTML =''
    notesArray.map((item)=>{
//    let str  = "sdfwqedfweqdrw ${item}"
//    let str2 =  `safesfddsf ${item}`
        // destructuring
        const {title,desc,id,date} = item
    
    return(
    
            container.innerHTML += (
        
        
                `
                    <div class="card rounded-lg mx-1 my-1 bg-purple-200 flex flex-col gap-3 justify-between px-2 py-1 w-64">
                      <div class="top flex flex-col gap-2">
                        <h1 class="font-bold ">${title}</h1>
                        <article>
                        ${desc}
                        </article>
                      </div>
                      <div class="time bg-purple-300 w-fit rounded-lg px-2 py-1 mt-1 mb-1">
                        <h3 class="text-purple-950">updated at ${date}</h3>
                      </div>
                      <div class="mt-1">
    <button id="delete" class=" h-fit w-fit px-2 py-1 bg-purple-400 text-purple-950 m-1 rounded-lg" onclick="deleteThisNote(${id})" >Delete</button>
    <button id="edit" class=" h-fit w-fit px-2 py-1 bg-purple-400 text-purple-950 m-1 rounded-lg" onclick="editThisNote(${id})" >Edit</button>
                      
                      </div>
                    </div>
                    `
                
                )
    
    )
    
    
    
    })
    
    
    
    
    }
    






    // clear

function clearInput(){
    title.value =''
    desc.value = ''
    date.value = ''
}

function clearAll(){
    localStorage.removeItem("takeNotes");
    location.reload()
    showNotes();
}






    // delete Task
function deleteThisNote(id)
{

for(let i = 0; i<notesArray.length;++i){
console.log(id)
if(notesArray[i].id === id){

 notesArray.splice(i,1);

localStorage.setItem("takeNotes",JSON.stringify(notesArray))

showNotes()

break;
}

}



}




// edit Task
function editThisNote(id)
{
    isEdited = true
for(let i = 0; i<notesArray.length;++i){

if(notesArray[i].id===id){

    // fill the form with edited data
title.value = notesArray[i].title
desc.value = notesArray[i].desc

// provide edit card information to the helper
helper = {
    id:id,
    index:i
}

return ;

}




}









}






showNotes()