import React, { useState } from "react";
import "../Form.scss";
import { useDisableConfig } from "../../../utils/dissableConfigContext";

const MclagForm = ({
    onSubmit,
    selectedDeviceIp,
    onCancel,
    handelSubmitButton,
}) => {
    const { disableConfig, setDisableConfig } = useDisableConfig();

    const [formData, setFormData] = useState({
        mgt_ip: selectedDeviceIp || "",
        domain_id: "",
        source_address: "",
        peer_addr: "",
        peer_link: "",
        mclag_sys_mac: "",
        mclag_members: "",
        keepalive_interval: undefined,
        session_timeout: undefined,
        delay_restore: undefined,
        session_vrf: "",
        fast_convergence: "disable",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const updatedValue = name === "domain_id" ? parseInt(value, 10) : value;
        setFormData((prevState) => ({
            ...prevState,
            [name]: updatedValue,
        }));
    };

    const handleSubmit = (e) => {
        if (
            !/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/.test(
                formData.mclag_sys_mac
            )
        ) {
            alert("Invalid MAC address.");
            return;
        }

        if (!/^PortChannel\d+$/.test(formData.peer_link)) {
            alert("Invalid peer_link format.");
            return;
        }
        if (
            !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                formData.source_address
            )
        ) {
            alert("Invalid source_address format.");
            return;
        }
        if (
            !/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
                formData.peer_addr
            )
        ) {
            alert("Invalid peer_addr format.");
            return;
        }

        setDisableConfig(true);

        onSubmit(formData);
    };

    return (
        <div className="">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(formData);
                }}
                className="port-channel-form"
            >
                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label>Device IP:</label>
                        <input type="text" value={selectedDeviceIp} disabled />
                    </div>

                    <div className="form-field w-50">
                        <label htmlFor="lag-name"> Domain ID:</label>
                        <input
                            type="number"
                            min={1}
                            name="domain_id"
                            value={formData.domain_id}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label htmlFor="lag-name">
                            Mclag System mac Address:
                        </label>
                        <input
                            type="text"
                            name="mclag_sys_mac"
                            value={formData.mclag_sys_mac}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field w-50">
                        <label htmlFor="lag-name">source address :</label>
                        <input
                            type="text"
                            name="source_address"
                            value={formData.source_address}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label htmlFor="lag-name">Peer address:</label>
                        <input
                            type="text"
                            name="peer_addr"
                            value={formData.peer_addr}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field w-50">
                        <label htmlFor="lag-name"> Peer Link:</label>
                        <input
                            type="text"
                            name="peer_link"
                            value={formData.peer_link}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label htmlFor="lag-name"> Keep Alive Interval:</label>
                        <input
                            type="number"
                            name="keepalive_interval"
                            value={formData.keepalive_interval}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field w-50">
                        <label htmlFor="lag-name">Session Timeout:</label>
                        <input
                            type="number"
                            name="session_timeout"
                            value={formData.session_timeout}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label htmlFor="lag-name"> Delay Restore:</label>
                        <input
                            type="number"
                            name="delay_restore"
                            value={formData.delay_restore}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-field w-50">
                        <label htmlFor="lag-name"> Session VRF:</label>
                        <input
                            type="text"
                            name="session_vrf"
                            value={formData.session_vrf}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <div className="form-field w-50">
                        <label> Fast Convergence:</label>
                        <select
                            name="fast_convergence"
                            value={formData.fast_convergence}
                            onChange={handleChange}
                        >
                            <option value="enable">Enable</option>
                            <option value="disable">Disable</option>
                        </select>
                    </div>

                    {/* <div className="form-field w-50">
                        <label htmlFor="lag-name">Gateway macs:</label>
                        <input
                            type="text"
                            name="gateway_macs"
                            value={formData.gateway_macs}
                            onChange={handleChange}
                        />
                    </div> */}
                </div>

                <div className="">
                    <button
                        type="submit"
                        className="btnStyle mr-10"
                        disabled={disableConfig}
                    >
                        Apply Config
                    </button>
                    <button
                        type="button"
                        className="btnStyle mr-10"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MclagForm;
