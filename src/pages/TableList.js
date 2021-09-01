import React, { useEffect } from 'react'
import { Container } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { getTwitterData } from '../actions/twitter'
import { useSelector } from 'react-redux'
import DataTables from '../components/DataTables'


const TableList = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.auth.loading)
    const tableColumns = useSelector((state) => state.auth.tableColumns)
    const tableData = useSelector((state) => state.auth.tableData)

    const handleLoadData = () => {
        dispatch(getTwitterData())
    }

    useEffect(() => {
        handleLoadData()
    }, [])


    return (
        <>
            <Container fluid="true" style={{ marginTop: "20px" }}>
                <DataTables rowsData={tableData} />
            </Container>
        </>
    )
}

export default TableList