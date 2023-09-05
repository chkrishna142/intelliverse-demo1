import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import MaterialSelectOfBf from './MaterialSelectOfBf';
import Sizing from '../../Sizing/Sizing';
import SingleCam from '../../Sizing/SingleCam';
import ClientSelect from '../../Main/ClientSelect';


function Particleswitchcomp() {
  // Get the current URL using the useLocation hook
  const location = useLocation();
  const { material, clientId ,plantId,cameraId} = useParams();
  // Define a function to determine which component to render based on the URL
  const renderComponentBasedOnURL = () => {
    if (location.pathname === '/optimus/blastfurnace') {
      return <MaterialSelectOfBf />;
    } 
    else if(material && clientId && plantId && cameraId) {  
      return <SingleCam />;
    }
    else if(material && clientId)  {
      return <Sizing />;
    }
       else if(material)  {
      return <ClientSelect />;
    }
    //  else {
    //   // Return a default component or null if needed
    //   return <>hello </>;
    // }
  };

  return (
   <>
     
        {renderComponentBasedOnURL()}
     
        </>
  );
}

export default Particleswitchcomp;
