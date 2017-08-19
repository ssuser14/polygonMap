import React, {Component} from 'react';
import { connect } from 'react-redux';

class MapContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            map: undefined,
            bermudaTriangle: undefined,
            markers: []
        }
    }
    componentWillReceiveProps(nextProps) {
        let points = nextProps.points;
        let newMarkers = this.updateMarkers(points);
        this.setState({markers: newMarkers}, () =>{
            let bounds = new window.google.maps.LatLngBounds(); //Zoom map to fit all markers
            newMarkers.forEach(m => bounds.extend(m.marker.getPosition()))
            this.state.map.fitBounds(bounds);
        });
        this.state.bermudaTriangle.setOptions({paths: points});
        this.state.bermudaTriangle.setMap(this.state.map);
    }
    componentDidMount(){
        let map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 5,
            center: {lat: 24.886, lng: -70.268},
            mapTypeId: 'terrain'
        });

        // Construct the polygon.
        let bermudaTriangle = new window.google.maps.Polygon({
            paths: this.props.points,
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

        let markers = this.createMarkers(map, this.props.points);

        this.setState({
            map,
            bermudaTriangle,
            markers
        }, () => {
            this.state.bermudaTriangle.setMap(this.state.map);
        });
    }
    createMarkers(map, points){
        return points.map(p => {
            return {
                marker: new window.google.maps.Marker({
                            position: {lat: p.lat, lng: p.lng},
                            map,
                            title: `${p.lat}_${p.lng}`
                        }),
                id: `${p.lat}_${p.lng}`
            }
        })
    }
    updateMarkers(points){
         let markersIds = {};
         this.state.markers.forEach((m) => {
             markersIds[m.id] = false;
         });
         let newMarkers = points.reduce((filteredP, p) => {
             let id = `${p.lat}_${p.lng}`;
             if(!markersIds.hasOwnProperty(id)){
                 let marker = new window.google.maps.Marker({
                                position: {lat: p.lat, lng: p.lng},
                                map: this.state.map,
                                title: id
                            });
                 filteredP.push({marker, id});
             } else {
                 markersIds[id] = true;
             }
             return filteredP;
         }, []);
         let oldMarkers = this.state.markers.filter(m => {
             if(markersIds[m.id]) return m;
             else m.marker.setMap(null)
             return false;
         });
         let arr = newMarkers.concat(oldMarkers);
         return arr;

    }
    render() {
        return (
            <div id="map" className="map">     
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    points: state.pointsReducer.points
});

export default connect(mapStateToProps)(MapContainer);