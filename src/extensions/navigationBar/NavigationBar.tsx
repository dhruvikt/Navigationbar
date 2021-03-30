import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { DefaultButton, TextField, Dropdown, IDropdownOption, Modal } from 'office-ui-fabric-react';
import Data from './Data';
import './Header.css';
import { Title } from 'NavigationBarApplicationCustomizerStrings';

type NavigationBarState = { navigationdata: any };
type InputFormProp = { isOpen: boolean, update: boolean, delete: boolean };
type InputFormState = { isOpen: boolean, currentValue: any, navigationdata: any };

var dLinkOption: IDropdownOption[] = [];
export class NavigationBar extends React.Component<{}, NavigationBarState>{
    /*
     * Constructor
     */
    constructor(props) {
        super(props);
        this.state = { navigationdata: [] };
        this.getData();
    }
    /*
     * Consructor End
     * Variable Declaration
     */


    /*
     * Variable Declaration End
     * Methods
     */
    public callRender() {
        ReactDOM.render(<NavigationBar />, document.getElementById('Header'));
    }
    public getData = () => {
        Data.getData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items").then(async (response) => {
            await this.setState({ navigationdata: response.value });
        });
        
    }
    public addLink = () => {
        // return (<InputForm {isOpen:true,title:"Add New Link",currentValue:{Title:"",Url:""}}/>);
        ReactDOM.render(<InputForm isOpen={true} update={false} delete={false} />, document.getElementById("inputFrm"));
    }
    public editLink = () => {
        ReactDOM.render(<InputForm isOpen={true} update={true} delete={false} />, document.getElementById("inputFrm"));
    }
    public deleteLink = () => {
        ReactDOM.render(<InputForm isOpen={true} update={false} delete={true} />, document.getElementById("inputFrm"));
    }
    public render() {

        return (
            <div className="linkdiv">
                {
                    this.state.navigationdata.map((obj) => {
                        if (obj.ParentId == null) {
                            return (<div ><ul ><li ><a href={obj.Url}>{obj.Title}</a><ul>
                                {
                                    this.state.navigationdata.map((subObj) => {
                                        if (obj.Id == subObj.ParentId) {
                                            return (<li><a href={subObj.Url}>{subObj.Title}</a></li>);
                                        }
                                    })
                                }
                            </ul> </li></ul></div>);
                        }
                    })
                }
                <div>
                    <button onClick={this.addLink}>Add Link</button>
                </div>
                <div>
                    <button onClick={this.editLink}>Edit Link</button>
                </div>
                <div>
                    <button onClick={this.deleteLink}>Delete Link</button>
                </div>
                <div id="inputFrm" >

                </div>
            </div>
        );
    }
    /*
     * Methods End
     */
}
class InputForm extends React.Component<InputFormProp, InputFormState>{

    constructor(props: InputFormProp) {
        super(props);
        this.state = { isOpen: this.props.isOpen, currentValue: { Title: "", Url: "", ParentId: null, Id: null }, navigationdata: {} };
        this.fillParentD();
    }

    public onChangeVal = (event) => {
        this.state.currentValue[event.target.name] = event.target.value;
        this.setState({});
        //defaultValue={this.state.currentValue.Url}
    }
    public onChangeValDropDown = (event, item) => {
        if (!this.props.update && !this.props.delete) {
            this.state.currentValue[event.target.id] = item.key;
        }
        else {
            if (item.key != null) {
                this.setState({ currentValue: { Title: this.state.navigationdata[item.key].Title, Url: this.state.navigationdata[item.key].Url, ParentId: this.state.navigationdata[item.key].ParentId, Id: this.state.navigationdata[item.key].Id } });
            }
        }

    }
    public submitData = () => {
        if (!this.props.update && !this.props.delete) {
            Data.insertData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items", { Title: this.state.currentValue.Title, Url: this.state.currentValue.Url, ParentId: this.state.currentValue.ParentId });
        }
        else if (this.props.update) {
            Data.updateData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items(" + this.state.currentValue.Id + ")", { Title: this.state.currentValue.Title, Url: this.state.currentValue.Url });
        }
        else if (this.props.delete) {
            if (this.state.currentValue.Id != null) {
                if (confirm("Are you sure want to delete link " + this.state.currentValue.Title + " ?")) {
                    Data.deleteData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items(" + this.state.currentValue.Id + ")");
                }
            }
            else {
                alert("Please select link.");
            }

        }

    }
    public cancelForm = () => {
        this.setState({ isOpen: false });
        ReactDOM.unmountComponentAtNode(document.getElementById("inpfrms").parentElement);
    }
    public fillParentD = () => {
        dLinkOption = [];
        if (!this.props.update && !this.props.delete) {
            dLinkOption.push({ key: null, text: "Primary Link" });
        }
        else {
            dLinkOption.push({ key: null, text: "Select Link" });
        }
        let tempNavigationData = {};
        Data.getData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items").then(async (response) => {
            tempNavigationData = {};
            await response.value.forEach((obj) => {
                dLinkOption.push({ key: obj.Id, text: obj.Title });
                this.state.navigationdata[obj.Id] = obj;
            });
        });
    }
    public render() {
        return (
            <div id="inpfrms"  >
                <Modal isOpen={this.state.isOpen}>
                    <div className="inpfrm">
                        <h3 style={{ width: "100%", textAlign: "center" }}>{this.props.update ? "Edit Link" : this.props.delete ? "Delete Link" : "Add New Link"}</h3>
                        <Dropdown id="ParentId" label={this.props.update || this.props.delete ? "Choose Link" : "Choose Parent"} options={dLinkOption} onChange={this.onChangeValDropDown} />
                        {this.props.delete ? <></> : <><TextField name="Title" label="Name" onChange={this.onChangeVal} value={this.state.currentValue.Title} placeholder="Enter link title" />
                            <TextField name="Url" label="Link" onChange={this.onChangeVal} value={this.state.currentValue.Url} placeholder="Enter Link" /></>}
                        <div style={{ margin: "20px" }}>
                            <DefaultButton text="Submit" style={{ width: "50%" }} onClick={this.submitData} />
                            <DefaultButton text="Cancel" style={{ width: "50%" }} onClick={this.cancelForm} />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}