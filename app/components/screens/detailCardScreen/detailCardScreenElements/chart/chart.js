import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CandleStickChartScreen from './charts/candleChart/candle';
import LineChartScreen from './charts/lineChart/line';
import CandleUpdater from '../../../../../api/updateLastCandleApi/updateLastCandleApi';
import { RequestTecnivalAnalize } from '../../../../../api/setRequestTechnicalAnalize/setRequestTechnicalAnalize';
import { cleanDatesArr, setFunctionSetArr } from './redux/candleArrAction';

const initialcandlesArray = { C: 1, H: 1, L: 1, O: 1, T: 1 };

class Chart extends React.Component {
  constructor() {
    super();
    this.requestTechnical = new RequestTecnivalAnalize();
    this.candleUpdaterObj = new CandleUpdater();
    this.state = {
      arrWithDates: [],
      candlesArr: [initialcandlesArray],
    }
  }

  componentWillMount() {
    const { setFunctionSetArr } = this.props;
    setFunctionSetArr(this.setArr);
  }

  componentDidMount() {
    const { candleItem, cleanDatesArr } = this.props;
    cleanDatesArr(this.cleanDates);
    this.requestTechnical.getCandelsFromServer(candleItem.ID, 'Hour');
    this.requestTechnical.sendMassegeWebSoket(candleItem.ID, 'Hour');
  }

  componentWillReceiveProps({ candleItem, endCandleFrame }) {
    const { candlesArr } = this.state;
    this.updateCurrentCandle([...candlesArr], candleItem, endCandleFrame);
  }

  setArr = (data) => {
    this.setState({
      candlesArr: data
    })
  }

  cleanDates = () => {
    this.setState({
      arrWithDates: []
    })
  }

  updateCurrentCandle = (dataCandels, candleItem, endCandleFrame) => {
    let newArrWithDates = [];
    if (dataCandels.length > 2) {
      newArrWithDates = this.candleUpdaterObj.updateArrWithCandlesAndReturnArrDates(dataCandels, candleItem, endCandleFrame, this.setArr);
      if (newArrWithDates) {
        this.setState({
          arrWithDates: newArrWithDates,
        })
      }
      const { arrWithDates } = this.state;
      if ( arrWithDates.length !== dataCandels.length) {
        const arrWithDates = this.candleUpdaterObj.dateFormaterToArr(dataCandels);
        this.setState({
          arrWithDates,
        })
      }
    }
  }

  render() {
    const { candlesArr, arrWithDates } = this.state;
    const { zoomFromRedux, isCandels } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {isCandels ? <LineChartScreen JSONCandle={candlesArr} dates={arrWithDates} zoom={zoomFromRedux} /> : <CandleStickChartScreen JSONCandle={candlesArr} dates={arrWithDates} zoom={zoomFromRedux} />}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  candleItem: state.cardItem.item,
  endCandleFrame: state.endCandleFrame.closedItem,
  zoomFromRedux: state.zoomCharts.zoom,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  cleanDatesArr,
  setFunctionSetArr,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Chart);