import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MaterialSelectOfBf from './MaterialSelectOfBf';
import Sizing from '../../Sizing/Sizing';


function Particleswitchcomp() {
  // Get the current URL using the useLocation hook
  const location = useLocation();
  const { material, clientId ,plantId,cameraId} = useParams();
  // Define a function to determine which component to render based on the URL
  console.log("plant id--------------------------------",plantId);
  const renderComponentBasedOnURL = () => {
    if (location.pathname === '/optimus/blastfurnace') {
      return <MaterialSelectOfBf />;
    } 
       else if (material &&clientId) {
      return <Sizing />;
    }
     else {
      // Return a default component or null if needed
      return <>hello </>;
    }
  };

  return (
   <>
     
        {renderComponentBasedOnURL()}
     
        </>
  );
}

export default Particleswitchcomp;
