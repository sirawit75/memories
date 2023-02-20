import { faker } from "@faker-js/faker";

export const user = {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    createdAt: faker.date.past(),
}

export const imageUrl: string[] = [];
for (let i = 0; i < 3; i++)
    imageUrl.push(faker.image.cats());

export const post = {
    title: faker.word.adjective(),
    creator: faker.internet.userName(),
    createdAt: faker.date.past(),
    imageUrl
}

const posts: typeof post[] = [];

for (let i = 0; i < 5; i++) {
    posts.push({
        title: faker.word.adjective(),
        creator: user.username,
        createdAt: faker.date.past(),
        imageUrl
    })
}


export {posts};



const comments:any[]  = [];

for(let i = 0; i < 5; i++){
    comments.push({
        text:faker.animal.bear(),
        username:faker.internet.userName(),
        postId:"abc",
        commentAt:faker.date.past(),
    });
}
export {comments}