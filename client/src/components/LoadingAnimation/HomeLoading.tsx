import React from 'react'

const HomeLoading = () => {
    return (
        <div className="shadow-md rounded-md  h-full w-52 mb-5">
            <div className="animate-pulse flex  flex-col  gap-4  w-auto p-2">
                <div className="rounded-lg bg-slate-300 h-40 w-full  mx-auto"></div>
                <div className="flex-1 space-y-6 py-1 w-full mx-auto">
                    <div className="h-2 bg-slate-300 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-300 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-300 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeLoading;