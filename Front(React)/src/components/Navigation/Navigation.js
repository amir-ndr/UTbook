import React from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

const Navigation = ()=>{
    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">UT-Book</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className=" ff navbar-nav me-auto mb-2 mb-lg-0 ">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/admin">صفحه ادمین</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle cc" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                دانشکده
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item q" to="/CS">ریاضی و علوم کامپیوتر</Link></li>
                                <li><Link className="dropdown-item q" to="/LAW">حقوق</Link></li>
                            </ul>
                        </li>
                    </ul>
                    {/* <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">جستجو</button>
                    </form> */}
                </div>
            </div>
        </nav>
    )
}

export default Navigation ;


