import { Injectable } from '@angular/core';
import { ethers } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class WalletConnectorService {
  provider: any;
  signer: any;

  constructor() {
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
  }

  async connectAccount() {
    // ask metamask to connect
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
    // connect returns a new contract connected to the signer
    // this.contract = this.contract.connect(this.signer);
    
    // the connected address
    return await this.signer.getAddress();
  }
}
