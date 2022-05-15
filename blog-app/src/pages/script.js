
let root = document.getElementById("page-article");



async function deleteArticle(article) {

    const response = await fetch('http://localhost:3000/articles/'+article.id, {
        method:'DELETE',
        headers:{
            "Content-Type":"application/json"
        },
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    await response.json().then(() => {
        root.innerHTML="";
        fetchArticles();
    });
}
async function saveArticle(article) {

    root.innerHTML="";
    let title = document.getElementById("article-title");
    let type =document.getElementById("detail-article");
    let author = document.getElementById("article-author");
    let date = document.getElementById("article-date");
    let img =  document.getElementById("img-url-article");
    let payload = document.getElementById("payload-article");

    const body = {
        title:title.value,
        type:type.value,
        author:author.value,
        date:date.value,
        img:img.value,
        payload:payload.value
    };
    const response = await fetch('http://localhost:3000/articles/'+article.id, {
        method:'PUT',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
        
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    await response.json().then(() => {
    
       fetchArticles();
       
    });
}


async function addArticle() {
    root.innerHTML="";
    let generatedId = parseInt(Date.now() * Math.random())
    let title = document.getElementById("article-title");
    let type =document.getElementById("detail-article");
    let author = document.getElementById("article-author");
    let date = document.getElementById("article-date");
    let img =  document.getElementById("img-url-article");
    let payload = document.getElementById("payload-article");

    const body = {
        id: generatedId,
        title:title.value,
        type:type.value,
        author:author.value,
        date:date.value,
        img:img.value,
        payload:payload.value
    };


    const response = await fetch('http://localhost:3000/articles', {
        method:'POST',
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(body),
        
    });
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    await response.json().then(() => {
        fetchArticles();
       
    });
}
function editArticle(article) {

    console.log(article);
    next_prev.style.display="none";
    myContnt.style.display="none";
    modal.style.display = "block";


    let title = document.getElementById("article-title");
    let type =document.getElementById("detail-article");
    let author = document.getElementById("article-author");
    let date = document.getElementById("article-date");
    let img =  document.getElementById("img-url-article");
    let payload = document.getElementById("payload-article");

    title.value = article.title;
    type.value = article.type;
    author.value = article.author;
    date.value = article.date;
    img.value = article.img;
    payload.value = article.payload;


    save.onclick = function () {
        saveArticle(article);
        modal.style.display = "none";
        myContnt.style.display="flex";
        next_prev.style.display="flex";
    }


}
function createArticle(article) {
    let  docArt = document.createElement("article");
    docArt.className = "article-class";
    
    let title = document.createElement("p");
    title.className = "title main-title";
    title.textContent = article.title;

    let aboveStory = document.createElement("div");
    aboveStory.className = "above-story";

    let span_type = document.createElement("span");
    span_type.textContent= article.type;

    let span_bullet1 = document.createElement("span");
    span_bullet1.innerHTML= "&#8226";

    let span_bullet2 = document.createElement("span");
    span_bullet2.innerHTML= "&#8226";

    let span_bullet3 = document.createElement("span");
    span_bullet3.innerHTML= "&#8226";

    let span_add = document.createElement("span");
    span_add.textContent= "Added by";

    let span_author = document.createElement("span");
    span_author.textContent= article.author;

    let span_date = document.createElement("span");
    span_date.textContent= article.date;

    aboveStory.appendChild(span_type);
    aboveStory.appendChild(span_bullet1);
    aboveStory.appendChild(span_add);
    aboveStory.appendChild(span_author);
    aboveStory.appendChild(span_bullet2);
    aboveStory.appendChild(span_date);


    let editAboveStory = document.createElement("div");
    editAboveStory.className = "edit-above-story";

    let editBtn = document.createElement("button");
    editBtn.className = "button-item";
    editBtn.textContent="Edit"
    editBtn.addEventListener('click', () => {
        editArticle(article);
    });



    let bar = document.createElement("span");
    bar.textContent="|";

    let delBtn = document.createElement("button");
    delBtn.className = "button-item";
    delBtn.textContent="Delete"
    delBtn.addEventListener('click', ()=> deleteArticle(article));

    let img = document.createElement("img");
    img.className = "img-article";
    img.src = article.img;

    let payload_text = document.createElement("p");
    payload_text.className = "payload-text";
    payload_text.textContent = article.payload;

    editAboveStory.appendChild(editBtn);
    editAboveStory.appendChild(bar);
    editAboveStory.appendChild(delBtn);

    docArt.appendChild(title);
    docArt.appendChild(aboveStory);
    docArt.appendChild(editAboveStory);
    docArt.appendChild(img);
    docArt.appendChild(payload_text);

    root.appendChild(docArt);
}


function renderArticles(articles) {
    
    articles.forEach(article => {
        createArticle(article);

    });

}
async function fetchArticles() {
   
    const response = await fetch('http://localhost:3000/articles');
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
    }

    await response.json().then((response) => {
        renderArticles(response);
    });


}

function clearForm() {

    let title = document.getElementById("article-title");
    let type =document.getElementById("detail-article");
    let author = document.getElementById("article-author");
    let date = document.getElementById("article-date");
    let img =  document.getElementById("img-url-article");
    let payload = document.getElementById("payload-article");
    title.value= "";
    type.value = "";
    author.value ="";
    date.value ="";
    img.value = "";
    payload.value="";
}


fetchArticles();


         var myContnt = document.getElementById("my-contnent-to-hide");
         var next_prev = document.getElementById("nexter");
        // Get the modal
        var modal = document.getElementById("myModal");
        modal.style.display = "none";

        // Get the button that opens the modal
        var btn = document.getElementById("myBtn");

        // Get the <span> element that closes the modal
        var save = document.getElementsByClassName("close")[0];
        var closer = document.getElementsByClassName("close")[1];


        // When the user clicks the button, open the modal 
        btn.onclick = function () {
            clearForm();
            next_prev.style.display="none";
            myContnt.style.display="none";
            modal.style.display = "block";

            save.onclick = function () {
                addArticle();
                modal.style.display = "none";
                myContnt.style.display="flex";
                next_prev.style.display="flex";
            }
          
        }

        // When the user clicks on <span> (x), close the modal
        closer.onclick = function () {
            modal.style.display = "none";
            myContnt.style.display="flex";
            next_prev.style.display="flex";
        }

