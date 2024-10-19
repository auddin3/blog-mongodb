const express = require('express');
const mongodb = require('mongodb');
const db = require('../scripts/database');

const ObjectId = mongodb.ObjectId;
const router = express.Router();

router.get('/', (req, res) => {
    res.redirect('/posts');
});

router.get('/posts', async (req, res) => {
    const posts = await db.getDb().collection('posts').find({}, {
        title: 1,
        summary: 1,
        'author.name': 1,
        _id: 1,
    }).toArray();
    res.render('posts-list', { posts: posts });
});

router.get('/new-post', async (req, res) => {
    const authors = await db.getDb().collection('authors').find().toArray();
    res.render('create-post', { authors: authors });
});

router.post('/posts', async (req, res) => {
    const authorId = new ObjectId(req.body.author);
    const author = await db.getDb().collection('authors').findOne({ _id: authorId });

    const newPost = {
        title: req.body.title,
        summary: req.body.summary,
        body: req.body.content,
        date: new Date(),
        author: {
            _id: authorId,
            name: author.name,
            email: author.email,
        },
    };

    await db.getDb().collection('posts').insertOne(newPost);
    res.redirect('/posts');
});

router.get('/posts/:id', async (req, res) => {
    const postId = new ObjectId(req.params.id);
    const post = await db.getDb().collection('posts').findOne({ _id: postId });

    if (!post) {
        return res.status(404).render('404');
    }

    post.humanReadableDate = post.date.toLocaleDateString('en-UK', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    post.date = post.date.toISOString();
    res.render('post-detail', { post: post });
});

router.post('/posts/:id/delete', async (req, res) => {
    let postId = req.params.id;

    try {
        postId = new ObjectId(postId);
    } catch (error) {
        return res.status(404).render('404');
    }

    await db.getDb().collection('posts').deleteOne({ _id: postId });
    res.redirect('/posts');
});

router.get('/posts/:id/edit', async (req, res) => {
    let postId = req.params.id;

    try {
        postId = new ObjectId(postId);
    } catch (error) {
        return res.status(404).render('404');
    }

    const post = await db.getDb().collection('posts').findOne({ _id: postId }, { title: 1, summary: 1, body: 1 });

    if (!post) {
        return res.status(404).render('404');
    }

    res.render('update-post', { post: post });
});

router.post('/posts/:id/edit', async (req, res) => {
    let postId = req.params.id;

    try {
        postId = new ObjectId(postId);
    } catch (error) {
        return res.status(404).render('404');
    }

    await db.getDb().collection('posts').updateOne({ _id: postId }, {
        $set: {
            title: req.body.title,
            summary: req.body.summary,
            body: req.body.content,
        },
    });

    res.redirect('/posts');
});

module.exports = router;