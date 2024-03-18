import React, { useState } from 'react';
import './Qrcode.css';


function Qrcode() {

    const [img, setImg] = useState("");
    const [loading, setloading] = useState("");
    const [Qrdata, setQrdata] = useState ("");
    const [size, setSize] = useState("150");


    async function generate(){
        setloading(true);
        try{
            const url =`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(Qrdata)}`;
            setImg(url)
        }catch(error){
            console.error('Error generating QR code', error);
        }finally{
            setloading(false);
        }
    }
        function download(){
            fetch(img).then((Response)=>Response.blob())
            .then((blob)=>{
                const link= document.createElement('a');
                link.href=URL.createObjectURL(blob);
                link.download='QrCode.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    

    return (
        <div className='body'>
            <h1>QR CODE GENERATOR </h1>
            {img && <img src={img} className='Qr-code-img' />}
            {loading && <p>Please wait...</p>}

            <div>
                <label htmlFor='datainput' className='input-label'>Data for QR Code :</label>
                <input type='text' id='input' placeholder='Enter the Url for QR Code' value={(Qrdata)} onChange={(e)=>setQrdata(e.target.value)}></input>



                <label htmlFor='sizeinput' className='input-label'>Image Size :</label>
                <input type='text' id='sizeinput' placeholder='Enter Image Size' value={size} onChange={(e)=>setSize(e.target.value)}></input>

                <button className='generate-btn' disabled={loading} onClick={generate} > Generate QR Code</button>
                <button className='download-btn' onClick={download}>Download QR Code</button>

            </div>
                <p>Designed by <a href=''>Raheem Basha</a></p>
        </div>
    )
}

export default Qrcode