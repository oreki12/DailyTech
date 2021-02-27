const mongoose = require('mongoose');
const Blogs = require('./models/Blogs')

mongoose.connect('mongodb://localhost:27017/DailyTech', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log("MONGO CONNECTION OPEN!!");
})
.catch(err => {
    console.log("MONGO CONNECTION Error...");
    console.log(err);
})

const seedBlogs = [
    {
        title: 'Global worming',
        author:"Ritesh",
        image: 'https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        content: "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere."
    },
    {
        title: 'Global worming',
        author:"Ritesh",
        image: 'https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        content: "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere."
    },
    {
        title: "Global worming",
        author:"Ritesh",
        image: 'https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        content: "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere."
    },
    {
        title: 'Global worming',
        author:"Ritesh",
        image: 'https://images.unsplash.com/photo-1518704618243-b719e5d5f2b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
        content: "Global warming is the long-term heating of Earth's climate system observed since the pre-industrial period (between 1850 and 1900) due to human activities, primarily fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth's atmosphere."
    }

]


Blogs.insertMany(seedBlogs)
.then(res => {
    console.log(res);
})
.catch(e => {
    console.log(e);
})