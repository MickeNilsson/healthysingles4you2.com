import { useEffect, useRef, useState } from 'react';
import { Badge, Button, Card, Col, Container, Form, Image, Modal, Pagination, Row } from 'react-bootstrap';
import EditPictureModal from './EditPictureModal';
import arnold from '../assets/arnold.jpg';
import woman from '../assets/woman.jpg';
import man from '../assets/man.jpg';
import axios from 'axios';
import OtherMemberHome from './OtherMemberHome';

function Home(props) {

    const [ages, setAges] = useState([]);

    const [alcohol, setAlcohol] = useState(null);

    const [countries, setCountries] = useState([]);

    const [country, setCountry] = useState(null);

    const [eyeColor, setEyeColor] = useState([]);

    const [eyeColors, setEyeColors] = useState([])

    const [fromHeight, setFromHeight] = useState(null);

    const [fromWeight, setFromWeight] = useState(null);

    const [gender, setGender] = useState(null);

    const [hairColor, setHairColor] = useState([]);

    const [hairColors, setHairColors] = useState([]);

    const [haveChildren, setHaveChildren] = useState([]);

    const [heights, setHeights] = useState([]);

    const [physique, setPhysique] = useState([]);

    const [physiques, setPhysiques] = useState([]);

    const [profession, setProfession] = useState([]);

    const [professions, setProfessions] = useState([]);

    const [searchResults, setSearchResults] = useState([]);

    const [showAdvancedSearchSection, setShowAdvancedSearchSection] = useState(false);

    const [showColumns, setShowColumns] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const [showSearchResults, setShowSearchResults] = useState(false);

    const [smoke, setSmoke] = useState(null);

    const [wantChildren, setWantChildren] = useState([]);

    const [toAge, setToAge] = useState(null);

    const [toHeight, setToHeight] = useState(null);

    const [toWeight, setToWeight] = useState(null);

    const [weights, setWeights] = useState(null);

    const [fromAge, setFromAge] = useState(null);

    const member = props.member;

    const searchResultRef = useRef();

    useEffect(() => {

        const ages_a = [];

        for (let age_i = 18; age_i < 100; ++age_i) {

            ages_a.push(age_i);
        }

        setAges(ages_a);

        createCountryNames();

        const hairColors_a = [
            'Black', 'Blonde', 'Brown', 'Light brown', 'Grey/White', 'Red', 'Bald/Shaved'
        ];

        const eyeColors_a = [
            'Blue', 'Brown', 'Green', 'Grey'
        ];

        setEyeColors(eyeColors_a);

        setHairColors(hairColors_a);

        const heights_a = [];

        for (let height_i = 100; height_i < 250; ++height_i) {

            heights_a.push(height_i);
        }

        setHeights(heights_a);

        const physiques_a = ['petite', 'small', 'athletic', 'muscular', 'average', 'curvy', 'big'];

        setPhysiques(physiques_a);

        const professions_a = [
            { value: 'unemployed', label: 'Unemployed' },
            { value: 'student', label: 'Student' },
            { value: 'retired', label: 'Retired' },
            { value: 'admin', label: 'Administrative work' },
            { value: 'police', label: 'Police/Guard/Safety personnel' },
            { value: 'fireman', label: 'Fireman' },
            { value: 'farming', label: 'Farming/Agriculture' },
            { value: 'manager', label: 'Manager/HR' },
            { value: 'hairdresser', label: 'Hairdresser' },
            { value: 'dentist', label: 'Dentist' },
            { value: 'self-employed', label: 'Self-employed' },
            { value: 'it', label: 'IT' },
            { value: 'military', label: 'Military' },
            { value: 'entertainment', label: 'Entertainment/Media' },
            { value: 'economist', label: 'Ekonom' },
            { value: 'education', label: 'Education' },
            { value: 'sales', label: 'Sales' },
            { value: 'construction', label: 'Construction' },
            { value: 'politics', label: 'Politics' }
        ];

        setProfessions(professions_a);

        const weights_a = [];

        for (let weight_i = 40; weight_i < 200; ++weight_i) {

            weights_a.push(weight_i);
        }

        setWeights(weights_a);

    }, []);

    function createCountryNames() {

        axios.get('https://healthysingles4you2.com/api/countries.json')

            .then(function (response_o) {

                if (response_o.status === 200) {

                    const countries_a = [];

                    for (const country_o of response_o.data) {

                        countries_a.push(country_o.name.common);
                    }

                    countries_a.sort();

                    setCountries(countries_a);
                }
            });
    }

    function search(e) {

        e.stopPropagation();
        e.preventDefault();

        const params_o = {
            fields: 'firstname,lastname,country,birthdate,gender'
        };

        if (alcohol) { params_o.alcohol = alcohol; }

        if (country) { params_o.country = country; }

        if (eyeColor.length) { params_o.eyecolors = parseInt(eyeColor.toString()); }
        
        if (fromAge) { params_o.fromage = parseInt(fromAge); }

        if (fromHeight) { params_o.fromheight = parseInt(fromHeight); }

        if (fromWeight) { params_o.fromweight = fromWeight; }

        if (gender) { params_o.gender = gender; }

        if (hairColor.length) { params_o.haircolors = hairColor.toString(); }

        if (haveChildren.length) { params_o.havechildren = haveChildren.toString(); }

        if (physique.length) { params_o.physiques = physique.toString(); }

        if (profession.length) { params_o.professions = profession.toString(); }

        if (smoke) { params_o.smoke = smoke; }

        if (toAge) { params_o.toage = toAge; }

        if (toHeight) { params_o.toheight = toHeight; }

        if (toWeight) { params_o.toweight = toWeight; }

        if (wantChildren.length) { params_o.wantchildren = wantChildren.toString(); }

        if (toAge) {
            params_o.frombirthdate = getPastDateISO(toAge);
        }

        if (fromAge) {
            params_o.tobirthdate = getPastDateISO(fromAge);
        }

        axios.get('https://healthysingles4you2.com/api/members/', {
            params: params_o
        })
            .then(function (response_o) {
   
                if (response_o.status === 200) {

                    setSearchResults(response_o.data.data);
                    setShowSearchResults(true);
                    window.scrollTo(0, 0);
                    if(searchResultRef.current) {
                        
                        searchResultRef.current.scrollTo(0, 0);
                    }
                }
            });
    }

    /**
     * Returns the values of all checked checkboxes in the form of an array of strings
     */
    function getChosenAlternativesByName(name_s) {

        const checkInputs_a = document.getElementsByName(name_s);

        let chosenAlternatives_a = [];

        for (const checkInput_o of checkInputs_a) {

            if (checkInput_o.checked) {

                chosenAlternatives_a.push(checkInput_o.value);
            }
        }

        return chosenAlternatives_a;
    }

    function getPastDateISO(yearsInPast) {
        // Get the current date
        const currentDate = new Date();

        // Subtract the specified number of years from the current date
        currentDate.setFullYear(currentDate.getFullYear() - yearsInPast);

        // Return the date as an ISO string
        return currentDate.toISOString().substring(0, 10);
    }

    function updateProfilePicture() {

        setShowModal(true);
    }

    function calculateAge(isoDate_s) {

        const birthDate = new Date(isoDate_s);
        const currentDate = new Date();
        const difference = currentDate - birthDate;
        const currentAge = Math.floor(difference / 31557600000); // Divide by 1000*60*60*24*365.25
        return currentAge;
    }

    function showAdvancedSearch(e) {

        e.stopPropagation();
        e.preventDefault();

        setShowAdvancedSearchSection(!showAdvancedSearchSection);
    }

    function updateState(e, state, setState) {

        if (e.target.checked) {

            state.push(e.target.value);

        } else {

            state.splice(state.indexOf(e.target.value), 1);
        }

        setState(state);
    }

    return (

        <Container className='mt-3'>

            <Row xs={1} sm={1} md={1} lg={3}>

                {!showSearchResults && <><Col className='mb-3'>

                    <Card style={{ height: '376px' }}>

                        <Card.Header className='card-header'>

                            Hi {member.firstname}!

                        </Card.Header>

                        <Card.Body>

                            <div className='d-block'>

                                <Image onClick={updateProfilePicture} style={{ cursor: 'pointer', width: '130px', display: 'inline-block', float: 'left' }} src={'https://healthysingles4you2.com/api/profilepictures/?id=' + member.id + '&gender=' + member.gender + '&cachebuster=' + Math.random()} rounded />

                                <div className='d-grid ps-2'>

                                    <h6 style={{ paddingLeft: '8px', marginBottom: '0', fontSize: '12px' }}>Profile Status</h6>

                                    <Button className='button' size='sm' type='button' variant='success'><span>✔</span> VISIBLE</Button>

                                    <h6 style={{ paddingLeft: '8px', marginBottom: '0', fontSize: '12px' }}>Online Status</h6>

                                    <Button className='button' size='sm' type='button' variant='success'><span>✔</span> AVAILABLE</Button>

                                    <h6 style={{ paddingLeft: '8px', marginBottom: '0', fontSize: '12px' }}>Membership</h6>

                                    <Button className='button' size='sm' type='button' variant='success'><span>✔</span> REGULAR</Button>

                                </div>

                            </div>

                            <div className='d-block mt-5'>

                                <i className='bi bi-envelope fs-3' style={{ cursor: 'pointer' }}></i>

                                <Badge pill bg='danger' className='position-relative' style={{ cursor: 'pointer', fontSize: '10px', left: '-10px', top: '-15px' }}>
                                    3
                                </Badge>

                                <i className='bi bi-hand-thumbs-up fs-3' style={{ cursor: 'pointer' }}></i>

                                <Badge pill bg='danger' className='position-relative' style={{ cursor: 'pointer', fontSize: '10px', left: '-10px', top: '-15px' }}>
                                    2
                                </Badge>

                                <i className='bi bi-heart fs-3' style={{ cursor: 'pointer' }}></i>

                                <Badge pill bg='danger' className='position-relative' style={{ cursor: 'pointer', fontSize: '10px', left: '-10px', top: '-15px' }}>
                                    1
                                </Badge>

                                <i className='bi bi-star fs-3' style={{ cursor: 'pointer' }}></i>

                                <Badge pill bg='danger' className='position-relative' style={{ cursor: 'pointer', fontSize: '10px', left: '-10px', top: '-15px' }}>
                                    5
                                </Badge>

                                <i className='bi bi-search fs-3' style={{ cursor: 'pointer' }}></i>

                                <Badge pill bg='danger' className='position-relative' style={{ cursor: 'pointer', fontSize: '10px', left: '-10px', top: '-15px' }}>
                                    3
                                </Badge>

                            </div>

                        </Card.Body>

                    </Card>

                </Col>

                    <Col className='mb-3'>

                        <Card style={{ height: '376px' }}>

                            <Card.Header className='card-header'>

                                Recent happenings

                            </Card.Header>

                            <Card.Body className='overflow-auto'>

                                <div className='border-bottom pb-3'>

                                    <Image style={{ width: '130px', display: 'inline-block', float: 'left' }} src={woman} rounded />

                                    <div className='d-grid ps-2'>

                                        <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                        <p>Stockholm, Sweden</p>

                                        <p>Sent you a message 3 hours ago</p>

                                    </div>

                                </div>

                                <div className='border-bottom pb-3 pt-3'>

                                    <Image style={{ width: '130px', display: 'inline-block', float: 'left' }} src={woman} rounded />

                                    <div className='d-grid ps-2'>

                                        <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                        <p>Stockholm, Sweden</p>

                                        <p>Sent you a message 3 hours ago</p>

                                    </div>

                                </div>

                                <div className='pb-3 pt-3'>

                                    <Image style={{ width: '130px', display: 'inline-block', float: 'left' }} src={woman} rounded />

                                    <div className='d-grid ps-2'>

                                        <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                        <p>Stockholm, Sweden</p>

                                        <p>Sent you a message 3 hours ago</p>

                                    </div>

                                </div>

                            </Card.Body>

                        </Card>

                    </Col></>}

                {showSearchResults && <Col lg={8} className='mb-3'>

                    <Card style={{ height: '376px' }}>

                        <Card.Header className='card-header'>

                            Search results <span onClick={() => setShowSearchResults(false)} style={{ float: 'right' }}><i className='bi bi-x-lg' style={{ cursor: 'pointer' }}></i></span>

                        </Card.Header>

                        <Card.Body ref={searchResultRef} className='overflow-auto'>

                            {searchResults.map(person_o => (
                                <div key={person_o.id} className='search-result-item' onClick={() => props.setPage(<OtherMemberHome person={person_o} />)}>
                                    <Image className='search-result-img' src={person_o.gender === 'male' ? man : woman} rounded />
                                    <p>{person_o.firstname} {person_o.lastname} ({calculateAge(person_o.birthdate)})</p>
                                    <p>{person_o.country}</p>
                                </div>
                            ))}

                        </Card.Body>

                    </Card>

                </Col>}

                <Col className='mb-3'>

                    <Card>

                        <Card.Header className='card-header'>Search</Card.Header>

                        <Card.Body>

                            <Form autoComplete='off'>

                                <Form.Group className='mb-3'>

                                    <Form.Label className='d-block'>Gender</Form.Label>

                                    <Form.Select
                                        onChange={e => setGender(e.target.value)}
                                        size='sm'>

                                        <option></option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>

                                    </Form.Select>

                                </Form.Group>

                                <Form.Group className='mb-3'>

                                    <Form.Label className='d-block'>Age</Form.Label>

                                    <Form.Select
                                        className='d-inline-block'
                                        onChange={e => setFromAge(e.target.value)}
                                        size='sm'
                                        style={{ width: '40%' }}>

                                        <option></option>

                                        {ages.map(age_i => <option key={age_i} value={age_i}>{age_i}</option>)}

                                    </Form.Select>

                                    <Form.Label style={{ width: '20%', textAlign: 'center' }}>to</Form.Label>

                                    <Form.Select
                                        className='d-inline-block'
                                        onChange={e => setToAge(e.target.value)}
                                        size='sm'
                                        style={{ width: '40%' }}>

                                        <option></option>

                                        {ages.map(age_i => <option key={age_i} value={age_i}>{age_i}</option>)}

                                    </Form.Select>

                                </Form.Group>

                                <Form.Group className='mb-3'>

                                    <Form.Label className='d-block'>Country</Form.Label>

                                    <Form.Select
                                        onChange={e => setCountry(e.target.value)}
                                        size='sm'>

                                        <option></option>

                                        {countries.map(country_s => <option key={country_s} value={country_s}>{country_s}</option>)}

                                    </Form.Select>

                                </Form.Group>

                                {showAdvancedSearchSection && (

                                    <>
                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Height</Form.Label>

                                            <Form.Select
                                                className='d-inline-block'
                                                onChange={e => setFromHeight(e.target.value)}
                                                size='sm'
                                                style={{ width: '40%' }}>

                                                <option></option>

                                                {heights.map(h => <option key={h} value={h}>{h} cm</option>)}

                                            </Form.Select>

                                            <Form.Label style={{ width: '20%', textAlign: 'center' }}>to</Form.Label>

                                            <Form.Select
                                                className='d-inline-block'
                                                onChange={e => setToHeight(e.target.value)}
                                                size='sm'
                                                style={{ width: '40%' }}>

                                                <option></option>

                                                {heights.map(h => <option key={h} value={h}>{h} cm</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Weight</Form.Label>

                                            <Form.Select
                                                className='d-inline-block'
                                                onChange={e => setFromWeight(e.target.value)}
                                                size='sm'
                                                style={{ width: '40%' }}>

                                                <option></option>

                                                {weights.map(w => <option key={w} value={w}>{w} kg</option>)}

                                            </Form.Select>

                                            <Form.Label style={{ width: '20%', textAlign: 'center' }}>to</Form.Label>

                                            <Form.Select
                                                className='d-inline-block'
                                                onChange={e => setToWeight(e.target.value)}
                                                size='sm'
                                                style={{ width: '40%' }}>

                                                <option></option>

                                                {weights.map(w => <option key={w} value={w}>{w} kg</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Hair color</Form.Label>

                                            {hairColors.map(hc => (
                                                <Form.Check
                                                    inline
                                                    label={hc}
                                                    onClick={e => updateState(e, hairColor, setHairColor)}
                                                    type='checkbox'
                                                    value={hc} />
                                            ))}

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Eye color</Form.Label>

                                            {eyeColors.map(ec => (
                                                <Form.Check
                                                    inline
                                                    label={ec}
                                                    onClick={e => updateState(e, eyeColor, setEyeColor)}
                                                    type='checkbox'
                                                    value={ec} />
                                            ))}

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Physique</Form.Label>

                                            {physiques.map(p => (
                                                <Form.Check
                                                    inline
                                                    label={p}
                                                    onClick={e => updateState(e, physique, setPhysique)}
                                                    type='checkbox'
                                                    value={p} />
                                            ))}

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label>Alcohol consumption</Form.Label>

                                            <Form.Select
                                                aria-label='alcohol'
                                                onChange={e => setAlcohol(e.target.value)}
                                                size='sm'
                                                value={alcohol}>

                                                <option></option>
                                                <option value='often'>Often</option>
                                                <option value='sometimes'>Sometimes</option>
                                                <option value='never'>Never</option>

                                            </Form.Select>

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label>Smoking habits</Form.Label>

                                            <Form.Select
                                                aria-label='smoke'
                                                onChange={e => setSmoke(e.target.value)}
                                                size='sm'
                                                value={smoke}>

                                                <option></option>
                                                <option value='often'>Often</option>
                                                <option value='sometimes'>Sometimes</option>
                                                <option value='never'>Never</option>

                                            </Form.Select>

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Profession</Form.Label>

                                            {professions.map(p => (
                                                <Form.Check
                                                    inline
                                                    label={p.label}
                                                    onClick={e => updateState(e, profession, setProfession)}
                                                    type='checkbox'
                                                    value={p.value} />
                                            ))}

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Have children</Form.Label>

                                            {[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }].map(c => (
                                                <Form.Check
                                                    inline
                                                    label={c.label}
                                                    onClick={e => updateState(e, haveChildren, setHaveChildren)}
                                                    type='checkbox'
                                                    value={c.value} />
                                            ))}

                                        </Form.Group>

                                        <Form.Group className='mb-3'>

                                            <Form.Label className='d-block'>Want children</Form.Label>

                                            {[{ label: 'Yes', value: 'yes' }, { label: 'No', value: 'no' }, { label: 'Not sure', value: 'notsure' }].map(c => (
                                                <Form.Check
                                                    inline
                                                    label={c.label}
                                                    onClick={e => updateState(e, wantChildren, setWantChildren)}
                                                    type='checkbox'
                                                    value={c.value} />
                                            ))}

                                        </Form.Group>

                                    </>

                                )}

                                <div className='d-grid gap-2'>

                                    <Button
                                        onClick={search}
                                        size='sm'
                                        type='submit'
                                        variant='success'>Search</Button>

                                    <span 
                                        id='advanced-search-button' 
                                        onClick={showAdvancedSearch}>{showAdvancedSearchSection ? 'Hide' : 'Show'} advanced search</span>

                                </div>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Row xs={1} sm={1} md={1} lg={1}>

                <Col>

                    <Card>

                        <Card.Header className='card-header'>

                            Online: 1435

                            <Pagination size='sm' className='float-end mb-0'>

                                <Pagination.Item active={true} className='mb-0'>1</Pagination.Item>

                                <Pagination.Item className='mb-0'>2</Pagination.Item>

                                <Pagination.Item className='mb-0'>3</Pagination.Item>

                                <Pagination.Item className='mb-0'>4</Pagination.Item>

                                <Pagination.Item className='mb-0'>5</Pagination.Item>

                            </Pagination>

                        </Card.Header>

                        <Card.Body>

                            <Row xs={2} sm={2} md={4} lg={6} className='g-4'>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                                <Col>

                                    <Card>

                                        <Card.Img variant='top' src={woman} />

                                        <Card.Body>

                                            <h6 className='fw-bold mb-0 fs-6 text'>Jane Doe (25)</h6>

                                            <p className='mb-0'>Stockholm, Sweden</p>

                                        </Card.Body>

                                    </Card>

                                </Col>

                            </Row>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <EditPictureModal member={member} show={showModal} hideModal={() => setShowModal(false)} />

        </Container>
    );
}

export default Home;