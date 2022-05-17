import React from "react";
import Article from "./Article";

import { useState, useEffect } from "react";
type Props = {};

export default function Home({}: Props) {


	const nrArticlePerPage = 2;
	const [listArticle, setList] = useState([]);
	const [articlesToSiplay, setArticlesDisplayed] = useState([]);

	const [startIndex, setStart] = useState(0);
	const [endIndex, setEnd] = useState(nrArticlePerPage - 1);

	

   function fetchArticles() {
    fetch("http://localhost:3000/articles")
    .then((x) => x.json())
    .then((data) => {
        setList(data);
        if (startIndex == 0) {
      
        setArticlesDisplayed(data.slice(startIndex, endIndex + 1));
        } else {
            if (startIndex == data.length ) {
                setArticlesDisplayed(data.slice(startIndex-nrArticlePerPage, endIndex-nrArticlePerPage+1));
                setEnd((endIndex) =>  endIndex-nrArticlePerPage);
                setStart((prevstart) => prevstart - nrArticlePerPage);
                
            } else {
                setArticlesDisplayed(data.slice(startIndex, endIndex + 1));
            }
        }
    })
    .catch((error) => {
        console.log(error);
    });
   }

	useEffect(() => {
        fetchArticles();
	}, []);

	const goNext = () => {
		if (endIndex + 1 < listArticle.length) {
			setArticlesDisplayed([]);
			setArticlesDisplayed(
				listArticle.slice(
					startIndex + nrArticlePerPage,
					endIndex + nrArticlePerPage + 1
				)
			);
			setStart((prevstart) => prevstart + nrArticlePerPage);
			setEnd((endIndex) => endIndex + nrArticlePerPage);
		}
		console.log(startIndex, endIndex, articlesToSiplay);
	};
	const goBack = () => {
		if (startIndex > 0) {
			setArticlesDisplayed([]);
			setArticlesDisplayed(
				listArticle.slice(
					startIndex - nrArticlePerPage,
					endIndex - nrArticlePerPage + 1
				)
			);
			setStart((prevstart) => prevstart - nrArticlePerPage);
			setEnd((endIndex) => endIndex - nrArticlePerPage);
		}
		console.log(startIndex, endIndex, articlesToSiplay);
	};

	const tansmitPayload = {
		editOrAdd: 1,
	};
	return (
		<div className="parent-container">
			<main className="payload-container" id="my-contnent-to-hide">
				<nav className="main-page-nav">
					<a href="#" className="nav-item">
						TRAVEL UPDATES
					</a>
					<a href="#" className="nav-item">
						REVIEWS
					</a>
					<a href="#" className="nav-item">
						ABOUT
					</a>
					<a href="#" className="nav-item">
						CONTACT
					</a>
				</nav>

				<button
					className="add-article-button"
					onClick={() => {
						sessionStorage.setItem("article", JSON.stringify(tansmitPayload));
						window.location.pathname = "/modal";
					}}
					id="myBtn"
				>
					+Add new
				</button>

				<div id="page-article">
					{articlesToSiplay
						? articlesToSiplay.map((article: any) => {
								return <Article article={article} refresher={fetchArticles} key={article.id} />;
						  })
						: null}
				</div>
			</main>
			<div className="next-prev subtitle" id="nexter">
				<span onClick={goBack}>previous</span>
				<span onClick={goNext}>next</span>
			</div>
		</div>
	);
}
