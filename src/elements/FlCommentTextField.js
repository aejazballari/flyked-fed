/* eslint-disable linebreak-style */
/* eslint-disable no-lone-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useDispatch } from 'react-redux';
import {
  FlAvatar, FlButton, FlGrid, FlInputAdornment, FlMakeStyles, FlTextField,
} from '.';
import * as postAction from '../actions/postAction';
import PaperPlane from '../assets/PaperPlane.svg';
import { retrieveLocalStorage } from '../services/storageServices';
import * as authAction from '../actions/authAction';

const useStyles = FlMakeStyles((theme) => ({
  noBorder: {
    border: 'none',
  },
  customTextField: {
    backgroundColor: '#F5F6F6',
    borderRadius: '20px',
    minHeight: '44px',
    maxHeight: '100px',
    fontSize: '14px',
    fontWeight: '400',
    overflow: 'hidden',
    overflowY: 'scroll',
    padding: '1rem .5rem',
  },
  postBtn: {
    color: '#EF613B',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  postBtnDisabled: {
    color: '#f5b09f',
    fontWeight: '600',
    textTransform: 'capitalize',
    pointerEvents: 'none',
  },
  textFieldMob: {
    position: 'absolute',
    bottom: '1%',
    backgroundColor: '#ffffff',
    padding: '1rem',
    width: '95%',
    [theme.breakpoints.down('xs')]: {
      width: '92%',
    },
  },
  textFieldWeb: {
    maxHeight: '100px',
    height: 'auto',
    padding: '1rem .5rem',
  },
}));

const initialValue = {
  text: '',
};

const FlCommentTextField = ({ postId, avatar, getCommentResponse }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const [comment, setComment] = useState(initialValue);
  const isUserLogin = retrieveLocalStorage('userLogin');

  const submitComment = () => {
    dispatch(postAction.saveComments(comment, postId, getCommentResponse));
    setComment({ text: '' });
  };

  return (
    <>
      {isMobile
        ? (
          <FlTextField
            multiline
            fullWidth
            id="comment"
            name="comment"
            autoComplete="off"
            value={comment.text}
            onChange={(e) => setComment({ text: e.target.value })}
            onClick={() => {
              if (!isUserLogin) {
                dispatch(authAction?.OpenLoginModel());
              }
            }}
            autoComplete="off"
                          // autoFocus
                          // classes={{ notchedOutline: classes.input }}
            className={classes.textFieldMob}
            placeholder="Type your comment here..."
            inputProps={{
              maxLength: 500,
            }}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <FlInputAdornment position="start">
                  <FlAvatar
                    src={avatar}
                    alt="User"
                    style={{ height: '30px', width: '30px' }}
                  />
                </FlInputAdornment>
              ),
              endAdornment: (
                <FlInputAdornment position="end">
                  <FlAvatar
                    src={PaperPlane}
                    alt="Send"
                    style={{
                      height: '20px',
                      width: '20px',
                      marginRight: '5px',
                      borderRadius: '0px',
                      pointerEvents: comment.text === '' ? 'none' : '',
                    }}
                    onClick={submitComment}
                  />
                </FlInputAdornment>
              ),
              classes: {
                // notchedOutline: classes.noBorder,
                root: classes.customTextField,
              },
            }}
          />
        )
        : (
          <FlGrid container spacing={2}>
            <FlGrid item md={10}>
              <FlTextField
                // variant="outlined"
                multiline
                margin="none"
                fullWidth
                id="comment"
                name="comment"
                autoComplete="off"
                value={comment.text}
                onChange={(e) => setComment({ text: e.target.value })}
                onClick={() => {
                  if (!isUserLogin) {
                    dispatch(authAction?.OpenLoginModel());
                  }
                }}
                placeholder="Add a comment..."
                style={{ maxHeight: '100px', height: 'auto' }}
                maxRows={4}
                autoComplete="off"
                inputProps={{
                  maxLength: 500,
                  style: {
                    font: 'normal normal 12px "SF Pro Rounded", sans-serif',
                    lineHeight: 'initial',
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <FlInputAdornment position="start">
                      <FlAvatar
                        src={avatar}
                        alt="User"
                        style={{ height: '30px', width: '30px' }}
                      />
                    </FlInputAdornment>
                  ),
                  classes: {
                    // notchedOutline: classes.noBorder,
                    root: classes.textFieldWeb,
                  },
                }}
              />
            </FlGrid>
            <FlGrid
              item
              md={2}
              style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'left' }}
            >
              <FlButton
                variant="text"
                className={comment.text === '' ? classes.postBtnDisabled : classes.postBtn}
                onClick={submitComment}
              >
                Post
              </FlButton>
            </FlGrid>
          </FlGrid>
        )}
    </>
  );
};

export default FlCommentTextField;

FlCommentTextField.propTypes = {
  postId: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  getCommentResponse: PropTypes.func.isRequired,
};
