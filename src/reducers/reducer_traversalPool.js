import update from 'immutability-helper';
import jsonld from 'jsonld'

const REGISTER_TRAVERSAL = "REGISTER_TRAVERSAL";
const RUN_TRAVERSAL = "RUN_TRAVERSAL"
const TRAVERSAL_FAILED = "TRAVERSAL_FAILED";
const TRAVERSAL_UNNECCESSARY = "TRAVERSAL_UNNECCESSARY";
const FETCH_GRAPH_DOCUMENT = "FETCH_GRAPH_DOCUMENT";

const INIT_STATE = { 
  running: 0,
  pool: {} 
}
 
export default function (state = INIT_STATE, action) { 
  const payload = action.payload;
  switch (action.type) { 
    case REGISTER_TRAVERSAL: 
      return update(state, { 
        pool: { 
          $merge:  {
            [payload.docUri]: payload.params
          }
        }
      });
    case RUN_TRAVERSAL:
      if(payload.docUri in state.pool) { 
        return update(state, { 
          pool: { 
            $unset: [payload.docUri]
          },
          running: { 
            $set: state.running + 1
          }
        })
      } else { 
        console.log("WARNING: Traversal on document not included in traversal pool!", payload.docUri)
      }
      break;
		case TRAVERSAL_FAILED:
		case TRAVERSAL_UNNECCESSARY:
    case FETCH_GRAPH_DOCUMENT:
      // new graph fragment has arrived, i.e. a traversal hop has completed
      return update(state, { 
        running: { 
          $set: state.running - 1
        }
      })
    default:
      return state;
  }
}
