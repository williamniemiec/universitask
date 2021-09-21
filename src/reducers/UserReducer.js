const initialState = {
  name: '',
  categories: [{
    id: -1,
    name: '',
    color: ''
  }],
  tasks: [{
    id: -1,
    name: '',
    category: -1,
    begin: 0,
    end: 0,
    done: false
  }]  
};

export default (state=initialState, action) => {
  switch(action.type) {
    case 'SET_NAME':
      return { ...initialState, name: action.payload.name };
    case 'INSERT_TASK':
      return state;
    case 'UPDATE_TASK':
      return state;
    case 'REMOVE_TASK':
      return state;
    case 'INSERT_CATEGORY':
      return state;
    case 'UPDATE_CATEGORY':
      return state;
    case 'REMOVE_CATEGORY':
      return state;
    case 'RESET_TASKS_MONTH':
      return state;
    case 'RESET_TASKS_YEAR':
      return state;
    case 'RESET':
      return state;
  }

  return state;
};
