import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Context } from '../Contexts';
import { useEffect } from 'react';
import axios from 'axios'
function AssetDetails() {
    const {assetDetails, setAssetDetails} = React.useContext(Context)
    useEffect(() => {
      const fetchAssetDetails = async () => {
        try {
          const response = await axios.get('http://localhost:3001/Dashboard/assetDetails');
          setAssetDetails(response.data);
        } catch (error) {
          console.error('Error fetching asset details:', error);
        }
      };
  
      fetchAssetDetails();
    }, [setAssetDetails]);
  return (

  <div style={{display:'flex', width:'100%', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', padding:'10px', boxShadow:'rgba(59,130, 246, 0.5) 5px 10px 15px', backgroundColor:'aliceblue', minHeight:'100vh'}}>
      <div style={{display:'flex',backgroundColor:'white', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'10px', boxShadow:'rgba(59,130, 246, 0.5) 5px 10px 15px', width:'80%', minHeight:'80vh'}}>
      <div style={{fontSize:'30px', fontWeight:'900', padding:'10px', fontFamily:'sans-serif', paddingBottom:'40px'}}>Asset List</div>
      {assetDetails.length === 0 ? (
        <Typography>No assets available</Typography>
      ) : (
        assetDetails.map((asset) => (
          <Accordion key={asset._id} style={{width:'90%'}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel-${asset._id}-content`}
              id={`panel-${asset._id}-header`}
            >
              <Typography>{`Asset Name: ${asset.Asset_name || 'N/A'}`}</Typography>
              <Typography style={{ marginLeft: '10px' }}>{`Asset ID: ${asset.Asset_id || 'N/A'}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{`Modal: ${asset.modal || 'N/A'}`}</Typography>
              <Typography>{`Date: ${asset.date || 'N/A'}`}</Typography>
              <Typography>{`Supplier: ${asset.supplier || 'N/A'}`}</Typography>
              <Typography>{`Manufacturer: ${asset.manufacturer || 'N/A'}`}</Typography>
              <Typography>{`Site: ${asset.Site || 'N/A'}`}</Typography>
              <Typography>{`Serial ID: ${asset.Serial_id || 'N/A'}`}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      )}
      </div>
    </div>
  )
}

export default AssetDetails