import React from 'react';
import '../Pages/CsPage.css';

class ReturnBook extends React.Component{
    constructor(props){
        super (props);
    }

    render(){
        return(
            <div>
                <div className="card" style={{'width': '18rem'}}>
                    <div className="card-body box">
                        <h5 className="card-title card bg-warning">{this.props.information.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">نویسنده: {this.props.information.writer}</h6>
                        <hr></hr>
                        <p className="card-text">{this.props.information.description}</p>
                        <a href="#" style={{'textDecoration':'none'}} className="card bg-danger text-white">دانلود کتاب</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReturnBook;