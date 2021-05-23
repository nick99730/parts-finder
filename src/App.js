import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, {useEffect, useState} from 'react';
import {Route, Redirect, BrowserRouter as Router} from 'react-router-dom'
import Header from "./components/Header";
import TextFinder from "./components/TextFinder";
import ImageFinder from "./components/ImageFinder/ImageFinder";
import Footer from "./components/Footer";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#1976d2' },
    },
}, ruRU);

function App() {
    const server = "https://e52f05b3c213.ngrok.io";
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
            <div className="App">
            <Router>
                    <header className="App-header">
                        <Header/>
                    </header>
                <Route exact path="/">
                    <Redirect to="/text_finder"/>
                </Route>
                <Route path='/text_finder' render={() => <TextFinder server={server}/>}/>
                <Route path='/image_finder' render={() => <ImageFinder server={server}/>}/>
            </Router>
            </div>
            <Footer/>
            </ThemeProvider>

        </React.Fragment>
    );
}

export default App;
