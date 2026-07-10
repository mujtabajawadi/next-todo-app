import React from "react";

function Container({children}) {
  return (
    <>
      <div className="flex grow px-5 h-[calc(100dvh-56px)]">
        <div className="w-full h-full pt-8 pb-4 pl-5 flex flex-col">
            {children}
        </div>
      </div>
    </>
  );
}

export default Container;
