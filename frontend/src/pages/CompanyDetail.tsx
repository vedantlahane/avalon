import React from 'react';

const CompanyDetail: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">Company Detail</h2>
      <p className="text-[14px] text-[var(--text-muted)] mt-2">Coming soon</p>
    </div>
  );
};

export default CompanyDetail;
export { CompanyDetail };