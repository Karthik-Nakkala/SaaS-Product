export const vibePresets = {
  finance: {
    domain: 'Finance & Billing',
    colors: {
      primary: 'emerald',
      bg: 'rgba(16, 185, 129, 0.05)',
      text: 'text-emerald-100',
      accent: 'emerald-600',
    },
    metrics: [
      { label: 'Total Revenue', value: '$124,500', trend: '+12.5%' },
      { label: 'Pending Invoices', value: '45', trend: '-2.1%' },
      { label: 'Active Subs', value: '1,204', trend: '+5.4%' },
      { label: 'Churn Rate', value: '1.2%', trend: '-0.3%' },
    ],
    tableColumns: ['Invoice ID', 'Client', 'Amount', 'Status', 'Date'],
    sidebarLabels: ['Overview', 'Invoices', 'Ledger', 'Tax Reports', 'Audits'],
  },
  crm: {
    domain: 'CRM & Sales',
    colors: {
      primary: 'violet',
      bg: 'rgba(139, 92, 246, 0.05)',
      text: 'text-violet-100',
      accent: 'violet-600',
    },
    metrics: [
      { label: 'New Leads', value: '342', trend: '+18.2%' },
      { label: 'Conversion Rate', value: '4.5%', trend: '+1.1%' },
      { label: 'Active Deals', value: '89', trend: '+4%' },
      { label: 'Win Rate', value: '64%', trend: '+2.5%' },
    ],
    tableColumns: ['Lead Name', 'Company', 'Expected Value', 'Stage', 'Last Contact'],
    sidebarLabels: ['Dashboard', 'Pipeline', 'Contacts', 'Campaigns', 'Activity'],
  },
  healthcare: {
    domain: 'Healthcare Clinic',
    colors: {
      primary: 'cyan',
      bg: 'rgba(6, 182, 212, 0.05)',
      text: 'text-cyan-100',
      accent: 'cyan-600',
    },
    metrics: [
      { label: 'Total Patients', value: '2,401', trend: '+3.2%' },
      { label: 'Appts Today', value: '84', trend: '0%' },
      { label: 'Wait Time (Avg)', value: '14m', trend: '-2m' },
      { label: 'Beds Available', value: '12', trend: '+1' },
    ],
    tableColumns: ['Patient ID', 'Name', 'Department', 'Status', 'Time'],
    sidebarLabels: ['Clinic Hub', 'Patients', 'Appointments', 'Records', 'Staff'],
  },
  ecommerce: {
    domain: 'E-commerce',
    colors: {
      primary: 'rose',
      bg: 'rgba(244, 63, 94, 0.05)',
      text: 'text-rose-100',
      accent: 'rose-600',
    },
    metrics: [
      { label: 'Daily Sales', value: '$8,240', trend: '+24%' },
      { label: 'Orders', value: '154', trend: '+12%' },
      { label: 'AOV', value: '$53.50', trend: '+4%' },
      { label: 'Cart Abandonment', value: '62%', trend: '-1.5%' },
    ],
    tableColumns: ['Order ID', 'Customer', 'Items', 'Total', 'Status'],
    sidebarLabels: ['Storefront', 'Orders', 'Inventory', 'Customers', 'Promotions'],
  },
  hr: {
    domain: 'HR & Recruiting',
    colors: {
      primary: 'indigo',
      bg: 'rgba(99, 102, 241, 0.05)',
      text: 'text-indigo-100',
      accent: 'indigo-600',
    },
    metrics: [
      { label: 'Open Roles', value: '24', trend: '+3' },
      { label: 'Applications', value: '342', trend: '+45%' },
      { label: 'Interviews', value: '48', trend: '+12%' },
      { label: 'Offers Given', value: '7', trend: '0%' },
    ],
    tableColumns: ['Candidate', 'Role', 'Stage', 'Score', 'Applied Date'],
    sidebarLabels: ['Recruiting', 'Candidates', 'Onboarding', 'Payroll', 'Reviews'],
  },
  analytics: {
    domain: 'Data Analytics',
    colors: {
      primary: 'sky',
      bg: 'rgba(14, 165, 233, 0.05)',
      text: 'text-sky-100',
      accent: 'sky-600',
    },
    metrics: [
      { label: 'Page Views', value: '1.2M', trend: '+14%' },
      { label: 'Unique Visitors', value: '450k', trend: '+8%' },
      { label: 'Bounce Rate', value: '42%', trend: '-3%' },
      { label: 'Session Time', value: '2m 14s', trend: '+12s' },
    ],
    tableColumns: ['Page Path', 'Views', 'Bounce Rate', 'Avg Time', 'Exit %'],
    sidebarLabels: ['Overview', 'Real-time', 'Audiences', 'Acquisition', 'Behavior'],
  },
  realestate: {
    domain: 'Real Estate',
    colors: {
      primary: 'amber',
      bg: 'rgba(245, 158, 11, 0.05)',
      text: 'text-amber-100',
      accent: 'amber-600',
    },
    metrics: [
      { label: 'Active Listings', value: '104', trend: '+3%' },
      { label: 'Pending Sales', value: '27', trend: '+12%' },
      { label: 'Avg Sale Price', value: '$452k', trend: '+4.5%' },
      { label: 'New Inquiries', value: '89', trend: '+22%' },
    ],
    tableColumns: ['Property ID', 'Address', 'Agent', 'Status', 'Listed Date'],
    sidebarLabels: ['Portfolio', 'Listings', 'Agents', 'Clients', 'Transactions'],
  },
  default: {
    domain: 'Generic SaaS',
    colors: {
      primary: 'slate',
      bg: 'rgba(100, 116, 139, 0.05)',
      text: 'text-slate-100',
      accent: 'slate-600',
    },
    metrics: [
      { label: 'Active Users', value: '4,204', trend: '+5%' },
      { label: 'New Signups', value: '142', trend: '+12%' },
      { label: 'MRR', value: '$45,200', trend: '+8%' },
      { label: 'Server Load', value: '42%', trend: '-5%' },
    ],
    tableColumns: ['ID', 'Name', 'Category', 'Status', 'Date'],
    sidebarLabels: ['Dashboard', 'Analytics', 'Team', 'Projects', 'Security'],
  }
};

export function parseVibe(prompt) {
  const p = prompt.toLowerCase();
  
  if (p.includes('financ') || p.includes('bill') || p.includes('revenu')) return vibePresets.finance;
  if (p.includes('crm') || p.includes('sale') || p.includes('lead')) return vibePresets.crm;
  if (p.includes('health') || p.includes('clinic') || p.includes('doctor')) return vibePresets.healthcare;
  if (p.includes('commerce') || p.includes('shop') || p.includes('store')) return vibePresets.ecommerce;
  if (p.includes('real') || p.includes('estate') || p.includes('propert')) return vibePresets.realestate;
  if (p.includes('hr') || p.includes('human') || p.includes('recruit')) return vibePresets.hr;
  if (p.includes('analytic') || p.includes('data') || p.includes('metric')) return vibePresets.analytics;
  
  return vibePresets.default;
}
