import {React, useContext} from 'react'
import {useQuery, gql} from '@apollo/client';
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import {AuthContext} from '../context/Auth';
import PostForm from '../components/PostForm';
import {FETCH_POSTS_QUERY} from '../utils/graphQl';
function Home() {
    const {user} = useContext(AuthContext);
    var posts = {};
    const {loading, data} = useQuery(FETCH_POSTS_QUERY);
    if(data){
        var {getPosts} = data;
        posts = getPosts;
    }
    return (
        <Grid columns={3}>
            <Grid.Row className="page-title">
                <h1>
                Recent Posts
                </h1>
                </Grid.Row>
            <Grid.Row>
                {user && (
                    <Grid.Column>
                        <PostForm />
                    </Grid.Column>
                )
                }
                {loading ? (
                    <h1>Loading Posts....</h1>
                ) : (
                    posts && posts.map(post => (
                        <Grid.Column key={post.id} style={{marginBottom: 20}}>
                            <PostCard post={post} />
                            </Grid.Column>
                    ))
                )}
            </Grid.Row>
        </Grid>
)
}
export default Home
