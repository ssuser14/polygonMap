import React, {Component} from 'react';
import { connect } from 'react-redux';
import { addPoint } from '../actions';

class CordInput extends Component{
    constructor(props){
        super(props);
        this.state = {
            latVal: '32.321',
            lngVal: '-80.757',
            currStatus: 'cords',
            placeVal: ''
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onStatusChange = this.onStatusChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        if(this.state.currStatus === 'place'){
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.placeVal}&key=AIzaSyCt_f62xnUudkGEFHC7UgShw58cYlVXf24`)
                .then(res => res.json())
                .then(res => {
                    let point = res.results[0].geometry.location;
                    this.props.addPoint(point);
                })
        } else {
            let point = {
                lat: +this.state.latVal,
                lng: +this.state.lngVal,
            }
            this.props.addPoint(point);
        }
        this.setState({
            latVal: '',
            lngVal: '',
            placeVal: ''
        });
    }
    onInputChange(){
        if(this.state.currStatus === 'cords')
            this.setState({
                latVal: this.refs.latVal.value,
                lngVal: this.refs.lngVal.value,
            })
        else
            this.setState({placeVal: this.refs.placeVal.value})
    }
    onStatusChange(){
        let currStatus = this.state.currStatus === 'cords' ? 'place' : 'cords'
        this.setState({
            currStatus,
            latVal: '',
            lngVal: '',
            placeVal: ''
        })
    }
    render () {
        const formToRender = () =>{
            if(this.state.currStatus === 'cords'){
                return (
                      <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Enter lat"
                            className="form-control"
                            ref="latVal"
                            value={this.state.latVal}
                            onChange={this.onInputChange}
                        />
                        <input 
                            type="text" 
                            placeholder="Enter lng" 
                            className="form-control"
                            ref="lngVal"
                            value={this.state.lngVal}
                            onChange={this.onInputChange}
                        />
                        
                    </div>)
            } else {
                return (
                    <div className="form-group">
                        <input 
                            type="text"
                            placeholder="Enter place"
                            className="form-control"
                            ref="placeVal"
                            value={this.state.placeVal}
                            onChange={this.onInputChange}
                        />
                    </div>
                )
            }
        }
        return (
            <div>
                <h4>Coordinates Form</h4>
                <div>
                    <div>
                        <input 
                            type="radio" 
                            ref="latVal"
                            checked={this.state.currStatus === 'cords'}
                            onChange={this.onStatusChange}
                        />
                        <span>Add by Cords</span>
                    </div>
                    <div>
                        <input 
                            type="radio" 
                            ref="latVal"
                            checked={this.state.currStatus === 'place'}
                            onChange={this.onStatusChange}
                        />
                        <span>Add by Place</span>
                    </div>
                </div>
                <form onSubmit={this.onFormSubmit}>
                    {formToRender()}
                    <input 
                        className="btn btn-primary"
                        type="submit" 
                        value="Submit Coords"
                    />
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    addPoint
}

export default connect(mapStateToProps, mapDispatchToProps)(CordInput);