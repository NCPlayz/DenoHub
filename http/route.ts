class Route {
  url: URL;

  constructor(
    public verb: string,
    url: string,
    parameters: Record<string, any> = {}
  ) {
    let _url = new URL(url);
    if (parameters) {
        for (let k in parameters) {
            let v = parameters[k];
            if (v) {
                _url.searchParams.append(k, v);
            }
        }
    }

    this.url = _url;
  }
}

export default Route;
