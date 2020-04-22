const UNDEF = undefined;
const state = [];
const debounce = function(fn, delay){
    let timeout;
    return function(...args) {
        let obj = this,
            args2 = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(obj, [...args, ...args2]);
        },delay)
    }

}
const deleteComment = (index, listDiv) => {
    state.splice(index, 1);
    createElements(state,listDiv);
}
const rplyComment = (index, listDiv) => {
    if(state && state.length) {
        state[index].replies.visible = true;
        createRplyComments(state[index], listDiv.children[index]);
    }
}
const postReply = (state, textArea, div) => {
    console.log(div);
    while (div.firstChild) {
            div.removeChild(div.lastChild);
          }
    state.replies.comments.push({
        comment: textArea.value
    })
    createRplyComments(state, div);
}
const createRplyComments = (state, div) => {
    // while (div.firstChild) {
    //     div.removeChild(div.lastChild);
    //   }
    let replies = state.replies,
        textArea,postrplybtn,btnText;
        if(replies.visible === true) {
            if(replies.comments && replies.comments.length) {
            //Check if div has a child
            replies.comments.forEach((comment) => {
                textArea = document.createElement("textarea");
                textArea.setAttribute("rows", "4");
                textArea.setAttribute("cols", "40");
                textArea.setAttribute("disabled", true);
                let text = document.createTextNode(comment);
                textArea.appendChild(text);
                div.appendChild(textArea);
            })
            }
            textArea = document.createElement("textarea");
            textArea.setAttribute("rows", "4");
            textArea.setAttribute("cols", "40");
            postrplybtn = document.createElement("button");
            btnText = document.createTextNode("post");
            postrplybtn.appendChild(btnText);
            div.appendChild(textArea);
            div.appendChild(postrplybtn);
            postrplybtn.addEventListener("click", addRply.bind(this, state, textArea, div));    
    }
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

                delbtn.addEventListener("click", del.bind(this, index, listDiv));
                rplybtn.addEventListener("click", rply.bind(this, index, listDiv));
                createRplyComments(commentJSON, listDiv.children[index]);
        });
    }
}

const del = debounce(deleteComment, 200);//delete
const rply = debounce(rplyComment, 200);//reply
const addRply = debounce(postReply, 200);//post reply

//Post New Comment
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