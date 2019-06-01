const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

const logMiddleware = (req, res, next) => {
  console.log(`URL ${req.url} | Methodo: ${req.method}`)
  req.appName = 'GoStack Modulo1, '
  next()
}

app.use(logMiddleware)
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'njk')

const objUsers = [{ nome: 'Alisson', idade: 27 }, { nome: 'Andryw', idade: 30 }]

// const objUsers = ['Alisson','Andryw','Sergio','Anderson'];

app.get('/', (req, res) => {
  // app.get('/:name',(req,res)=>{
  // console.log('Path default nome: ' + req.params.name);
  console.log('Path default nome: ' + req.query.name)
  // return res.json({pathName:'default', data: new Date()})
  return res.render('list', {
    appName: req.appName,
    message: 'Bem Vindo ao ',
    users: objUsers
  })
})

app.get('/newUser', (req, res) => {
  console.log('Path newUser')
  // return res.json({pathName:'newUser', data: new Date()})
  return res.render('new')
})

app.post('/createUser', (req, res) => {
  console.log('Path createUser')
  objUsers.push(req.body)
  console.log(req.body)
  // return res.json({pathName:'createUser', data: new Date()})
  return res.redirect('/')
})

app.listen(3002)
