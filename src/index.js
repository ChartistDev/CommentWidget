import "./comment.css";
import postComment from "./js/Comment";
var textArea = document.querySelector("#commentArea"),
    btn = document.querySelector("#postBtn"),
    listDiv = document.querySelector("#listDiv");

    btn.addEventListener("click", postComment.bind(this, textArea, listDiv));