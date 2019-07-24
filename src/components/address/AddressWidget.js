import React, { Component } from 'react';

import Ilceler from './Ilceler';
import Mahalleler from './Mahalleler';
import Sokaklar from './Sokaklar';
import Kapilar from './Kapilar';

async function getAdres(url) {
  let response = await fetch(url);
  let data = await response.json();
  let liste = [];
  data.AdresList.Adresler.Adres.forEach(item => {
    liste.push({ label: item.ADI, value: item.ID });
  });
  return liste;
}

class AddressWidget extends Component {
  constructor() {
    super();
    this.state = {
      ilceSelected: null,
      ilceler: [],
      mahalleSelected: null,
      mahalleler: [],
      sokaklarSelected: null,
      sokaklar: [],
      kapilarSelected: null,
      kapilar: []
    };
  }

  componentDidMount() {
    const ilceUrl = 'http://cbsproxy.ibb.gov.tr/?SehirHaritasiIlceListele151&';
    fetch(ilceUrl, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(ilceList => {
        console.log('ilceList', ilceList.AdresList.Adresler.Adres);
        let ilceler = [];
        ilceList.AdresList.Adresler.Adres.forEach(ilce => {
          ilceler.push({ label: ilce.ADI, value: ilce.ID });
        });
        this.setState({
          ilceler: ilceler
        });
        console.log(`state`, ilceler);
      });
  }

  handleIlceChange = async e => {
    let mahalleler = await getAdres(
      `http://cbsproxy.ibb.gov.tr/?SehirHaritasiMahalleListele151&&ID=${
        e.value
      }`
    );
    this.setState({
      ilceSelected: e.value,
      mahalleler: mahalleler,
      mahalleSelected: null,
      sokakSelected: null
    });
  };

  handleMahalleChange = async e => {
    let sokaklar = await getAdres(
      `http://cbsproxy.ibb.gov.tr/?SehirHaritasiYolListele151&&ilceID=${
        this.state.ilceSelected
      }&mahalleID=${e.value}&yolAdi=`
    );
    this.setState({
      mahalleSelected: e.value,
      sokaklar: sokaklar,
      kapilarSelected: null
    });
  };

  handleSokakChange = async e => {
    let kapilar = await getAdres(
      `https://cbsproxy.ibb.gov.tr/?SehirHaritasiKapiListele151&&ilceID=${
        this.state.ilceSelected
      }&mahalleID=${this.state.mahalleSelected}&yolAdi=&kapiNo=&yolid=${
        e.value
      }`
    );
    this.setState({
      sokakSelected: e.value,
      kapilar: kapilar
    });
  };

  render() {
    return (
      <div className='container'>
        <Ilceler
          ilceler={this.state.ilceler}
          changeFunction={this.handleIlceChange}
        />
        {this.state.ilceSelected ? (
          <Mahalleler
            mahalleler={this.state.mahalleler}
            changeFunction={this.handleMahalleChange}
          />
        ) : null}
        {this.state.mahalleSelected ? (
          <Sokaklar
            sokaklar={this.state.sokaklar}
            changeFunction={this.handleSokakChange}
          />
        ) : null}
        {this.state.sokakSelected ? (
          <Kapilar kapilar={this.state.kapilar} />
        ) : null}
      </div>
    );
  }
}

export default AddressWidget;
