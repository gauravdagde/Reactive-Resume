import React, { useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
    GithubFilled,
    LinkedinFilled
 } from '@ant-design/icons';

import AppContext from '../../context/AppContext';

const Onyx = () => {
const context = useContext(AppContext);
const { state } = context;
const { data, theme } = state;

const Profile = () => (
    <div>
        <h1 className="font-bold text-5xl" style={{ color: theme.colors.accent }}>
            {data.profile.firstName} {data.profile.lastName}
        </h1>
        <h6 className="font-medium text-sm">{data.profile.subtitle}</h6>
    </div>
);

const ContactItem = ({ icon, value, link = '#' }) =>
    value && (
        <div className="flex items-center my-2">
            <span className="material-icons text-lg mr-2" style={{ color: theme.colors.accent, display: 'inherit' }}>
                {
                    icon === 'github' ? <GithubFilled />
                    :
                    icon === 'linkedin' ? <LinkedinFilled />
                    :
                    icon
                }
            </span>
            <a href={link}>
            <span className="font-medium break-all">{value}</span>
            </a>
        </div>
    );

const Heading = ({ title }) => (
    <h6 className="text-xs font-bold uppercase mt-6 mb-2 border-b" style={{ borderColor: theme.colors.accent, color: theme.colors.accent }}>
        {title}
    </h6>
);

const Objective = () =>
    data.objective &&
    data.objective.enable && (
        <div>
            <Heading title={data.objective.heading} />
            <ReactMarkdown className="text-sm" source={data.objective.body} />
        </div>
    );

const WorkItem = x => (
    <div key={x.id} className="mt-3">
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
            <Heading title={data.work.heading} />
            {data.work.items.filter(x => x.enable).map(WorkItem)}
        </div>
    );

const EducationItem = x => (
    <div key={x.id} className="mt-3">
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
            <Heading title={data.education.heading} />
            {data.education.items.filter(x => x.enable).map(EducationItem)}
        </div>
    );

const AwardItem = x => (
    <div key={x.id} className="mt-3">
        <h6 className="font-semibold">{x.title}</h6>
        <p className="text-xs">{x.subtitle}</p>
        <ReactMarkdown className="mt-2 text-sm" source={x.description} />
    </div>
);

const Awards = () =>
    data.awards &&
    data.awards.enable && (
        <div>
            <Heading title={data.awards.heading} />
            {data.awards.items.filter(x => x.enable).map(AwardItem)}
        </div>
    );

const CertificationItem = x => (
    <div key={x.id} className="mt-3">
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

const SkillItem = x => (
    <span
    key={x.id}
    className="text-xs py-1 rounded-full px-2 font-medium my-2 mr-2"
    style={{
        backgroundColor: '#eeeeee',
    }}
    >
        {x.skill}
    </span>
);

const Skills = () =>
    data.skills &&
    data.skills.enable && (
    <div>
        <Heading title={data.skills.heading} />
        <div className="mt-1 flex flex-wrap">{data.skills.items.map(SkillItem)}</div>
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
            <div className="grid grid-cols-3 gap-6">
            {data.references.items.filter(x => x.enable).map(ReferenceItem)}
            </div>
        </div>
    );

const formatDisplayURL = (url) => {
    const items = url.split('/').filter(x => x !== '' && x !=='http:' && x !== 'https:');
    return items.map(i => i.replace('www.', '')).join('/');  
}

return (
    <div
        className="p-10"
        style={{
            fontFamily: theme.font.family,
            backgroundColor: theme.colors.background,
            color: theme.colors.primary,
        }}
    >
        <div className="grid grid-cols-4 items-center">
            <div className="col-span-3 flex items-center">
                <Profile />
            </div>

            <div className="col-span-1 text-xs">
                <ContactItem icon="location_on" value={data.profile.address.line3} />
                <ContactItem icon="phone" value={data.profile.phone} link={`tel:${data.profile.phone}`} />
                <ContactItem
                    icon="email"
                    value={data.profile.email}
                    link={`mailto:${data.profile.email}`}
                />
                <ContactItem
                    icon="language"
                    value={data.profile.website}
                    link={`http://${data.profile.website}`}
                />
                <ContactItem 
                    icon="github" 
                    value={formatDisplayURL(data.profile.github)} 
                    link={data.profile.github}
                />
                <ContactItem 
                    icon="linkedin" 
                    value={formatDisplayURL(data.profile.linkedin)}
                    link={data.profile.linkedin}
                />
            </div>
        </div>

        <Objective />
        <Work />
        <Education />

        <div className={`grid ${data.awards.enable && data.certifications.enable ? 'grid-cols-2 gap-6' : ''}`}>
            <Awards />
            <Certifications />
        </div>

        <div className="grid">
            <Skills />
        </div>

        <References />
    
    </div>
);
};

export default Onyx;
