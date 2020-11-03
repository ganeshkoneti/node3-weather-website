const express = require(`express`);
const path = require(`path`);
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))


const app = express()
const port=process.env.PORT || 3007

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {

    res.render('index', {

        title: 'Weather Application',
        name: 'Ganesh Koneti'
    })

})


app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About me',
        name: 'Ganesh koneti'
    })

})


app.get('/help', (req, res) => {

    res.render('help', {

        title: 'Help',
        name: 'Ganesh koneti'
    })

})

app.get('/weather', (req, res) => {

    if(!req.query.address){

        return res.send({
            error:'address must be provided'
        })
    }


    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{


        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{

            if(error){
                return res.send({error})
            }
            res.send({

                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })


    // res.send( {

    //     forecast: 'Hey its sunny!!',
    //     address: req.query.address
    // })

})



app.get('/help/*',(req,res)=>{

    res.render('404',{
        title:'404',
        name:'ganesh',
        errorMessage:'help article not found.'
    })
    
    })
    

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'ganesh',
        errorMessage:'page not found.'
    })
    

})











/*app.get(``,(req,res)=>{

    res.send(`hello express..`)
})

app.get(`/help`,(req,res)=>{

    res.send(`help page`)
})
app.get(`/about`,(req,res)=>{
res.send(`this is smething related to about page`)

})

app.get(`/weather`,(req,res)=>{

    res.send(`this is weather route`)
})
*/



app.listen(port, () => {
    console.log(`server is up on port `+port)
})
//app.com
//app.com/about
//app.com/help






