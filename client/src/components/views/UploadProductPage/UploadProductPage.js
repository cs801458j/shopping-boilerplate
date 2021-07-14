import React, { useEffect } from 'react'
import { useState } from 'react'
import { Typography, Button, From, Input } from 'antd';
import FileUpload from '../../utils/FileUploads';

const { Title } = Typography;
const Continents = [
    { key: 1, value: 'Africa'},
    { key: 2, value: 'Europe'},
    { key: 3, value: 'Asia'},
    { key: 4, value: 'North'},
    { key: 5, value: 'Hello'},
    { key: 6, value: 'Africa'},
    { key: 7, value: 'Austrailia'}
]

function UploadProductPage(props) {

    const [Title, setTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Price, setPrice] = useState(0)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    // 이거 되는 문법인가 test 해보기
    useEffect(() => {
        function titleHandler(e) {
            setTitle(e.currentTarget.value)
        }
    })

    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = (event) => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value)
    }
    
    const continentChangeHandler = (event) => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const submitHandler = (event) => {
        event.preventDefault();

        if(!Title || !Description || !Price || !Continent || !Images) {
            return alert('모든 값을 넣어주셔야 합니다.')
        }

        // 서버에 채운 값들을  request로 보낸다
        const body = {
            //  로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent
        }

        Axios.post("/api/request",)
        .then( response => {
            if(response.data.success) {
                alert('상품 업로드에 성공했습니다.')
                props.history.push('/')
            } else{
                alert('상품 업로드에 실패했습니다.')
            }
        })
    }

    return (
        <div style={{ maxWitdth: '700px', margin: '2rem auto'}}>
            <div style={{ textAlign: 'center', marginBottom: '2rem'}}>
                <h2>여행 상품 업로드</h2>
            </div>

            <form onSubmit={submitHandler}>
                { /* DropZone */}
                <FileUpload refreshFunction={updateImages}></FileUpload>


                <br />
                <br />
                <label>이름</label>
                <Input onChange={titleChangeHandler} value='하이' />
                <br />
                <br />
                <label>설명</label>
                <Textarea onChange={descriptionChangeHandler} value={Description} />
                <br />
                <br />
                <label>가격($)</label>vu
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br />
                <br />
                <select onChange={continentChangeHandler} value={}>
                        {Continents.map(item => (
                            <option key={item.key} value={item.key}>{item.value}</option>
                        ))}
                </select>
                <br />
                <br />
                <button type="submit">
                    확인
                </button>
            </form>
        </div>
    )
}

export default UploadProductPage