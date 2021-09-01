import { Button, Dialog, DialogContentText, DialogTitle, DialogContent, useMediaQuery, useTheme } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTwitterData } from '../actions/twitter';
import { setCallbackURLDataAPI } from '../api/auth';

const TwitterAuth = () => {
    const dispatch = useDispatch()
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [openTwitterDialog, setOpenTwitterDialog] = useState(false)
    const tableColumns = useSelector((state) => state.auth.tableColumns)
    const tableData = useSelector((state) => state.auth.tableData)
    const [isSetURL, setIsSetURL] = useState(true)

    const handleClickOpen = () => {

        setOpenTwitterDialog(true);
    };

    const handleClose = () => {
        setOpenTwitterDialog(false);
    };

    const handleLoadData = () => {
        dispatch(getTwitterData())
        if (window.opener != null && !window.opener.closed) {
            window.opener.focus()
            window.opener.location.href = "/list"
            window.opener.location.reload()
            window.opener.location.reload()
            window.close()
        }
        // if (tableColumns.length > 0) {
        //     window.location.href = "/list"
        // }
    }

    useEffect(() => {
        handleLoadData(true)
        dispatch(getTwitterData())
    }, [])

    if (window.location.search) {
        let searchParams = window.location.search
        let checkparams = new URLSearchParams(window.location.search)
        let oauth_token = null
        let oauth_verifier = null
        oauth_token = checkparams.get("oauth_token").toString()
        oauth_verifier = checkparams.get("oauth_verifier").toString()
        if (oauth_token && oauth_verifier) {
            setCallbackURLDataAPI(searchParams)
        }
        oauth_token = null
        oauth_verifier = null
        if (isSetURL) {
            var loadButton = window.opener.document.getElementById("loadmoreButton");
            loadButton.click()
            setIsSetURL(false)
        }
    }

    const handleclickTwitterRequest = () => {
        handleClose()
        dispatch(getTwitterData(true))
    }

    console.info('---------------------------------')
    console.info('tableData =>', tableData)
    console.info('---------------------------------')
    if (tableData.length > 0) {
        window.location.href = "/list"
    }

    return (
        <>
            <a onClick={handleClickOpen}>Twitter</a>
            <a id="loadmoreButton" hidden={true} onClick={handleLoadData} style={{ display: "contents" }}>Twitter</a>
            <Dialog
                fullWidth="sm"
                fullScreen={fullScreen}
                open={openTwitterDialog}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">Sign In With Twitter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Table List
                    </DialogContentText>
                    <div className="button-container">
                        <Button variant="contained" size="small" color="primary" onClick={handleclickTwitterRequest}>
                            Twitter
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TwitterAuth