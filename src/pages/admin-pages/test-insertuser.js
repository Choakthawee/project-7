import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';

function ImportExcel() {
    const [file, setFile] = useState(null);
    const [data, setData] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleImport = () => {
        if (!file) return;
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const excelData = XLSX.utils.sheet_to_json(ws, { header: 1 });
            setData(excelData);
        };
    };

    const handleSaveToDatabase = () => {
        console.log({ email: data[0][0], name: data[0][1], id: data[0][2] });
        axios.post('http://localhost:4133/api/user1', { email: data[0][0], name: data[0][1], id: data[0][2] })
            .then(response => {
                console.log('Data saved successfully:', response.data);
                // หลังจากบันทึกข้อมูลสำเร็จ ทำสิ่งที่ต้องการที่นี่
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleImport}>Import Excel</button>
            <ul>
                {data.map((row, index) => (
                    <li key={index}>
                        Email: {row[0]}, Name: {row[1]}, ID: {row[2]}
                    </li>
                ))}
            </ul>
            <button onClick={handleSaveToDatabase}>Save to Database</button>
        </div>
    );
}

export default ImportExcel;
