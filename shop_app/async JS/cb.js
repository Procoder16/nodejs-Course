// const posts = [
//     {
//         title: 'Post One', body: 'This is post one'
//     },
//     {
//         title: 'Post Two', body: 'This is post two'
//     },
// ];

// function getPosts(){
//     setTimeout(() => {
//         let output = '';
//         posts.forEach((post, index) => {
//             output += `<li>${post.title}</li>`;
//         });
//         document.body.innerHTML = output;
//     }, 1000);
// }
//mongodb+srv://soumik:shopapp@cluster0.858cx.mongodb.net/shop?retryWrites=true&w=majority
//622522ed17dd2de1ad858c7e
// function createPost(post, callback){
//     setTimeout(() => {
//         posts.push(post);
//         callback();
//     }, 2000);
// }

// getPosts();

// createPost({title: 'Post Three', body: 'This is post three'});

/*
    What happens here is, we get only two posts printed on the webpage.
    Because getPosts takes 1 sec and createPost takes 2 sec.
    So by the time createPost creates another post, the getPost method had already printed it on the DOM
    with two posts.

    Two rectify this, we can use callbacks. So we will pass getPosts as an argument to the createPost method.
    So, by the syntax, it means, first of all the body of createPost will get executed and then the
    callback will be taken care of. The implementation is shown below: 
*/


const posts = [
    {
        title: 'Post One', body: 'This is post one'
    },
    {
        title: 'Post Two', body: 'This is post two'
    },
];

function getPosts(){
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

createPost({title: 'Post Three', body: 'This is post three'}, getPosts);