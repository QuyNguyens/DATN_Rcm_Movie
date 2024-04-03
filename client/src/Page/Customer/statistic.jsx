import classNames from "classnames/bind";
import styles from './style.module.scss';
import { PieChart } from '@mui/x-charts/PieChart';
import Box from '@mui/material/Box';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";

const cx = classNames.bind(styles);
function Statistic() {
      const data = [
        { id: 0, value: 46, label: 'Japan' },
        { id: 1, value: 15, label: 'USA' },
        { id: 2, value: 54, label: 'Korea' },
        { id: 3, value: 23, label: 'VietNam' },
        { id: 4, value: 20, label: 'India' },
      ];

    return ( <div className={cx('statistic')}>
                <div className={cx('statistic-box')}>
                    <h1>Thống kê</h1>
                    <div className={cx('statistic-m')}>
                        <div className={cx('statistic-left')}>
                        <PieChart
                            series={[
                                {
                                data,
                                highlightScope: { faded: 'global', highlighted: 'item' },
                                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                                },
                            ]}
                            height={200}
                            />
                        </div>
                        <div className={cx('statistic-right')}>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Quốc gia</th>
                                        <th>Lượng giờ truy cập(minute)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item,index) =>{
                                        return <tr key={index}>
                                                <td>{item.label}</td>
                                                <td>{item.value}</td>
                                        </tr>
                                    })}
                                    
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className={cx('statistic-gift')}>
                        <Box sx={{width: '90%',height:'3px',backgroundColor: 'white',position:'relative'}}>
                            <Box sx={{ width: '35%', height: '3px', backgroundColor: 'green', position:'absolute' }}>
                                <Box sx={{width:'15px',height:'15px',backgroundColor:'green', borderRadius:'50%', position:'absolute',right:'-5px',top:'-6px'}}></Box>
                            </Box>
                        </Box>
                        <div className={cx('statistic-gifticon')}>
                        <Tooltip title="Bạn đã tích được 3.5 giờ :<33">
                            <Fab color="primary" aria-label="add">
                                <CardGiftcardIcon color="pink" fontSize="large" />                       
                            </Fab>
                        </Tooltip>
                        </div>
                    </div>
                    <div className={cx('statistic-gift-s')}>
                        <Box sx={{ width: '90%',display: 'flex', justifyContent:'space-between', color:'white' }}>
                        {
                            Array.from({ length: 11 }, (_, index) => index + 1).map((item,index) =>{
                                return <span key={index}>{item-1}</span>
                            })
                        }
                        </Box>
                    </div>
                    <Box sx={{display:'flex',justifyContent:'center',color:'white',fontSize:'20px'}}><p>Tích đủ 10 giờ xem để nhận quà</p></Box>
                </div>
            </div> );
     }
export default Statistic;