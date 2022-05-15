import React from 'react'
import Article from './Article';
import "./Home.css";

import { useState } from 'react';

type Props = {}


export default function Home({ }: Props) {
    const [listArticle, setList] = useState([]);
    const [setToDisplay, setForDisplay] = useState(0);
    const [actualArticles, setDisplayArticles] = useState([]);

    fetch("http://localhost:3000/articles")
        .then(x => x.json())
        .then(data => {setList(data);})
        .catch((error) => {
            console.log(error)
        });



    return (

        <div className="parent-container">


            <div className="modal-container" id="myModal">

                <div className="title-div">
                    <p className="title">Add/Edit article</p>
                </div>

                <div className="final-four">
                    <input type="text" className="normal-input" id="article-title" placeholder="Please enter title"></input>
                    <input type="text" className="normal-input" id="detail-article" placeholder="Please enter detail"></input>
                    <input type="text" className="normal-input" id="article-author" placeholder="Please enter author"></input>
                    <input type="text" className="normal-input" id="article-date" placeholder="Please enter date"></input>
                </div>

                <input type="text" className="url-input" id="img-url-article" placeholder="Please enter url"></input>
                <textarea className="contnet-input" id="payload-article" placeholder="Please enter content"></textarea>
                <div className="final-four">
                    <button className="close">SAVE</button>
                    <button className="close">Cancel</button>
                </div>

            </div>


            <main className="payload-container" id="my-contnent-to-hide">
                <nav className="main-page-nav">
                    <a href="#" className="nav-item">TRAVEL UPDATES</a>
                    <a href="#" className="nav-item">REVIEWS</a>
                    <a href="#" className="nav-item">ABOUT</a>
                    <a href="#" className="nav-item">CONTACT</a>
                </nav>

                <button className="add-article-button" id="myBtn">+Add new</button>


                <div id="page-article">{listArticle ?  listArticle.map(
                    (article: any) => {
                        return <Article article={article} key={article.id} />}) 
                        
                        : null}
                </div>



            </main>
            <div className="next-prev subtitle" id="nexter">
                <span >previous</span>
                <span onClick={()=>{

                   
                    setForDisplay(setToDisplay+1);
                    setDisplayArticles(listArticle.slice(2*setToDisplay, 2));
                    let articles = document.getElementById("page-article");
                   

                    }}>next</span>
            </div>

        </div>

    );
}