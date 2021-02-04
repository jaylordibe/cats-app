import CatService from '../../services/cat.service';
import {Button, Card, Col, Form, Row, Spinner} from 'react-bootstrap';
import React, {Component} from 'react';
import PageUtil from '../../utils/page-util';

export default class CatList extends Component {

    page = 1;
    selectedBreedId = '';

    constructor(props) {
        super(props);
        this.state = {
            isLoadingBreeds: true,
            breeds: [],
            isLoadingCats: true,
            cats: [],
            breedParam: PageUtil.getParam('breed') ?? '',
            hasNextPage: false
        };
    }

    componentDidMount() {
        this.getBreeds();

        if (this.state.breedParam) {
            this.searchCats(this.state.breedParam);
        }
    }

    getBreeds() {
        CatService.getBreeds().then((response) => {
            const filteredBreeds = response.map((breed) => {
                return {
                    id: breed.id,
                    name: breed.name
                }
            });

            filteredBreeds.unshift({
                id: '',
                name: 'Select a breed'
            });

            this.setState({
                isLoadingBreeds: false,
                breeds: filteredBreeds
            });
        });
    }

    searchCats(breedId) {
        this.setState({
            isLoadingCats: true
        });

        if (breedId !== this.selectedBreedId) {
            this.setState({
                cats: []
            });
        }

        this.selectedBreedId = breedId;
        const payload = {
            breed_id: this.selectedBreedId,
            page: this.page,
            limit: 10
        };
        CatService.searchImages(payload).then((response) => {
            let newCats = response.filter(cat => this.isNotExistingCatInList(cat.id));
            this.setState({
                isLoadingCats: false,
                cats: this.state.cats.concat(newCats),
                hasNextPage: newCats.length === 10
            });
        });
    }

    isNotExistingCatInList(catId) {
        for (let count = 0; count < this.state.cats.length; count++) {
            const cat = this.state.cats[count];

            if (cat.id === catId) {
                return false;
            }
        }

        return true;
    }

    loadMore() {
        this.page++;
        this.searchCats(this.selectedBreedId);
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.isLoadingBreeds ?
                        <Col sm={12} className="text-center">
                            <Spinner animation="grow"/>
                        </Col>
                        :
                        <React.Fragment>
                            <Row className="justify-content-center">
                                <Col sm={5} className="text-center">
                                    <h2 className="mb-5">The Cats App</h2>
                                    <Form.Group>
                                        <Form.Control as="select" onChange={e => this.searchCats(e.target.value)}
                                                      value={this.state.breedParam}>
                                            {
                                                this.state.breeds.map((breed) => {
                                                    return <option key={breed.id} value={breed.id}>{breed.name}</option>
                                                })
                                            }
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className="mt-5">
                                {
                                    this.state.cats.map((cat) => {
                                        return (
                                            <Col key={cat.id} sm={3}>
                                                <Card>
                                                    <Card.Img variant="top" src={cat.url} style={{height: '10rem'}}/>
                                                    <Card.Body>
                                                        <Button href={`/${cat.id}`} variant="primary" block>View
                                                            Details</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                            {
                                this.selectedBreedId ?
                                    <Row>
                                        <Col sm={12} className="text-center">
                                            {
                                                this.state.isLoadingCats ?
                                                    <Button variant="primary" className='mt-5' disabled>
                                                        <Spinner as="span" animation="grow" size="sm" role="status"
                                                                 aria-hidden="true"/>
                                                    </Button>
                                                    :
                                                    this.state.hasNextPage ?
                                                        <Button variant="primary" className='mt-5'
                                                                onClick={() => this.loadMore()}>
                                                            Load More
                                                        </Button>
                                                        :
                                                        ''
                                            }
                                        </Col>
                                    </Row>
                                    :
                                    <p className="text-center">
                                        Please select a breed from the list.
                                    </p>
                            }
                        </React.Fragment>
                }
            </React.Fragment>
        );
    }
}
