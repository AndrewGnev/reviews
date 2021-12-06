import React, { useCallback } from 'react';

import { Page } from '../../components/Page';
import { Button, Container, Table } from 'react-bootstrap';
import { cn } from '@bem-react/classname';

import './MainPage.css';
import { useReviews } from '../../hooks/queries/useReviews';
import { useHistory } from 'react-router-dom';
import { AiOutlineLike, AiOutlineStar } from 'react-icons/all';
import { GlobalLayout } from '../../layouts/GlobalLayout/GlobalLayout';


export interface MainPageProps {
    classname?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ classname }) => {

    const { reviews } = useReviews();

    const history = useHistory();
    const onOpenButtonClick = useCallback((reviewId: number) => {
        history.push(`/reviews/${reviewId}/read`)
    },[history])

    return (
        <Page className={cnMainPage(null, [classname])} title={''}>
            <GlobalLayout>
                <Container>
                    <Table>
                        <thead>
                            <tr>
                                <th className={cnMainPage('ReviewTitleCol')}>Title</th>
                                <th className={cnMainPage('ReviewLikesCol')}>Likes</th>
                                <th className={cnMainPage('ReviewGradesCol')}>Users` grade avg</th>
                                <th className={cnMainPage('ReviewOpenCol')}/>
                            </tr>
                        </thead>

                        <tbody>
                        { reviews ? (
                            reviews?.map((review) => (
                                <tr key = {review.id}>
                                    <th className={cnMainPage('ReviewTitleCol')}>
                                        {review.tittle}
                                    </th>
                                    <th className={cnMainPage('ReviewLikesCol')}>
                                        <AiOutlineLike/> {review.likesCount}
                                    </th>
                                    <th className={cnMainPage('ReviewGradesCol')}>
                                        <AiOutlineStar/> {review.usersGradesAvg}
                                    </th>
                                    <th className={cnMainPage('ReviewOpenCol')}>
                                        <Button variant="dark" onClick={() => onOpenButtonClick(review.id)}>
                                            open
                                        </Button>
                                    </th>
                                </tr>
                            ))): (
                            <>
                                No reviews
                            </>
                        )}
                        </tbody>
                    </Table>
                </Container>
            </GlobalLayout>
        </Page>
    );
};