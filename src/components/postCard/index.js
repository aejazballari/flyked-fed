/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useSelector } from 'react-redux';
import { FlCard, FlMakeStyles } from '../../elements';
import PostCardHeader from './postCardHeader';
import PostCardBody from './postCardBody';
import PostCardFooter from './postCardFooter';

const useStyles = FlMakeStyles(() => ({
  postCard: {
    backgroundColor: 'white !important',
    boxShadow: 'none',
    marginBottom: '20px',
    position: 'relative',
  },
}));

const PostCard = ({
  type, postFullDetails, selectedPage, selectedUser, handleIsSaved,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
  const userDetails = useSelector((state) => state.profile.userDetails);

  return (
    <FlCard className={classes.postCard} sx={{ maxWidth: 345 }} key={postFullDetails?._id}>
      {type === 'Saved'
        ? (
          <>
            <PostCardHeader
              type={type}
              id={postFullDetails?._id}
              profileImage={postFullDetails?.post?.createdBy?.profileImage}
              name={postFullDetails?.post?.createdBy?.name}
              pageId={postFullDetails?.post?.postPage?._id}
              pageName={postFullDetails?.post?.postPage?.title}
              pageImage={postFullDetails?.post?.postPage?.image}
              pageURL={postFullDetails?.post?.postPage?.url}
              isFollowingPage={postFullDetails?.post?.postPage?.isFollowing}
              createdBy={postFullDetails?.post?.createdBy?.name}
              avatar={postFullDetails?.post?.createdBy?.profileImage}
              userId={postFullDetails?.post?.createdBy?._id}
              userURL={postFullDetails?.post?.createdBy?.url}
              ifFollowingUser={postFullDetails?.post?.createdBy?.isFollowing}
              selectedPage={selectedPage}
              selectedUser={selectedUser}
              loggedInUser={userDetails?._id}
            />
            <PostCardBody
              id={postFullDetails?.post?._id}
              image={postFullDetails?.post?.image}
              description={postFullDetails?.post?.text}
            />
            <PostCardFooter
              type={type}
              id={postFullDetails?.post?._id}
              likesCount={postFullDetails?.post?.likesCount}
              commentCount={postFullDetails?.post?.commentCount}
              isSaved={postFullDetails?.post?.isSaved}
              isLiked={postFullDetails?.post?.isLiked}
              loggedInUser={userDetails?.post?._id}
              loggedInUserAvatar={userDetails?.profileImage}
              postFullDetails={postFullDetails?.post}
              handleIsSaved={handleIsSaved}
            />
          </>
        )
        : (
          <>
            <PostCardHeader
              type={type}
              id={postFullDetails?._id}
              profileImage={postFullDetails?.createdBy?.profileImage}
              name={postFullDetails?.createdBy?.name}
              pageId={postFullDetails?.postPage?._id}
              pageName={postFullDetails?.postPage?.title}
              pageImage={postFullDetails?.postPage?.image}
              pageURL={postFullDetails?.postPage?.url}
              isFollowingPage={postFullDetails?.postPage?.isFollowing}
              createdBy={postFullDetails?.createdBy?.name}
              avatar={postFullDetails?.createdBy?.profileImage}
              userId={postFullDetails?.createdBy?._id}
              userURL={postFullDetails?.createdBy?.url}
              ifFollowingUser={postFullDetails?.createdBy?.isFollowing}
              selectedPage={selectedPage}
              selectedUser={selectedUser}
              loggedInUser={userDetails?._id}
            />
            <PostCardBody
              id={postFullDetails?._id}
              image={postFullDetails?.image}
              description={postFullDetails?.text}
            />
            {type === 'Pending'
              ? null
              : (
                <PostCardFooter
                  type={type}
                  id={postFullDetails?._id}
                  likesCount={postFullDetails?.likesCount}
                  commentCount={postFullDetails?.commentCount}
                  isSaved={postFullDetails?.isSaved}
                  isLiked={postFullDetails?.isLiked}
                  loggedInUser={userDetails?._id}
                  loggedInUserAvatar={userDetails?.profileImage}
                  postFullDetails={postFullDetails}
                />
              )}
          </>
        )}
    </FlCard>
  );
};

export default PostCard;

PostCard.defaultProps = {
  handleIsSaved: null,
};

PostCard.protoTypes = {
  type: PropTypes.string.isRequired,
  postFullDetails: PropTypes.instanceOf(Object).isRequired,
  selectedPage: PropTypes.string.isRequired,
};
