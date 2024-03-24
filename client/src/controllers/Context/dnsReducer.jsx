export const initialDns = {
  allDnsData: [],
};

export const dnsReducer = (state, action) => {
  switch (action.type) {
    case "GET_RECORD": {
      const data = action.data;
      return {
        ...state,
        allDnsData: data.dnsData,
      };
    }
  }
  return state;
};
