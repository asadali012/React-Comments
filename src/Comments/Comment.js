import React from 'react'
import avatar from './avatar.jpg'
import './index.css'
import moment from 'moment-timezone';
import CommentForm from './CommentForm';
import { update } from 'lodash';

const Comment = ({ comment, replies, currentUserId, deleteComment, activeComment, setActiveComment, parentId = null, addComment, updateComment }) => {


    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
    const canReply = Boolean(currentUserId);
    // the comment can be edited only with in 5 minutes of adding the comment 
    const canEdit = currentUserId === comment.userId && !timePassed;
    const canDelete = currentUserId === comment.userId && !timePassed;
    // console.log(currentUserId)

    const createdAtTime = moment(comment.createdAt).format("HH:mm");
    const createdAtDate = moment(comment.createdAt).format("MMM D,YYYY");

    const isReplying =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === 'replying';

    const isEditing =
        activeComment &&
        activeComment.id === comment.id &&
        activeComment.type === 'editing';

    const replyId = parentId ? parentId : comment.id;

    return (
        <div className='comment'>
            <div className="comment-image-container">
                <img
                    src={avatar}
                    alt=''
                    style={{
                        height: '50px',
                        width: '50px',
                        marginLeft: '10px'
                    }}
                />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    <div className="comment-author">
                        {comment.username}
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        {createdAtTime}
                        <span style={{ fontSize: '10px' }}> {createdAtDate}</span>
                    </div>
                </div>
                {!isEditing && <div className='comment-text'>
                    {comment.body}
                </div>}
                {isEditing && (
                    <CommentForm
                        submitLabel='Update'
                        hasCancelButton
                        initialText={comment.body}
                        handleSubmit={(text) => updateComment(text, comment.id)}
                        handleCancel={() => setActiveComment(null)} />
                )}
                <div className="comment-actions">
                    {canReply && <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'replying' })}>Reply</div>}
                    {canEdit && <div className="comment-action" onClick={() => setActiveComment({ id: comment.id, type: 'editing' })}>Edit</div>}
                    {canDelete && <div className="comment-action" onClick={() => deleteComment(comment.id)}>Delete</div>}
                </div>
                {isReplying && (
                    <CommentForm submitLabel='Reply' handleSubmit={(text) => addComment(text, replyId)} />
                )}
                {replies.length > 0 && (
                    <div className="replise">
                        {replies.map((reply) => (
                            <Comment
                                comment={reply}
                                key={reply.id}
                                replies={[]}
                                currentUserId={currentUserId}
                                deleteComment={deleteComment}
                                addComment={addComment}
                                updateComment={updateComment}
                                activeComment={activeComment}
                                setActiveComment={setActiveComment}
                                parentId={comment.id}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment