import Link from "next/link";
import React, { ReactNode } from "react";

interface CardDataStatsProps {
  title: string;
  total: string;
  path: string;
  levelUp?: boolean;
  levelDown?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  path,
  levelUp,
  levelDown,
  children,
}) => {
  return (
    <div className="flex items-center justify-between rounded-sm border border-stroke bg-whiter px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex items-center justify-between gap-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray dark:bg-meta-4">
          {children}
        </div>
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </div>
      <Link href={path}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 cursor-pointer fill-black hover:fill-primary dark:fill-white"
          viewBox="0 0 320 512"
        >
          <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
        </svg>
      </Link>
    </div>
  );
};

export default CardDataStats;
