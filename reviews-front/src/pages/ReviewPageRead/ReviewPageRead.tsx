import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { cn } from '@bem-react/classname';
import { Button, Carousel, Col, Container, Row } from 'react-bootstrap';
import { AiFillStar, AiOutlineLike, AiOutlineStar, ImStarHalf } from 'react-icons/all';

import { Page } from '../../components/Page';
import { AuthenticatedGuard } from '../../components/guards/AuthenticatedGuard';
import { useReview } from '../../hooks/queries/useReview';
import { useMe } from '../../hooks/queries/useMe';
import { useLike } from '../../hooks/queries/useLike';
import { useGrade } from '../../hooks/queries/useGrade';

import './ReviewPageRead.css';
import { GlobalLayout } from '../../layouts/GlobalLayout/GlobalLayout';

export interface ReviewPageReadParams {
    reviewId: string;
}

export interface ReviewPageReadProps {
    className?: string
}

const cnReviewPage = cn('ReviewPageRead');

export const ReviewPageRead: React.FC<ReviewPageReadProps> = ({ className }) => {
    const { reviewId } = useParams<ReviewPageReadParams>();

    const { me } = useMe();
    const { review } = useReview(reviewId, 'read');

    const likeReview = useLike();
    const onLikeButtonClick = useCallback(async (reviewId) => {
        await likeReview(reviewId);
    },[likeReview])

    const gradeReview = useGrade();
    const onGradeButtonClick = useCallback(async (reviewId, grade) => {
        await gradeReview(reviewId, grade);
    }, [gradeReview]);


    return (
        <Page className={cnReviewPage(null, [className])} title={`Review - read`}>
            <GlobalLayout>
                <Container>
                    <Row className="justify-content-md-center">
                        <h1 className="text-center">{review?.tittle}</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col className="text-md-center">
                            <h5>author: {review?.author.username}, author's grade: {review?.grade} <AiOutlineStar/></h5>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <div dangerouslySetInnerHTML={review?.content ? {__html: review?.content} : undefined} />
                    </Row>
                    <Row className="justify-content-md-center">
                        {review?.imagesUrls && review.imagesUrls.length > 0 && (
                            <Carousel>
                                {review.imagesUrls.map((url) => (
                                    <Carousel.Item key={url}>
                                        <img style={{width: '100vw', height: 'auto'}} src={`${url}`} alt="Failed to download"/>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        )}
                    </Row>
                    <Row>
                        categories: {review?.categories.join(', ')}
                    </Row>
                    <Row>
                        tags: {review?.tagsNames.join(', ')}
                    </Row>
                    <Row className="justify-content-between px-3">
                        <Col md="auto">
                            {review?.author.id !== me?.id ? (
                                <Button variant="outline-dark" onClick={() => onLikeButtonClick(review?.id)}>
                                    <AiOutlineLike className={cnReviewPage('LikeButton', { active: true })} />
                                    {' '}
                                    {review?.likesCount}
                                </Button>
                            ) : (
                                <>
                                    <AiOutlineLike className={cnReviewPage('LikeButton')} />
                                    {' '}
                                    {review?.likesCount}
                                </>
                            )}
                        </Col>

                        <Col md="auto">
                            {[0, 1, 2, 3, 4].map(grade =>
                                review?.author.id !== me?.id ? (
                                    <Button key={grade} variant="outline-dark" onClick={() => onGradeButtonClick(review?.id, grade + 1)}>
                                        {review?.usersGradesAvg ? review.usersGradesAvg <= grade ? (
                                            <AiOutlineStar/>
                                        ) : review.usersGradesAvg < grade + 1 ? (
                                            <ImStarHalf/>
                                        ) : (
                                            <AiFillStar/>
                                        ) : (
                                            <AiOutlineStar/>
                                        )}
                                    </Button>
                                ) : (
                                    <React.Fragment key={grade}>
                                        {review?.usersGradesAvg ? review.usersGradesAvg <= grade ? (
                                            <AiOutlineStar/>
                                        ) : review.usersGradesAvg < grade + 1 ? (
                                            <ImStarHalf/>
                                        ) : (
                                            <AiFillStar/>
                                        ) : (
                                            <AiOutlineStar/>
                                        )}
                                    </React.Fragment>
                                )
                            )}
                        </Col>
                    </Row>
                </Container>
            </GlobalLayout>
        </Page>
    )
};
