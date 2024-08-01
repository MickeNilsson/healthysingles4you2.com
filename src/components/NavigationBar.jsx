import {Button, Container, Nav, Navbar} from 'react-bootstrap';
import {useState} from 'react';
import Home  from './Home';
import Login from './Login';
import Settings from './Settings';
import Start from './Start';
import logo from '../assets/logo.png';

export default function NavigationBar(props) {

    const [expanded, setExpanded] = useState(false);

    const {member, setMember, setPage} = props;

    // Event handlers //////

    function goToHomePage() {

        setExpanded(false);

        setPage(<Home setPage={setPage} member={member} setMember={setMember} />);
    }
    function goToLoginPage() {

        setExpanded(false);

        setPage(<Login setPage={setPage} setIsLoggedIn={props.setIsLoggedIn} member={member} setMember={setMember} />);
    }

    function goToSettingsPage() {

        setExpanded(false);

        setPage(<Settings setPage={setPage} member={member} setMember={setMember} />);
    }

    function goToStartPage() {

        setExpanded(false);
        
        setPage(<Start setPage={setPage} member={member} setMember={setMember} />);
    }

    function logOut() {

        setExpanded(false);

        props.setIsLoggedIn(false);

        setMember({...member, isLoggedIn: false});

        setPage(<Start setPage={setPage} />);
    }

    return (

        <Navbar
            bg='dark'
            collapseOnSelect
            expand='sm'
            expanded={expanded}
            fixed='top'
            variant='dark'>

            <Container>

                <Navbar.Brand className='navbar-brand'
                    onClick={goToStartPage}
                >
                    <img
                        alt='Logo'
                        className='logo'
                        src={logo}
                    />
                    <span style={{color: '#46c1bb'}}>Healthy</span>Singles<span style={{color: '#46c1bb'}}>4</span>You<span style={{color: '#46c1bb'}}>2</span>
                </Navbar.Brand>

                <Navbar.Toggle className='mb-3' onClick={() => setExpanded(!expanded)} />

                <Navbar.Collapse className='justify-content-end'>

                    <Nav>

                        {member.isLoggedIn && <Nav.Link href="" onClick={goToHomePage}>Home</Nav.Link>}

                        {member.isLoggedIn && <Nav.Link href="" onClick={goToSettingsPage}>Settings</Nav.Link>}

                        {member.isLoggedIn ? <Button onClick={logOut} variant='outline-success'>Log out</Button> : 
                                             <Button onClick={goToLoginPage} variant='outline-success'>Log in</Button>}

                    </Nav>
                    
                </Navbar.Collapse>

            </Container>

        </Navbar>
    );
}