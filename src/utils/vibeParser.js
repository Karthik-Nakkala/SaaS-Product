export const vibePresets = {
  finance: {
    domain: 'Finance & Billing',
    colors: {
      primary: 'emerald',
      bg: 'bg-emerald-50 dark:bg-emerald-950',
      text: 'text-emerald-900 dark:text-emerald-100',
      accent: 'emerald-600',
    },
    metrics: [
      { label: 'Total Revenue', value: '$124,500', trend: '+12.5%' },
      { label: 'Pending Invoices', value: '45', trend: '-2.1%' },
      { label: 'Active Subs', value: '1,204', trend: '+5.4%' },
      { label: 'Churn Rate', value: '1.2%', trend: '-0.3%' },
    ],
    tableColumns: ['Invoice ID', 'Client', 'Amount', 'Status', 'Date'],
  },
  crm: {
    domain: 'CRM & Sales',
    colors: {
      primary: 'violet',
      bg: 'bg-violet-50 dark:bg-violet-950',
      text: 'text-violet-900 dark:text-violet-100',
      accent: 'violet-600',
    },
    metrics: [
      { label: 'New Leads', value: '342', trend: '+18.2%' },
      { label: 'Conversion Rate', value: '4.5%', trend: '+1.1%' },
      { label: 'Active Deals', value: '89', trend: '+4%' },
      { label: 'Win Rate', value: '64%', trend: '+2.5%' },
    ],
    tableColumns: ['Lead Name', 'Company', 'Expected Value', 'Stage', 'Last Contact'],
  },
  healthcare: {
    domain: 'Healthcare Clinic',
    colors: {
      primary: 'cyan',
      bg: 'bg-cyan-50 dark:bg-cyan-950',
      text: 'text-cyan-900 dark:text-cyan-100',
      accent: 'cyan-600',
    },
    metrics: [
      { label: 'Total Patients', value: '2,401', trend: '+3.2%' },
      { label: 'Appts Today', value: '84', trend: '0%' },
      { label: 'Wait Time (Avg)', value: '14m', trend: '-2m' },
      { label: 'Beds Available', value: '12', trend: '+1' },
    ],
    tableColumns: ['Patient ID', 'Name', 'Department', 'Status', 'Time'],
  },
  ecommerce: {
    domain: 'E-commerce',
    colors: {
      primary: 'rose',
      bg: 'bg-rose-50 dark:bg-rose-950',
      text: 'text-rose-900 dark:text-rose-100',
      accent: 'rose-600',
    },
    metrics: [
      { label: 'Daily Sales', value: '$8,240', trend: '+24%' },
      { label: 'Orders', value: '154', trend: '+12%' },
      { label: 'AOV', value: '$53.50', trend: '+4%' },
      { label: 'Cart Abandonment', value: '62%', trend: '-1.5%' },
    ],
    tableColumns: ['Order ID', 'Customer', 'Items', 'Total', 'Status'],
  },
  hr: {
    domain: 'HR & Recruiting',
    colors: {
      primary: 'indigo',
      bg: 'bg-indigo-50 dark:bg-indigo-950',
      text: 'text-indigo-900 dark:text-indigo-100',
      accent: 'indigo-600',
    },
    metrics: [
      { label: 'Open Roles', value: '24', trend: '+3' },
      { label: 'Applications', value: '342', trend: '+45%' },
      { label: 'Interviews', value: '48', trend: '+12%' },
      { label: 'Offers Given', value: '7', trend: '0%' },
    ],
    tableColumns: ['Candidate', 'Role', 'Stage', 'Score', 'Applied Date'],
  },
  analytics: {
    domain: 'Data Analytics',
    colors: {
      primary: 'sky',
      bg: 'bg-sky-50 dark:bg-sky-950',
      text: 'text-sky-900 dark:text-sky-100',
      accent: 'sky-600',
    },
    metrics: [
      { label: 'Page Views', value: '1.2M', trend: '+14%' },
      { label: 'Unique Visitors', value: '450k', trend: '+8%' },
      { label: 'Bounce Rate', value: '42%', trend: '-3%' },
      { label: 'Session Time', value: '2m 14s', trend: '+12s' },
    ],
    tableColumns: ['Page Path', 'Views', 'Bounce Rate', 'Avg Time', 'Exit %'],
  },
  default: {
    domain: 'Generic SaaS',
    colors: {
      primary: 'slate',
      bg: 'bg-slate-50 dark:bg-slate-950',
      text: 'text-slate-900 dark:text-slate-100',
      accent: 'slate-600',
    },
    metrics: [
      { label: 'Active Users', value: '4,204', trend: '+5%' },
      { label: 'New Signups', value: '142', trend: '+12%' },
      { label: 'MRR', value: '$45,200', trend: '+8%' },
      { label: 'Server Load', value: '42%', trend: '-5%' },
    ],
    tableColumns: ['ID', 'Name', 'Category', 'Status', 'Date'],
  }
};

export function parseVibe(prompt) {
  const p = prompt.toLowerCase();
  
  if (p.includes('financ') || p.includes('bill') || p.includes('revenu')) return vibePresets.finance;
  if (p.includes('crm') || p.includes('sale') || p.includes('lead')) return vibePresets.crm;
  if (p.includes('health') || p.includes('clinic') || p.includes('doctor')) return vibePresets.healthcare;
  if (p.includes('commerce') || p.includes('shop') || p.includes('store')) return vibePresets.ecommerce;
  if (p.includes('hr') || p.includes('human') || p.includes('recruit')) return vibePresets.hr;
  if (p.includes('analytic') || p.includes('data') || p.includes('metric')) return vibePresets.analytics;
  
  return vibePresets.default;
}
