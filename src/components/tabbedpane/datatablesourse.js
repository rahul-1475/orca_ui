import { Link } from "react-router-dom";
import React from "react";


export const interfaceColumns = [
  { field: 'name', headerName: 'Name', width: 130 },
  {
    field: 'enabled', headerName: 'Enabled', width: 130, cellRenderer: 'agCheckboxCellRenderer',
    cellEditor: 'agCheckboxCellEditor',
    editable: true,
    suppressKeyboardEvent: (params) => params.event.key === ' ',
  },
  { field: 'mtu', headerName: 'MTU', type: 'number', width: 130, editable: true },
  { field: 'fec', headerName: 'FEC', width: 130, editable: true,
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['FEC_RS', 'FEC_FC', 'FEC_DISABLED', 'FEC_AUTO'],}
  },
  { field: 'oper_sts', headerName: 'Oper_STS', width: 130 },
  {
    field: 'speed', headerName: 'Speed', width: 130, editable: true,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: {
      values: ['SPEED_1GB', 'SPEED_5GB', 'SPEED_10GB', 'SPEED_25GB', 'SPEED_40GB', 'SPEED_50GB', 'SPEED_100GB'],
    }
  },
  { field: 'admin_sts', headerName: 'Admin Status', width: 130 },
  { field: 'description', headerName: 'Description', width: 130, editable: true },
  { field: 'last_chng', headerName: 'Last Change', width: 130 },
  { field: 'mac_addr', headerName: 'MAC ADDR', width: 130 },

];

export const portGroupColumns = [
  { field: 'port_group_id', headerName: 'ID', width: 130 },
  { field: 'speed', headerName: 'Speed', width: 130 },
  { field: 'valid_speeds', headerName: 'Valid Speeds', type: 'number', width: 130 },
  { field: 'default_speed', headerName: 'Default Speed', type: 'boolean', width: 130 },
  { field: 'mem_intfs', headerName: 'Member IFs', width: 130 },
];



export const vlanColumns = [
  { field: 'vlanid', headerName: 'VLAN_ID',type: 'number', width: 130 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'mtu', headerName: 'MTU', type: 'number', width: 130 },
  { field: 'admin_status', headerName: 'Admin Status', type: 'boolean', width: 130 },
  { field: 'oper_status', headerName: 'Oper_STS',type: 'boolean', width: 130 },
  { field: 'members', headerName: 'Member IFs', width: 130 },
];

export const portChannelColumns = [
  { field: 'lag_name', headerName: 'Lag Name', width: 130 },
  { field: 'active', headerName: 'Active', type: 'boolean', width: 130 },
  { field: 'admin_sts', headerName: 'Admin Status', width: 130, editable: true,
  cellEditor: 'agSelectCellEditor',
  cellEditorParams: {
    values: ['up', 'down'],}
  },
  { field: 'mtu', headerName: 'MTU', type: 'number', width: 130, editable: true },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'fallback_operational', headerName: 'Fallback Operation', type: 'boolean', width: 130 },
  { field: 'oper_sts', headerName: 'Operation Status', width: 130 },
  { field: 'speed', headerName: 'Speed', width: 130 },
  { field: 'oper_sts_reason', headerName: 'OperReason', width: 130 },


];


export const mclagColumns = [
  { field: 'domain_id', headerName: 'Domain_ID', type: 'number', width: 130 },
  { field: 'keepalive_interval', headerName: 'Keepalive Interval', type: 'number', width: 130 },
  { field: 'mclag_sys_mac', headerName: 'MCLAG Sys MAC', width: 130 },
  { field: 'peer_addr', headerName: 'Peer Address', width: 130 },
  { field: 'peer_link', headerName: 'Peer Link', width: 130 },
  { field: 'session_timeout', headerName: 'Session Timeout', type: 'number', width: 130 },
  { field: 'source_address', headerName: 'Source Address', width: 130 },
  { field: 'oper_status', headerName: 'Operation Status', width: 130 },
  { field: 'role', headerName: 'Role', width: 130 },
  { field: 'gateway_macs', headerName: 'Gateway MAC', width: 130 },
  { field: 'delay_restore', headerName: 'Delay Restore', type: 'number', width: 130 },


];

export const bgpColumns = [
  { field: 'local_asn', headerName: 'ASN', width: 130 },
  { field: 'vrf_name', headerName: 'VRF', width: 130 },
  { field: 'router_id', headerName: 'Router ID', width: 130 },
  { field: 'remote_asn', headerName: 'Remote ASN', width: 130 },
  { field: 'nbr_ips', headerName: 'Neighbors', width: 130 },

];

export const deviceUserColumns = (isTabbedPane = true) => {
  let dataColumn = [
    { field: 'img_name', headerName: 'Image Name', width: 130 },
    { field: 'mgt_intf', headerName: 'Management Int', width: 130 },
    { field: 'mgt_ip', headerName: 'Management IP', width: 130 },
    {
      field: 'hwsku',
      headerName: 'HWSKU',
      type: 'number',
      width: 130,
    },


    {
      field: 'mac',
      headerName: 'MAC',
      width: 130,
    },

    { field: 'platform', headerName: 'PLATFORM', width: 130 },
    { field: 'type', headerName: 'TYPE', width: 130 },
  ];

  if (!isTabbedPane) {
    dataColumn.push({
      field: "action", headerName: "Action", width: 200, cellRenderer: (params) => {
        return (
          <div className="cellAction">
            {<Link to={`/devices/${params.data.mgt_ip}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">Details</div>
            </Link>}
          </div>
        )
      }
    });
  }
  return dataColumn
};


