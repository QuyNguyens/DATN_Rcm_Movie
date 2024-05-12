import classNames from "classnames/bind";
import styles from './dialog.module.scss';

import IconButton from '@mui/material/IconButton';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Fragment, useContext } from "react";
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { notify } from "../../../components/Layout/Component/Notify";
import { MovieContext } from "../../../MovieContext";
import { UserContext } from "../../../UserContext";
const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function AddDialog({open,setOpen,handleClickOpen,handleClose,pathFilePoster,setPathFilePoster}) {

    const {movieAdmin,setMovieAdmin} = useContext(MovieContext);
    const {setAmountMovie} = useContext(UserContext);
    const [movie,setMovie] = useState({
        title: '',
        descriptions: '',
        urls: '',
        originalLanguage: '',
        poster: ''
      });
    
    const handleAddMovie = (e,type) =>{
        console.log('co vao day');
        switch(type){
            case 'title':
                setMovie({
                    ...movie,
                    title: e.target.value
                });
                break;
            case 'desc':
                setMovie({
                    ...movie,
                    descriptions: e.target.value
                });
                break;
            case 'url':
                setMovie({
                    ...movie,
                    urls: e.target.value
                });
                break;
            case 'language':
                setMovie({
                    ...movie,
                    originalLanguage: e.target.value
                });
                break;
        }
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('formfile', file);
        axios.post(import.meta.env.VITE_PUT_IMAGE,formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            setPathFilePoster(result.data.result);
        })
        .catch(err => console.log('upload failed: ',err));

    };
    const handleClickAddMovie = () => {
        const updateMovie = {
            ...movie,
            poster: import.meta.env.VITE_GET_IMAGE + pathFilePoster
        }
        axios.post(import.meta.env.VITE_POST_CREATE_MOVIE,updateMovie)
        .then(() => {
            setAmountMovie(pre => pre + 1);
            console.log('moviecre: ', updateMovie)
            setMovieAdmin([updateMovie,...movieAdmin])
            setOpen(false);
            notify('The movie created success');
        })
        .catch(err => console.log('add movie err: ',err));
    }
    return ( <Fragment>
                <IconButton onClick={() => handleClickOpen('add')} aria-label="add">
                    <LibraryAddIcon color="primary" />
                </IconButton>
                <Dialog
                    open={open}
                    onClose={() => handleClose('add')}
                    maxWidth= 'md'
                >
                    <DialogTitle>Add Movie</DialogTitle>
                    <DialogContent style={{width:'550px'}}>
                            <form >
                                <Box sx={{margin:'10px 0'}}>
                                    <span>Title:</span><br />
                                    <TextField style={{width:'100%'}} onChange={e => handleAddMovie(e,'title')} id="filled-basic" value={movie?.title!=null ? movie?.title: ''} variant="outlined" />
                                </Box>
                                <Box sx={{margin:'10px 0'}}>
                                    <span>Descriptions:</span><br />
                                    <TextField style={{width:'100%'}} onChange={e => handleAddMovie(e,'desc')} id="filled-basic" value={movie?.descriptions!=null ? movie?.descriptions: ''} variant="outlined" />
                                </Box>
                                <Box sx={{margin:'10px 0'}}>
                                    <span>Url:</span><br />
                                    <TextField style={{width:'100%'}} onChange={e => handleAddMovie(e,'url')} id="filled-basic" value={movie?.urls!=null ? movie?.urls: ''} variant="outlined" />
                                </Box>
                                <Box sx={{margin:'10px 0'}}>
                                    <span>Original_language:</span><br />
                                    <TextField style={{width:'100%'}} onChange={e => handleAddMovie(e,'language')} id="filled-basic" value={movie?.originalLanguage!=null ? movie?.originalLanguage: ''} variant="outlined" />
                                </Box>
                                <Box sx={{margin:'10px 0'}}>
                                    <span>Poster</span>
                                    <Box sx={{height:'100px', border:'0.2px solid var(--borderLeftbar)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                                        <input type="file" id="fileInput"
                                            accept=".jpg,.png,.jpeg"
                                            style={{ display: 'none' }} 
                                            onChange={(e) => handleFileChange(e,'poster')}/>
                                        {pathFilePoster ?
                                            <Box sx={{width:'100px !important',position: 'relative'}}>
                                                <IconButton onClick={() => setPathFilePoster('')} className={cx('delete_icon_avatar')} aria-label="delete" style={{position:'absolute', top:'5px',right:'5px'}}>
                                                    <DeleteIcon />
                                                </IconButton>
                                                <img style={{width:'100px', height:'100px', padding: '5px', borderRadius:'10px'}} src={import.meta.env.VITE_GET_IMAGE+pathFilePoster} alt="" />
                                            </Box>: <Box sx={{width:'50px !important'}}></Box>}
                                                <Box sx={{ display: 'flex', alignItems: 'center',marginLeft:'15px' }}>
                                                    <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
                                                    <span style={{ border: '1px solid #ccc', padding: '5px 10px', borderRadius: '4px' }}>
                                                        Upload
                                                    </span>
                                                    </label>
                                                </Box>
                                            </Box>
                                </Box>
                            </form>      
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={() => handleClose('add')}>Cancel</Button>
                    <Button onClick={handleClickAddMovie} color='primary'>Add</Button>
                    </DialogActions>
                </Dialog>
            </Fragment> );
}

export default AddDialog;