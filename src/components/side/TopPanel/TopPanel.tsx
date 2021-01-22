import React from 'react';

import './TopPanel.scss';

const TopPanel: React.FC = () => (
    <nav className="top-panel">
        <div className="top-panel__wrapper">
            <header className="top-panel__project-name">
                colorify
            </header>
        </div>
    </nav>
)

export default React.memo(TopPanel);
