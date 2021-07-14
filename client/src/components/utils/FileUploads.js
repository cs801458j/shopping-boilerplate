import React from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { response } from 'express';
function FileUploads(props) {

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {
        let formData = new FormData();

        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }

        formData.append('file', files[0])

        axios.post('/api/product/image', formData, config)
            .then( response => {
                if (response.data.success) {
                    console.log(response.data)

                    setImages([...Images, response.data])

                } else{
                    alert('파일을 저장하는데 실패했습니다.')
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)

        console.log('currentIndex', currentIndex)
        let newImage = [...Images]
        newImages.splice(currentIndex, 1)   //  (삭제할 인덱스, 현재로부터 몇 개 지울건지)

        setImages(newImages)
    }


    return (
        <div style={{ display: 'flex', justifyContent: 
        'space-between'}}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (

                    <div 
                        style={{
                            width:300, height: 240, border: '1px solid black',
                            display: 'flex', alignItem: 'center', justifyContent: 'center'
                        }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem'}} />
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll'}}>
                {
                    Images.map((index, image) => (
                        <div onClick={()=> deleteHandler(image)} key={index}>
                            <img style={{ minWidth: '300px', minWidth: '300px', height: '240px', overflowX: 'scroll'}}
                    src={`http://localhost:5000/${image}`} />
                        </div>
                    ))
                }
                
                     

            </div>
        </div>
    );
}

export default FileUploads;