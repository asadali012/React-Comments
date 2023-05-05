import React, { useState, useEffect } from 'react'
import Comment from './Comment';
import CommentForm from './CommentForm';
import moment from 'moment-timezone';
import {
    getComments as getCommentsApi,
    // createComment as createCommentApi
    updateComment as updateCommentApi,
    deleteComment as deleteCommentApi
} from './api'


const Comments = ({ currentUserId }) => {
    const [backendComments, setBackendComments] = useState([]);
    const rootComments = backendComments.filter(
        backendComments => backendComments.parentId === null
    );
    const [activeComment, setActiveComment] = useState(null)

    const getReplies = (commentId) => {
        return backendComments.filter(backendComment => backendComment.parentId === commentId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    }


    // here we will take the user`s local time zone & then use that at createdAt for comment
    // data for store - redux  
    // -------------------------------------------------------------------------------------
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const currentLocalTime = moment().tz(timezone).format()

    const createCommentApi = async (text, parentId = null) => {
        console.log(currentLocalTime)
        return {
            id: Math.random().toString(36).substring(2, 9),
            body: text,
            parentId,
            userId: "1",
            username: "Ali",
            createdAt: currentLocalTime,
        };
    };


    const addComment = (text, parentId) => {
        // console.log('add comment', text, parentId)
        createCommentApi(text, parentId).then(comment => {
            setBackendComments([comment, ...backendComments]);
            setActiveComment(null);
        })
    }

    const deleteComment = (commentId) => {
        if (window.confirm("Delete this Comment?")) {
            deleteCommentApi(commentId).then(() => {
                const updatedBackendComments = backendComments.filter(
                    (backendComment) => backendComment.id !== commentId
                );
                setBackendComments(updatedBackendComments)
            })
        }
    };

    const updateComment = (text, commentId) => {
        updateCommentApi(text).then(() => {
            const updatedBackendComments = backendComments.map((backendComment) => {
                if (backendComment.id === commentId) {
                    return { ...backendComment, body: text };
                }
                return backendComment;
            });
            setBackendComments(updatedBackendComments);
            setActiveComment(null);
        });
    };

    useEffect(() => {
        getCommentsApi().then(data => {
            setBackendComments(data);
        })
    }, [])

    return (
        <div className='comments'>
            <h3 className="comments-title">Comments</h3>
            <div className="comment-form-title">
                <CommentForm
                    submitLabel="Write"
                    handleSubmit={addComment}
                />
            </div>
            <div className="comments-container">
                {rootComments.map(rootComment => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        updateComment={updateComment}
                        activeComment={activeComment}
                        setActiveComment={setActiveComment}
                        addComment={addComment}
                    />
                ))}
            </div>
        </div>
    )
}

export default Comments