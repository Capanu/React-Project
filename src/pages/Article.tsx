import React from 'react'

type Props = {article:any, refresher:any}

async function deleteArticle(article:any, refresher:any) {

  const response = await fetch('http://localhost:3000/articles/'+article.id, {
      method:'DELETE',
      headers:{
          "Content-Type":"application/json"
      },
  })	.then((x) => x.json())
  .then((data) => {
   alert("Delete succesfull");
   refresher();
  })
  .catch((error) => {
    console.log(error);
  });
}

export default function Article({article, refresher}: Props) {
  return (
    <article className="article-class">
    <p className="title main-title">{article.title}</p>
    <div className="above-story">
        <span className="bullet-text">{article.type}</span>
        <span >{'\u2022'}</span>
        <span className="bullet-text">Added by</span>
        <span className="author-text">{article.author}</span>
        <span  >{'\u2022'}</span>
        <span className="bullet-text">{article.date}</span>
    </div>

    <div className="edit-above-story">
        <button className="button-item" onClick={() => {	
            sessionStorage.setItem("article", JSON.stringify({...article, editOrAdd:0}));
						window.location.pathname = "/modal";}}>Edit</button>
        <span >|</span>
        <button className="button-item" onClick={() =>deleteArticle(article, refresher)}>Delete</button>
    </div>

    <img  className="img-article"src={article.img} alt={article.name} />
    <p className="payload-text">
    {article.payload}
    </p>
 </article>
  )
}