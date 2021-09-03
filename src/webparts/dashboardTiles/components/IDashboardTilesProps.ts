import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPRest } from "@pnp/sp";

export interface IDashboardTilesProps {
  description: string;
  context: WebPartContext;
  sp: SPRest;
  properties: any;
}
