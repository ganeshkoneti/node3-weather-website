
const request=require(`request`);
const forecast=(latitude,longitude,callback)=>{

    const url=`http://api.weatherstack.com/current?access_key=ae28585e1ebda0dda4f17c3fa50f9281&query=`+ latitude +`,`+ longitude +`&units=f`

     request({url:url,json:true},(error,response)=>
     {
         if(error){
   callback(`unable to conncet to weather service!!`,undefined)
         }
         else if(response.body.error){
callback(`unable to find location ,try another`,undefined)
         }
         else{
             callback(undefined,response.body.current.weather_descriptions[0]+`.It is currently `+response.body.current.temperature+ ` degrees out.It feels like `+response.body.current.feelslike+` degrees.The humidity is ` +response.body.current.humidity+"%.")

         }
     })
}
module.exports=forecast;