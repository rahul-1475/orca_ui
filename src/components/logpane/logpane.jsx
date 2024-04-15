import React, { useEffect, useMemo, useState } from "react";
import "./logpane.scss";
import Time from "react-time-format";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

import interceptor from "../../interceptor";

import { logPanelURL, logPanelDeleteURL } from "../../backend_rest_urls";

import { useLog } from "../../utils/logpannelContext";

export const LogViewer = () => {
    const [logEntries, setLogEntries] = useState([]);

    const instance = interceptor();

    const { log, setLog } = useLog();

    useEffect(() => {
        getLogs();
    }, [log]);

    const getLogs = () => {
        instance
            .get(logPanelURL())
            .then((response) => {
                setLogEntries(response.data);
                setLog(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const handelClearLog = () => {
        instance
            .delete(logPanelDeleteURL())
            .then((response) => {
                setLog(false);
            })
            .catch((error) => {
                console.error("Error:", error);
            })
            .finally(() => {
                getLogs();
                setLog(false);
            });
    };

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState([
        {
            field: "index",
            headerName: "#",
            valueGetter: (params) => params.node.rowIndex + 1,
            width: 50,
            resizable: true,
        },
        {
            field: "timestamp",
            headerName: "Time",
            width: 150,
            resizable: true,
            cellRenderer: (params) => {
                return (
                    <Time value={params.value} format="hh:mm:ss DD-MM-YYYY" />
                );
            },
        },
        {
            field: "processing_time",
            headerName: "Process Time",
            width: 100,
            resizable: true,
            cellRenderer: (params) => {
                let num = params.value;
                num = parseFloat(num);
                num = num.toFixed(2);
                return <span>{num} sec</span>;
            },
        },
        {
            field: "request_json",
            headerName: "Task",
            width: 400,
            resizable: true,
            cellRenderer: (params) => {
                return <span>{JSON.stringify(params.value)}</span>;
            },
        },
        {
            field: "status_code",
            headerName: "Status",
            width: 400,
            resizable: true,
            cellRenderer: (params) => {
                if (params.value === 200) {
                    return (
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                check_circle_outline
                            </span>
                        </div>
                    );
                } else {
                    return (
                        <div className="icon">
                            <span className="material-symbols-outlined">
                                cancel
                            </span>
                            &nbsp; {params.data.status} &nbsp;{" "}
                            {params.data.response}
                        </div>
                    );
                }
            },
            cellStyle: (params) => {
                if (params.value === 200) {
                    return { color: "green", display: "flex" };
                } else {
                    return { color: "red", display: "flex" };
                }
            },
        },
    ]);

    const gridStyle = useMemo(() => ({ height: "440px", width: "100%" }), []);

    return (
        <div style={{ width: "100%", height: "470px" }}>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={logEntries}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={50}
                    paginationPageSizeSelector={[50, 100, 150, 200]}
                />

                <button
                    className="clearLogBtn btnStyle"
                    onClick={handelClearLog}
                >
                    Clear Log
                </button>
            </div>
        </div>
    );
};

export default LogViewer;
