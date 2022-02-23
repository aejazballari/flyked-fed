/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-quotes */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState, useContext, useRef } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import { useHistory } from 'react-router-dom';
import DateFnUtils from '@date-io/date-fns';
import moment from 'moment-mini';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../layouts/createLayout';
import PageMetaTags from '../../elements/pageMetaTags';
import { retrieveLocalStorage } from '../../services/storageServices';
import {
  FlContainer,
  FlGrid,
  FlKeyboardDatePicker,
  FlMakeStyles,
  FlMuiPickersUtilsProvider,
  FlTextField,
  FlButton,
  FlAppBar,
  FlCard,
  FlTypography,
  FlCircularProgress,
} from '../../elements';
import FlDropdown from '../../elements/FlDropdown';
import { subCategories } from '../../resources/categories';
import FlImageUpload from '../../elements/FlImageUpload';
import { AlertNotificationContext } from '../../elements/alert-notfication/alertState';
import * as pageAction from '../../actions/pageAction';
import * as categoryAction from '../../actions/categoryAction';
import FlCustomSelectInput from '../../elements/FlCustomSelectInput';
import { PAGR_ROUTE_FROM } from '../../actions/pageAction';
import * as postAction from '../../actions/postAction';

const useStyles = FlMakeStyles(() => ({
  textfield: {
    marginTop: '14px',
    width: '100%',
  },
  btnContainer: {
    padding: '0px',
    margin: '0px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    position: 'fixed',
  },
  card: {
    marginBottom: '0px',
    padding: '15px',
  },
  heading: {
    fontSize: '15px',
    color: '#1C2121',
    marginTop: '20px',
    marginBottom: '0px',
  },
  title: {
    fontSize: '14px',
  },
  container: {
    paddingTop: '0px !important',
  },
  item: {
    paddingTop: '0px !important',
    paddingBottom: '0px !important',
  },
  btnSection: {
    top: 'auto',
    bottom: 0,
    position: 'relative',
    height: '60px !important',
  },
  disable: {
    backgroundColor: '#f5b09f !important',
    pointerEvents: 'none !important',
  },
  successDiv: {
    paddingTop: '45px',
    display: 'none',
  },
  primary: {
    textAlign: 'center',
    fontSize: '20px',
  },
  secondary: {
    textAlign: 'center',
    color: '#888F9D',
  },
}));

