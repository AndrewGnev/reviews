import { cn } from '@bem-react/classname';
import React, { FormEvent, useCallback } from 'react';
import { useCategories } from '../../hooks/queries/useCategories';
import { AuthenticatedGuard } from '../../components/guards/AuthenticatedGuard';
import { Page } from '../../components/Page';
import { Button, Container, Form } from 'react-bootstrap';
import { useCreateReview } from '../../hooks/queries/useCreateReview';
import { useHistory } from 'react-router-dom';

export interface ReviewPageCreateProps {
    className?: string
}

const cnReviewPage = cn('ReviewPage')

export const ReviewPageCreate: React.FC<ReviewPageCreateProps> = ({ className }) => {

    const history = useHistory();

    const { categories } = useCategories();
    const createReview = useCreateReview();


    const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

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

        const newReview = await createReview({
            tittle,
            grade,
            content,
            tagsNames,
            categories,
            images,
        });

        if (newReview) {
            history.push(`/reviews/${newReview?.id}/read`);
        }
    }, [createReview, history]);

    return (
        <AuthenticatedGuard redirectUrl={"/signIn"}>
            <Page className={cnReviewPage(null, [className])} title={`Review - create`}>
                <Container>
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="tittle">
                            <Form.Label>Tittle</Form.Label>
                            <Form.Control name="tittle" type="text"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="grade">
                            <Form.Label>Your grade</Form.Label>
                            <Form.Select name="grade">
                                {[1,2,3,4,5].map(n => (
                                    <option value={n}>{n}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control name="content" as="textarea" rows={20}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tagsNames">
                            <Form.Label>Input tags, separated by comma</Form.Label>
                            <Form.Control name="tags" type="text"/>
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
                                value={category}
                            />
                        )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="images">
                            <Form.Label>Images. Supported formats: JPG, PNG, GIF, BMP, ICO, SVG</Form.Label>
                            <Form.Control name="images" type="file" multiple accept="image/png" />
                        </Form.Group>
                        <Button variant="dark" type="submit">Create review</Button>
                    </Form>
                </Container>
            </Page>
        </AuthenticatedGuard>
    )
}