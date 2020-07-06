interface ActionTypes {
  [scope: string]: {
    reducer: Record<string, string>;
    saga: Record<string, string>;
  }
}

let uniqueIndex = 0;

function uniqueActionTypes<T extends ActionTypes>(actionTypes: T): T {
  const index = uniqueIndex++;
  
  for(const scope in actionTypes) {
    for(const reducer in actionTypes[scope].reducer) {
      actionTypes[scope].reducer[reducer] = [scope, 'R', reducer, index].join('_');
    }

    for(const saga in actionTypes[scope].saga) {
      actionTypes[scope].saga[saga] = [scope, 'S', saga, index].join('_');
    }
  }

  return actionTypes;
}

export default uniqueActionTypes;
