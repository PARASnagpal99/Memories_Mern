import jwt  from 'jsonwebtoken'

// suppose i want to like a post 
// Clicks to like button -> auth(middleware) -> next -> like controller 

const auth = async(req , res , next) => {
      try{
        const token = req.headers.authorization.split(" ")[1] ;
        const isCustomAuth = token.length < 500 ;

        let decodedData ;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token , 'test');
            req.userId = decodedData?.id ;
        }else{
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub ;
        }
        next();
      }catch(err){
         console.log(err);
      }
}

export default auth ;