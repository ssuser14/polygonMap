export const addPoint = (point) => ({
    type: 'ADD_POINT',
    payload: point
})

export const removePoint = (point) => ({
    type: 'REMOVE_POINT',
    payload: point
})