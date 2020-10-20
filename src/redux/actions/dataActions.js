import { SET_SCREAMS, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM } from '../types'
import axios from 'axios'
import { baseUrl } from '../../util/baseUrl'

export const getScreams = () => dispatch => {
  dispatch({ type: LOADING_DATA })
  axios.get(baseUrl + '/screams')
    .then(res => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SET_SCREAMS,
        payload: []
      })
    })
}

export const likeScream = (screamId) => dispatch => {
  axios.get(baseUrl + `/scream/${screamId}/like`)
    .then(res => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err)) 
}

export const unlikeScream = (screamId) => dispatch => {
  axios.get(baseUrl + `/scream/${screamId}/unlike`)
    .then(res => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data
      })
    })
    .catch(err => console.log(err)) 
} 