const Create = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const sub = useSelector((state) => state.category.subCategories);
  const [date, setDate] = useState(null);
  const [cat, setCat] = useState('');
  const [subCat, setSubCat] = useState('');
  const [catId, setCatId] = useState('');
  const [values, setValues] = useState({
    title: '',
    description: '',
    dob: null,
    category: '',
    subCategory: null,
    url: 'randomURL',
    image: '',
  });
  const { setAlert } = useContext(AlertNotificationContext);
  const appTheme = useTheme();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const history = useHistory();
  const footer = false;
  const [catDropdown, setCatDropdown] = useState(false);
  const [subCatDropdown, setSubCatDropdown] = useState(false);
  const [loader, setLoader] = useState(false);
  const catRef = useRef(null);
  const pageRouteFrom = useSelector((state) => state?.page?.pageRouteFrom);
  const searchValue = useSelector((state) => state?.post?.searchText);
  const isUserLogin = retrieveLocalStorage('userLogin');

  useEffect(() => {
    if (!isUserLogin) {
      history.push('/');
    }
    if (categories.length === 0) {
      setLoader(true);
      dispatch(categoryAction.getCategories(() => setLoader(false)));
    }
    document.title = 'Flyked - Create';
  }, []);

  useEffect(() => {
    if (catId) {
      dispatch(categoryAction.getSubCategories(catId));
      setSubCat('');
    }
  }, [catId]);

  function useOutsideAlerterCat(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCatDropdown(false);
          setSubCatDropdown(false);
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerterCat(catRef);

  const updateValues = (term) => {
    const { name, value } = term;
    if (name === 'category') {
      setCat(value);
      setValues({
        ...values,
        [name]: value._id,
      });
      setCatId(value._id);
    } else if (name === 'subCategory') {
      setSubCat(value);
      setValues({
        ...values,
        [name]: value._id,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };
  // custom category dropdown
  const getCategory = (value) => {
    // console.log('From create', value);
    setValues({
      ...values,
      category: value._id,
    });
    setCat(value);
    setCatId(value._id);
  };
  // custom subCategory dropdown
  const getSubCategory = (value) => {
    setValues({
      ...values,
      subCategory: value._id,
    });
    setSubCat(value);
  };

  const openDropdown = (key) => {
    if (key === 'category') {
      setSubCatDropdown(false);
      setCatDropdown(true);
    } else {
      setCatDropdown(false);
      setSubCatDropdown(true);
    }
  };

  const closeDropdown = () => {
    // console.log('Close');
    setTimeout(() => {
      setCatDropdown(false);
      setSubCatDropdown(false);
    }, 400);
  };

  const updateDate = (value) => {
    if (!value || value === 'Invalid Date') {
      setDate('');
      setValues({
        ...values,
        dob: '',
      });
    } else {
      const d = moment(value).format('DD-MM-YYYY');
      setDate(value);
      setValues({
        ...values,
        dob: d,
      });
    }
  };
  const handleValidation = () => {
    let formIsValid = true;
    if (values.title === '') {
      formIsValid = false;
    }
    if (values.description === '') {
      formIsValid = false;
    }
    // if (values.dob === '') {
    //   formIsValid = false;
    // }
    if (values.image === '') {
      formIsValid = false;
    }
    if (values.dob === '') {
      formIsValid = false;
    }
    if (values.category === '') {
      formIsValid = false;
    }
    if (values.subCategory === '') {
      // formIsValid = false;
      setValues({
        ...values,
        subCategory: null,
      });
    }
    return formIsValid;
  };

  const getResponse = (res) => {
    if (res === 'success') {
      history.push('/page/create/success');
    } else {
      setAlert('error', 'Page already exists!');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(pageAction.createPage(values, getResponse));
    } else {
      setAlert('error', 'Please fill all the mandatory fields');
    }
  };

  const handleBack = () => {
    if (pageRouteFrom === 'createPost') {
      dispatch(postAction.handleSearchPage(searchValue, 1, setAlert));
      history.push('/post/create');
      dispatch({ type: PAGR_ROUTE_FROM, payload: '' });
    } else {
      history.push('/');
    }
  };

  if (loader) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <FlCircularProgress />
      </div>
    );
  }

  return (
    <>
      <PageLayout pageName='Create Page' footer={footer}>
        <PageMetaTags title="Flyked - Create Page" description="Create Page" image="" currentUrl={window?.location?.href || ''} />
        {isMobile ? (
          <>
            <FlContainer style={{ paddingTop: '3rem' }}>
              {categories ? (
                <FlDropdown
                  label='Select Category'
                  name='category'
                  list={categories}
                  term={cat}
                  onChange={updateValues}
                />
              ) : null}
              {!sub ? (
                <FlDropdown
                  label='Select Subcategory'
                  name='subCategory'
                  list={subCategories}
                  term={subCat}
                  onChange={updateValues}
                />
              ) : (
                <FlDropdown
                  label='Select Subcategory'
                  name='subCategory'
                  list={sub}
                  term={subCat}
                  onChange={updateValues}
                />
              )}
              <FlImageUpload
                name='image'
                onChange={(fileData) => setValues({
                  ...values,
                  image: fileData,
                })}
                type="page"
                modelName="Page Image"
              />
              <FlTextField
                name='title'
                value={values.title}
                required
                style={{ backgroundColor: 'white' }}
                id='outlined-required'
                label='Enter Page Title'
                variant='outlined'
                multiline
                rows={1}
                className={classes.textfield}
                inputProps={{
                  maxLength: 25,
                  autoComplete: 'off',
                  style: {
                    font: isMobile ? 'normal normal 14px/25px "SF Pro Rounded", sans-serif' : 'normal normal 20px/25px "SF Pro Rounded", sans-serif',
                    lineHeight: 'initial',
                  },
                }}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => updateValues(e.target)}
              />
              <FlTextField
                name='description'
                required
                style={{ backgroundColor: 'white' }}
                value={values.description}
                id='outlined-required'
                label='Page Description'
                variant='outlined'
                className={classes.textfield}
                inputProps={{
                  maxLength: 100,
                  autoComplete: 'off',
                  style: {
                    font: isMobile ? 'normal normal 14px/25px "SF Pro Rounded", sans-serif' : 'normal normal 20px/25px "SF Pro Rounded", sans-serif',
                    lineHeight: 'initial',
                  },
                }}
                multiline
                rows={1}
                InputProps={{
                  disableUnderline: true,
                }}
                onChange={(e) => updateValues(e.target)}
              />
              <FlMuiPickersUtilsProvider utils={DateFnUtils}>
                <FlKeyboardDatePicker
                  fullWidth
                  name='dob'
                  value={date}
                  style={{ backgroundColor: 'white', marginBottom: '5rem' }}
                  onChange={updateDate}
                  label={date && 'Date of Birth'}
                  format='dd / MM / yyyy'
                  inputVariant='outlined'
                  className={classes.textfield}
                  maxDate={new Date()}
                  emptyLabel='DOB'
                />
              </FlMuiPickersUtilsProvider>
            </FlContainer>
          </>
        ) : (
          <>
            <FlContainer style={{ marginTop: '3rem' }}>
              <FlGrid container spacing={2}>
                <FlGrid item md={4} xs={3} />
                <FlGrid item md={3} xs={6}>
                  <FlTypography className={classes.heading} gutterBottom>
                    Create Page
                  </FlTypography>
                </FlGrid>
                <FlGrid item md={4} xs={3} />
                <FlGrid item md={4} xs={3} />
                <FlGrid item md={4} xs={6} className={classes.container}>
                  <FlCard style={{ marginBottom: '10px', width: '30rem' }}>
                    <FlGrid container spacing={2} className={classes.card}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          flex: 1,
                        }}
                        ref={catRef}
                      >
                        <FlGrid
                          item
                          md={6}
                          xs={6}
                          className={classes.item}
                          style={{ paddingRight: '10px', position: 'relative' }}
                        >
                          {categories ? (
                            <FlCustomSelectInput
                              label='Select category'
                              secondaryLabel='Page Category'
                              term={cat}
                              list={categories}
                              onChange={getCategory}
                              openDropdown={() => openDropdown('category')}
                              open={catDropdown}
                              closeDropdown={closeDropdown}
                              position='left'
                            />
                          ) : null}
                        </FlGrid>
                        <FlGrid
                          item
                          md={6}
                          xs={6}
                          className={classes.item}
                          style={{ paddingRight: '10px', position: 'relative' }}
                        >
                          {!sub ? (
                            <FlCustomSelectInput
                              label='Select sub category'
                              secondaryLabel='Page sub category'
                              term={subCat}
                              list={subCategories}
                              openDropdown={() => openDropdown('subCategory')}
                              onChange={getSubCategory}
                              open={subCatDropdown}
                              closeDropdown={closeDropdown}
                              position='right'
                            />
                          ) : (
                            <FlCustomSelectInput
                              label='Select sub category'
                              secondaryLabel='Page sub category'
                              term={subCat}
                              list={sub}
                              openDropdown={() => openDropdown('subCategory')}
                              onChange={getSubCategory}
                              open={subCatDropdown}
                              closeDropdown={closeDropdown}
                              position='right'
                            />
                          )}
                        </FlGrid>
                      </div>
                      <FlGrid item md={12} xs={12} className={classes.item}>
                        <FlImageUpload
                          name='image'
                          onChange={(fileData) => setValues({
                            ...values,
                            image: fileData,
                          })}
                        />
                      </FlGrid>
                      <FlGrid item md={12} xs={12} className={classes.item}>
                        <FlTextField
                          name='title'
                          value={values.title}
                          required
                          id='outlined-required'
                          label='Enter Page Title'
                          variant='outlined'
                          className={classes.textfield}
                          autoComplete="off"
                          inputProps={{
                            maxLength: 25,
                          }}
                          onChange={(e) => updateValues(e.target)}
                        />
                      </FlGrid>
                      <FlGrid item md={12} xs={12} className={classes.item}>
                        <FlTextField
                          name='description'
                          required
                          value={values.description}
                          id='outlined-required'
                          label='Page Description'
                          variant='outlined'
                          style={{ height: '36px !important' }}
                          className={classes.textfield}
                          autoComplete="off"
                          inputProps={{
                            maxLength: 100,
                          }}
                          onChange={(e) => updateValues(e.target)}
                        />
                      </FlGrid>
                      <FlGrid item md={12} xs={12} className={classes.item}>
                        <FlMuiPickersUtilsProvider utils={DateFnUtils}>
                          <FlKeyboardDatePicker
                            fullWidth
                            name='dob'
                            value={date}
                            onChange={updateDate}
                            label={date && 'Date of Birth'}
                            format='dd / MM / yyyy'
                            inputVariant='outlined'
                            className={classes.textfield}
                            maxDate={new Date()}
                            emptyLabel='DOB'
                          />
                        </FlMuiPickersUtilsProvider>
                      </FlGrid>
                    </FlGrid>
                    <FlAppBar color='inherit' className={classes.btnSection}>
                      <FlGrid container spacing={3}>
                        <FlGrid item md={6} xs={8} />
                        <FlGrid item md={3} xs={2}>
                          <FlButton
                            style={{
                              borderRadius: '4px',
                              height: '35px',
                              marginTop: '10px',
                              backgroundColor: '#ffffff',
                              marginLeft: '2rem',
                              textTransform: 'capitalize',
                            }}
                            variant='outlined'
                            onClick={handleBack}
                          >
                            Cancel
                          </FlButton>
                        </FlGrid>
                        <FlGrid item md={3} xs={2}>
                          <FlButton
                            style={{
                              borderRadius: '4px',
                              height: '35px',
                              marginTop: '10px',
                              marginLeft: '1rem',
                              textTransform: 'capitalize',
                            }}
                            variant='contained'
                            color='primary'
                            onClick={submitForm}
                            // className={
                            //   values.title &&
                            //   values.category &&
                            //   values.description &&
                            //   values.image
                            //     ? ''
                            //     : classes.disable
                            // }
                          >
                            Next
                          </FlButton>
                        </FlGrid>
                      </FlGrid>
                    </FlAppBar>
                  </FlCard>
                </FlGrid>
                <FlGrid item md={4} xs={3} />
              </FlGrid>
            </FlContainer>
          </>
        )}
      </PageLayout>
      {isMobile ? (
        <FlAppBar position='absolute' color='inherit' className={classes.appBar}>
          <FlGrid container className={classes.btnContainer}>
            <FlGrid item md={12} xs={12}>
              <FlButton
                style={{ borderRadius: '0px', height: '50px', textTransform: 'capitalize' }}
                fullWidth
                variant='contained'
                color='primary'
                onClick={submitForm}
              >
                Submit Now
              </FlButton>
            </FlGrid>
          </FlGrid>
        </FlAppBar>
      ) : null}
    </>
  );
};

export default Create;
