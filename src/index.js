import React from 'react';
import {StatusBar} from 'react-native';
import './config/reactotronConfig';
import Routes from './routes';

const App: () => React$Node = () => {
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
            <Routes />
        </>
    );
};

export default App;
