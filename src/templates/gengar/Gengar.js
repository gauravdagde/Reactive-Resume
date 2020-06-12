import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';

import AppContext from '../../context/AppContext';
import { hexToRgb } from '../../utils';

const Gengar = () => {
const context = useContext(AppContext);
const { state } = context;
const { data, theme } = state;

const { r, g, b } = hexToRgb(theme.colors.accent) || {};

const FullName = () => (
    <div>
        <h1 className="text-2xl font-bold leading-tight">{data.basics.name}</h1>
        <div className="text-xs font-medium mt-2">{data.basics.label}</div>
    </div>
);

const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
    <div className="flex items-center mb-3">
        <div
        className="w-5 h-5 rounded-full flex justify-center items-center mr-2"
        style={{ backgroundColor: theme.colors.background }}
        >
            <i
                className="flex justify-center items-center material-icons text-xs"
                style={{ color: theme.colors.accent }}
            >
                {icon}
            </i>
        </div>
        <a href={link}>
            <span className="text-sm font-medium break-all">{value}</span>
        </a>
    </div>
    );

const Heading = ({ title }) => (
    <h6 className="font-bold text-xs uppercase tracking-wide mb-2">{title}</h6>
);

const Objective = () =>
    data.objective &&
    data.objective.enable && (
        <div className="flex flex-col justify-center items-start mb-6">
            <Heading title={data.objective.heading} />
            <ReactMarkdown className="text-sm" source={data.objective.body} />
        </div>
    );

const SkillItem = x => (
    <li key={x.id} className="text-sm py-1">
        {x.skill}
    </li>
);

const Skills = () =>
    data.skills &&
    data.skills.enable && (
    <div className="mb-6">
        <Heading title={data.skills.heading} />
        <ul>{data.skills.items.map(SkillItem)}</ul>
    </div>
    );

const EducationItem = x => (
    <div key={x.id} className="mb-3">
        <div className="flex justify-between items-center">
            <div>
                <h6 className="font-semibold">
                    {x.name}{x.location ? ', ' : ''}{x.location}
                    <small className="ml-2">
                        {x.start !== '' && x.end !== '' && (
                            <span className="text-xs font-medium">
                            ({x.start} - {x.end})
                            </span>
                        )}
                    </small>
                </h6>
                <p className="text-xs">{x.major}</p>
            </div>
            <div className="flex flex-col text-right items-end">
                <span className="text-sm font-bold" style={{ color: theme.colors.accent }}>
                    {x.grade}
                </span>
            </div>
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

const CertificationItem = x => (
    <div key={x.id} className="mb-3">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs">{x.subtitle}</p>
        <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
);

const Certifications = () =>
    data.certifications &&
    data.certifications.enable && (
        <div className="mb-6">
            <Heading title={data.certifications.heading} />
            {data.certifications.items.filter(x => x.enable).map(CertificationItem)}
        </div>
    );

const AwardItem = x => (
    <div key={x.id} className="mb-3">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs">{x.subtitle}</p>
        <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
);

const Awards = () =>
    data.awards &&
    data.awards.enable && (
        <div className="mb-6">
            <Heading title={data.awards.heading} />
            {data.awards.items.filter(x => x.enable).map(AwardItem)}
        </div>
    );

const ReferenceItem = x => (
    <div key={x.id} className="flex flex-col">
        <h6 className="text-sm font-medium">{x.name}</h6>
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
            <Heading title={data.references.heading} />
            <div className="grid grid-cols-2 gap-6">
            {data.references.items.filter(x => x.enable).map(ReferenceItem)}
            </div>
        </div>
    );

const WorkItem = x => (
    <div key={x.id} className="mb-3">
        <div className="flex justify-between items-center">
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
        <div className="mb-6">
            <Heading title={data.work.heading} />
            {data.work.items.filter(x => x.enable).map(WorkItem)}
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
                className="col-span-4 px-6 py-8"
                style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
            >
                <div className="flex items-center">
                    <FullName />
                </div>

                <hr className="w-1/4 my-5 opacity-50" />

                <ContactItem icon="phone" value={data.basics.phone} link={`tel:${data.basics.phone}`} />
                <ContactItem
                    icon="email"
                    value={data.basics.email}
                    link={`mailto:${data.basics.email}`}
                />
                <ContactItem
                    icon="language"
                    value={data.basics.website}
                    link={`http://${data.basics.website}`}
                />
                <ContactItem icon="location_on" value={data.basics.location.city + (data.basics.location.region ? `, ${data.basics.location.region}`: '')} />
            </div>

            <div
                className="col-span-8 px-6 py-8"
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
            >
                <Objective />
            </div>

            <div
                className="col-span-4 px-6 py-8"
                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.1)` }}
            >
                <Skills />
                <Education />
                <Certifications />
            </div>

            <div className="col-span-8 px-6 py-8">
                <Work />
                <Awards />
                <References />
            </div>
        </div>
    </div>
);
};

export default Gengar;
