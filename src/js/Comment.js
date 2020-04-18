const UNDEF = undefined;
const state = [];
const debounce = function(fn, delay){
    let timeout;
    return function() {
        let obj = this,
            args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.call(obj, ...args);
        },delay)
    }

}
const deleteComment = (el) => {
    el.target.parentElement.parentElement.parentElement.remove();
}
const rplyComment = (el) => {
    
}
const del = debounce(deleteComment, 200);
const post = (area, listDiv) => {
   let commentJSON = createCommentJSON(area.value),
   label,div, rplybtn, delbtn, rplyText, delText,outerDiv,btnDiv;
   if(commentJSON) {
    div = document.createElement("div");
    outerDiv = document.createElement("div");
    btnDiv = document.createElement("div");
    btnDiv.className = "btnDiv";
    div.className = "comment_box";
    div.appendChild(outerDiv);
    label = document.createElement("textarea");
    label.setAttribute("disabled" ,true);
    rplybtn = document.createElement("button");
    rplyText = document.createTextNode("REPLY");
    rplybtn.appendChild(rplyText)
    delbtn = document.createElement("button");
    delText = document.createTextNode("DEL");
    delbtn.appendChild(delText);
    btnDiv.appendChild(rplybtn);
    btnDiv.appendChild(delbtn);
    label.setAttribute("rows", "4");
    label.setAttribute("cols", "50");
    outerDiv.appendChild(label);
    outerDiv.appendChild(btnDiv);
    listDiv.appendChild(div);
    label.innerHTML = commentJSON.comment;

    delbtn.addEventListener("click", del);
    rplybtn.addEventListener("click", rply);

   }

}
const createCommentJSON = (text) => {
    let cmt = {};
    if(text && text !== "") {
        Object.assign(cmt, {
            comment: text,
            replies:[]
        });
        state.push(cmt);
        return cmt;
    } 
    return UNDEF;
}
const postComment = debounce(post, 300);
export default postComment;