import React, { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { DataGrid, GridColDef, GridColumnVisibilityModel, GridFilterModel } from '@mui/x-data-grid';
import ZSDatePicker from '@/components/common/ZSDatePicker';
import { format } from 'date-fns';


type FilterType = {
    field: string,
    operator: string,
    id?: number | string | undefined,
    value?: string | undefined
}

const VISIBILITY_COLUMNS = {
    kill_chain_phase: false,
    severity: false,
    attackerport: false,
    decoygroup: false,
    decoyid: false,
    decoyip: false,
    decoyport: false,
    decoytype: false
}

const columns: GridColDef[] = [
    {
        field: 'timestamp', headerName: 'Timestamp', width: 200,
        valueFormatter: ({ value }) => formatTimestamp(value),
        filterable: false
    },
    { field: 'attackerid', headerName: 'Attacker Id', width: 150 },
    { field: 'attackerip', headerName: 'Attacker Ip', width: 150 },
    { field: 'attackername', headerName: 'Attacker Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'decoyname', headerName: 'Decoy Name', width: 200 },
    { field: 'severity', headerName: 'Severity', width: 100 },
    { field: 'attackerport', headerName: 'Attacker Port', width: 150 },
    { field: 'decoygroup', headerName: 'Decoy Group', width: 150 },
    { field: 'decoyid', headerName: 'Decoy Id', width: 100 },
    { field: 'decoyip', headerName: 'Decoy Ip', width: 150 },
    { field: 'decoyport', headerName: 'Decoy Port', width: 100 },
    { field: 'decoytype', headerName: 'Decoy Type', width: 150 },
    { field: 'kill_chain_phase', headerName: 'KIll Chain Phase', width: 200 },
];

const formatTimestamp = (value: Date) => {
    return format(new Date(value), 'MM/dd/yyyy HH:mm a')
}


const Table = () => {
    const [startDate, setStartDate] = useState<string | Date>('08/04/2021');
    const [endDate, setEndDate] = useState<string | Date>('08/05/2021');
    const [filterValues, setFilterValues] = useState<FilterType | null>(null);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>(VISIBILITY_COLUMNS);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
    });

    // fetches the data from the api
    const { data: tableData = [], isLoading } =
        useSWR(`/api/table?pageNumber=${paginationModel.page}&rowsPerPage=${paginationModel.pageSize}&startDate=${startDate}&endDate=${endDate}&field=${filterValues?.field}&value=${filterValues?.value}&operator=${filterValues?.operator}`);

    // maintains the total row count coming from the api
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

    // this will trigger SWR to make api call to fetch the filtered data
    const onFilterChange = useCallback((filterModel: GridFilterModel) => {
        setFilterValues(filterModel.items[0]);
    }, []);

    // returns the page jsx
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
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(model) => setColumnVisibilityModel(model)}
            rows={tableData?.data?.rows || []}
            columns={columns}
            rowCount={rowCountState}
            pageSizeOptions={[5, 10, 20]}
            loading={isLoading}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            filterMode="server"
            onFilterModelChange={onFilterChange}
        />
    </div>
}

export default Table;