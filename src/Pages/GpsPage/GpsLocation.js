import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { DeviceLocationAddress, DeviceLocationGetAll } from '../../Components/Api/DeviceLocationApi';
import DynamicMap from './Map';
import MapView from './MapView';
import StreetView from './StreetView';
import LocationOnIcon from "@material-ui/icons/LocationOn";
import BatteryFullIcon from "@material-ui/icons/BatteryFull";
import SpeedIcon from "@material-ui/icons/Speed";
import RoomIcon from "@material-ui/icons/Room";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { data } from 'jquery';


const GpsLocation = () => {
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const [address, setAddress] = useState("")
    const [time, setTime] = useState("")
    const [gpsName, setGpsName] = useState("")
    const [battery, setBattery] = useState("")
    const [latitude, setLatitude] = useState("19.615007091925058")
    const [longitude, setLongitude] = useState("75.27086060061654")
    const [gpsStatus, setGpsStatus] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Initial value
    const [selectedItemsPerPage, setSelectedItemsPerPage] = useState(10);
    const [searchData, setSearchData] = useState("");
    const [active, setActive] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const isOnline = false;
    //  const latitude = 19.18688;
    //   const longitude = 72.9759;
    // const latitude = 19.153923114972823;
    // const longitude = 73.22837369308381;
    useEffect(() => {
        getAllData();
    }, [currentPage, itemsPerPage, active]);

    const getLocation = async (hashKey) => {
        // const data = await getAllParentApi(navigate);
        const data = await DeviceLocationAddress(hashKey, navigate)
        // const data = await DeviceLocationGetAll(navigate)
        console.log(data[0].items)
        const temp = data[0].items[0];
        setAddress(temp.address)
        setTime(temp.time)
        setGpsName(temp.name)
        setBattery(temp.battery)
        setLatitude(temp.lat)
        setLongitude(temp.lng)
        setGpsStatus(temp.online)
    }

    const getAllData = async () => {
        // const data = await getAllParentApi(navigate);

        const data = await DeviceLocationGetAll(navigate)
        console.log(data)
        setAllData(data)

    }

    // const trackers = [
    //     { name: "Personal Tracker Runali", speed: "0 kph", date: "11-10-2025 05:21:02 PM" },

    // ];

    // Filtered data based on search input
    // const filteredTrackers = allData.filter((t) =>
    //     t.name.includes(searchTerm)
    // );

    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-9'>
                        <div style={{ padding: "20px" }} className='mt-3'>
                            {/* <h2>Dynamic Google Map</h2> */}
                            {/* <MapView lat={19.153923114972823} lng={73.22837369308381} /> */}
                            <DynamicMap lat={latitude} lng={longitude} />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="card shadow-sm p-3 mt-5" style={{ height: "480px" }}>

                            <input
                                type="text"
                                placeholder="Search tracker..."
                                className="form-control mb-3"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* 🧾 Scrollable Tracker List */}
                            <div
                                style={{
                                    maxHeight: "400px",
                                    overflowY: "auto",
                                }}
                            >
                                {allData.length > 0 ? (
                                    allData.map((t, index) => (
                                        <div
                                            key={index}
                                            className="border rounded p-2 mb-2 d-flex justify-content-between align-items-center"
                                            style={{ backgroundColor: "#f9f9f9", cursor: "pointer" }}
                                            onClick={()=>getLocation(t.HashKey)}
                                        >
                                            <div /* className='d-flex' */ >
                                                {/* <LocationOnIcon style={{ color: "#1976d2", marginRight: "5px" }} /> */}
                                                <h6><strong>{t.GPSNname}</strong></h6>
                                                {/* <div style={{ fontSize: "12px", color: "gray" }}>{t.date}</div> */}
                                            </div>

                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center text-muted">No trackers found</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-lg-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className="col-lg-9 d-flex align-items-center">
                                        <LocationOnIcon style={{ color: "#1976d2", marginRight: "5px" }} />
                                        <h6 style={{ margin: 0 }}>{gpsName}</h6>
                                    </div><div className="col-lg-3 d-flex justify-content-end align-items-center">
                                        <span
                                            style={{
                                                width: "10px",
                                                height: "10px",
                                                borderRadius: "50%",
                                                backgroundColor: gpsStatus === "online" ? "green" : "red",
                                                display: "inline-block",
                                                marginRight: "6px",
                                            }}
                                        ></span>
                                        <h6 className="mb-0">{gpsStatus}</h6>
                                    </div>

                                </div>

                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <h6>Address</h6>
                                    </div>
                                    <div className='col-lg-8'>
                                        <h6>{address}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <h6>Time</h6>
                                    </div>
                                    <div className='col-lg-8'>
                                        <h6>{time}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <h6>Stop Duration</h6>
                                    </div>
                                    <div className='col-lg-8'>
                                        <h6>	908h 49min 10s</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-lg-9 d-flex align-items-center' >
                                        <SpeedIcon style={{ fontSize: 20, marginRight: "5px" }} />
                                        <h6 style={{ margin: 0 }}>Sensors</h6>
                                    </div>

                                </div>

                            </div>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-lg-6 d-flex align-items-center'>
                                        <BatteryFullIcon style={{ color: "green", marginRight: "5px" }} />
                                        <h6 style={{ margin: 0 }}>Device Battery</h6>
                                    </div>
                                    <div className='col-lg-6'>
                                        <h6>{battery}</h6>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-lg-6 d-flex align-items-center'>
                                        <RoomIcon style={{ color: "#1976d2", marginRight: "5px" }} />
                                        <h6 style={{ margin: 0 }}>GPS Signals</h6>
                                    </div>
                                    <div className='col-lg-6'>
                                        <h6></h6>
                                    </div>
                                </div>
                                <hr />
                                <div className='row'>
                                    <div className='col-lg-6 d-flex align-items-center'>
                                        <PowerSettingsNewIcon style={{ color: "gray", marginRight: "5px" }} />
                                        <h6 style={{ margin: 0 }}>Movement</h6>
                                    </div>
                                    <div className='col-lg-6'>
                                        <h6>Off</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card'>
                            <div className='card-header'>
                                <div className='row'>
                                    <div className='col-lg-9 d-flex align-items-center'>
                                        <CameraAltIcon style={{ color: "#1976d2", marginRight: "5px" }} />
                                        <h6>Street View</h6>
                                    </div>

                                </div>

                            </div>
                            <div className='card-body'>
                                <StreetView lat={latitude} lng={longitude} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GpsLocation