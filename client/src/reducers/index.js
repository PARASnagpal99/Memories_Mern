import { combineReducers } from 'redux'
import postsreducer from './posts'

const rootReducer = combineReducers({
     posts : postsreducer , 
  })
  
export default rootReducer ;