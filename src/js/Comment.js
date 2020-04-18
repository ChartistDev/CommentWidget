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
const deleteComment = (index) => {
    state.splice(index, 1);
    createElements(state,listDiv);
}
const rplyComment = (index) => {
    if(state && state.length) {
        createRplyComments(state[index], listDiv.children[index]);
    }
}
const postReply = (state, value) => {
    state.replies.comments.push({
        comment: value
    })
}
const createRplyComments = (state, div) => {
    let replies = state.replies,
        textArea,rplybtn,btnText;
    if(replies.comments && replies.comments.length) {
       //Check if div has a child
    } 
        textArea = document.createElement("textarea");
        textArea.setAttribute("rows", "4");
        textArea.setAttribute("cols", "40");
        rplybtn = document.createElement("button");
        btnText = document.createTextNode("post");
        rplybtn.appendChild(btnText);
        div.appendChild(textArea);
        div.appendChild(rplybtn);
        rplybtn.addEventListener("click", addRply.bind(this, state, textArea.value));
}
const createElements = (state, listDiv) => {
    while (listDiv.firstChild) {
        listDiv.removeChild(listDiv.lastChild);
      }
    if(state && state.length) {
        state.forEach((commentJSON, index) => {
          let label,div, rplybtn, delbtn, rplyText, delText,outerDiv,btnDiv;
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

                delbtn.addEventListener("click", del.bind(this, index));
                rplybtn.addEventListener("click", rply.bind(this, index));
                createRplyComments(commentJSON, listDiv.children[index]);
        });
    }
}
const del = debounce(deleteComment, 200);
const rply = debounce(rplyComment, 200);
const addRply = debounce(postReply, 200);
const post = (area, listDiv) => {

createCommentJSON(area.value);
createElements(state, listDiv);

}
const createCommentJSON = (text) => {
    let cmt = {};
    if(text && text !== "") {
        Object.assign(cmt, {
            comment: text,
            replies:{
                visible: false,
                comments: []
            }
        });
        state.push(cmt);
    }
}
const postComment = debounce(post, 300);
export default postComment;