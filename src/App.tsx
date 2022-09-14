import React, { useReducer } from 'react';
import { TopPanel, MainPanel } from './components/side';
import { reducer, initialState, AppContext } from './store';

import './App.css';

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <main className='app'>
                <TopPanel />
                <MainPanel />
            </main>
        </AppContext.Provider>
    )
}

export default App;
