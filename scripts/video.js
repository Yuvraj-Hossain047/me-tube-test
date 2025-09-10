function getTimeString(time){
    const hour = parseInt(time/3600);
    let remainingSecond = time%3600;
    const minute = parseInt(remainingSecond/60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} seconds ago`;
}
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data)=> displayCategories(data.categories))
    .catch((error)=> console.log(error));
}
const loadCategoryVideos= (id) => {
    const btns = document.getElementsByClassName("btnClassRemove");
    for (let btn of btns) {
        btn.classList.remove("bg-red-400");
    }

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data)=>{
        const activeBtn= document.getElementById(`btn-${id}`);
        activeBtn.classList.add("bg-red-400");
        videoShow(data.category)   
    } )
    .catch((error)=> console.log(error));
}
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories");
    categories.forEach( (item) =>{
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML=`
        <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn btn-outline btnClassRemove">
            ${item.category}
        </button>`;
        categoryContainer.appendChild(buttonContainer);
    })
}
// const loadDetails = (videoID) =>{
//     fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`)
//     .then((res)=> res.json())
//     .then((data)=> console.log(data))
//     .catch((error)=> console.log(error));
// }
const loadDetails = async (videoID) =>{
    const urlLink = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    const res= await fetch(urlLink);
    const data= await res.json();
    displayDetails(data.video);
}
const displayDetails= (video)=>{
    const detailContainer = document.getElementById("modal-content");
    detailContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description}</p>`
    document.getElementById("customModal").showModal();
}
const videoLoader = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res)=> res.json())
    .then((data)=> videoShow(data.videos))
    .catch((error)=> console.log(error));
}
const videoShow = (vidData) =>{
    const videos = document.getElementById("videos");
    videos.innerHTML="";

    if(vidData.length==0){
        videos.classList.remove("grid");
        videos.innerHTML=`
        <div class="min-h-[600px] w-full flex flex-col justify-center items-center">
        <img src="./images/Icon.png"/>
        <h1 class="text-center text-6xl font-bold">No Content</h1>
        </div>
        `;
        return;
    }
    else{
        videos.classList.add("grid");
    }

    vidData.forEach((item) =>{
        const card = document.createElement("div");
        card.classList= "card card-compact";
        card.innerHTML=
        `<figure class="h-[200px] relative">
            <img class="h-full w-full object-cover" src=${item.thumbnail} />
            ${
                item.others.posted_date.length==0
                ? ""
                :`<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">
                    ${getTimeString(item.others.posted_date)}
                  </span>`
            }
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class="h-12 w-12 rounded-full object-cover" src=${item.authors[0].profile_picture}/>
            </div>
            <div class="flex flex-col gap-2 items-start">
                <h2 class="card-title">${item.title}</h2>
                <div class="flex items-center gap-2">
                    <p>${item.authors[0].profile_name}</p>
                    ${
                        item.authors[0].verified===true
                        ?'<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>'
                        :""
                    }
                </div>
                <button onclick="loadDetails('${item.video_id}')" class="btn btn-outline rounded-full">Details</button>
            </div>
        </div>`;
        videos.appendChild(card);
    })
}

 document.getElementById("search-input").addEventListener("keyup",(e)=>{
    videoLoader(e.target.value);
 })
loadCategories();
videoLoader();