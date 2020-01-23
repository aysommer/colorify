import React from 'react';
import UploadPanel from '../UploadPanel/UploadPanel';
import ColorsPanel from '../ColorsPanel/ColorsPanel';

import { useSelector } from 'react-redux';

import './MainPanel.scss';
import ColorsStub from '../ColorsStub/ColorsStub';

const MainPanel: React.FC = () => {
    const { image, colors } = useSelector((state: any) => state.app);

    return <main className="main-panel">
        <UploadPanel image={image}/>
        {
            (image) && <ColorsPanel colors={colors}/>
        }
    </main>
}

export default MainPanel;
