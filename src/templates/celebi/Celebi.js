import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const styles = {
    header: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        color: 'white',
        backgroundColor: '#222',
        height: '160px',
        display: 'flex',
        alignItems: 'center'
    },
    section: {
        marginTop: '167px',
        marginLeft: '20px',
    }
};

const Celebi = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data, theme } = state;

    const { r, g, b } = hexToRgb(theme.colors.accent) || {};

    const Heading = ({ title, className }) => (
        <h5
            className={`my-2 text-md uppercase font-semibold tracking-wider pb-1 border-b-2 border-gray-800 ${className}`}
        >
            {title}
        </h5>
    );

    const Header = () => (
        <header style={styles.header}>
            <div className="text-center">
                <h1 className="tracking-wide uppercase font-semibold" style={{ fontSize: '2.75em' }}>
                    {data.basics.name}
                </h1>
                <h6 className="text-lg tracking-wider uppercase">{data.basics.label}</h6>
            </div>
        </header>
    );

    const Objective = () =>
        data.objective &&
        data.objective.enable && (
            <div className="mb-6">
                <Heading title={data.objective.heading} />
                <ReactMarkdown className="my-3 mr-10 text-sm" source={data.objective.body} />
            </div>
        );

    const ContactItem = ({ label, value }) =>
        value && (
            <div className="mb-3">
                <h6 className="text-xs font-bold">{label}</h6>
                <p className="text-sm">{value}</p>
            </div>
        );

    const Contact = () => (
        <div className="mb-6">
            <Heading title="Contact" className="mt-8 w-3/4 mx-auto" />
            <div className="mb-3">
                <h6 className="text-xs font-bold">Address</h6>
                <p className="text-sm">{data.basics.location.address}</p>
                <p className="text-sm">
                    {data.basics.location.city}
                    {
                        data.basics.location.region ? 
                        `, ${data.basics.location.region}`
                        :
                        ''
                    }
                </p>
            </div>
            <ContactItem label="Phone" value={data.basics.phone} />
            <ContactItem label="Email Address" value={data.basics.email} />
            <ContactItem label="Website" value={data.basics.website} />
        </div>
    );

    const WorkItem = x => (
        <div key={x.id} className="my-3 mr-10">
            <div>
                <h6 className="font-semibold">{x.title}</h6>
                <p className="text-xs text-gray-800">
                    {x.title}{x.location ? ', ' : ''}{x.location} | {x.start} - {x.end}
                </p>
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Work = () =>
        data.work &&
        data.work.enable && (
            <div className="mb-6">
                <Heading title={data.work.heading} />
                {data.work.items.filter(x => x.enable).map(WorkItem)}
            </div>
        );

    const EducationItem = x => (
        <div key={x.id} className="my-3 mr-10">
            <h6 className="font-semibold">{x.name}{x.location ? ', ' : ''}{x.location}</h6>
            <p className="text-xs">{x.major}</p>
            <div className="text-xs">
                {x.start} - {x.end}
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Education = () =>
        data.education &&
        data.education.enable && (
            <div className="mb-6">
                <Heading title={data.education.heading} />
                {data.education.items.filter(x => x.enable).map(EducationItem)}
            </div>
        );

    const Skills = () =>
        data.skills.enable && (
            <div className="mb-6">
                <Heading title="Skills" className="w-3/4 mx-auto" />
                <ul className="list-none text-sm">
                {data.skills.items.map(x => (
                    <li key={x.id} className="my-2">
                    {x.skill}
                    </li>
                ))}
                </ul>
            </div>
        );

    const ReferenceItem = x => (
        <div key={x.id} className="flex flex-col">
            <h6 className="text-sm font-semibold">{x.name}</h6>
            <span className="text-sm">{x.position}</span>
            <span className="text-sm">{x.phone}</span>
            <span className="text-sm">{x.email}</span>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const References = () =>
        data.references &&
        data.references.enable && (
            <div className="mb-6">
                <Heading title={data.references.heading} />
                <div className="grid grid-cols-2 col-gap-4 row-gap-2">
                {data.references.items.filter(x => x.enable).map(ReferenceItem)}
                </div>
            </div>
        );

    const AwardItem = x => (
        <div key={x.id} className="my-2">
            <h6 className="font-semibold">{x.title}</h6>
            <p className="text-xs">{x.subtitle}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Awards = () =>
        data.awards &&
        data.awards.enable && (
            <div className="mb-6">
                <Heading light title={data.awards.heading} />
                {data.awards.items.filter(x => x.enable).map(AwardItem)}
            </div>
        );

    const CertificationItem = x => (
        <div key={x.id} className="my-2">
            <h6 className="font-semibold">{x.title}</h6>
            <p className="text-xs">{x.subtitle}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />     
        </div>
    );

    const Certifications = () =>
        data.certifications &&
        data.certifications.enable && (
            <div className="mb-6">
                <Heading title={data.certifications.heading} className="w-3/4 mx-auto" />
                {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
            </div>
        );

    return (
        <div
        style={{
            fontFamily: theme.font.family,
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
            minHeight: '29.7cm'
        }}
        >
            <div className="grid grid-cols-12"
                style={{'minHeight': 'inherit'}}
            >
                <div
                    className="sidebar col-span-4 pb-8 ml-8 z-10 text-center"
                    style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)`, marginTop: '160px' }}
                >
                    <Contact />
                    <Skills />
                    <Certifications />
                </div>
                
                <div className="col-span-8">
                    <Header />
                    
                    <section className="py-4" style={styles.section}>
                        <Objective />
                        <Work />
                        <Education />
                        <Awards />
                        <References />
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Celebi;
