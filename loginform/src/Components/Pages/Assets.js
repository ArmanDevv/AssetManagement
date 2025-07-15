import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import * as React from 'react';
import Navbar from '../Dashboard/Navbar';
import SideMenu from '../Dashboard/SideMenu';
import './styles/pages.css';
import { useEffect } from 'react';
import Landingpage from '../Dashboard/LandingPage'
import { Context } from '../Contexts';
import dayjs from 'dayjs';
import PreviewForm from './PreviewForm';
import Swal from 'sweetalert2'
import axios from 'axios'

function Assets() {
  const {Count, setCount} = React.useContext(Context)
  const {isSubmit, setIsSubmit} = React.useContext(Context)
  const {preview, setPreview} = React.useContext(Context)
  const [assetRecord, setAssetRecord] = React.useState([]);
  const [FormErrors,setFormErrors] = React.useState({})
  const[alert,setAlert] = React.useState(false)
  const maxdate = dayjs();
  const [assetInfo, setAssetInfo] = React.useState({
    Asset_name : "",
    Site : "",
    Asset_id : "",
    Serial_id : "",
    modal : "",
    tag_number : "" ,
    date : null,
    RFID : "",
    Purchase_price : "",
    purchase_date : null,
    inovice_id : "",
    expected_life : "",
    supplier : "",
    manufacturer : "",
    Asset_status : "",
    Cost_center : "",
    Parent_Asset : "",
    Date_removed : null
  });

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(name + value)
    setAssetInfo({...assetInfo,[name]:value}  )
  }

  //Load initial data from local storage on component mount
  useEffect(() => {
    const storedAssets = JSON.parse(localStorage.getItem('assetRecord'));
    if (storedAssets) {
      setAssetRecord(storedAssets);
      setCount(storedAssets.length); // Update count based on stored data length
    }
  }, []);
  

  useEffect(() => {
    console.log(assetRecord);
  }, [assetRecord]);

  const validate = (value) => {
    const error = {}
    const digitrex = /^\d+$/;
    if(!digitrex.test(value.Asset_id)){
      error.Asset_id = 'Asset ID can only contain number'
    }
    if(!value.Asset_name){
      error.Asset_name = 'Please Enter Asset Name'
    }
    if(!value.modal){
      error.modal = 'Please Enter Modal'
    }
    if(!value.tag_number){
      error.tag_number = 'Please Enter Tag Number'
    }
    if(!value.Serial_id){
      error.Serial_id = 'Please Enter Serial ID'
    }
    if(!value.Parent_Asset){
      error.Parent_Asset = 'Please Enter Parent Asset'
    }
    if(!value.inovice_id){
      error.inovice_id = 'Please Enter Invoice ID'
    }
    if(!value.RFID){
      error.RFID = 'Please Enter RFID'
    }
    if(Object.keys(error).length === 0){
      handleAlert()
    }
    return error;
  }

    //UseEffect for showing error or if none then showing form data
    useEffect(()=>{
      if(Object.keys(FormErrors).length===0 && isSubmit){
        console.log(assetRecord)
      }
    },[FormErrors])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = { ...assetInfo };
    const updatedRecords = [...assetRecord, newRecord];
    //Update local storage and state
    localStorage.setItem('assetRecord', JSON.stringify(updatedRecords));
    localStorage.setItem('assetInfo', JSON.stringify(newRecord));
    setCount(updatedRecords.length);
    console.log(Count)
    setAssetRecord(updatedRecords);
    //validations
    setFormErrors(validate(newRecord));
    setIsSubmit(true)
    
  }

  const handleDateChange = (name, date) => {
    setAssetInfo({ ...assetInfo, [name]: date });
    const formattedDate = date ? new Date(date).toLocaleDateString() : null;
    console.log(name + formattedDate);
  };

    const {Asset_name , Asset_id} = assetInfo;
  const handleAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit"
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSubmit(true)
        axios.post('http://localhost:3001/Dashboard/assets',assetInfo).then(result=>console.log(result)).catch(err=>console.log(err))
        Swal.fire({
          title: "Submitted!",
          text: "Your file has been Submitted",
          icon: "success"
        });
        setPreview(true)
      }
    });
  }

  return (
    <>
    <div style={{position:'fixed', zIndex:'10'}}><SideMenu/></div>
    <Box
      onSubmit={handleSubmit}
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      autoComplete="off"
      // marginLeft={'40%'}
    >
      <div style={{display:'flex', marginLeft:'50px', flexDirection:'column', backgroundColor:'aliceblue'}}>
      <Navbar/>
      {
        preview ? <PreviewForm/> :
      <>
      <div style={{display:'flex' , flexDirection:'row', boxShadow: 'rgba(59,130, 246, 0.5) 0px 5px 15px', width:'98%', margin:'50px 0px 0px 15px'}}>
      <div style={{backgroundColor:'aliceblue', width:'50%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'500px'}}>
          <div style={{fontSize:'30px', fontWeight:'600', marginBottom:'10px'}}>General Details</div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%', paddingTop:'10px'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Asset Name</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'Asset_name'
              value = {assetInfo.Asset_name}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.Asset_name}</p></div>
            </div>
            </div>

            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
              <p>Site</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                // value={age}
                onChange={handleChange}
                name = 'Site'
                value = {assetInfo.Cost_center}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Noida'}>Noida</MenuItem>
                <MenuItem value={'Gurgaon'}>Gurgaon</MenuItem>
                <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Asset id # </p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'Asset_id'
              value = {assetInfo.Asset_id}
              fullWidth
              size='small'
              id="outlined"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.Asset_id}</p></div>
            </div>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Serial #</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'Serial_id'
              value = {assetInfo.Serial_id}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.Serial_id}</p></div>
            </div>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Modal</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'modal'
              value = {assetInfo.modal}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.modal}</p></div></div>

            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Tag Number</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'tag_number'
              value = {assetInfo.tag_number}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.tag_number}</p></div></div>

            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p style={{fontSize:'15px'}}>Date</p>
            <DatePicker maxDate={maxdate} value={assetInfo.date} onChange={(newValue) => handleDateChange('date', newValue)}/>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>RFID</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'RFID'
              value = {assetInfo.RFID}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.RFID}</p></div></div>

            </div>
          </div>
          
          {/* <div style={{height:'0.35px', border:'0.1px solid gray', width:'100%', margin:'10px 0px'}}></div> */}
        </div>

      </div>
      <div style={{backgroundColor:'aliceblue', width:'50%', borderLeft:'1px solid gray', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'500px'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%', paddingTop:'10px'}}>
          
          {/* <div style={{height:'0.35px', border:'0.1px solid gray', width:'100%', margin:'10px 0px'}}></div> */}
        </div>
        <div style={{fontSize:'30px', fontWeight:'600', marginBottom:'10px'}}>Purchase Details</div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Price</p>
            <TextField
              onChange = {handleChange}
              name = 'Purchase_price'
              value = {assetInfo.Purchase_price}
              type="number"
              size='small'
              min={0}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Purchase Date</p>
            <DatePicker value={assetInfo.purchase_date} onChange={(newValue) => handleDateChange('purchase_date', newValue)}/>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Invoice #</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'inovice_id'
              value = {assetInfo.inovice_id}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.inovice_id}</p></div></div>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Expected Life</p>
            <TextField
              onChange = {handleChange}
              name = 'expected_life'
              value = {assetInfo.expected_life}
              type="number"
              size='small'
              min={0}
            />
            </div>
          </div>
          {/* <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Replcament Cost</p>
            <TextField
              type="number"
              size='small'
              min={0}
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Salvage Value</p>
            <TextField
              type="number"
              size='small'
              min={0}
            />
            </div>
          </div> */}
          {/* <div style={{height:'0.35px', border:'0.1px solid gray', width:'100%', margin:'10px 0px'}}></div> */}
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Supplier</p>
            <TextField
              onChange = {handleChange}
              name = 'supplier'
              value = {assetInfo.supplier}
              fullWidth
              size='small'
              id="outlined"
            />
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Manufacturer</p>
            <TextField
              onChange = {handleChange}
              name = 'manufacturer'
              value = {assetInfo.manufacturer}
              fullWidth
              size='small'
              id="outlined"
            />
            </div>
          </div>
          {/* <div style={{height:'0.35px', border:'0.1px solid gray', width:'100%', margin:'10px 0px'}}></div> */}
        </div>
        <div style={{display:'flex', flexDirection:'column', justifyContent: 'space-evenly', width:'100%'}}>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Asset Status</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                // value={age}
                onChange={handleChange}
                name = 'Asset_status'
                value = {assetInfo.Asset_status}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Active'}>Active</MenuItem>
                <MenuItem value={'Paused'}>Paused</MenuItem>
                <MenuItem value={'Terminated'}>Terminated</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Cost Center</p>
            <FormControl sx={{ m: 1, minWidth: 215 }} size="small">
              <Select
                id="demo-select-small"
                // value={age}
                onChange={handleChange}
                name = 'Cost_center'
                value = {assetInfo.Cost_center}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value={'Noida'}>Noida</MenuItem>
                <MenuItem value={'Gurgaon'}>Gurgaon</MenuItem>
                <MenuItem value={'Mumbai'}>Mumbai</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div style={{display:'flex', justifyContent: 'space-evenly', alignItems:'center', width:'100%'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Parent Asset</p>
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
            <TextField
              onChange = {handleChange}
              name = 'Parent_Asset'
              value = {assetInfo.Parent_Asset}
              fullWidth
              size='small'
              id="outlined"
              label="Required"
            />
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}><p style={{color:'red', fontSize:'12px', fontFamily:'monospace'}}>{FormErrors.Parent_Asset}</p></div></div>
            </div>
            <div style={{display:'flex',justifyContent: 'space-between', alignItems:'center', width:'40%'}}>
            <p>Date Removed</p>
            <DatePicker minDate={assetInfo.purchase_date || null} value={assetInfo.Date_removed} onChange={(newValue) => handleDateChange('Date_removed', newValue)}/>
            </div>
          </div>
          {/* <div style={{height:'0.35px', border:'0.1px solid gray', width:'70%', margin:'10px 0px'}}></div> */}
        </div>
        
      </div>

      </div>
      <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', height:'118px', paddingBottom:'20px'}}>
          <button type='submit' className='btn'>
            Submit
          </button>
      </div>
      </>
      }   
      </div>

    </Box>
    {/* </div> */}
    </>
  );
}

export default Assets