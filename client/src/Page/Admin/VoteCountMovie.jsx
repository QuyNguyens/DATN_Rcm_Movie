import { useContext } from 'react';
import classNames from "classnames/bind";
import styles from './style.module.scss';
import 
{ BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
from 'recharts';
import { MovieContext } from '../../MovieContext';

const cx = classNames.bind(styles);
function VoteCountMovie() {
    const {movieVoteCount} = useContext(MovieContext);
    return ( <div className={cx('movie')}>
        <div className={cx('movie-box')}>
        <h1>Vote-Counts</h1>
        <div className='charts'>
            <ResponsiveContainer width="80%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={movieVoteCount}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="voteCount" fill="#8884d8" />
                <Bar dataKey="voteAverage" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
        </div>
    </div> );
}

export default VoteCountMovie;
