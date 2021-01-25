import React from 'react';
import '../Pages/CsPage.css';

class Genre extends React.Component{
    constructor(props){
        super (props);
    }

    render(){
        return(
            <div className="card bg-primary text-white">
                <div style={{cursor:'pointer'}}  onClick={this.props.onSubmit} className="card-body shit">{this.props.bookName}</div>
            </div>
        )
    }
}

export default Genre;