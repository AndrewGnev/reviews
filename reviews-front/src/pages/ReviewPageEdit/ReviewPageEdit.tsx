import { cn } from '@bem-react/classname';
import React, { FormEvent, useCallback } from 'react';
import { Page } from '../../components/Page';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { AuthenticatedGuard } from '../../components/guards/AuthenticatedGuard';
import { useHistory, useParams } from 'react-router-dom';
import { useMe } from '../../hooks/queries/useMe';
import { useReview } from '../../hooks/queries/useReview';
import { useCategories } from '../../hooks/queries/useCategories';
import { useUpdateReview } from '../../hooks/queries/useUpdateReview';

export interface ReviewPageEditParams {
    reviewId: string;
}

export interface ReviewPageEditProps {
    className?: string
}

const cnReviewPage = cn('ReviewPage')

export const ReviewPageEdit: React.FC<ReviewPageEditProps> = ({ className }) => {
    const { reviewId } = useParams<ReviewPageEditParams>();

    const history = useHistory();

    const { me } = useMe();
    const { review } = useReview(reviewId, 'edit');
    const { categories } = useCategories();
    const updateReview = useUpdateReview();

    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!review) {
            return;
        }

        const { elements } = event.currentTarget;

        const tittle = (elements.namedItem('tittle') as HTMLInputElement).value;
        const grade = Number((elements.namedItem('grade') as HTMLSelectElement).value);
        const content = (elements.namedItem('content') as HTMLTextAreaElement).value;
        const tagsNames = (elements.namedItem('tagsNames') as HTMLInputElement).value.split(/\s*,\s*/g);
        // @ts-ignore
        const categories = [...(elements.namedItem('categories') as RadioNodeList).values()]
            .map((checkbox: HTMLInputElement) => checkbox.checked && checkbox.value)
            .filter(Boolean) as string[];
        // @ts-ignore
        const images = Array.from((elements.namedItem('images') as HTMLInputElement).files);

        const updatedReview = await updateReview({
            id: review.id,
            tittle,
            grade,
            content,
            tagsNames,
            categories,
            images,
        });

        if (updatedReview) {
            history.push(`/reviews/${updatedReview?.id}/read`);
        }

    }, [history, review, updateReview]);

    return (
        <AuthenticatedGuard redirectUrl={"/signIn"}>
            <Page className={cnReviewPage(null, [className])} title={`Review - edit`}>
                <Container>
                    {review?.author.id === me?.id ? (
                        <Form onSubmit={onSubmit}>
                            <Form.Group className="mb-3" controlId="tittle">
                                <Form.Label>Tittle</Form.Label>
                                <Form.Control name="tittle" type="text" defaultValue={review?.tittle}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="grade">
                                <Form.Label>Your grade</Form.Label>
                                <Form.Select name="grade">
                                    <option>{review?.grade}</option>
                                    {review?.grade && [1,2,3,4,5].map(n =>
                                        n !== review?.grade && (
                                            <option value={n}>{n}</option>
                                        ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="content">
                                <Form.Label>Content</Form.Label>
                                <Form.Control name="content" as="textarea" rows={20} defaultValue={review?.content}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tagsNames">
                                <Form.Label>Input tags, separated by comma</Form.Label>
                                <Form.Control name="tags" type="text" defaultValue={review?.tagsNames.join(', ')}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="categories">
                                Categories: {categories?.map(category =>
                                <Form.Check
                                    key={category}
                                    name="categories"
                                    id={category}
                                    label={category}
                                    type="checkbox"
                                    inline
                                    defaultChecked={review?.categories.includes(category)}
                                    value={category}
                                />
                            )}
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="images">
                                <Form.Label>Images. Supported formats: JPG, PNG, GIF, BMP, ICO, SVG</Form.Label>
                                <Form.Control name="images" type="file" multiple accept="image/png" />
                            </Form.Group>
                            <Button variant="dark" type="submit">Apply changes</Button>
                        </Form>
                    ) : (
                        <Row>
                            <Col>
                                You can edit only your reviews
                            </Col>
                        </Row>
                    )}
                </Container>
            </Page>
        </AuthenticatedGuard>
    )
}