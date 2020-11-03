
const request= require(`request`);

const geocode=(address,callback)=>{
    const url=`https://api.mapbox.com/geocoding/v5/mapbox.places/`+ encodeURIComponent(address)+`.json?access_token=pk.eyJ1IjoiZ2FuZXNoa29uIiwiYSI6ImNrZ24yc25wNzBxMWMycXJ4YTJkdTI0ZGcifQ.ccpEoDe0YZL4gXs26OxjKQ&limit=1`
    
     request({url:url,json:true},(error,response)=>{
         if(error){
             callback(`unable to connect to location services`,undefined)
         }
         else if(response.body.features.length===0){
             callback(`unable to find location,try another search`,undefined)
         }
         else{
             callback(undefined,{
                 latitude:response.body.features[0].center[1],
                 longitutde:response.body.features[0].center[0],
                 location:response.body.features[0].place_name
             })
         }
  
     })
  
  }
//   geocode(`5t5t`,(error,data)=>{
  
//       console.log(`error`,error)
  
//       console.log(`data`,data)
//   }
//   )

module.exports=geocode
