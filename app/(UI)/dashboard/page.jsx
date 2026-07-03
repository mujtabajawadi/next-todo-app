import React from 'react'

function page() {
  return (
    <>
          <h1>Welcome back, User</h1>
          <div className="bg-green-900 py-3 px-5 grid grid-cols-2 gap-3 grow rounded-md">
            <div className="grow bg-gray-600 rounded-lg grid grid-rows-3 gap-2">
                <div className="bg-amber-800 rounded-lg"></div>
                <div className="bg-amber-800 rounded-lg"></div>
                <div className="bg-amber-800 rounded-lg"></div>
            </div>
            <div className="grow bg-gray-600 rounded-lg grid grid-rows-2 gap-2">
              <div className="bg-amber-600 rounded-lg"></div>
              <div className="bg-amber-600 rounded-lg grid grid-rows-2 gap-2 p-10">
                <div className="bg-blue-950 rounded-lg"></div>
                <div className="bg-blue-950 rounded-lg"></div>
              </div>
            </div>
          </div>
    </>
  )
}

export default page