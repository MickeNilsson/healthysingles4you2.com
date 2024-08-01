// Node modules
import {useState} from 'react';
import {Container} from 'react-bootstrap';
import Start from './Start';

export default function MainContent({page, setPage}) {

    return (

        <div className='main-content'>

           {page}

        </div>
    );
}