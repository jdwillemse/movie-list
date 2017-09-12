// import { GET, SUCCESS, FAIL } from '../types/firebase';

// const initialState = {
//   loading: false,
//   error: '',
//   payload: {},
// };

// export default function reducer (state = initialState, action) {
//   console.log(action);
//   switch (action.type) {
//     // case SET:
//     //   return {
//     //     ...state,
//     //     ...action.payload,
//     //   };

//     case GET:
//       return {
//         ...state,
//         loading: true,
//         error: '',
//       };

//     case SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: '',
//         payload: action.payload,
//       };

//     case FAIL:
//       return {
//         ...state,
//         loading: false,
//         error: action.error,
//       };

//     // case RESET:
//     //   return {
//     //     ...initialState
//     //   }

//     default:
//       return state;
//   }
// }
