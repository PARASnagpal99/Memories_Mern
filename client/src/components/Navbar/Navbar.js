import React , {useState,useEffect} from 'react'
import { Link , useNavigate , useLocation } from "react-router-dom";
import { AppBar , Toolbar, Typography , Avatar , Button} from '@material-ui/core'
import useStyles from './styles';
import { useDispatch } from "react-redux";
import memories from '../../images/memories.png'
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const classes  = useStyles() ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() ;
  const location = useLocation() ;
  const [user,setUser] =  useState(JSON.parse(localStorage.getItem('profile')));
  //console.log(user);

  const logout =()=>{
    dispatch({type : 'LOGOUT'});
    navigate('/');
    setUser(null);
  }
     
  useEffect(() => {
    const token = user?.token ;
    // JWT ...
    if(token){
      const decodedToken = jwtDecode(token);
      if(decodedToken.exp * 100 < new Date().getTime()) logout() ;
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location])
  
  return (
<AppBar className={classes.appBar} position="static" color="inherit">
    <div className={classes.brandContainer}>
    <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
    <img className={classes.image} src={memories} alt="icon" height="60" />
    </div>
    <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>



</AppBar>
  )
}

export default Navbar