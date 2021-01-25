import React from 'react';
import './SendBookPage.css';
import { getElementError } from '@testing-library/react';

class SendBookPage extends React.Component{
    constructor(){
        super();
        this.state = {
            name:'',
            genre:'',
            college:'',
            writer:'',
            description: '',
            file: null,
        }
    }

    componentDidMount(){
        this.genreOption();
    }


    onNameChange = (e)=>{
        this.setState({name:e.target.value})
    }
    onGenreChange = (e)=>{
        this.setState({genre:e.target.value})
    }
    onCollegeChange = (e)=>{
        this.setState({college:e.target.value})
    }
    onWriterChange = (e)=>{
        this.setState({writer:e.target.value})
    }
    onDescriptionChange = (e)=>{
        this.setState({description:e.target.value})
    }
    onFileChange = (e)=>{
        this.setState({file : e.target.files[0] })
    }


    onSubmit = ()=>{
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.file,
            this.state.file.name,
        );
        fetch('http://localhost:3001/captureBook' , {
            method:'post',
            // headers: {'Content-Type': 'multipart/form-data'},
            body: formData,
        })
        .then(response =>{
            fetch('http://localhost:3001/captureBook2' , {
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    writer:this.state.writer,
                    college:this.state.college,
                    description:this.state.description,
                    genre:this.state.genre,
                    name:this.state.name,
                }),
            })
            .then(response =>response.json())
        })
    }

   genreOption = ()=>{
    fetch('http://localhost:3001/returnGenre')
        .then(response=>response.json())
        .then(books=>{
            const gg = document.getElementById('genre');
            var books_array = books.split('\n');
            for(var i=0;i<books_array.length-1;i++){
                var node = document.createElement('option');
                node.text=books_array[i];
                gg.appendChild(node);
            }
        })
   }



    render(){
        return(
            <section className="my-5">
                <div style={{justifyContent:'center'}} className="row">
                    <div className="col-lg-5 mb-lg-0 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-header blue accent-1">
                                    <h3 style={{color:'red'}} className="mt-2"><i className="fas fa-envelope"></i> ارسال کتاب</h3>
                                </div>
                                <div class="md-form">
                                    <i className="fas fa-user prefix grey-text" ></i>
                                    <label htmlFor="form-name">نام کتاب</label>
                                    <input  onChange={this.onNameChange} type="text" id="form-name" className="form-control" />
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-envelope prefix grey-text" ></i>
                                    <label htmlFor="form-email">واحد درسی</label>
                                    <input list="genre" onChange={this.onGenreChange} type="text" id="form-email" className="form-control" />
                                    <datalist id="genre"></datalist>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-envelope prefix grey-text" ></i>
                                    <label htmlFor="form-email">دانشکده</label>
                                    <select onChange={this.onCollegeChange} type="text" id="form-email" className="form-control" >
                                        <option value="cs">cs</option>
                                        <option value="law">law</option>
                                    </select>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-tag prefix grey-text" ></i>
                                    <label htmlFor="form-Subject">نویسنده</label>
                                    <input onChange={this.onWriterChange} type="text" id="form-Subject" className="form-control" />
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-pencil-alt prefix grey-text" ></i>
                                    <label htmlFor="form-text">توضیحات</label>
                                    <textarea onChange={this.onDescriptionChange} id="form-text" className="form-control md-textarea" rows="3"></textarea>
                                </div>
                                <div className="md-form">
                                    <i className="fas fa-tag prefix grey-text" ></i>
                                    <label htmlFor="form-Subject">انتخاب کتاب</label>
                                    <input onChange={this.onFileChange}  type="file" id="inputFile" className="form-control" />
                                </div>
                                <div className="text-center">
                                    <button onClick={this.onSubmit} className="btn btn-success">ثبت کتاب</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default SendBookPage;