import React , {useState} from 'react'
import {Avatar  , Paper , Grid , Typography , Container} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './input'
const Auth = () => {
  const classes = useStyles() ;
  const isSignup = false ;
  const [showPassword , setShowPassword] = useState(false);
  const handleShowPassword =()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword)
  }
  const handleSubmit = ()=>{

  };
 
  const handleChange =()=>{
        
  };


  return (
    <Container component="main" maxWidth="xs">
       <Paper className={classes.paper} elevation={3}>
              <Avatar className={classes.avatar}>
                   <LockOutlinedIcon/>
              </Avatar>
              <Typography variant='h5'>
                {isSignup ? 'Sign Up' : 'Sign In'}
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                     {
                        isSignup && (
                          <>
                            <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus/>
                            <Input name='firstName' label="First Name" handleChange={handleChange} half/>
                          </>
                        )
                     }
                    <Input name='email' label="Email Address" handleChange={handleChange} type="email"/>
                    <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                  </Grid>
              </form>
       </Paper>
    </Container>
  )
}

export default Auth