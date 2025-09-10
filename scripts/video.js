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
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("categories");
    categories.forEach( (item) =>{
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText= item.category;
        categoryContainer.append(button);
    })
}
const videoLoader = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res)=> res.json())
    .then((data)=> videoShow(data.videos))
    .catch((error)=> console.log(error));
}

const videoShow = (vidData) =>{
    const videos = document.getElementById("videos");
    vidData.forEach((item) =>{
        const card = document.createElement("div");
        card.classList= "card card-compact border";
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
            <div>
                <h2 class="card-title">${item.title}</h2>
                <div class="flex items-center gap-2">
                    <p>${item.authors[0].profile_name}</p>
                    ${
                        item.authors[0].verified===true
                        ?'<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"/>'
                        :""
                    }
                </div> 
            </div>
        </div>`;
        videos.appendChild(card);
    })
}
loadCategories();
videoLoader();