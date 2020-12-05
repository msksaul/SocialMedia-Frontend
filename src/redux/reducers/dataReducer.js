import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, SET_SCREAM, DELETE_SCREAM, POST_SCREAM } from '../types'

const initialState = {
  screams: [],
  scream: {},
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      }
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      }
    case LIKE_SCREAM:
    case UNLIKE_SCREAM:
      let indexU = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId)
      state.screams[indexU] = action.payload
      if(state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload
      }
      return {
        ...state
      }
    case DELETE_SCREAM:
      let indexL = state.screams.findIndex(scream => scream.screamId === action.payload)
      state.screams.splice(indexL, 1)
      return {
        ...state
      }
    case POST_SCREAM:
      return {
        ...state,
        screams: [
          action.payload,
          ...state.screams
        ]
      }
    default:
      return state
  }
}