
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import $ from "jquery"
import React, { useState, useEffect } from 'react';

function App() {
  const [ajaxData, setAjaxData] = useState([]);

  const [formData, setFormData] = useState({
    nama: '',
    alamat: '',
    nomor_telepon: '',
    jenis_kelamin: '',
    email: ''
  });

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchData = () => {
    $.ajax({
      url: 'http://localhost:4000/daftar',
      type: 'GET',
      contentType: 'application/json',
      success: (data) => {
        if(data.code === 1000){
          setAjaxData(data.result)
        }
      },
      error: (error) => {
        console.error('Gagal menampilkan data:', error);
      }
    });
  }  

  const fDelete = (e, id) => {
    e.preventDefault();
    console.log(id)

    $.ajax({
      url: 'http://localhost:4000/daftar/delete',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({id: id}),
      success: (data) => {
        window.location.reload(false);
      },
      error: (error) => {
        console.error('Gagal hapus data:', error);
      }
    });


  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ganti URL_API dengan URL sebenarnya tempat Anda ingin menyimpan data
    const apiUrl = 'http://localhost:4000/daftar';

    $.ajax({
      url: apiUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: (data) => {
        if(data.code === 1000){
          $.ajax({
            url: apiUrl,
            type: 'GET',
            contentType: 'application/json',
            success: (data) => {
              if(data.code === 1000){
                setAjaxData(data.result)
              }
            },
            error: (error) => {
              console.error('Gagal menampilkan data:', error);
            }
          });
        }
        alert(data.message);
      },
      error: (error) => {
        console.error('Gagal menyimpan data:', error);
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  return (
    
    <>
      <form onSubmit={handleSubmit}>
        <Form.Control className="m-3" type="text" name="email" placeholder="email" onChange={handleChange}/>
        <Form.Control className="m-3" type="text" name="nama" placeholder="nama" onChange={handleChange}/>
        <Form.Control className="m-3" type="text" name="alamat" placeholder="alamat" onChange={handleChange}/>
        <Form.Control className="m-3" type="text" name="nomor_telepon" placeholder="nomor_telepon" onChange={handleChange}/>

        <Form.Select  className="m-3" aria-label="Default select example" name="jenis_kelamin" onChange={handleChange}>
          <option>Jenis Kelamin</option>
          <option value="pria">pria</option>
          <option value="wanita">wanita</option>
        </Form.Select>

        <Button  className="m-3" variant="primary" type="submit">Simpan Data</Button>
      </form>

      <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Alamat</th>
          <th>Nomor Telepon</th>
          <th>Jenis Kelamin</th>
        </tr>
      </thead>
      <tbody>
        {ajaxData.map((item, key) => (
            <tr key={key}>
              <td>{item._id}</td>
              <td>{item.nama}</td>
              <td>{item.alamat}</td>
              <td>{item.nomor_telepon}</td>
              <td>{item.jenis_kelamin}</td>
              <td><Button onClick={(e) => fDelete(e, item._id)} variant="danger">Delete</Button></td>
            </tr>
        ))}
      </tbody>
    </Table>
    </>
  
    
  );
}

export default App;
