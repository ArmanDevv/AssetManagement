import React from 'react'
import { Context } from '../Contexts';


function PreviewForm() {
  const {setPreview} = React.useContext(Context)
  const assetInfo = JSON.parse(localStorage.getItem('assetInfo')) || {};
  const entries = Object.entries(assetInfo);
  const midIndex = Math.ceil(entries.length / 2);
  const firstHalf = entries.slice(0, midIndex);
  const secondHalf = entries.slice(midIndex);
  const {setIsSubmit} = React.useContext(Context)

  const handleClose = () => {
    setPreview(false);
    setIsSubmit(false)
  }
  return (
    <>  
    <div style={{height:'91.7vh', backgroundColor:'aliceblue', display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center'}}>    
    <div><h1 style={{fontSize:'20px', fontWeight:'900', margin:'0px'}}>Following Asset Details have been Successfully Submitted</h1></div>
    <div className="asset-info-box">
      {entries.length > 0 ? (
        <div className="columns">
          <ul className="column">
            {firstHalf.map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
          <ul className="column">
            {secondHalf.map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No asset information available.</p>
      )}
    </div>
    <button className='btn' onClick={handleClose}>Close</button>
    </div>
    </>

  );
}

export default PreviewForm