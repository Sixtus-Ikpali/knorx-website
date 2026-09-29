export const serviceCatalog = [
  {
    title: 'Digital Platforms',
    description: 'Scalable, secure websites and enterprise web solutions designed for performance and growth.',
  },
  {
    title: 'Application Engineering',
    description: 'Custom web and mobile applications built for optimized user experience and business efficiency.',
  },
  {
    title: 'Enterprise Systems',
    description: 'Intelligent, integrated systems that streamline operations, enhance visibility, and drive measurable results.',
  },
  {
    title: 'Technology Consulting',
    description: 'Strategic advisory and execution support for organizations modernizing their digital infrastructure.',
  },
] as const;

export const serviceNames = serviceCatalog.map((service) => service.title);

export const serviceDetails = [
  {
    ...serviceCatalog[0],
    problem: 'A website or web platform can become difficult to maintain, slow to use, or too limited for changing business needs.',
    work: 'We plan and build web experiences around the people using them, the content they need, and the business processes they support.',
    solutions: ['Business and institutional websites', 'Enterprise web platforms', 'Content and workflow foundations'],
    outcome: 'A dependable digital foundation designed to be useful today and adaptable as the organization grows.',
  },
  {
    ...serviceCatalog[1],
    problem: 'Product ideas and day-to-day operations often outgrow off-the-shelf tools or disconnected manual work.',
    work: 'We turn requirements into focused web and mobile applications, aligning user experience, engineering, and delivery priorities.',
    solutions: ['Custom web applications', 'Mobile application experiences', 'Internal tools and product workflows'],
    outcome: 'Software shaped around the people and processes it needs to serve.',
  },
  {
    ...serviceCatalog[2],
    problem: 'Fragmented systems and manual handoffs make it harder to see what is happening across an operation.',
    work: 'We map important workflows and build connected systems that bring information, actions, and oversight together.',
    solutions: ['Operational platforms', 'Workflow and data integration', 'Reporting and visibility tools'],
    outcome: 'Clearer processes and information that can support better operational decisions.',
  },
  {
    ...serviceCatalog[3],
    problem: 'Technology investments become risky when the business problem, system constraints, and implementation path are unclear.',
    work: 'We help teams define priorities, assess options, and translate a practical direction into an executable plan.',
    solutions: ['Technology planning', 'System and workflow assessment', 'Architecture and delivery guidance'],
    outcome: 'A clearer path from the current challenge to a technology system the organization can use.',
  },
] as const;
