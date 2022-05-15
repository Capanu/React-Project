import React from 'react'

type Props = {article:any}

export default function Article({article}: Props) {
  return (
    <article className="article-class">
    <p className="title main-title">{article.title}</p>
    <div className="above-story">
        <span className="bullet-text">{article.type}</span>
        {/* <span >&#8226</span> */}
        <span className="bullet-text">Added by</span>
        <span className="author-text">{article.author}</span>
        {/* <span >&#8226</span> */}
        <span className="bullet-text">{article.date}</span>
    </div>

    <div className="edit-above-story">
        <button className="button-item">Edit</button>
        <span >|</span>
        <button className="button-item">Delete</button>
    </div>

    <img  className="img-article"src={article.img} alt={article.name} />
    <p className="payload-text">
    {article.payload}
    </p>
 </article>
  )
}