import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ZSDatePicker from '@/components/common/ZSDatePicker';

const columns: GridColDef[] = [
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'attackerid', headerName: 'Attacker Id', width: 150 },
    { field: 'attackerip', headerName: 'Attacker Ip', width: 150 },
    { field: 'attackername', headerName: 'Attacker Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'decoyname', headerName: 'Decoy Name', width: 200 },
];


const Table = () => {
    const [startDate, setStartDate] = useState<string | Date>('08/04/2021');
    const [endDate, setEndDate] = useState<string | Date>('08/05/2021');
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    const { data: tableData = [], isLoading } = useSWR(`/api/table?pageNumber=${paginationModel.page}&rowsPerPage=${paginationModel.pageSize}&startDate=${startDate}&endDate=${endDate}`);

    const [rowCountState, setRowCountState] = useState<number | undefined>(
        tableData?.data?.totalRowCount || 0,
    );

    // when the total rows change due, update the local state
    useEffect(() => {
        setRowCountState((prevRowCountState: number | undefined) =>
            tableData?.data?.totalRowCount !== undefined
                ? tableData?.data?.totalRowCount
                : prevRowCountState,
        );
    }, [tableData?.data?.totalRowCount, setRowCountState]);

    return <div className='w-full h-[75vh]'>
        <div className='flex space-x-3 py-3'>
            <ZSDatePicker label='Start Date' currentValue={startDate} onSelectDate={date => {

                setStartDate(new Date(date as Date).toISOString())
            }} />
            <ZSDatePicker label='End Date' currentValue={endDate} onSelectDate={date => {
                setEndDate(new Date(date as Date).toISOString())
            }} />
        </div>
        <DataGrid
            rows={tableData?.data?.rows || []}
            columns={columns}
            rowCount={rowCountState}
            pageSizeOptions={[5, 10, 20]}
            loading={isLoading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            filterMode="server"
        />
    </div>
}

export default Table;