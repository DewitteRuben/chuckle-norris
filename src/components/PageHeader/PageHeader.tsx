import React from "react";

type TPageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader: React.FC<TPageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-6">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default PageHeader;
