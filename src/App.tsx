import { useReducer } from 'react';
import { MainPanel, UploadPanel } from './components/side';
import { Body, Header, Layout } from './components/layout';
import { reducer, initialState, AppContext } from './store';
import { ColorsPanel } from './components/colorsPanel';

import './App.css';

const App: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <Layout>
                <Header />
                <Body>
                    <MainPanel>
                        <UploadPanel />
                        {
                            (state.image) ? <ColorsPanel colors={state.colors} /> : null
                        }
                    </MainPanel>
                </Body>
            </Layout>
        </AppContext.Provider>
    )
}

export default App;
