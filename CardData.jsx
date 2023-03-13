import React from 'react';
import { Row,Col,Card,CardImg,CardBody,CardTitle,CardSubtitle,CardText, CardDeck } from 'reactstrap';

const CardData=({repositories})=>{
    return(
        <>
        <Row className='my-2 d-flex align-items-center justify-content-center'>
        {repositories && repositories.map((repo)=>(
            <Col xs="10" md="4" lg="2" className='my-2'>
                <Card>
                    <CardImg top width="100%" src={repo.owner.avatar_url} alt={`${repo.owner.login}'s avatar`} />
                        <CardBody>
                            <CardTitle tag={"h5"}>{repo.name}</CardTitle>
                            <CardSubtitle>{repo.stargazers_count} stars</CardSubtitle>
                            <CardText className='d-inline-block text-truncate w-100'>{repo.description}</CardText>
                            <CardText>{repo.language}</CardText>
                        </CardBody>
                </Card>
            </Col>
        ))}
        </Row>
        </>
    )
}

export default CardData;