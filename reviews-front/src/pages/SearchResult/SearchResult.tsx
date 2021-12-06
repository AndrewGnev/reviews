import React, { useCallback, useEffect } from 'react';
import { Review } from '../../api/data/Review';
import { Button, Table } from 'react-bootstrap';
import { cn } from '@bem-react/classname';
import { AiOutlineLike, AiOutlineStar } from 'react-icons/all';
import { useHistory, useParams } from 'react-router-dom';
import { useSearchReviews } from '../../hooks/queries/useSearchReviews';
import { Page } from '../../components/Page';
import { GlobalLayout } from '../../layouts/GlobalLayout/GlobalLayout';

export interface SearchResultProps {
    className?: string;
}

export interface SearchResultParams {
    text?: string;
}

const cnSearchResult = cn('SearchResult');

export const SearchResult: React.FC<SearchResultProps> = ({ className }) => {

    const { text } = useParams<SearchResultParams>();
    const { reviews } = useSearchReviews(text || '');

    const history = useHistory();
    const onOpenButtonClick = useCallback((reviewId: number) => {
        history.push(`/reviews/${reviewId}/read`)
    },[history]);

    return (
        <Page title={`Search results for "${text}"`}>
            <GlobalLayout>
                <Table>
                    <thead>
                        <tr>
                            <th className={cnSearchResult('ReviewTitleCol')}>Title</th>
                            <th className={cnSearchResult('ReviewLikesCol')}>Likes</th>
                            <th className={cnSearchResult('ReviewGradesCol')}>Users` grade avg</th>
                            <th className={cnSearchResult('ReviewOpenCol')}/>
                        </tr>
                    </thead>
                    <tbody>
                    {reviews ? reviews.map((review) => (
                            <tr key = {review.id}>
                                <th className={cnSearchResult('ReviewTitleCol')}>
                                    {review.tittle}
                                </th>
                                <th className={cnSearchResult('ReviewLikesCol')}>
                                    <AiOutlineLike/> {review.likesCount}
                                </th>
                                <th className={cnSearchResult('ReviewGradesCol')}>
                                    <AiOutlineStar/> {review.usersGradesAvg}
                                </th>
                                <th className={cnSearchResult('ReviewOpenCol')}>
                                    <Button variant="dark" onClick={() => onOpenButtonClick(review.id)}>
                                        open
                                    </Button>
                                </th>
                            </tr>
                        )): (
                            <>
                                No reviews
                            </>
                        )}
                    </tbody>
                </Table>
            </GlobalLayout>
        </Page>
    )
}