export function generateTableData(vibeDomain, count = 10) {
  const data = [];
  const statusPool = ['Active', 'Pending', 'Completed', 'Failed'];
  
  for (let i = 0; i < count; i++) {
    let row = {};
    const status = statusPool[Math.floor(Math.random() * statusPool.length)];
    const date = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString();

    switch (vibeDomain) {
      case 'Finance & Billing':
        row = {
          id: `INV-${1000 + i}`,
          col1: `Client Corp ${String.fromCharCode(65 + i)}`,
          col2: `$${(Math.random() * 5000 + 100).toFixed(2)}`,
          status,
          date
        };
        break;
      case 'CRM & Sales':
        row = {
          id: `Lead ${i+1}`,
          col1: `Company ${String.fromCharCode(88 - i)}`,
          col2: `$${(Math.random() * 50000).toFixed(0)}`,
          status: ['New', 'Contacted', 'Qualified', 'Lost'][Math.floor(Math.random() * 4)],
          date
        };
        break;
      case 'Healthcare Clinic':
        row = {
          id: `PT-${8000 + i}`,
          col1: `Patient ${i+1}`,
          col2: ['Cardiology', 'Pediatrics', 'Neurology', 'General'][Math.floor(Math.random() * 4)],
          status: ['Waiting', 'In Session', 'Discharged'][Math.floor(Math.random() * 3)],
          date
        };
        break;
      case 'E-commerce':
        row = {
          id: `ORD-${90000 + i}`,
          col1: `Shopper ${i+1}`,
          col2: Math.floor(Math.random() * 10) + 1,
          col3: `$${(Math.random() * 500 + 20).toFixed(2)}`,
          status: ['Processing', 'Shipped', 'Delivered'][Math.floor(Math.random() * 3)],
        };
        break;
      case 'HR & Recruiting':
        row = {
          id: `Candidate ${i+1}`,
          col1: ['Engineer', 'Designer', 'PM', 'Marketing'][Math.floor(Math.random() * 4)],
          col2: ['Screening', 'Interview', 'Offer', 'Rejected'][Math.floor(Math.random() * 4)],
          col3: `${Math.floor(Math.random() * 40 + 60)}/100`,
          date
        };
        break;
      case 'Data Analytics':
        row = {
          id: `/${['home', 'about', 'pricing', 'contact'][Math.floor(Math.random() * 4)]}`,
          col1: Math.floor(Math.random() * 50000),
          col2: `${Math.floor(Math.random() * 80 + 20)}%`,
          col3: `${Math.floor(Math.random() * 3)}m ${Math.floor(Math.random() * 60)}s`,
          col4: `${Math.floor(Math.random() * 40 + 10)}%`
        };
        break;
      default:
        row = {
          id: `ID-${i}`,
          col1: `Item ${i}`,
          col2: `Category ${i % 3}`,
          status,
          date
        };
    }
    data.push(row);
  }
  return data;
}
