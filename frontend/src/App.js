import axios from 'axios';
import {useState} from 'react'

function App() {
  const [imgInfo,setImgInfo] = useState({preview:'',data:null});

  const handleInputChange = (e) =>{
    console.log('Input change  ',e.target.files);
    const img={
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0]
    }
    console.log(img.preview);
    setImgInfo(img);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log('submitted');
    const formData = new FormData();
    formData.append('uploadImg',imgInfo.data);
    axios.post('http://localhost:5000/imageupload',formData,{
      headers:{"Content-Type":"multipart/form-data"}
    })
    .then(res =>{
      console.log(res);
    })
    .catch(err =>{console.log(err)})
    
  }
  return (
    <div className="App">
      <h1>React image upload</h1>
      <div className="container">
        {imgInfo.preview && (<div className="img-container">
          <img src={imgInfo.preview} alt="" />        
        </div>)}
        
        <form className='form' onSubmit={handleSubmit}>
          
          <input 
          type="file" 
          id="fileSelect" 
          accept='image/*'
          onChange={handleInputChange}/>
          <button type="sumbit" >Upload</button>
        </form>
      </div>
    </div>
  );
}

export default App;
