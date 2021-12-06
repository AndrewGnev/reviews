import React, { useCallback } from 'react';
import { cn } from '@bem-react/classname';
import { AuthenticatedGuard } from '../../components/guards/AuthenticatedGuard';
import { Page } from '../../components/Page';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { AiOutlineLike, AiOutlineStar } from 'react-icons/all';
import { useMe } from '../../hooks/queries/useMe';
import { useHistory } from 'react-router-dom';
import { useDeleteReview } from '../../hooks/queries/useDeleteReview';
import { GlobalLayout } from '../../layouts/GlobalLayout/GlobalLayout';


export interface MePageProps {
    className?: string;
}

const cnMePage = cn('MePage');

export const MePage: React.FC<MePageProps> = ({ className }) => {

    const { me } = useMe();

    const history = useHistory();

    const onEditButtonClick = useCallback((reviewId: number) => {
            history.push(`/reviews/${reviewId}/edit`);
    },[history])

    const onReadButtonClick = useCallback((reviewId: number) => {
        history.push(`/reviews/${reviewId}/read`);
    },[history])

    const deleteReview = useDeleteReview();
    const onDeleteButtonClick = useCallback((reviewId: number) => {
        deleteReview(reviewId);
    },[deleteReview])

    const onCreateButtonClick = useCallback(() => {
        history.push('/me/reviews/create');
    },[history])

    return (
        <AuthenticatedGuard redirectUrl="/signIn">
            <Page className={cnMePage(null, [className])} title="Your profile">
                <GlobalLayout>
                    <Container>
                        <Row>
                            <Col>
                                { me?.username } ({ me?.provider })
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                Your reviews:
                            </Col>
                        </Row>
                        { me?.reviews && me.reviews.length > 0 ? (
                            me.reviews.map((review) => (
                                <Row className="mb-1" key = {review.id}>
                                    <Col sm={7}>
                                        {review.tittle}
                                    </Col>
                                    <Col>
                                        <Button variant="dark" onClick={() => onReadButtonClick(review.id)}>
                                            read
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="dark" onClick={() => onEditButtonClick(review.id)}>
                                            edit
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button variant="dark" onClick={() => onDeleteButtonClick(review.id)}>
                                            delete
                                        </Button>
                                    </Col>
                                    <Col sm={1}>
                                        <AiOutlineLike/> {review.likesCount}
                                    </Col>
                                    <Col sm={1}>
                                        <AiOutlineStar/> {review.usersGradesAvg}
                                    </Col>
                                </Row>
                            ))
                        ) : (
                            <Row>
                                <Col>
                                    You didn`t upload reviews yet
                                </Col>
                            </Row>
                        )}
                        <Row>
                            <Button variant="outline-dark" onClick={onCreateButtonClick}>
                                Create new review
                            </Button>
                        </Row>
                    </Container>
                </GlobalLayout>
            </Page>
        </AuthenticatedGuard>
    )
}