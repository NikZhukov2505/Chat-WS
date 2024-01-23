import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../../Pages/Home/Home';

const Main: FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
};

export default Main;