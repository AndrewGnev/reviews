import { cn } from '@bem-react/classname';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import React, { FormEvent, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { QueryKey } from '../../queryClient';
import { useMe } from '../../hooks/queries/useMe';

import './GlobalLayout.css';

export interface GlobalLayoutProps {
    className?: string;
}

export interface SearchParams {
    text?: string;
}

const cnGlobalLayout = cn('GlobalLayout');

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({ className, children }) => {

    const history = useHistory();

    const { text } = useParams<SearchParams>();
    const queryClient = useQueryClient();

    const { me } = useMe();

    const onMeClick = useCallback(() => {
        history.push("/me");
    },[history])

    const onAuthButtonClick = useCallback(() => {
        history.push("/signIn");
    },[history])

    const onMainButtonClick = useCallback(() => {
        history.push("/");
    },[history])

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { elements } = event.currentTarget;

        const text = (elements.namedItem('searchingText') as HTMLInputElement).value;

        await queryClient.resetQueries(QueryKey.FOUND_REVIEWS);

        history.push(`/reviews/search/result/${encodeURIComponent(text)}`);

    }, [history, queryClient])

    return (
        <Container className={cnGlobalLayout(null, [className])}>

            <Row className="align-items-baseline">
                <Col className={cnGlobalLayout('Top')} md={{span: 2, offset: 0}} onClick={onMainButtonClick}>
                    <b>Reviews</b>
                </Col>
                {me ? (
                    <Col className={cnGlobalLayout('Top')} md={{span: 2, offset: 8}} onClick={onMeClick}>
                        {me.username}
                    </Col>
                ) : (
                    <Col className={cnGlobalLayout('Top')} md={{span: 1, offset: 9}} onClick={onMeClick}>
                        <div onClick={onAuthButtonClick}>authenticate</div>
                    </Col>
                )}
            </Row>

            <Row>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId='searchingText'>
                        <Form.Label>search reviews</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control type="text" defaultValue={text}/>
                            </Col>
                            <Col md={1}>
                                <Button variant="dark" type="submit">search</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>
            </Row>

            <div>
                {children}
            </div>

        </Container>
    );
};