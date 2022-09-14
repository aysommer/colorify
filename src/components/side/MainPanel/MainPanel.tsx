import React, { useContext } from 'react';
import UploadPanel from '../UploadPanel/UploadPanel';
import ColorsPanel from '../ColorsPanel/ColorsPanel';
import { AppContext } from '../../../store';

import './MainPanel.css';

const MainPanel: React.FC = () => {
    const { state, dispatch } = useContext(AppContext);

    return (
        <main className="main-panel">
            <UploadPanel image={state.image} dispatch={dispatch} />
            {
                (state.image) ? <ColorsPanel colors={state.colors} /> : null
            }
        </main>
    )
}

export default MainPanel;
