'use client'
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { DataGrid } from '@mui/x-data-grid';
import { useAxios } from '../../../utills/axios';
import { BiSolidDownload } from "react-icons/bi";
import { IconButton, Tooltip } from '@mui/material';

const page = () => {
    const instance = useAxios();
    const [invoicesForm, setInvoicesForm] = useState(false)
    const [invoicesList, setInvoicesList] = useState(true)
    const [pageSize, setPageSize] = useState(5)
    const [selectedClient, setSelectedClient] = useState({});
    const [clients, setClients] = useState(null)
    const [allInvoices, setAllInvoices] = useState([])
    const [submitBtn, setSubmitBtn] = useState(false)
    const [product, setProduct] = useState({
        quantity: '',
        description: '',
        taxRate: '',
        price: '',
    })
    
    if(allInvoices){
        console.log(allInvoices,"dfsd")
    }

    const [invoiceData, setInvoiceData] = useState({

        sender: {
            company: 'IONINKS',
            address: '1-2,34,Ram Nagar',
            zip: '452001',
            city: 'Visakhaptnam',
            country: 'India'
        },
        client: {
            company: '',
            address: '',
            zip: ''
        },
        products: [

        ]

    });


    if(allInvoices){
        console.log(allInvoices,"invoidid")
    }

    // LIST OF ALL INVIOCES

    const getAllInvoices = async () => {
        try {
            const res = await instance.get("invoices/getallinvoice/admin")
            if(res.data){
                setAllInvoices(res.data.InvoiceList)
            }


        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getAllInvoices()
    }, [])
    


    const handleSubmit = async () => {

        try {

            const res = await instance.post("/invoices/generate-invoice/admin",invoiceData)

            if (res.data) { // Access res.data.success

                toast("Invoice is created") // Access res.data.TaskList
                window.open(res.data.pdfPath, "_blank");
                // setClients(res?.data?.TaskList);
            }

            setInvoiceData({

                sender: {
                    company: 'IONINKS',
                    address: '1-2,34,Ram Nagar',
                    zip: '452001',
                    city: 'Visakhaptnam',
                    country: 'India'
                },
                client: {
                    company: '',
                    address: '',
                    zip: ''
                },
                products: [
        
                ]
        
            })

            setProduct({
                quantity: '',
                description: '',
                taxRate: '',
                price: '',
            })

            setSelectedClient({})




        } catch (error) {

            console.log(error)

        }
   

    };

    const handleClientForm = () => {
        setInvoicesForm(true)
        setInvoicesList(false)
    }


    const handleClientList = () => {
        setInvoicesList(true)
        setInvoicesForm(false)

    }

    // GEt All Clents


    const getAllClients = async () => {

        try {

            const res = await instance.get("/client/allclientlist/admin")

            if (res.data.sucess) { // Access res.data.success
                console.log(res.data.TaskList, "task"); // Access res.data.TaskList
                setClients(res?.data?.TaskList);
            }

        } catch (error) {

            console.log(error)

        }
    }

    useEffect(() => {

        getAllClients()

    }, [])

    const handleClient = (event) => {
        console.log(event.target.value._id, "clieee")
        let id = event.target.value._id
        setSelectedClient(event.target.value)
        setInvoiceData({
            ...invoiceData,
            client: {...invoiceData.client, company:id}
        });

        // setProjectData({
        //     ...projectData,
        //     clientEmail: event.target.value.clientEmail
        // });
    };





    const columns = [

          {
            field: "client.company",
            headerName: (
              <div className="text-[#FF730F] font-bold">Client Id</div>
            ),
            minWidth: 150,
            flex: 0.2,
            valueGetter: (params) => {
              return params.row.client.company;
            },
          },
          {
            field: "client.address",
            headerName: (
              <div className="text-[#FF730F] font-bold">Client Address</div>
            ),
            minWidth: 150,
            flex: 0.2,
            valueGetter: (params) => {
              return params.row.client.address;
            },
          },
          {
            field: 'products', // Access the 'products' field within the row
            headerName: (
                <div className="text-[#FF730F] font-bold">Products</div>
            ),
            minWidth: 200,
            flex: 0.2,
            renderCell: (params) => (
              <Select
                value={params.value[0]?.description || ''}
                variant="outlined"
                fullWidth
                // Handle dropdown change here if needed
              >
                {params.value.map((product, index) => (
                  <MenuItem key={index} value={product.description}>
                    {product.description}
                  </MenuItem>
                ))}
              </Select>
            ),
          },
          {
            field: "action",
            headerName: (
                <div className="text-[#FF730F] font-bold">Download Pdf</div>
            ),
            minWidth: 100,
            flex: 0.1,
            renderCell: ({ row }) => (
                <Box sx={{margin:"0 auto"}}>
                    <Tooltip title="Download">
                        <IconButton
                            //   onClick={() => router.push(`/admin/property/edit/${row._id}`)}
                            //   onClick={() => console.log("click")}
                            onClick={(e) => {
                                e.stopPropagation();
                                
                                console.log(row,"click")
                            }}
                            color="primary"
                        >
                            <BiSolidDownload />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },

    ];

    if (product) {
        console.log(product, "product")
    }

    const handleProductChange = (field, value) => {
        setProduct({
            ...product,
            [field]: value,
        });
    };


    const addProduct = () => {
        setSubmitBtn(true)
        const newProduct = { ...product };
        setInvoiceData({
            ...invoiceData,
            products: [...invoiceData.products, newProduct],
        });

        console.log(invoiceData, "product")

        // Clear the product input fields
        setProduct({
            quantity: '',
            description: '',
            taxRate: '',
            price: '',
        });
    };


    return (
        <div className='mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
            <div className='flex justify-end gap-4'>
                {invoicesList ? <Button
                    variant="contained"
                    onClick={handleClientForm}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#FF730F', // Set the background color
                        '&:hover': {
                            backgroundColor: '#db8e57', // Set the hover background color
                        },
                        color: 'white', // Set the text color
                    }}
                    className="bg-[#FF730F] text-white hover:bg-[#db8e57] rounded-lg"
                >
                    Create Invoice
                </Button> : null}
                {invoicesList === false ? <Button
                    variant="contained"
                    onClick={handleClientList}
                    sx={{
                        marginTop: 2,
                        backgroundColor: '#FF730F', // Set the background color
                        '&:hover': {
                            backgroundColor: '#db8e57', // Set the hover background color
                        },
                        color: 'white', // Set the text color
                    }}
                    className="bg-[#FF730F] text-white hover:bg-[#db8e57] rounded-lg"
                >
                    Show invoices
                </Button> : null}

            </div>
            {invoicesForm ? <Box sx={{ maxWidth: "50%", margin: "0 auto" }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Create a Invoice
                </Typography>
                <form>

                <Box sx={{ minWidth: 320, marginTop: "15px", marginBottom: "10px" }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={selectedClient.clientName}
                                        label="Client"
                                        onChange={handleClient}
                                    >
                                        {clients && clients.map((client) => (
                                            <MenuItem
                                                key={client._id}
                                                value={client}
                                            >
                                                {client.clientName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                    {/* <TextField
                        label="Client company"
                        fullWidth
                        margin="normal"
                        value={invoiceData.client.company}
                        onChange={(e) => setInvoiceData({ ...invoiceData, client: { ...invoiceData.client, company: e.target.value, }, })}
                    /> */}

                    <TextField
                        label="Client Address"
                        fullWidth
                        margin="normal"
                        value={invoiceData.client.address}
                        onChange={(e) => setInvoiceData({ ...invoiceData, client: { ...invoiceData.client, address: e.target.value, }, })}
                    />
                    <TextField
                        label="Zip"
                        fullWidth
                        margin="normal"
                        value={invoiceData.client.zip}
                        onChange={(e) => setInvoiceData({ ...invoiceData, client: { ...invoiceData.client, zip: e.target.value, }, })}
                    />

                    {/* Product fields */}
                    <TextField
                        label="Product quantity"
                        fullWidth
                        margin="normal"
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) => handleProductChange('quantity', e.target.value)}
                    />
                    <TextField
                        label="Product description"
                        fullWidth
                        margin="normal"
                        name="description"
                        value={product.description}
                        onChange={(e) => handleProductChange('description', e.target.value)}
                    />
                    <TextField
                        label="Product taxRate"
                        fullWidth
                        margin="normal"
                        name="taxRate"
                        value={product.taxRate}
                        onChange={(e) => handleProductChange('taxRate', e.target.value)}
                    />
                    <TextField
                        label="Product price"
                        fullWidth
                        margin="normal"
                        name="price"
                        value={product.price}
                        onChange={(e) => handleProductChange('price', e.target.value)}
                    />

                    <Button
                        variant="contained"
                        onClick={addProduct}
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#FF730F',
                            '&:hover': {
                                backgroundColor: '#db8e57',
                            },
                            color: 'white',
                        }}
                        className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                    >
                       {submitBtn ? "Add Another Product" : "Add Product"}
                    </Button>

                    {/* Product cards */}
                    <div className="overflow-x-auto mt-4 max-w-md">
                        <div className="flex space-x-4">
                            {invoiceData.products.map((product, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-300 p-4 shadow-xl rounded-md"
                                >
                                    <p>Product {index + 1}:</p>
                                    <p>Description: {product.description}</p>
                                    <p>Price: {product.price}</p>
                                </div>
                            ))}
                        </div>
                    </div>

            { submitBtn ?       <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            marginTop: 2,
                            backgroundColor: '#FF730F', // Set the background color
                            '&:hover': {
                                backgroundColor: '#db8e57', // Set the hover background color
                            },
                            color: 'white', // Set the text color
                        }}
                        className="bg-[#FF730F] text-white hover:bg-[#db8e57]"
                    >
                        Submit
                    </Button>: null}
                </form>
            </Box> : invoicesList ? <div className='mt-6'>


                <Box>
                    <DataGrid
                        rows={allInvoices}
                        columns={columns}
                        getRowId={(row) => row._id}
                        pageSizeOptions={[5, 10, 15, 100]}
                        pageSize={pageSize}
                        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                        checkboxSelection={false}
                        onRowClick={(params) => handleRowClick(params.row)}

                    />
                </Box>





            </div> : null}
        </div>
    )
}

export default page