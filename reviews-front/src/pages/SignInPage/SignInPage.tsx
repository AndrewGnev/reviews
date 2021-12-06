import React from 'react';

import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { BsFacebook, BsGithub, BsGoogle } from 'react-icons/all';
import { cn } from '@bem-react/classname';

import { Page } from '../../components/Page';

import './SignInPage.css';
import { baseUrl } from '../../config';
import { NotAuthenticatedGuard } from '../../components/guards/NotAuthenticatedGuard';

export interface SignInPageProps {
    classname?: string;
}

const cnSignInPage = cn('SignInPage');

export const SignInPage: React.FC<SignInPageProps> = ({ classname }) => {

    return (
        <NotAuthenticatedGuard redirectUrl="/">
            <Page className={cnSignInPage(null, [classname])} title="Sign in">
                <Container>
                    <Row className="d-flex align-items-center">
                        <Col md={{ span: 4, offset: 4 }}>
                            <Card>
                                <Card.Header>Sign in with</Card.Header>
                                <Card.Text className="d-grid gap-2 p-2">
                                    <Button href={`${baseUrl}/oauth2/authorization/github`} variant="outline-dark"><span
                                        className="align-middle">GitHub</span> <BsGithub/></Button>
                                    <Button href={`${baseUrl}/oauth2/authorization/facebook`}
                                            variant="outline-dark"><span
                                        className="align-middle">Facebook</span><BsFacebook/></Button>
                                    <Button href={`${baseUrl}/oauth2/authorization/google`} variant="outline-dark"><span
                                        className="align-middle">Google</span> <BsGoogle/></Button>
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Page>
        </NotAuthenticatedGuard>
    );
};