import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import TextFinder from "./components/TextFinder";
import ImageFinder from "./components/ImageFinder/ImageFinder";

function App() {
    const server = "https://409731e86f82.ngrok.io";
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
                <Route path='/text_finder' render={() => <TextFinder server={server}/>}/>
                <Route path='/image_finder' render={() => <ImageFinder server={server}/>}/>
            </Router>
        </React.Fragment>
    );
}

export default App;
