import React from 'react';

const Spinner = () => {
    return (
        <div className='flex justify-center items-center my-8 h-full'>
            <div className='w-8 h-8 border-4 border-dashed rounded-full animate-spin border-accent'></div>
        </div>
    );
};

export default Spinner;