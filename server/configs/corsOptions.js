const allowOrigins = ['http://localhost:5173/']

const corsOptions  = {
    orgin: (origin,callback) => {
        console.log('Origin',origin);
        if(allowOrigins.includes(origin)){
            callback(null,true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    method: ['GE','PATCH','POST','DELETE'],
    allowedHeader: ['Content-Type',"Authorization"],
    Credential:true
}

export default corsOptions

    
