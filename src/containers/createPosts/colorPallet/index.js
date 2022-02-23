/* eslint-disable linebreak-style */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePalette } from 'color-thief-react';
import { ColorPicker, useColor } from 'react-color-palette';
import { useSelector, useDispatch } from 'react-redux';
import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';
import { useMediaQuery, useTheme } from '@material-ui/core';
import {
  FlGrid, FlTypography, FlButton, FlCircularProgress,
} from '../../../elements/index';
import { PALLET_COLOR } from '../../../actions/postAction';
import 'react-color-palette/lib/css/styles.css';
import './style.css';

const ColorPallet = ({
  handleImageDiv, handleTextDiv, handleColorPalletDiv, handleImageChange,
}) => {
  const appTheme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(appTheme.breakpoints.down('sm'), { noSsr: true });
  const gradient = useSelector((state) => state?.post?.palletColor);
  const [colorCodes, setColorCodes] = useState([]);
  const selectedImage = useSelector((state) => state?.post?.postImage);
  const postText = useSelector((state) => state.post?.postText);
  const [color, setColor] = useColor('rgb', '#121212');
  const node = document.getElementById('my-image');
  const textNode = document.getElementById('text-preview');
  const colorPalletDiv = document.getElementById('color-palette-div');

  let colorPickers = [];
  // if (viewColorPallet) {
  const { data, loading, error } = usePalette(selectedImage, 10, 'rgbArray', { crossorigin: 'anonymous | use-credentials', quality: 10 });
  // eslint-disable-next-line no-console
  console.log(error, 'dddddd');
  colorPickers = data;
  // }

  const downloadImage = () => {
    handleImageDiv(node);
    handleTextDiv(textNode);
    handleColorPalletDiv(colorPalletDiv);
  };

  useEffect(() => {
    if (colorPickers?.length > 0) {
      downloadImage();
      setColorCodes(colorPickers);
    }
  }, [colorPickers]);

  useEffect(() => {
    downloadImage();
  }, [color, selectedImage]);

  return (
    <FlGrid container spacing={isMobile ? 0 : 2}>
      <FlGrid item md={6} xs={12} className="color-paller-child-div">
        <FlGrid container spacing={2} justifyContent="center" alignItems="center" direction={isMobile ? 'column-reverse' : 'column'}>
          <FlGrid item md={12} xs={12}>
            <div
              style={{
                width: isMobile ? '100%' : 'max-content',
                alignItems: 'center',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
              }}
              id="my-image"
            >
              <img
                src={selectedImage}
                style={{
                  width: isMobile ? '100%' : 400,
                  height: isMobile ? '100%' : 400,
                  // borderRadius: '10px',
                  objectFit: 'contain',
                }}
                alt="Crop"
              />
              <div
                id="color-palette-div"
                style={{
                  position: 'absolute',
                  width: isMobile ? '100%' : 400,
                  height: isMobile ? '100%' : 400,
                  // borderRadius: '10px',
                  background: `linear-gradient(0deg, rgba(${gradient.toString()}, 0.90) 14%, rgba(${gradient.toString()}, 0.10) 50%, rgba(${gradient.toString()}, 0.20) 100%)`,
                }}
              />
              <div
                id="text-preview"
                style={{ position: 'absolute', bottom: isMobile ? 20 : 30 }}
              >
                <FlTypography className="post-color-pallet-text">
                  {postText}
                </FlTypography>
              </div>
            </div>
          </FlGrid>
          <FlGrid item md={12} xs={12} style={{ textAlign: 'center', display: 'none' }}>
            <FlButton variant="text" color="primary" className="color-pallet-chnageImage-btn" onClick={() => handleImageChange()}>
              <CameraAltOutlinedIcon fontSize="small" />
              &nbsp;Change Image
            </FlButton>
          </FlGrid>
        </FlGrid>
      </FlGrid>
      <FlGrid item md={6} xs={12} className="color-paller-child-div">
        <FlGrid container spacing={isMobile ? 0 : 2}>
          <FlGrid item md={12} xs={12} style={{ margin: '10px 0' }}>
            <FlGrid container>
              <FlGrid item md={12} xs={12} style={{ display: colorCodes.length !== 0 ? 'flex' : 'none' }}>
                <FlTypography className="post-color-pallet-lables">Select the Default color theme</FlTypography>
              </FlGrid>
              <FlGrid item md={12} xs={12} style={{ width: '100%', overflow: 'auto', height: '100%' }}>
                {loading ? <FlCircularProgress color="primary" /> : (
                  <div style={{
                    width: isMobile ? '170vw' : '100%', overflowY: 'auto', display: colorCodes.length !== 0 ? 'flex' : 'none', direction: 'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: isMobile ? 'nowrap' : 'wrap', padding: '10px 0px',
                  }}
                  >
                    {colorCodes.length !== 0
                        && colorCodes.map((colors) => (
                          <FlGrid
                            key={colors}
                            style={{
                              backgroundColor: `rgb(${colors})`,
                              width: isMobile ? 35 : 40,
                              height: isMobile ? 35 : 40,
                              borderRadius: 100,
                              margin: 8,
                              border: '1.5px solid',
                              boxShadow: gradient === colors
                                ? (isMobile ? 'inset 0 0 0 3px white' : 'inset 0 0 0 2px white')
                                : 'inset 0 0 0 0 white',
                              borderColor: gradient === colors ? '#EF613B' : 'transparent',
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              dispatch({ type: PALLET_COLOR, payload: colors });
                              downloadImage();
                            }}
                          />
                        ))}
                  </div>
                )}
              </FlGrid>
            </FlGrid>
          </FlGrid>
          <FlGrid item md={12} xs={12} style={{ margin: '10px 0' }}>
            <FlGrid container spacing={2}>
              <FlGrid item md={12} xs={12}>
                <FlTypography className="post-color-pallet-lables">Pick the Color theme from color picker</FlTypography>
              </FlGrid>
              <FlGrid
                item
                md={12}
                xs={12}
                style={{
                  // display: colorCodes.length !== 0 ? 'flex' : 'none',
                  width: '100%',
                  textAlign: 'center',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  alignItems: 'center',
                }}
              >
                <ColorPicker
                  width={isMobile ? 250 : 400}
                  height={isMobile ? 70 : 100}
                  color={color}
                  onChange={(e) => {
                    setColor(e);
                    dispatch({
                      type: PALLET_COLOR,
                      payload: [e.rgb.r, e.rgb.g, e.rgb.b],
                    });
                    downloadImage();
                  }}
                  hideHSV
                  hideHEX
                  hideRGB
                  dark
                />
              </FlGrid>
            </FlGrid>
          </FlGrid>
        </FlGrid>
      </FlGrid>
    </FlGrid>
  );
};

// ColorPallet.defaultProps = {
//   viewColorPallet: null,
// };

ColorPallet.propTypes = {
  handleImageDiv: PropTypes.func.isRequired,
  handleTextDiv: PropTypes.func.isRequired,
  handleColorPalletDiv: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  // viewColorPallet: PropTypes.bool,
};

export default ColorPallet;
