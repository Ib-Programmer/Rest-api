const express = require('express')
const app = express()
const port = 3000
// parse JSON using express
app.use(express.json())
app.use(express.urlencoded({ extended:false}))
let movies = [{
   id:"1",
   title: "Sai watarana",
   director:"Aminu Saira",
   release_date: "2014"   
},
{
    id:"2",
    title: "Jamilu da Jamila",
    director:"Hassan Giggs",
    release_date: "2013"   
 },
]
// get the movie list in the from of json
app.get('/', (req,res) =>{
    res.json(movies)
})
//add a movie to the movie list 
app.post('/movies', (req,res) =>{
    const movie = req.body
    console.log('movie')
    movies.push(movie)
    res.send('Movie is added to te movie list')


})
// search a movie from the movies using id 
app.get('/movie/:id', (req,res) =>{
    const id = req.params.id
    for(let movie of movies){
        if(movie.id === id){
            res.json(movie)
            return
        }
    }
    res.status(404).send("Movie not found") 
})
// delete a movie 
app.delete("/movie/:id", (req,res) =>{
    const id = req.params.id
    movies = movies.filter(movie =>{
        if(movie.id !== id){
            return true
        }
        return false
    })
    res.send("movie is deleted in the movie list")
})
// set the severvto listen in port on 3000
app.listen(port, ()=> console.log("The server is running successfull"))
