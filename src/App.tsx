import { Header, Layout } from './components/layout';
import { ColorsPanel } from './components/colorsPanel';
import { UploadPanel } from './components/uploadPanel';

import './App.css';

const App: React.FC = () => {
    return (
        <Layout>
            <Header />
            <main className='app__body'>
                <main className="app__main-panel">
                    <UploadPanel />
                    <ColorsPanel />
                </main>
            </main>
        </Layout>
    )
}

export default App;
