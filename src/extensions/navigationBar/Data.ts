export default class Data {
    static getData = async (mainurl) => {
        return await fetch(mainurl, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json; odata=nometadata",
                "Content-Type": "application/json; odata=nometadata",
            }
        }).then(async (r) => { return await r.json() });
    }
    static insertData: any = (mainurl, dataObj) => {
        Data.getRequestDigest((mainurl.split("/_api"))[0]).then(token => {
            return fetch(mainurl, {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    "__metadata": { type: "SP.Data.NavigationListItem" },
                    ...dataObj
                }),
                headers: {
                    Accept: "application/json; odata=verbose",
                    "Content-Type": "application/json; odata=verbose",
                    "X-RequestDigest": token.FormDigestValue,
                    "X-HTTP-Method": "POST"
                }
            }).then((response) => {
                if (response.ok) {
                    alert("Data inserted sucessfully.");
                    location.reload();
                }
               
            })
        });
    }
    static updateData=(mainurl,dataObj)=>{
        Data.getRequestDigest((mainurl.split("/_api"))[0]).then(token=>{return fetch(mainurl,{
                method: "POST",
                credentials: "include",
                body:JSON.stringify({
                    "__metadata": { type: "SP.Data.NavigationListItem" },
                    ...dataObj
                }), 
                headers: {
                  Accept: "application/json; odata=verbose",
                  "Content-Type": "application/json; odata=verbose",
                   "X-RequestDigest": token.FormDigestValue,
                   "IF-MATCH": "*",
                   "X-HTTP-Method": "MERGE"
                }}).then((response) => {
                    if (response.ok) {
                        alert("Data updated sucessfully.");
                        location.reload();
                    }
                   
                })
            });
    }
    static deleteData=(mainurl)=>{
        Data.getRequestDigest((mainurl.split("/_api"))[0]).then(token=>{return fetch(mainurl,{
                method: "POST",
                credentials: "include",
                headers: {
                  Accept: "application/json; odata=verbose",
                   "X-RequestDigest": token.FormDigestValue,
                   "IF-MATCH": "*",
                   "X-HTTP-Method": "DELETE"
                }}).then((response) => {
                    if (response.ok) { 
                        alert("Data deleted sucessfully.");
                        location.reload();
                    }
                   
                })
            });
    }
    static getRequestDigest = (mainurl) => {
        return fetch(mainurl + "/_api/contextinfo", {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json; odata=nometadata",
                "Content-Type": "application/json; odata=nometadata"
            },
        }).then(r => r.json());
    }
}