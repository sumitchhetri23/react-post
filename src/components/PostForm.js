import React from 'react'
import {Form, Button} from 'semantic-ui-react';
import {useForm} from '../utils/hooks';
import {gql, useMutation} from '@apollo/client';
import {FETCH_POSTS_QUERY} from '../utils/graphQl';
function PostForm() {
    const {values,onChange,onSubmit} = useForm(createPostCallback,{
        body: ''
    });

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,{
        variables:values,
        update(proxy,result){
            var data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            console.log(error.graphQLErrors[0].message);
            console.log(result.data.createPost);
            data = [result.data.createPost, ...data.getPosts];
            proxy.writeQuery({query:FETCH_POSTS_QUERY, data});
            console.log(data);
            values.body = '';
        }
    });
    function createPostCallback(){
        createPost();
    }
    return (
        <>
        <Form onSubmit={onSubmit}>
            <h2>Create a post</h2>
            <Form.Field>
                <Form.Input 
                    placeholder="Hi World"
                    name="body"
                    onChange={onChange}
                    error={error? true: false}
                    value={values.body}
                />
                <Button type="submit" color="teal">Create Post</Button>
            </Form.Field>            
        </Form>
        {error && (
            <div className="ui error message">
                <ul className="list">
                    <li>{error.graphQLErrors[0].message}</li>
                </ul>
            </div>
        )}
    </>
    )
}
const CREATE_POST_MUTATION = gql`
    mutation createPost($body: String!){
        createPost(body: $body){
            id body createdAt username
            likes{
                id username createdAt
            }
            likeCount
            comments{
                id body username createdAt
            }
            commentCount
        }
    }
`;

export default PostForm
