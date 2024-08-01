import { Badge, Button, Card, Col, Container, Form, Image, Modal, Pagination, Row } from 'react-bootstrap';
import { useState } from 'react';

export default function EditPictureModal(props) {

    const member = props.member;

    const [isIncorrectFileType, setIsIncorrectFileType] = useState(false);

    function deleteProfilePicture() {

        const xhr = new XMLHttpRequest();

        xhr.open('DELETE', 'https://healthysingles4you2.com/api/profilepictures/?id=' + member.id);

        xhr.onload = (result_o) => {

            const response_o = JSON.parse(result_o.target.response);

            console.log(response_o);

            props.hideModal();
        };

        xhr.send();
    }

    function uploadPicture(e) {
     
        const file_o = e.target.files[0];

        // Check that the file type is either image/jpeg or image/png

        switch(file_o.type) {

            case 'image/jpeg':
            case 'image/png':

                break;

            default:

                // Incorrect file type

                setIsIncorrectFileType(true);

                return;
        }

        const fileExtension_s = file_o.name.split('.')[1]; // jpg or png

        const fileName_s = member.id + '.' + fileExtension_s;

        const formData_o = new FormData();

        formData_o.append('image', file_o);

        formData_o.append('fileName', fileName_s);

        const xhr = new XMLHttpRequest();

        xhr.open('POST', 'https://healthysingles4you2.com/api/profilepictures/');

        xhr.onload = (result_o) => {

            const response_o = JSON.parse(result_o.target.response);

            console.log(response_o);

            props.hideModal();
        };

        xhr.send(formData_o);
    }

    return (

        <Modal show={props.show} size='sm'>

            <Modal.Header>

                <Modal.Title>Edit profile picture</Modal.Title>

            </Modal.Header>

            <Modal.Body>

                <Image style={{marginBottom: '10px', cursor: 'pointer', width: '130px', display: 'inline-block', float: 'left' }} src={'https://healthysingles4you2.com/api/profilepictures/?id=' + member.id + '&gender=' + member.gender + '&cachebuster=' + Math.random()} rounded />

                <Button onClick={deleteProfilePicture} className='bi bi-trash' variant='light'></Button>

                <Form.Group controlId='profile-picture-file-input'>

                    <Form.Control className='mt-3' isInvalid={isIncorrectFileType} type='file' onChange={uploadPicture} />

                    <Form.Control.Feedback type='invalid'>

                        Incorrect file type

                    </Form.Control.Feedback>

                </Form.Group>

            </Modal.Body>

            <Modal.Footer>

                <Button size='sm' variant='secondary' onClick={() => props.hideModal()}>Close</Button>

            </Modal.Footer>

        </Modal>
    );
}