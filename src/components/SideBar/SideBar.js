import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import AppContext from '../../context/AppContext';
import TabBar from '../../shared/TabBar';
import ProfileTab from './tabs/Profile';
import ObjectiveTab from './tabs/Objective';
import WorkTab from './tabs/Work';
import EducationTab from './tabs/Education';
import AwardsTab from './tabs/Awards';
import CertificationsTab from './tabs/Certifications';
import SkillsTab from './tabs/Skills';
import ReferencesTab from './tabs/References';
import TemplatesTab from './tabs/Templates';
import ColorsTab from './tabs/Colors';
import FontsTab from './tabs/Fonts';
import ActionsTab from './tabs/Actions';
import AboutTab from './tabs/About';
import SettingsTab from './tabs/Settings';

const Sidebar = () => {
    const { t } = useTranslation('sideBar');

    const context = useContext(AppContext);
    const { state, dispatch } = context;
    const { data, theme, settings } = state;
    
    const tabs = [
        { 
            key: 'basics', 
            name: data.basics.heading 
        },
        { 
            key: 'objective', 
            name: data.objective.heading 
        },
        { 
            key: 'work', 
            name: data.work.heading 
        },
        { 
            key: 'education', 
            name: data.education.heading 
        },
        { 
            key: 'awards', 
            name: data.awards.heading 
        },
        { 
            key: 'certifications', 
            name: data.certifications.heading 
        },
        { 
            key: 'skills', 
            name: data.skills.heading 
        },
        { 
            key: 'references', 
            name: data.references.heading
        },
        {
            key: 'templates',
            name: t('templates.title'),
        },
        {
            key: 'colors',
            name: t('colors.title'),
        },
        {
            key: 'fonts',
            name: t('fonts.title'),
        },
        {
            key: 'actions',
            name: t('actions.title'),
        },
        {
            key: 'settings',
            name: t('settings.title'),
        },
        {
            key: 'about',
            name: t('about.title'),
        },
    ];
    const [currentTab, setCurrentTab] = useState(tabs[0].key);
    const [tabOpen, setTabOpen] = useState(true); 

    const handleChangeTab = (tabName) => {
        if(currentTab === tabName){
            setTabOpen(!tabOpen);
        }else{
            setTabOpen(true);
        }
        setCurrentTab(tabName);
    }

    const onChange = (key, value) => {
        dispatch({
            type: 'on_input',
            payload: {
                key,
                value,
            },
        });

        dispatch({ type: 'save_data' });
    };

    const renderTabs = () => {
        switch (currentTab) {
            case 'basics':
                return <ProfileTab data={data} onChange={onChange} />;
            case 'objective':
                return <ObjectiveTab data={data} onChange={onChange} />;
            case 'work':
                return <WorkTab data={data} onChange={onChange} />;
            case 'education':
                return <EducationTab data={data} onChange={onChange} />;
            case 'awards':
                return <AwardsTab data={data} onChange={onChange} />;
            case 'certifications':
                return <CertificationsTab data={data} onChange={onChange} />;
            case 'skills':
                return <SkillsTab data={data} onChange={onChange} />;
            case 'references':
                return <ReferencesTab data={data} onChange={onChange} />;
            case 'templates':
                return <TemplatesTab theme={theme} onChange={onChange} />;
            case 'colors':
                return <ColorsTab theme={theme} onChange={onChange} />;
            case 'fonts':
                return <FontsTab theme={theme} onChange={onChange} />;
            case 'actions':
                return <ActionsTab data={data} theme={theme} dispatch={dispatch} />;
            case 'settings':
                return <SettingsTab settings={settings} onChange={onChange} />;
            case 'about':
                return <AboutTab />;
            default:
                return null;
        }
    };

    return (
        <div
            id="sideBar"
            className="animated slideInLeft h-screen bg-white shadow-2xl overflow-y-scroll z-20 flex"
        > 
            <TabBar tabs={tabs} currentTab={currentTab} setCurrentTab={handleChangeTab} />
                <div 
                    className="px-6 py-6 h-screen overflow-y-scroll"
                    style={{'width': '320px', 'display': `${tabOpen ? 'block': 'none'}`}}
                >
                    {renderTabs()}
                </div>
        </div>
    );
};

export default Sidebar;
