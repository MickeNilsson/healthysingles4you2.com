import { Badge, Button, Card, Col, Container, Form, Image, Modal, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function Settings({ member, setMember, setPage }) {

    const [ageFromSeek, setAgeFromSeek] = useState('');

    const [ages, setAges] = useState([]);

    const [ageToSeek, setAgeToSeek] = useState('');

    const [alcohol, setAlcohol] = useState('');

    const [birthYears, setBirthYears] = useState([]);

    const [daysInMonth, setDaysInMonth] = useState([]);

    const [birthYear, setBirthYear] = useState(0);

    const [birthMonth, setBirthMonth] = useState(0);

    const [birthDay, setBirthDay] = useState(0);

    const [city, setCity] = useState('');

    const [children, setChildren] = useState('');

    const [countries, setCountries] = useState([]);

    const [country, setCountry] = useState('');

    const [countrySeek, setCountrySeek] = useState('');

    const [email, setEmail] = useState('');

    const [emailIsValid, setEmailIsValid] = useState(true);

    const [eyeColor, setEyeColor] = useState('');

    const [eyeColors, setEyeColors] = useState([])

    const [firstName, setFirstName] = useState('');

    const [genderSeek, setGenderSeek] = useState('');

    const [height, setHeight] = useState(0);

    const [heights, setHeights] = useState([]);

    const [lastName, setLastName] = useState('');

    const [gender, setGender] = useState(0);

    const [hairColor, setHairColor] = useState('');

    const [hairColors, setHairColors] = useState([]);

    const [mainDescription, setMainDescription] = useState('');

    const [marital, setMarital] = useState('');

    const [partnerPreferences, setPartnerPreferences] = useState('');

    const [physique, setPhysique] = useState('');

    const [physiques, setPhysiques] = useState([]);

    const [profession, setProfession] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [showValidation, setShowValidation] = useState(false);

    const [smoke, setSmoke] = useState('');

    const [weight, setWeight] = useState(0);

    const [wantChildren, setWantChildren] = useState('');

    const [weights, setWeights] = useState([]);

    useEffect(() => {

        const ages_a = [];

        for(let age_i = 18; age_i < 100; ++age_i) {

            ages_a.push(age_i);
        }

        setAges(ages_a);

        createBirthYears();

        createDaysInMonth();

        createCountryNames();

        setAgeFromSeek(member.agefromseek);

        setAgeToSeek(member.agetoseek);

        setAlcohol(member.alcohol || '');

        setChildren(member.children || '');

        setCountrySeek(member.countryseek || '');

        setFirstName(member.firstname || '');

        setLastName(member.lastname || '');

        setBirthYear(member.birthdate ? member.birthdate.substring(0, 4) : 0);

        setBirthMonth(member.birthdate ? member.birthdate.substring(5, 7) : 0);

        setBirthDay(member.birthdate ? member.birthdate.substring(8, 10) : 0);

        setGender(member.gender || '');

        setGenderSeek(member.genderseek || '');

        setHeight(member.height);

        setEmail(member.email || '');

        setMainDescription(member.maindescription || '');

        setPartnerPreferences(member.partnerpreferences || '');

        setCountry(member.country || '');

        setCity(member.city || '');

        setEyeColor(member.eyecolor);

        const eyeColors_a = [
            'Blue', 'Brown', 'Green', 'Grey'
        ];

        setEyeColors(eyeColors_a);

        setHairColor(member.haircolor);

        const hairColors_a = [
            'Black', 'Blonde', 'Brown', 'Light brown', 'Grey/White', 'Red', 'Bald/Shaved'
        ];

        setHairColors(hairColors_a);

        setMarital(member.marital || '');

        setPhysique(member.physique || '');

        const physiques_a = ['petite', 'small', 'athletic', 'muscular', 'average', 'curvy', 'big'];

        setPhysiques(physiques_a);

        setProfession(member.profession || '');

        setSmoke(member.smoke || '');

        setWantChildren(member.wantchildren || '');

        setWeight(member.weight);

        const heights_a = [];

        for (let height_i = 100; height_i < 250; ++height_i) {

            heights_a.push(height_i);
        }

        setHeights(heights_a);

        const weights_a = [];

        for (let weight_i = 40; weight_i < 200; ++weight_i) {

            weights_a.push(weight_i);
        }

        setWeights(weights_a);

    }, []);

    function createBirthYears() {

        const years_a = [];

        for (let year_i = 2005; year_i > 1940; --year_i) {

            years_a.push(year_i);
        }

        setBirthYears(years_a);
    }

    function createDaysInMonth() {

        const daysInMonth_a = [];

        for (let day_i = 1; day_i <= 31; ++day_i) {

            daysInMonth_a.push(day_i);
        }

        setDaysInMonth(daysInMonth_a);
    }

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

    function emailChange(e2) {

        setEmail(e2.target.value);

        validateEmail(e2.target.value);
    }

    function firstNameChange(e) {

        setFirstName(e.target.value);
    }

    function updateSettings(e) {

        e.preventDefault();

        e.stopPropagation();

        setShowValidation(true);

        validateEmail(email);

        if (emailIsValid && firstName && lastName && birthYear != 0 && birthMonth != 0 && birthDay != 0 && country != 0 && city && gender != 0) {
            debugger;
            const payload_o = {
                alcohol: alcohol,
                agefromseek: ageFromSeek,
                agetoseek: ageToSeek,
                children: children,
                countryseek: countrySeek,
                firstname: firstName,
                lastname: lastName,
                physique: physique,
                email: email,
                eyecolor: eyeColor,
                birthdate: birthYear + '-' + birthMonth + '-' + birthDay,
                city: city,
                country: country,
                height: height || 0,
                id: member.id,
                gender: gender,
                genderseek: genderSeek,
                haircolor: hairColor || '',
                maindescription: mainDescription,
                marital: marital,
                partnerpreferences: partnerPreferences,
                profession: profession,
                smoke: smoke,
                wantchildren: wantChildren,
                weight: weight || 0
            };

            setMember({ ...payload_o, isLoggedIn: true });

            axios.put('https://healthysingles4you2.com/api/members/', payload_o)

                .then(function (response_o) {

                    setShowModal(true);
                });
        }
    }

    function validateEmail(email_s) {

        const regEx = /^[^@]+@[^@]+\.[^@]+$/;

        const emailIsValid = email_s.match(regEx);

        setEmailIsValid(!!emailIsValid);
    }

    return (

        <Container className='mt-3'>

            <Row xs={1} sm={1} md={1} lg={1}>

                <Col>

                    <Card>

                        <Card.Header className='card-header'>

                            Settings

                        </Card.Header>

                        <Card.Body>

                            <Form onSubmit={updateSettings}>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="first-name">

                                            <Form.Label>First name</Form.Label>

                                            <Form.Control
                                                autoComplete='given-name'
                                                isInvalid={!firstName && showValidation}
                                                isValid={firstName && showValidation}
                                                onChange={firstNameChange}
                                                placeholder='First name'
                                                size='sm'
                                                type='text'
                                                value={firstName} />

                                            <Form.Control.Feedback type="invalid">
                                                Please enter a first name.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="last-name">

                                            <Form.Label>Last name</Form.Label>

                                            <Form.Control
                                                autoComplete='family-name'
                                                isInvalid={!lastName && showValidation}
                                                isValid={lastName && showValidation}
                                                onChange={(e) => setLastName(e.target.value)}
                                                placeholder='Last name'
                                                size='sm'
                                                type='text'
                                                value={lastName} />

                                            <Form.Control.Feedback type="invalid">
                                                Please enter a last name.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="gender">

                                            <Form.Label>Gender</Form.Label>

                                            <Form.Select
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                aria-label="Gender"
                                                size="sm"
                                                isInvalid={gender == 0 && showValidation}
                                                isValid={gender != 0 && showValidation}>

                                                <option value="0">Choose gender</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please choose a gender.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="year">

                                            <Form.Label>Birth year</Form.Label>

                                            <Form.Select
                                                value={birthYear}
                                                onChange={(e) => setBirthYear(e.target.value)}
                                                aria-label="year"
                                                size="sm"
                                                isInvalid={birthYear == 0 && showValidation}
                                                isValid={birthYear != 0 && showValidation}>

                                                <option value="0">Choose year</option>

                                                {birthYears.map(birthYear_i => <option key={birthYear_i} value={birthYear_i}>{birthYear_i}</option>)}

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please choose a year.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="month">

                                            <Form.Label>Birth month</Form.Label>

                                            <Form.Select
                                                value={birthMonth}
                                                onChange={(e) => setBirthMonth(e.target.value)}
                                                aria-label="month"
                                                size="sm"
                                                isInvalid={birthMonth == 0 && showValidation}
                                                isValid={birthMonth != 0 && showValidation}>
                                                <option value="0">Choose month</option>
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">Mars</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please choose a month.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="day">

                                            <Form.Label>Birth day</Form.Label>

                                            <Form.Select
                                                value={birthDay}
                                                onChange={(e) => setBirthDay(e.target.value)}
                                                aria-label="day"
                                                size="sm"
                                                isInvalid={birthDay == 0 && showValidation}
                                                isValid={birthDay != 0 && showValidation}>

                                                <option value="0">Choose day</option>

                                                {daysInMonth.map(day_i => <option key={day_i} value={day_i < 10 ? '0' + day_i : day_i}>{day_i}</option>)}

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please choose a day.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="country">

                                            <Form.Label>Country</Form.Label>

                                            <Form.Select
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                aria-label="country"
                                                size="sm"
                                                isInvalid={country == 0 && showValidation}
                                                isValid={country != 0 && showValidation}>

                                                <option value="0">Choose country</option>

                                                {countries.map(country_s => <option key={country_s} value={country_s}>{country_s}</option>)}

                                            </Form.Select>

                                            <Form.Control.Feedback type="invalid">
                                                Please choose a country.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="city">

                                            <Form.Label>City</Form.Label>

                                            <Form.Control
                                                autoComplete='address-level2'
                                                isInvalid={!city && showValidation}
                                                isValid={city && showValidation}
                                                onChange={(e) => setCity(e.target.value)}
                                                placeholder='City'
                                                size='sm'
                                                type='text'
                                                value={city} />

                                            <Form.Control.Feedback type="invalid">
                                                Please enter a city.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="email">

                                            <Form.Label>Email address</Form.Label>

                                            <Form.Control
                                                autoComplete='email'
                                                isInvalid={!emailIsValid && showValidation}
                                                isValid={emailIsValid && showValidation}
                                                onChange={emailChange}
                                                placeholder='E-mail'
                                                size='sm'
                                                type='email'
                                                value={email} />

                                            <Form.Control.Feedback type="invalid">
                                                Please enter your e-mail.
                                            </Form.Control.Feedback>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={1} md={1} lg={1}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="maindescription">

                                            <Form.Label>Main description of me</Form.Label>

                                            <Form.Control as="textarea" rows={3} value={mainDescription} onChange={(e) => { setMainDescription(e.target.value) }} />

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={1} md={1} lg={1}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="partnerpreferences">

                                            <Form.Label>What do you look for in a partner?</Form.Label>

                                            <Form.Control as="textarea" rows={3} value={partnerPreferences} onChange={(e) => { setPartnerPreferences(e.target.value) }} />

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <h5>Appearance</h5>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="height">

                                            <Form.Label>Height</Form.Label>

                                            <Form.Select
                                                aria-label='height'
                                                isValid={showValidation}
                                                value={height}
                                                onChange={(e) => setHeight(e.target.value)}
                                                size='sm'>

                                                <option value="0">Choose height</option>

                                                {heights.map(h => <option key={h} value={h}>{h} cm</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="weight">

                                            <Form.Label>Weight</Form.Label>

                                            <Form.Select
                                                aria-label='weight'
                                                isValid={showValidation}
                                                value={weight}
                                                onChange={(e) => setWeight(e.target.value)}
                                                size='sm'>

                                                <option value="0">Choose weight</option>

                                                {weights.map(w => <option key={w} value={w}>{w} kg</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="hair-color">

                                            <Form.Label>Hair color</Form.Label>

                                            <Form.Select
                                                aria-label='hair-color'
                                                isValid={showValidation}
                                                value={hairColor}
                                                onChange={(e) => setHairColor(e.target.value)}
                                                size='sm'>

                                                <option value="0">Choose hair color</option>

                                                {hairColors.map(hc => <option key={hc} value={hc}>{hc}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="eye-color">

                                            <Form.Label>Eye color</Form.Label>

                                            <Form.Select
                                                aria-label='eye-color'
                                                isValid={showValidation}
                                                value={eyeColor}
                                                onChange={(e) => setEyeColor(e.target.value)}
                                                size='sm'>

                                                <option value="0">Choose eye color</option>

                                                {eyeColors.map(ec => <option key={ec} value={ec}>{ec}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='physique'>

                                            <Form.Label>Physique</Form.Label>

                                            <Form.Select
                                                aria-label='physique'
                                                isValid={showValidation}
                                                value={physique}
                                                onChange={(e) => setPhysique(e.target.value)}
                                                size='sm'>

                                                <option value='0'>Choose physique</option>

                                                {physiques.map(ph => <option key={ph} value={ph}>{ph}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <h5>Lifestyle</h5>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='alcohol'>

                                            <Form.Label style={{ display: 'block' }}>How often do you drink alcohol?</Form.Label>

                                            <Form.Select
                                                aria-label='alcolhol'
                                                isValid={showValidation}
                                                value={alcohol}
                                                onChange={(e) => setAlcohol(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='often'>Often</option>
                                                <option value='sometimes'>Sometimes</option>
                                                <option value='never'>Never</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='smoke'>

                                            <Form.Label>How often do you smoke?</Form.Label>

                                            <Form.Select
                                                aria-label='smoke'
                                                isValid={showValidation}
                                                value={smoke}
                                                onChange={(e) => setSmoke(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='often'>Often</option>
                                                <option value='sometimes'>Sometimes</option>
                                                <option value='never'>Never</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='marital'>

                                            <Form.Label>Marital status</Form.Label>

                                            <Form.Select
                                                aria-label='marital'
                                                isValid={showValidation}
                                                value={marital}
                                                onChange={(e) => setMarital(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='single'>Single</option>
                                                <option value='separated'>Separated</option>
                                                <option value='widow'>Widow(er)</option>
                                                <option value='divorced'>Divorced</option>
                                                <option value='Other'>Other</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='children'>

                                            <Form.Label>Do you have children?</Form.Label>

                                            <Form.Select
                                                aria-label='children'
                                                isValid={showValidation}
                                                value={children}
                                                onChange={(e) => setChildren(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='yes'>Yes</option>
                                                <option value='no'>No</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='want-children'>

                                            <Form.Label>Do you want (more) children?</Form.Label>

                                            <Form.Select
                                                aria-label='want-children'
                                                isValid={showValidation}
                                                value={wantChildren}
                                                onChange={(e) => setWantChildren(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='yes'>Yes</option>
                                                <option value='no'>No</option>
                                                <option value='notsure'>Not sure</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className='mb-3' controlId='profession'>

                                            <Form.Label>Profession</Form.Label>

                                            <Form.Select
                                                aria-label='profession'
                                                isValid={showValidation}
                                                value={profession}
                                                onChange={(e) => setProfession(e.target.value)}
                                                size='sm'>

                                                <option value='0'></option>
                                                <option value='unemployed'>Unemployed</option>
                                                <option value='student'>Student</option>
                                                <option value='retired'>Retired</option>
                                                <option value='admin'>Administrative work</option>
                                                <option value='police'>Police/Guard/Safety personnel</option>
                                                <option value='fireman'>Fireman</option>
                                                <option value='farming'>Farming/Agriculture</option>
                                                <option value='manager'>Manager/HR</option>
                                                <option value='hairdresser'>Hairdresser</option>
                                                <option value='dentist'>Dentist</option>
                                                <option value='self-employed'>Self-employed</option>
                                                <option value='it'>IT</option>
                                                <option value='military'>Military</option>
                                                <option value='entertainment'>Entertainment/Media</option>
                                                <option value='economist'>Ekonom</option>
                                                <option value='education'>Education</option>
                                                <option value='sales'>Sales</option>
                                                <option value='construction'>Construction</option>
                                                <option value='politics'>Politics</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <h5>Matching criteria</h5>

                                <Row xs={1} sm={3} md={3} lg={3}>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="gender-seek">

                                            <Form.Label>I'm looking for</Form.Label>

                                            <Form.Select
                                                isValid={showValidation}
                                                value={genderSeek}
                                                onChange={(e) => setGenderSeek(e.target.value)}
                                                aria-label="Gender seek"
                                                size="sm">

                                                <option value="0"></option>
                                                <option value="male">Man</option>
                                                <option value="female">Woman</option>
                                                <option value="both">Both</option>

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3 d-inline-block" controlId="age-from-seek">

                                            <Form.Label>Age</Form.Label>

                                            <Form.Select
                                                value={ageFromSeek}
                                                onChange={(e) => setAgeFromSeek(e.target.value)}
                                                aria-label="From"
                                                size="sm">

                                                <option value="0"></option>
                                                {ages.map(age_i => <option key={age_i} value={age_i}>{age_i}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                        <span className='ms-1 me-1'>to</span>

                                        <Form.Group className="mb-3 d-inline-block" controlId="age-to-seek">

                                            <Form.Label></Form.Label>

                                            <Form.Select
                                                value={ageToSeek}
                                                onChange={(e) => setAgeToSeek(e.target.value)}
                                                aria-label="To"
                                                size="sm">

                                                <option value="0"></option>
                                                {ages.map(age_i => <option key={age_i} value={age_i}>{age_i}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                    <Col>

                                        <Form.Group className="mb-3" controlId="country-seek">

                                            <Form.Label>That lives in</Form.Label>

                                            <Form.Select
                                                value={countrySeek}
                                                onChange={(e) => setCountrySeek(e.target.value)}
                                                aria-label="country-seek"
                                                size="sm">

                                                <option value="0">Choose country</option>

                                                {countries.map(country_s => <option key={country_s} value={country_s}>{country_s}</option>)}

                                            </Form.Select>

                                        </Form.Group>

                                    </Col>

                                </Row>

                                <Button className="float-end" type="submit" variant="success" size="sm">Save</Button>

                            </Form>

                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            <Modal show={showModal} size='sm'>

                <Modal.Body>Your information has been saved</Modal.Body>

                <Modal.Footer>

                    <Button variant='primary' size='sm' onClick={() => setShowModal(false)}>
                        OK
                    </Button>

                </Modal.Footer>

            </Modal>

        </Container>
    );
}