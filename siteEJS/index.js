const express = require("express")
const app = express()
const path = require("path")
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"/public")))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/",(req,res)=>{
    res.redirect("UnderConstruction")
})

app.get("/UnderConstruction",(req,res)=>{
    data = {top10:[{img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
    {img:"https://via.placeholder.com/260x400", title:"Title Placeholder", discreption:"asdfjh asdj hfalsdh fjhadslfh aljsdhfald fa"},
]}
    res.render("UnderConstruction",data)
})
app.get("/UnderConstruction/searchproducts",(req,res)=>{
    data = {books:[{title:"title placeholder",img:"https://via.placeholder.com/260x400",rating:4}]}
    console.log("searching")
    res.render("Search",data)
})

// app.get("/UnderConstruction/searchproducts/:id",(req,res)=>{
//     console.log(req.params)
// })

// app.post("/UnderConstruction/searchproducts/:id",(req,res)=>{
//     res.render(req.body)
// })

app.listen(3000,()=>{
    console.log("listening")
})