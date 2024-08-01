import { useEffect, useState } from 'react';
import NavigationBar from './components/NavigationBar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Start from './components/Start';
import ResetPasswordPage from './components/ResetPasswordPage';

import axios from 'axios';

export default function App() {

    const [page, setPage] = useState(null);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [member, setMember] = useState({});

    useEffect(() => {

        const uuid_s = getQueryVariable('uuid');

        if(uuid_s) {

            setPage(<ResetPasswordPage uuid={uuid_s} />);

        } else {

            setPage(<Start setMember={setMember} setPage={setPage} setIsLoggedIn={setIsLoggedIn} />);
        }

    }, []);

    function getQueryVariable(variable) {
        
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
    }

    return (

        <div spellCheck='false'>

            {/* <NavigationBar setPage={setPage} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> */}

            <NavigationBar setPage={setPage} member={member} setMember={setMember} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <MainContent page={page} />

            <Footer />

        </div>
    );
}