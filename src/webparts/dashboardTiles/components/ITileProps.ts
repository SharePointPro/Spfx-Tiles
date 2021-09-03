import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPRest } from "@pnp/sp";

export interface ITileProps {
    icon: string;

    bgColor: string;

    title: string;

    subTitle?: string;

    number: number;

    url?: string;

    xs: number;
    
    md: number;

    lg: number;
    
    openInNewWindow: boolean;

    siteUrl: string;

    listName: string;

    viewName: string;
    
    context: WebPartContext;

    sp: SPRest;
  }
  