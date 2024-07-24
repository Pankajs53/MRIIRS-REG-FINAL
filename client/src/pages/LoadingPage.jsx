import React from 'react';
import { DiAndroid, DiAtom, DiChrome,DiCodeigniter } from 'react-icons/di';

const LoadingPage = () => {
  return (
    <div className='flex items-center h-screen justify-center'>
        <div className="circle-container">
            <div className="circle">
                <DiAndroid className="item" />
                <DiAtom className="item" />
                <DiChrome className="item" />
                <DiCodeigniter className="item" />
            </div>
        </div>
    </div>
  );
};

export default LoadingPage;