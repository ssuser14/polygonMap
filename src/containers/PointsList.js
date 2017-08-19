import React, {Component} from 'react';
import { connect } from 'react-redux';
import { removePoint } from '../actions';
import PointsListItem from '../components/PointsListItem.js'

class PointsList extends Component{

    createItems (items) {
        return items.map((item, indx) => 
            <PointsListItem 
                key={indx} 
                id={`${item.lat}_${item.lng}`} 
                item={item}
                handleRemove={this.props.removePoint}
            />
        );
    }

    render () {
        return (
            <div>
                <h4>Coordinates list</h4>
                <ul className="list-group">
                    {this.createItems(this.props.points)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    points: state.pointsReducer.points
});

const mapDispatchToProps = {
    removePoint
}

export default connect(mapStateToProps, mapDispatchToProps)(PointsList);