'use client'

import React from 'react';

interface RightSidebar2Props {
  name: {
    firstName: string;
  };
}

export const RightSidebar2 = ({ name }: RightSidebar2Props) => {
  return (
    <aside className="right-sidebar p-4 bg-white rounded-lg shadow-md w-full md:w-[280px]">
      <section className="flex flex-col pb-8">
        {/* البانر الشخصي */}
        <div className="profile-banner mb-6">
          <div className="profile flex items-center gap-4">
           <div className="profile-img">
            <span className="text-5xl font-bold text-purple-500"> {name.firstName[0]}</span>

          </div>
            <div className="profile-details">
              <h1 className="profile-name text-xl font-semibold">
                {name.firstName}
              </h1>
              <p className="profile-email text-gray-500"></p>
            </div>
          </div>
        </div>

        
      </section>
    </aside>
  );
};
