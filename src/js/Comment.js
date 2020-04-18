
const post = (area, listDiv) => {
   let commentJSON = createCommentJSON(area.value),
   label;
   if(commentJSON) {
    label = document.createElement("label");
    listDiv.appendChild(label);
    label.innerHTML = commentJSON.comment;
   }

}
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
const createCommentJSON = (text) => {
    let cmt = {}
    if(text && text !== "") {
        Object.assign(cmt, {
            comment: text,
            replies:[]
        })
    } 
    return cmt;
}
const postComment = debounce(post, 300);
export default postComment;