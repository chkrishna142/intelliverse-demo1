import { ErrorOutlineRounded } from '@mui/icons-material';
import React, { useRef } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

const CombRealCard = (props) => {
  // console.log('imgLink', props.imgLink);

  const borderColor =
    props.health == 'healthy'
      ? '#34D399'
      : props.health == 'dusty'
      ? '#FEE179'
      : props.health == 'hot'
      ? '#F86969'
      : '#000000';

  const kilnImage = useRef();

  return (
    <div
      className="combined_realtime_card
        flex-auto
        sm:flex-[0_0_calc(50%-15px)]
        md:flex-[0_0_calc(50%-15px)]
        xl:flex-[0_0_calc(33.3%-15px)]
        3xl:flex-[0_0_calc(25%-15px)]
      "
      style={{
        padding: '10px 15px 10px 15px',
        backgroundColor: '#ffffff',
        borderRadius: '5px',
        width: '400px',
        boxShadow:
          '0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px rgba(0, 0, 0, 0.3)',
        // flex: '1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '7.5px',
        // flex: 'auto',
      }}
    >
      <div
        className="card_top"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <span
          className="text-sm md:text-base"
          style={{
            // fontSize: '16px',
            // lineHeight: '24px',
            letterSpacing: '0.15px',
            fontWeight: '500',
            color: '#426078',
          }}
        >
          {props.plantName}
        </span>
        {new Date(
          props.date + ' ' + new Date().getFullYear() + ' ' + props.time
        ) > new Date(new Date().getTime() - 2 * 60 * 60 * 1000) ? (
          <div
            className="live"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div
              className="live_icon"
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#6FF9AE',
                marginRight: '5px',
              }}
            ></div>
            <span
              className="text-xs md:text-sm"
              style={{
                // fontSize: '12px',
                // lineHeight: '16px',
                color: '#000000',
              }}
            >
              Live
            </span>
          </div>
        ) : (
          <span className="text-sm md:text-base text-gray-700">
            Last updated{' '}
            {new Date().getTime() -
              new Date(
                props.date + ' ' + new Date().getFullYear() + ' ' + props.time
              ).getTime() >
            24 * 60 * 60 * 1000
              ? `${Math.floor(
                  (new Date().getTime() -
                    new Date(
                      props.date +
                        ' ' +
                        new Date().getFullYear() +
                        ' ' +
                        props.time
                    ).getTime()) /
                    (24 * 60 * 60 * 1000)
                )} ${
                  Math.floor(
                    (new Date().getTime() -
                      new Date(
                        props.date +
                          ' ' +
                          new Date().getFullYear() +
                          ' ' +
                          props.time
                      ).getTime()) /
                      (24 * 60 * 60 * 1000)
                  ) > 1
                    ? 'days'
                    : 'day'
                }`
              : `${Math.floor(
                  (new Date().getTime() -
                    new Date(
                      props.date +
                        ' ' +
                        new Date().getFullYear() +
                        ' ' +
                        props.time
                    ).getTime()) /
                    (1 * 60 * 60 * 1000)
                )} hours`}{' '}
            ago
          </span>
        )}
      </div>
      <Link to={props.link}>
        {new Date(
          props.date + ' ' + new Date().getFullYear() + ' ' + props.time
        ) < new Date(new Date().getTime() - 2 * 60 * 60 * 1000) ? (
          <div
            className={`bg-black rounded-xl relative !z-10 sm:h-[150px] md:h-[170px] lg:h-[200px] text-white`}
          >
            <span className="absolute top-[40%] z-10 left-[30%] text-white font-semibold bg-gray-400/[0.4] rounded-sm px-1">
              <ErrorOutlineRounded /> Plant down
            </span>
            <img
              className={`h-auto
            sm:h-[150px]
            md:h-[170px]
            lg:h-[200px]
            border-12
            rounded-xl
            !bg-black 
            opacity-40
            !z-2
            border-[${borderColor}]`}
              src={props.imgLink}
              border="5"
              alt="Plant Realtime Kiln"
              style={{
                marginBottom: '10px',
                marginTop: '10px',
                border: `5px solid ${borderColor}`,
              }}
              ref={kilnImage}
            />
          </div>
        ) : (
          <img
            className={`h-auto
            sm:h-[150px]
            md:h-[170px]
            lg:h-[200px]
            border-12
            rounded-xl
            border-[${borderColor}]`}
            src={props.imgLink}
            border="5"
            alt="Plant Realtime Kiln"
            style={{
              marginBottom: '10px',
              marginTop: '10px',
              border: `5px solid ${borderColor}`,
            }}
            ref={kilnImage}
          />
        )}
        {/* h-[${kilnImage?.current?.style.height}] mt-[-$
        {kilnImage?.current?.style.height}]
        {console.log(window.getComputedStyle(kilnImage.current), 'Check')} */}
      </Link>
      <div
        className="card_bottom"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {new Date(
          props.date + ' ' + new Date().getFullYear() + ' ' + props.time
        ) > new Date(new Date().getTime() - 2 * 60 * 60 * 1000) ? (
          <div
            className="bottom_left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span
              className="text-xs md:text-base"
              style={{
                // fontSize: '16px',
                // lineHeight: '24px',
                letterSpacing: '0.15px',
                fontWeight: '500',
                color: '#426078',
              }}
            >
              Health:
            </span>
            <div className="kiln_condition">
              {props.health === 'dusty' ? (
                <div
                  className="bottom_health"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div
                    className="container"
                    style={{
                      width: '15px',
                      height: '7.5px',
                      backgroundColor: 'rgba(254, 225, 121)',
                      marginRight: '5px',
                      marginLeft: '10px',
                    }}
                  ></div>
                  <span className="text-xs md:text-base">Dusty</span>
                </div>
              ) : props.health === 'hot' ? (
                <div
                  className="bottom_health"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div
                    className="container"
                    style={{
                      width: '15px',
                      height: '7.5px',
                      backgroundColor: 'rgba(248, 105, 105)',
                      marginRight: '5px',
                      marginLeft: '10px',
                    }}
                  ></div>
                  <span className="text-xs md:text-base">Hot</span>
                </div>
              ) : props.health === 'healthy' ? (
                <div
                  className="bottom_health"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div
                    className="container"
                    style={{
                      width: '15px',
                      height: '7.5px',
                      backgroundColor: 'rgba(52, 211, 153)',
                      marginRight: '5px',
                      marginLeft: '10px',
                    }}
                  ></div>
                  <span className="text-xs md:text-base">Healthy</span>
                </div>
              ) : (
                <div
                  className="bottom_health"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div
                    className="container"
                    style={{
                      width: '15px',
                      height: '7.5px',
                      backgroundColor: 'rgba(0, 0, 0)',
                      marginRight: '5px',
                      marginLeft: '10px',
                    }}
                  ></div>
                  <span className="text-xs md:text-base">Negative</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            className="bottom_left"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span
              className="text-xs md:text-base text-white"
              style={{
                // fontSize: '16px',
                // lineHeight: '24px',
                letterSpacing: '0.15px',
                fontWeight: '500',
                // color: '#426078',
              }}
            >
              Health:
            </span>
          </div>
        )}
        {new Date(
          props.date + ' ' + new Date().getFullYear() + ' ' + props.time
        ) > new Date(new Date().getTime() - 2 * 60 * 60 * 1000) && (
          <span className="text-xs md:text-base">
            {props.date},{props.time}
          </span>
        )}
      </div>
    </div>
  );
};

export default CombRealCard;
