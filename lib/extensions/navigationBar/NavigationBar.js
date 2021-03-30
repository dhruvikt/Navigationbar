var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React from 'react';
import ReactDOM from 'react-dom';
import { DefaultButton, TextField, Dropdown, Modal } from 'office-ui-fabric-react';
import Data from './Data';
import './Header.css';
var dLinkOption = [];
var NavigationBar = /** @class */ (function (_super) {
    __extends(NavigationBar, _super);
    /*
     * Constructor
     */
    function NavigationBar(props) {
        var _this = _super.call(this, props) || this;
        _this.getData = function () {
            Data.getData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items").then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.setState({ navigationdata: response.value })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.addLink = function () {
            // return (<InputForm {isOpen:true,title:"Add New Link",currentValue:{Title:"",Url:""}}/>);
            ReactDOM.render(React.createElement(InputForm, { isOpen: true, update: false, delete: false }), document.getElementById("inputFrm"));
        };
        _this.editLink = function () {
            ReactDOM.render(React.createElement(InputForm, { isOpen: true, update: true, delete: false }), document.getElementById("inputFrm"));
        };
        _this.deleteLink = function () {
            ReactDOM.render(React.createElement(InputForm, { isOpen: true, update: false, delete: true }), document.getElementById("inputFrm"));
        };
        _this.state = { navigationdata: [] };
        _this.getData();
        return _this;
    }
    /*
     * Consructor End
     * Variable Declaration
     */
    /*
     * Variable Declaration End
     * Methods
     */
    NavigationBar.prototype.callRender = function () {
        ReactDOM.render(React.createElement(NavigationBar, null), document.getElementById('Header'));
    };
    NavigationBar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "linkdiv" },
            this.state.navigationdata.map(function (obj) {
                if (obj.ParentId == null) {
                    return (React.createElement("div", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: obj.Url }, obj.Title),
                                React.createElement("ul", null, _this.state.navigationdata.map(function (subObj) {
                                    if (obj.Id == subObj.ParentId) {
                                        return (React.createElement("li", null,
                                            React.createElement("a", { href: subObj.Url }, subObj.Title)));
                                    }
                                })),
                                " "))));
                }
            }),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.addLink }, "Add Link")),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.editLink }, "Edit Link")),
            React.createElement("div", null,
                React.createElement("button", { onClick: this.deleteLink }, "Delete Link")),
            React.createElement("div", { id: "inputFrm" })));
    };
    return NavigationBar;
}(React.Component));
export { NavigationBar };
var InputForm = /** @class */ (function (_super) {
    __extends(InputForm, _super);
    function InputForm(props) {
        var _this = _super.call(this, props) || this;
        _this.onChangeVal = function (event) {
            _this.state.currentValue[event.target.name] = event.target.value;
            _this.setState({});
            //defaultValue={this.state.currentValue.Url}
        };
        _this.onChangeValDropDown = function (event, item) {
            if (!_this.props.update && !_this.props.delete) {
                _this.state.currentValue[event.target.id] = item.key;
            }
            else {
                if (item.key != null) {
                    _this.setState({ currentValue: { Title: _this.state.navigationdata[item.key].Title, Url: _this.state.navigationdata[item.key].Url, ParentId: _this.state.navigationdata[item.key].ParentId, Id: _this.state.navigationdata[item.key].Id } });
                }
            }
        };
        _this.submitData = function () {
            if (!_this.props.update && !_this.props.delete) {
                Data.insertData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items", { Title: _this.state.currentValue.Title, Url: _this.state.currentValue.Url, ParentId: _this.state.currentValue.ParentId });
            }
            else if (_this.props.update) {
                Data.updateData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items(" + _this.state.currentValue.Id + ")", { Title: _this.state.currentValue.Title, Url: _this.state.currentValue.Url });
            }
            else if (_this.props.delete) {
                if (_this.state.currentValue.Id != null) {
                    if (confirm("Are you sure want to delete link " + _this.state.currentValue.Title + " ?")) {
                        Data.deleteData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items(" + _this.state.currentValue.Id + ")");
                    }
                }
                else {
                    alert("Please select link.");
                }
            }
        };
        _this.cancelForm = function () {
            _this.setState({ isOpen: false });
            ReactDOM.unmountComponentAtNode(document.getElementById("inpfrms").parentElement);
        };
        _this.fillParentD = function () {
            dLinkOption = [];
            if (!_this.props.update && !_this.props.delete) {
                dLinkOption.push({ key: null, text: "Primary Link" });
            }
            else {
                dLinkOption.push({ key: null, text: "Select Link" });
            }
            var tempNavigationData = {};
            Data.getData("https://dna136.sharepoint.com/sites/Test/_api/Lists/getbytitle('Navigation')/items").then(function (response) { return __awaiter(_this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tempNavigationData = {};
                            return [4 /*yield*/, response.value.forEach(function (obj) {
                                    dLinkOption.push({ key: obj.Id, text: obj.Title });
                                    _this.state.navigationdata[obj.Id] = obj;
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.state = { isOpen: _this.props.isOpen, currentValue: { Title: "", Url: "", ParentId: null, Id: null }, navigationdata: {} };
        _this.fillParentD();
        return _this;
    }
    InputForm.prototype.render = function () {
        return (React.createElement("div", { id: "inpfrms" },
            React.createElement(Modal, { isOpen: this.state.isOpen },
                React.createElement("div", { className: "inpfrm" },
                    React.createElement("h3", { style: { width: "100%", textAlign: "center" } }, this.props.update ? "Edit Link" : this.props.delete ? "Delete Link" : "Add New Link"),
                    React.createElement(Dropdown, { id: "ParentId", label: this.props.update || this.props.delete ? "Choose Link" : "Choose Parent", options: dLinkOption, onChange: this.onChangeValDropDown }),
                    this.props.delete ? React.createElement(React.Fragment, null) : React.createElement(React.Fragment, null,
                        React.createElement(TextField, { name: "Title", label: "Name", onChange: this.onChangeVal, value: this.state.currentValue.Title, placeholder: "Enter link title" }),
                        React.createElement(TextField, { name: "Url", label: "Link", onChange: this.onChangeVal, value: this.state.currentValue.Url, placeholder: "Enter Link" })),
                    React.createElement("div", { style: { margin: "20px" } },
                        React.createElement(DefaultButton, { text: "Submit", style: { width: "50%" }, onClick: this.submitData }),
                        React.createElement(DefaultButton, { text: "Cancel", style: { width: "50%" }, onClick: this.cancelForm }))))));
    };
    return InputForm;
}(React.Component));
//# sourceMappingURL=NavigationBar.js.map