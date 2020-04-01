//Importação dos modulos

const express = require("express")
const server = express()
const db = require("./db")

//configurar arquivos estáticos (css, javascript, imagens)

server.use(express.static("public"))
    
//habilita o uso do req.body

server.use(express.urlencoded({extended: true}))
    

//configuração do nunjucks

const nunjucks= require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true,
})


//Criação de rota para mandar pros arquivos HTML

server.get("/", function(req,res){

    db.all("SELECT * FROM ideias", function(err,rows){

        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        const reversedIdeias = [... rows].reverse()
    
        let LastIdeias = []
        for(let ideia of reversedIdeias){
            if(LastIdeias.length < 3){
                LastIdeias.push(ideia)
                
            }
    
        }
        
        
    
        return res.render("index.html", {ideias: LastIdeias})
    })
    
    
})

server.get("/ideias", function(req,res){
 
    db.all("SELECT * FROM ideias", function(err,rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }
        
        const reversedIdeias = [... rows].reverse()
    
        return res.render("ideias.html", { ideias: reversedIdeias})


    })
    
    
    
  
})


server.post("/" , function(req,res){
    //Inserir dado na tabela
     const query = `
        INSERT INTO ideias(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
`

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
]    
    
    db.run(query,values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados!")
        }

        return res.redirect("/ideias")
    } )
})


server.listen(3000)