import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Context } from '../Contexts';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import AssetDetails from '../Pages/assetDetails';

export default function Cardz(props) {
  const {count,setcount} = React.useContext(Context);
  
  React.useEffect(()=>{
    const fetchCount = async() => {
      const response = await axios.get('http://localhost:3001/Dashboard/assetDetails')
      setcount(response.data.length);
    }

    fetchCount()
  })
  const {Count} = React.useContext(Context)
  const {assetDetails, setAssetDetails} = React.useContext(Context)
  let assetsDetail = React.useContext(Context)
  const navigate = useNavigate()
  const handleClick = async () => {
    const response = await axios.get('http://localhost:3001/Dashboard/assetDetails')
    console.log('API response:', response.data);
    setAssetDetails(response.data)
    navigate('/Dashboard/assetDetails')
  }
  // console.log(Count)
  const card1 = (
    <React.Fragment>
      <CardContent className='cardContent1'>
      <Typography variant="h3" component="div">
        {count}
        </Typography>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total assets
        </Typography>
  
        <Typography variant="body2">
          
          <br />
  
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  const card2 = (
    <React.Fragment>
      <CardContent className='cardContent2'>
        <Typography variant="h3" component="div">
          50
        </Typography>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total Licenses
        </Typography>
  
        <Typography variant="body2">
          
          <br />
  
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  const card3 = (
    <React.Fragment>
      <CardContent className='cardContent3'>
      <Typography variant="h3" component="div">
          4
        </Typography>
        <Typography sx={{ fontSize: 14 }}  gutterBottom>
          Total accessories
        </Typography>
  
        <Typography variant="body2">
          
          <br />
  
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </React.Fragment>
  );
  const card4 = (
    <>
      <CardContent className='cardContent4'>
      <Typography variant="h3" component="div">
          3
        </Typography>
        <Typography sx={{ fontSize: 14 }} >
          Total Consumables
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={handleClick} size="small">Learn More</Button>
      </CardActions>
      </>
    
  );


  return (
    <>
      <Card  variant="outlined">{card1}</Card>
      <Card className='cardLayout' variant="outlined">{card2}</Card>
      <Card className='cardLayout' variant="outlined">{card3}</Card>
      <Card className='cardLayout' variant="outlined">{card4}</Card>

    </>
  );
}
