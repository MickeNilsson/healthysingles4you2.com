import { Badge, Button, Card, Col, Container, Form, Image, Modal, Pagination, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

function OtherMemberHome(props) {

    const person_o = props.person;

    const [member, setMember] = useState({...person_o});

    useEffect(() => {

        const params_o = {
            fields: 'genderseek,countryseek,agefromseek,agetoseek,maindescription,country,city,weight,firstname,lastname,height,haircolor,eyecolor,physique,alcohol,smoke,marital,children,wantchildren,profession,partnerpreferences,genderseek,agefromseek,agetoseek,countryseek',
            id: member.id
        };

        axios.get('https://healthysingles4you2.com/api/members/', {
            params: params_o
        })
            .then(function (response_o) {
                debugger;
                if (response_o.status === 200) {
                    
                    setMember(response_o.data.data[0])
                }
            });

    }, []);

    return (
        <Container className='mt-3'>

            <Row xs={1} sm={1} md={1} lg={3}>

                <Col className='mb-3'>

                    <Card style={{ height: '376px' }}>

                        <Card.Header className='card-header'>

                            {member.firstname} {member.lastname}

                        </Card.Header>

                        <Card.Body>

                            <p style={{color: 'rgb(70, 193, 187)'}}>I'm...</p>

                            <p>{member.maindescription}</p>

                            <p>I live in {member.city}, {member.country}.</p>

                            <p style={{color: 'rgb(70, 193, 187)'}}>I'm looking for...</p>

                            A {member.genderseek} between {member.agefromseek} to {member.agetoseek} living in {member.countryseek}.&nbsp;

                            {member.partnerpreferences}

                        </Card.Body>

                    </Card>

                </Col>

                <Col className='mb-3'>

                    <Card style={{ height: '376px' }}>

                        <Card.Header className='card-header'>

                            Facts about me

                        </Card.Header>

                        <Card.Body>

                            <span  style={{color: 'rgb(70, 193, 187)'}}>Profession: </span><span style={{textTransform: 'capitalize'}}>{member.profession}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Physique: </span><span style={{textTransform: 'capitalize'}}>{member.physique}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Marital status: </span><span style={{textTransform: 'capitalize'}}>{member.marital}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Have children: </span><span style={{textTransform: 'capitalize'}}>{member.children}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Want (more) children: </span><span style={{textTransform: 'capitalize'}}>{member.wantchildren}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Hair color: </span><span style={{textTransform: 'capitalize'}}>{member.haircolor}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Eye color: </span><span style={{textTransform: 'capitalize'}}>{member.eyecolor}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Height: </span><span style={{textTransform: 'capitalize'}}>{member.height}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Weight: </span><span style={{textTransform: 'capitalize'}}>{member.weight}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Alcohol: </span><span style={{textTransform: 'capitalize'}}>{member.alcohol}</span><br />
                            <span  style={{color: 'rgb(70, 193, 187)'}}>Smoke: </span><span style={{textTransform: 'capitalize'}}>{member.smoke}</span><br />


                        </Card.Body>

                    </Card>

                </Col>

            </Row>

            

        </Container>
    );
}

export default OtherMemberHome;