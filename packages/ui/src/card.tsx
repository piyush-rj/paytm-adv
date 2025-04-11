import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border-[0.5px] border-black dark:border-slate-700 dark:bg-black dark:text-gray-100 p-6 rounded-xl bg-gradient-to-br from-white via-[#ededed] to-gray-200 dark:bg-gradient-to-tl dark:from-gray-900 dark:to-black"
    >
      <h1 className="text-2xl dark:text-gray-100 border-b dark:border-b dark:border-slate-600 pb-2 border-black dark:text-slate-300">
        {title}
      </h1>
      <p className="text-md dark:text-gray-100">{children}</p>
    </div>
  );
}
