var  SiteNameinput = document.getElementById("SiteName");
var  SiteURLinput = document.getElementById("SiteURL");
var myindex;
var btnsubmit=document.getElementById('btnsubmit')
var btnEdit=document.getElementById('btnEdit')
var allBookmarks=[];

if(localStorage.getItem('productContainer') === null){
    allBookmarks=[]
}
else{
    allBookmarks=JSON.parse(localStorage.getItem('productContainer'))
    displayBookmarke()
}


function addBookmarke(){
    
    if(ValidationBookmarke(SiteNameinput) &&
     ValidationBookmarke(SiteURLinput)){
        var Bookmarks={
        index:allBookmarks.length +1,
        WebsiteName: SiteNameinput.value,
        VisitURL: SiteURLinput.value,
    };
    allBookmarks.push(Bookmarks);
    localStorage.setItem('productContainer', JSON.stringify(allBookmarks));
    console.log(allBookmarks);
    displayBookmarke()
    clearInput()
     }
    
    localStorage.setItem('productContainer', JSON.stringify(allBookmarks));
    console.log(allBookmarks);
    displayBookmarke()
    clearInput()
}


function clearInput(){
    SiteNameinput.value="";
    SiteURLinput.value="";
}



function displayBookmarke(){
    var cartona=``;
    for(var i=0; i<allBookmarks.length; i++){
        cartona+=`
                  <tr class="fontTr">
                    <td>${i + 1}</td>
                    <td>${allBookmarks[i].WebsiteName}</td>
                    <td>
                      <a href="${allBookmarks[i].VisitURL}" target="_blank">
                        <button class="btn btn-visit">
                          <i class="fa-solid fa-eye"></i> Visit
                        </button>
                      </a>
                    </td>
                    <td>
                      <button onclick='getdataforEdit(${i})' class="btn  btnEdit1 ">
                        <i class="fa-solid text-white fa-pen-to-square"></i> Edit
                      </button>
                    </td>
                    <td>
                      <button onclick='deletBookmarke(${i})'  class="btn btn-delete">
                        <i class="fa-solid  fa-trash-can"></i> Delete
                      </button>
                    </td>
                  </tr>`
    }
    document.getElementById("tableContent").innerHTML=cartona;
}



function deletBookmarke(index){
    myindex=index
    allBookmarks.splice(index,1);
    localStorage.setItem('productContainer', JSON.stringify(allBookmarks));
    displayBookmarke()
    
}


function ValidationBookmarke(element){
    var val=element.value
    var id=element.id
    var regex={
        SiteName:/^[A-Z][a-z0-9]{3,8}$/,
        SiteURL:/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/
    }

    if(regex[id].test(val)==true){

        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')
        return true;
    }
    else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none','d-block')
        return false;
    }
}



function getdataforEdit(index){
    myindex=index
    console.log(index);
    SiteNameinput.value=allBookmarks[index].WebsiteName;
    SiteURLinput.value=allBookmarks[index].VisitURL;

    btnsubmit.classList.add('d-none')
    btnEdit.classList.remove('d-none')
}




function EditBookmarks(){
    allBookmarks[myindex].WebsiteName=SiteNameinput.value;
    allBookmarks[myindex].VisitURL=SiteURLinput.value;
    displayBookmarke()
    localStorage.setItem('productContainer', JSON.stringify(allBookmarks));

    btnEdit.classList.add('d-none')
    btnsubmit.classList.remove('d-none')
    clearInput();
}

