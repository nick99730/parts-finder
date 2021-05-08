import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import TextFinder from "./components/TextFinder";
import ImageFinder from "./components/ImageFinder/ImageFinder";

function App() {
    const sellers = ['first seller', 'second seller', 'third seller'];
    return (
        <React.Fragment>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Header/>
                    </header>
                </div>

                <Route exact path="/">
                    <Redirect to="/text_finder"/>
                </Route>
                <Route path='/text_finder' render={() => <TextFinder sellers={sellers}/>}/>
                <Route path='/image_finder' render={() => <ImageFinder sellers={sellers}/>}/>
            </Router>
        </React.Fragment>
    );
}

export default App;
