import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addOrRemoveLike, deletePost, setEditPost } from '../../actions/post';
import './edit_post.css';

const PostItem = ({
  addOrRemoveLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date, edited, image },
  showActions,
  setEditPost,
}) => (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="" />
          <h4> {name} </h4>
        </Link>
      </div>
      <div>
        <p className="my-1">
          {text && text} {edited ? <i className="editedText">(edited)</i> : null}
        </p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
        </p>
        {image && <img src={image} alt={'photo_post'} className="post_image" />}
        {showActions && (
          <Fragment>
            <button
              onClick={() => addOrRemoveLike(_id)}
              type="button"
              className={
                !auth.loading && likes.filter(e => e.user === auth.user._id).length
                  ? 'btn btn-dark'
                  : 'btn btn-light btn-like'
              }
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-primary">
              Discussion{' '}
              {comments.length > 0 && <span className="comment-count"> {comments.length} </span>}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button onClick={() => setEditPost(_id)} type="button" className="btn btn-light">
                <i className="fas fa-pencil-alt" />
              </button>
            )}
            {!auth.loading && user === auth.user._id && (
              <button onClick={() => deletePost(_id)} type="button" className="btn btn-danger">
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addOrRemoveLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  setEditPost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  {
    addOrRemoveLike,
    deletePost,
    setEditPost,
  },
)(PostItem);
