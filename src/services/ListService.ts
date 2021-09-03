import { DigestCache, HttpClient, IDigestCache, SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPRest } from "@pnp/sp";
import { Web } from "@pnp/sp/webs";
import { IClient } from '../interfaces/IClient';

export default class ListService {

    constructor(private _context: WebPartContext,
        private _sp: SPRest) {
    }

    public getListViewData(listName: string, viewName: string, webUrl?: string): Promise<any[]> {

        return new Promise((resolve, reject) => {

            this.getViewQueryForList(listName, viewName, webUrl).then((res: any) => {
                this.getItemsByViewQuery(listName, res, webUrl).then((items: any[]) => {
                    resolve(items);
                });
            }).catch((err) => {
                console.log("error", err);
                reject(err);
            });
        });

    }


    //First method that retrieves the View Query
    private getViewQueryForList(listName: string, viewName: string, webUrl?: string): Promise<any> {
        let listViewData = "";
        if (listName && viewName) {
            if (webUrl) {
                let web = Web(webUrl);
                return web.lists.getByTitle(listName).views.getByTitle(viewName).select("ViewQuery").get().then(v => {
                    return v.ViewQuery;
                });
            } else {
                return this._sp.web.lists.getByTitle(listName).views.getByTitle(viewName).select("ViewQuery").get().then(v => {
                    return v.ViewQuery;
                });
            }
        } else {
            console.log('Data insufficient!');
            listViewData = "Error";
        }
    }

    //Second method that retrieves the View data based on the View Query and List name
    private getItemsByViewQuery(listName: string, query: string, webUrl?: string): Promise<any> {
        const xml = '<View><Query>' + query + '</Query></View>';

        if (webUrl) {
            let web = Web(webUrl);
            return web.lists.getByTitle(listName).getItemsByCAMLQuery({ 'ViewXml': xml }).then((res: SPHttpClientResponse) => {
                return res;
            });

        } else {
            return this._sp.web.lists.getByTitle(listName).getItemsByCAMLQuery({ 'ViewXml': xml }).then((res: SPHttpClientResponse) => {
                return res;
            });
        }
    }
}