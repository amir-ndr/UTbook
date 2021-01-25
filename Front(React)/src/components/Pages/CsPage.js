import React from 'react';
import Genre from '../Genre/Genre';
import ReturnBook from '../ReturnBook/ReturnBook';
import './CsPage.css';

class CsPage extends React.Component{
    constructor(){
        super ();
        this.state = {
            genre:'',
            state_books : [],
            return_book : [],
        }
    }

    componentDidMount(){
        this.genres();
    }

    genres = ()=>{
        fetch('http://localhost:3001/returnGenre')
        .then(response=>response.json())
        .then(books=>{
            var books_array = books.split('\n');
            this.setState({state_books:books_array});
        })
    }

    onSubmit = (e)=>{
        this.setState({genre:e.target.textContent})
        fetch('http://localhost:3001/returnBooks',{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                dars:e.target.textContent,
            })
        })
        .then(response=>response.json())
        .then(book=>{
            this.setState({
                return_book: book
            })
        })
    }

    render(){
        var show_genre=[];
        for(var i=0;i<this.state.state_books.length-1;i++){
            show_genre.push (<Genre key={i}  onSubmit={this.onSubmit} bookName={this.state.state_books[i]} />)
        }

        var show_books=[];
        for(var i=0;i<this.state.return_book.length;i++){
            show_books.push(<ReturnBook key={i} information={this.state.return_book[i]} />);
        }
        return(
            <div className="App">
                <div className="GenreShow">
                    {show_genre}
                </div>
                <div style={{'marginTop':'30px'}}>
                    <div className="card bg-dark text-white">
                        {this.state.genre}
                    </div>
                    <div className="Book">
                        {show_books}
                    </div>
                </div>
            </div>
        )
    }
}

export default CsPage;