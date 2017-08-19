const pointsReducer = (state = {
    points: [
          {lat: 25.774, lng: -80.190},
          {lat: 18.466, lng: -66.118},
          {lat: 32.321, lng: -64.757},
      ]
}, action) => {
    switch(action.type){
        case 'ADD_POINT':
            let points = [...state.points, action.payload];
            return {points};
        case 'REMOVE_POINT':
            points = state.points.filter(p => `${p.lat}_${p.lng}` !== action.payload);
            return {points};
        default: 
            return state;
    }
}

export default pointsReducer;
