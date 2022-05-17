import React from "react";
import { useState, useEffect } from "react";
type Props = {};

export default function Modal({}: Props) {
	let text = sessionStorage.getItem("article");
	let object: {
		editOrAdd: number;
		title: any;
		type: any;
		author: any;
		date: any;
		img: any;
		payload: any;
		id: any;
	} | null = null;
	const [article, setArticle] = useState({
		title: "",
		type: "",
		author: "",
		date: "",
		img: "",
		payload: "",
		id: "",
	});

    const [localeEditOrAdd, setEditOrAdd] = useState({
		editOrAdd:0
	});
	useEffect(() => {
		if (text) {
			object = JSON.parse(text);
         
            if (object!= null)    
                setEditOrAdd({editOrAdd: object.editOrAdd});
            if (object != null && object.editOrAdd == 0) {
				// for edit
            
				setArticle({
					title: object.title,
					type: object.type,
					author: object.author,
					date: object.date,
					img: object.img,
					payload: object.payload,
					id: object.id,
				});
			}
			
		}
	}, []);

	 function saveArticle() {
	 fetch(
			"http://localhost:3000/articles/" + article.id,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(article),
			}
		).then((data) => {
            alert("SUCCES UPDATE");
            window.location.pathname = "/"; // go to home
        })
        .catch((error) => {
            console.log(error);
        });
		
	}

	function addArticle() {
		fetch("http://localhost:3000/articles", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(article),
		})
			.then((data) => {
				alert("SUCCES ADD");
                window.location.pathname = "/"; // go to home
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleSubmit() {
        console.log(localeEditOrAdd);
		if (localeEditOrAdd) {
			if (localeEditOrAdd.editOrAdd == 0) {
				// edit
				saveArticle();
			} else {
				addArticle(); // add article
			}
		}	
	}

	return (
		<div className="modal-container" id="myModal">
			<div className="title-div">
				<p className="title">Add/Edit article</p>
			</div>

			<div className="final-four">
				<input
					type="text"
					className="normal-input"
					placeholder="Please enter title"
					value={article.title}
					onChange={(e) => setArticle({ ...article, title: e.target.value })}
				></input>
				<input
					type="text"
					className="normal-input"
					placeholder="Please enter type"
					value={article.type}
					onChange={(e) => setArticle({ ...article, type: e.target.value })}
				></input>
				<input
					type="text"
					className="normal-input"
					placeholder="Please enter author"
					value={article.author}
					onChange={(e) => setArticle({ ...article, author: e.target.value })}
				></input>
				<input
					type="text"
					className="normal-input"
					placeholder="Please enter date"
					value={article.date}
					onChange={(e) => setArticle({ ...article, date: e.target.value })}
				></input>
			</div>

			<input
				type="text"
				className="url-input"
				placeholder="Please enter url"
				value={article.img}
				onChange={(e) => setArticle({ ...article, img: e.target.value })}
			></input>
			<textarea
				className="contnet-input"
				placeholder="Please enter content"
				value={article.payload}
				onChange={(e) => setArticle({ ...article, payload: e.target.value })}
			></textarea>
			<div className="final-four">
				<button onClick={() => handleSubmit()}>SAVE</button>
				<button onClick={() => (window.location.pathname = "/")}>Cancel</button>
			</div>
			<br />
		</div>
	);
}
