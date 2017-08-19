import React, {Component} from 'react';

class PointsListItem extends Component{
    constructor(props){
        super(props);
        this.state = {
            formatted_address: ''
        }
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount(){
        this.getAdress();
    }

    getAdress(){
        if(this.props.item.lat && this.props.item.lng)
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.item.lat},${this.props.item.lng}&key=AIzaSyCt_f62xnUudkGEFHC7UgShw58cYlVXf24`)
            .then(res => res.json())
            .then(res => {
                if(res.results.length > 0)
                    this.setState({formatted_address: res.results[0].formatted_address })
            })
    }

    handleRemove(){
        this.props.handleRemove(this.props.id)
    }
    // formatted_address
    render () {
        return (
            <li className="list-group-item">
                <div className="point-data">
                    <span>{this.state.formatted_address}</span>
                    <span>
                        {this.props.item.lat}, {this.props.item.lng}
                    </span>
                </div>
                &nbsp;
                <button className="btn btn-danger" onClick={this.handleRemove}>X</button>
            </li>
        )
    }
}

export default PointsListItem;