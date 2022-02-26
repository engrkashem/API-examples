const loadComments = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await res.json();
    displayComments(data);
}
loadComments();
const displayComments = (comments) => {
    const commentContainer = document.getElementById('comments');
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.classList.add('comment');
        div.innerHTML = `
        <div onclick="loadCommentByPostId(${comment.postId})">
        <h3>Name: ${comment.name} </h3>
        <p> Id: ${comment.id}</p>
        <p> Post Id: ${comment.postId}</p>
        <p>Email: ${comment.email}</p>
        <p>Comment: ${comment.body}</p>
        </div>
        `;
        commentContainer.appendChild(div);
    });
};
const loadCommentByPostId = postId => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(res => res.json())
        .then(data => displayCommentsByPostId(data))
};
const displayCommentsByPostId = postsById => {
    const posts = document.getElementById('posts');
    postsById.forEach(post => {
        const div = document.createElement('div');
        div.innerHTML = `
        <p>ID: ${post.id}</p>
        <p>${post.body}</p>
        `;
        posts.appendChild(div)
        console.log(post);
    })

}
