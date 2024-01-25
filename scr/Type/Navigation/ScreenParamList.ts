type GoogleResultParam = { ScanningResult: string };

type MarketResult = { SearchString: string };

type ScreenParamList = {
    Initialization: undefined;
    StartOption: undefined;
    ARView: undefined;
    GoogleResult: GoogleResultParam;
    MarketResult: MarketResult;
};

export default ScreenParamList;
