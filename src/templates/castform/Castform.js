import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';

const Castform = () => {
    const context = useContext(AppContext);
    const { state } = context;
    const { data, theme } = state;

    const PersonalInformation = () => (
        <div className="pt-5 px-5">
            <h1 className="text-2xl font-bold">
                {data.basics.name}
            </h1>
            <h5>{data.basics.label}</h5>
        </div>
    );

    const Heading = ({ title, light = false }) => (
        <div
        className={`py-2 my-4 ${light ? 'mx-5 border-t border-b border-gray-400' : ''}`}
        style={{ backgroundColor: light ? '' : 'rgba(0, 0, 0, 0.25)' }}
        >
            <h6 className={`${light ? '' : 'pl-5'} font-semibold`}>{title}</h6>
        </div>
    );

    const Address = () => (
        <div className="px-5 my-2">
            <h6 className="text-xs font-bold">Address</h6>
            <div className="text-sm">{data.basics.location.address}</div>
            <div className="text-sm">
                {data.basics.location.city}
                {
                    data.basics.location.region ? 
                    `, ${data.basics.location.region}`: ''
                }
            </div>
        </div>
    );

    const ContactItem = ({ title, value, link = '#' }) =>
        value && (
            <div className="px-5 my-2">
                <h6 className="text-xs font-bold">{title}</h6>
                <a href={link}>
                <div className="text-sm">{value}</div>
                </a>
            </div>
        );

    const ContactInformation = () => (
        <div>
            <Heading title="Contact Information" />
            <Address />
            <ContactItem title="Phone" value={data.basics.phone} link={`tel:${data.basics.phone}`} />
            <ContactItem
                title="Email Address"
                value={data.basics.email}
                link={`mailto:${data.basics.email}`}
            />
            <ContactItem
                title="Website"
                value={data.basics.website}
                link={`http://${data.basics.website}`}
            />
        </div>
    );

    const SkillItem = x => (
        <li key={x.id} className="text-sm my-2">
            {x.skill}
        </li>
    );

    const Skills = () =>
        data.skills &&
        data.skills.enable && (
            <div>
                <Heading title={data.skills.heading} />
                <ul className="list-none px-5">{data.skills.items.map(SkillItem)}</ul>
            </div>
        );

    const Objective = () =>
    
        data.objective && data.objective.enable && <ReactMarkdown className="m-5 text-sm" source={data.objective.body} />;

    const WorkItem = x => (
        <div key={x.id} className="my-3 px-5">
            <div className="flex justify-between">
                <div>
                    <h6 className="font-semibold">{x.title}{x.location ? ', ' : ''}{x.location}</h6>
                    <p className="text-xs">{x.role}</p>
                </div>
                <span className="text-xs font-medium">
                    ({x.start} - {x.end})
                </span>
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Work = () =>
        data.work &&
        data.work.enable && (
        <div>
            <Heading light title={data.work.heading} />
            {data.work.items.filter(x => x.enable).map(WorkItem)}
        </div>
        );

    const ReferenceItem = x => (
        <div key={x.id} className="flex flex-col">
            <h6 className="text-sm font-medium">{x.name}{x.location ? ', ' : ''}{x.location}</h6>
            <span className="text-xs">{x.position}</span>
            <span className="text-xs">{x.phone}</span>
            <span className="text-xs">{x.email}</span>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const References = () =>
        data.references &&
        data.references.enable && (
        <div>
            <Heading light title={data.references.heading} />
            <div className="grid grid-cols-2 gap-6 px-5">
                {data.references.items.filter(x => x.enable).map(ReferenceItem)}
            </div>
        </div>
        );

    const EducationItem = x => (
        <div key={x.id} className="my-3 px-5">
            <div className="flex justify-between">
                <div>
                    <h6 className="font-semibold">{x.name}{x.location ? ', ' : ''}{x.location}</h6>
                    <p className="text-xs">{x.major}</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold">{x.grade}</span>
                    <span className="text-xs font-medium">
                        ({x.start} - {x.end})
                    </span>
                </div>
            </div>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Education = () =>
        data.education &&
        data.education.enable && (
        <div>
            <Heading light title={data.education.heading} />
            {data.education.items.filter(x => x.enable).map(EducationItem)}
        </div>
        );

    const AwardItem = x => (
        <div key={x.id} className="my-3 px-5">
            <h6 className="font-semibold">{x.title}</h6>
            <p className="text-xs">{x.subtitle}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Awards = () =>
        data.awards &&
        data.awards.enable && (
        <div>
            <Heading light title={data.awards.heading} />
            {data.awards.items.filter(x => x.enable).map(AwardItem)}
        </div>
        );

    const CertificationItem = x => (
        <div key={x.id} className="my-3 px-5">
            <h6 className="font-semibold">{x.title}</h6>
            <p className="text-xs">{x.subtitle}</p>
            <ReactMarkdown className="mt-2 text-sm" source={x.description} />
        </div>
    );

    const Certifications = () =>
        data.certifications &&
        data.certifications.enable && (
        <div>
            <Heading title={data.certifications.heading} />
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
                    className="col-span-4"
                    style={{
                        color: theme.colors.background,
                        backgroundColor: theme.colors.accent,
                    }}
                    >
                    <PersonalInformation />
                    <ContactInformation />
                    <Skills />
                    <Certifications />
                </div>
                <div className="col-span-8">
                    <Objective />
                    <Work />
                    <Education />
                    <Awards />
                    <References />
                </div>
            </div>
        </div>
    );
};

export default Castform;
