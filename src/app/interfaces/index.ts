
interface Quote{
    c: number;
    d: number;
    dp: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
  }
  interface QueryResult{
    description: string;
    displaySymbol: string;
    symbol: string;
    type: string;
  }
  
  interface Searchresults {
    count: number;
    result: Array<QueryResult>
  }
  interface FinnhubAPIInfo {
    currentStock: Quote
    symbolInfo: Searchresults
  }
  interface StocksList {
    stockInfo:QueryResult;
    quote:Quote;
  }
  interface InsiderSentimentData {
    change:number;
    month:number;
    mspr:number;
    symbol:string;
    year:number;
  }
  interface InsiderSentiment {
    data:InsiderSentimentData[];
    symbol:string;
    description?:string;
  }

  export {
    Quote,
    QueryResult,
    Searchresults,
    FinnhubAPIInfo,
    StocksList,
    InsiderSentiment,
    InsiderSentimentData
  }