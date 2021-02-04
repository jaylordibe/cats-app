import {useParams} from 'react-router-dom';
import {Button, Card, Col, Row, Spinner} from 'react-bootstrap';
import React, {useEffect, useState} from 'react';
import CatService from '../../services/cat.service';

export default function CatInfoComponent() {

    const params = useParams();
    const catId = params ? params.catId : '';
    const [catInfo, setCatInfo] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CatService.getCatInfoById(catId).then((response) => {
            if (response && response.breeds && response.breeds.length) {
                setCatInfo(response);
                setLoading(false);
            }
        });
    }, [catId]);

    return (
        <React.Fragment>
            <Row className="justify-content-center">
                {
                    loading ?
                        <Col sm={12} className="text-center">
                            <Spinner animation="grow"/>
                        </Col>
                        :
                        <Col sm={6}>
                            <Card>
                                <Card.Img variant="top" src={catInfo.url} className="img-fluid"/>
                                <Card.Body>
                                    <Card.Title>{catInfo.breeds[0].name.toUpperCase()}</Card.Title>
                                    <Card.Text>
                                        Origin: {catInfo.breeds[0].origin}
                                    </Card.Text>
                                    <Card.Text>
                                        Description: {catInfo.breeds[0].description}
                                    </Card.Text>
                                    <Button href={`/?breed=${catInfo.breeds[0].id}`} variant="primary" block>Go
                                        Back</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                }
            </Row>
        </React.Fragment>
    );
}
