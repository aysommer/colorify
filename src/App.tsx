import { useReducer } from 'react';
import { UploadPanel } from './components/uploadPanel';
import { Header, Layout } from './components/layout';
import { reducer, initialState, AppContext } from './store';
import { ColorsPanel } from './components/colorsPanel';

import './App.css';

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Layout>
                <Header />
                <main className='app__body'>
                    <main className="app__main-panel">
                        <UploadPanel />
                        {
                            (state.image) ? <ColorsPanel colors={state.colors} /> : null
                        }
                    </main>
                </main>
            </Layout>
        </AppContext.Provider>
    )
}

export default App;
