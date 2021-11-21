import React from 'react';

import { Page } from '../../components/Page';
import { Col, Container, Row } from 'react-bootstrap';
import { cn } from '@bem-react/classname';

import './MainPage.css';
import { AuthenticatedGuard } from '../../components/guards/AuthenticatedGuard';

export interface MainPageProps {
    classname?: string;
}

const cnMainPage = cn('MainPage');

export const MainPage: React.FC<MainPageProps> = ({ classname }) => {

    return (
        <AuthenticatedGuard redirectUrl="/signIn">
            <Page className={cnMainPage(null, [classname])} title={''}>
                <Container>
                    <Row>
                        <Col>

                        </Col>
                    </Row>
                </Container>
            </Page>
        </AuthenticatedGuard>
    );
};