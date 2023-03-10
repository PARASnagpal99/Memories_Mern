import React , {useEffect , useState} from 'react'
import {useDispatch} from 'react-redux'
import {Container , Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles'
import { getPosts } from '../../actions/posts';

const Home = () => {
    const dispatch = useDispatch() ;
    const [currentId , setCurrentId] = useState(0);
    const classes = useStyles() ;
  
    useEffect(()=>{
      dispatch(getPosts())
    },[currentId , dispatch])
      
  return (
    <Grow in>
          <Container>
            <Grid className={classes.mainContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
              <Grid item xs={12} sm={7}>
                <Posts setCurrentId={setCurrentId}/>
               </Grid>
              <Grid item xs={12} sm={4}>
                <Form currentId={currentId} setCurrentId={setCurrentId}/>
              </Grid>
            </Grid>
          </Container>
        </Grow>
  )
}

export default Home