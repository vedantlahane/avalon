import React from 'react';

const Companies: React.FC = () => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h2 className="text-[24px] font-semibold text-[var(--text-primary)]">Companies</h2>
      <p className="text-[14px] text-[var(--text-muted)] mt-2">Coming soon</p>
    </div>
  );
};

export default Companies;
export { Companies };