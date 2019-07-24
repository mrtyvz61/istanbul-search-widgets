import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Ilceler from './Ilceler';
import Mahalleler from './Mahalleler';
import PaftaInput from './PaftaInput';
import AdaInput from './AdaInput';
import ParselInput from './ParselInput';

async function getAdres(url) {
  let response = await fetch(url);
  let data = await response.json();
  let liste = [];
  data.AdresList.Adresler.Adres.forEach(item => {
    liste.push({ label: item.ADI, value: item.ID });
  });
  return liste;
}

async function getQueryResult(params) {
  let where =
    (params.adalar != false ? `ADA='${params.adalar}'+and+` : '1=1+and+') +
    (params.paftalar != false
      ? `PAFTA='${params.paftalar}'+and+`
      : '1=1+and+') +
    (params.parseller != false
      ? `PARSEL='${params.parseller}'+and+`
      : '1=1+and+') +
    (params.ilceSelected != null
      ? `ILCE_ADI=${params.ilceSelected}+and+`
      : '1=1+and+') +
    (params.mahalleSelected != null
      ? `MAHALLE_UAVT=${params.mahalleSelected}`
      : '1=1');
  let url = `https://cbsmaps.ibb.gov.tr/arcgis/rest/services/ParselTKGM/MapServer/0/query?
    where=${where}&
    text=&
    objectIds=&
    time=&
    geometry=&
    geometryType=esriGeometryEnvelope&
    inSR=&
    spatialRel=esriSpatialRelIntersects&
    relationParam=&
    outFields=*&
    returnGeometry=true&
    returnTrueCurves=false&
    maxAllowableOffset=&
    geometryPrecision=&
    outSR=&
    having=&
    returnIdsOnly=false&
    returnCountOnly=false&
    orderByFields=&
    groupByFieldsForStatistics=&
    outStatistics=&
    returnZ=false&
    returnM=false&
    gdbVersion=&
    historicMoment=&
    returnDistinctValues=false&
    resultOffset=&
    resultRecordCount=&
    queryByDistance=&
    returnExtentOnly=false&
    datumTransformation=&
    parameterValues=&
    rangeValues=&
    quantizationParameters=&
    f=pjson`;
  url = url.replace(/\s/g, '');
  // console.log("1")
  let response = await fetch(url);
  // console.log("2")
  let data = await response.json();
  // console.log("3")
  let parseller = [];
  // console.log("4")
  data.features.forEach(parsel => {
    // console.log(`parsel`, parsel);
    parseller.push({ attributes: parsel.attributes });
  });
  // console.log("5")
  return parseller;
}

class ParcelWidget extends Component {
  constructor() {
    super();
    this.state = {
      ilceSelected: null,
      ilceler: [],
      mahalleSelected: null,
      mahalleler: [],
      paftaSelected: null,
      paftalar: '',
      adaSelected: null,
      adalar: '',
      parselSelected: null,
      parseller: '',
      parselResult: []
    };
  }

  componentDidMount() {
    const ilceUrl = 'http://cbsproxy.ibb.gov.tr/?SehirHaritasiIlceListele151&';
    fetch(ilceUrl, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(ilceList => {
        let ilceler = [];
        ilceList.AdresList.Adresler.Adres.forEach(ilce => {
          ilceler.push({ label: ilce.ADI, value: ilce.ID });
        });
        this.setState({ ilceler: ilceler });
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
  handlePaftaChange = e => {
    this.setState({ paftaSelected: e.target.value });
  };
  handleAdaChange = e => {
    this.setState({ adaSelected: e.target.value });
  };
  handleParselChange = e => {
    this.setState({ parselSelected: e.target.value });
  };
  formSubmitHandler = async e => {
    e.preventDefault();
    let response = await getQueryResult(this.state);
    this.setState({ parselResult: response });
  };
  renderParselResult = () => {
    return this.state.parselResult.map(response => {
      return (
        <tr>
          <td />
          <td>{response.attributes.ILCE_ADI}</td>
          <td>{response.attributes.MAHALLE_ADI}</td>
          <td>{response.attributes.MAHALLE_UAVT}</td>
          <td>{response.attributes.ADA}</td>
          <td>{response.attributes.PAFTA}</td>
          <td>{response.attributes.PARSEL}</td>
          <td>{response.attributes.KADASTROALAN}</td>
          <td>{response.attributes.TAPUILCEID}</td>
          <td>{response.attributes.TAPUMAHADI}</td>
          <td>{response.attributes.TAPUMAHID}</td>
        </tr>
      );
    });
  };

  render() {
    if (this.state.parselResult != null) {
      return (
        <div>
          <form className='container' onSubmit={this.formSubmitHandler}>
            <Ilceler
              ilceler={this.state.ilceler}
              changeFunction={this.handleIlceChange}
            />
            <Mahalleler
              mahalleler={this.state.mahalleler}
              changeFunction={this.handleMahalleChange}
            />
            <PaftaInput
              paftalar={this.state.paftaSelected}
              changeFunction={this.handlePaftaChange}
            />
            <AdaInput
              adalar={this.state.adaSelected}
              changeFunction={this.handleAdaChange}
            />
            <ParselInput
              parseller={this.state.parselSelected}
              changeFunction={this.handleParselChange}
            />
            <Button type='submit' fullWidth variant='contained' color='primary'>
              SORGULA
            </Button>
          </form>
          <table className='container mTop'>
            <thead>
              <tr>
                <th />
                <th>İLÇE UAVT</th>
                <th>MAHALLE</th>
                <th>MAHALLE UAVT</th>
                <th>ADA</th>
                <th>PAFTA</th>
                <th>PARSEL</th>
                <th>KADASTRO ALAN</th>
                <th>TAPU İLÇE ID</th>
                <th>TAPU MAHALLE ADI</th>
                <th>TAPU MAHALLE ID</th>
              </tr>
            </thead>
            <tbody>{this.renderParselResult()}</tbody>
          </table>
        </div>
      );
    } else {
      return (
        <div>
          <form onSubmit={this.formSubmitHandler}>
            <Ilceler
              ilceler={this.state.ilceler}
              changeFunction={this.handleIlceChange}
            />
            <Mahalleler
              mahalleler={this.state.mahalleler}
              changeFunction={this.handleMahalleChange}
            />
            <PaftaInput
              paftalar={this.state.paftaSelected}
              changeFunction={this.handlePaftaChange}
            />
            <AdaInput
              adalar={this.state.adaSelected}
              changeFunction={this.handleAdaChange}
            />
            <ParselInput
              parseller={this.state.parselSelected}
              changeFunction={this.handleParselChange}
            />
            <Button type='submit' fullWidth variant='contained' color='primary'>
              SORGULA
            </Button>
          </form>
        </div>
      );
    }
  }
}

export default ParcelWidget;
